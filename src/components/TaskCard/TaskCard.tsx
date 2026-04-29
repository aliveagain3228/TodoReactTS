import type { Task, Status } from "../../types"
import { motion } from "framer-motion";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from '@dnd-kit/utilities'

interface TaskCardProps {
    task: Task
    onDelete: (id: number) => void
    onMove: (id: number, status: Status) => void
}

const STATUS_ORDER: Status[] = ['todo', 'inProgress', 'done']

export default function TaskCard({ task, onDelete, onMove } : TaskCardProps) {

    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: task.id
    })

    const style = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 1000 : 'auto',
    }

    const currentIndex = STATUS_ORDER.indexOf(task.status)
    const canMoveLeft = currentIndex > 0
    const canMoveRight = currentIndex < STATUS_ORDER.length - 1

    return (
        <motion.div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-slate-700 rounded-lg p-3 flex flex-col gap-2 cursor-grab active:cursor-grabbing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1}}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            layout
        >

            <div className="flex justify-between items-start">
                <h3 className="font-medium text-sm flex-1">{task.title}</h3>
                <button
                    onClick={() => onDelete(task.id)}
                    className="text-slate-400 hover:text-red-400 ml-2 text-xs transition-colors"
                >
                    ✕
                </button>
            </div>

            {task.description && (
                <p className="text-slate-400 text-xs">{task.description}</p>
            )}

            <div className="flex gap-1 mt-1">
                <button
                    onClick={() => onMove(task.id, STATUS_ORDER[currentIndex - 1])}
                    disabled={!canMoveLeft}
                    className="flex-1 text-xs bg-slate-600 hover:bg-slate-500 disabled:cursor-not-allowed rounded px-2 py-1 transition-colors"
                >
                    ← Назад
                </button>

                <button
                    onClick={() => onMove(task.id, STATUS_ORDER[currentIndex + 1])}
                    disabled={!canMoveRight}
                    className="flex-1 text-xs bg-slate-600 hover:bg-slate-500 disabled:opacity-30 disabled:cursor-not-allowed rounded px-2 py-1 transition-colors"
                >
                    Вперёд →
                </button>
            </div>
        </motion.div>
    )
}