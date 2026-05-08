import type  {Task, Status, Priority } from "../../types"
import type { Locale } from '../../i18n'
import { motion } from "framer-motion";
import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";
import { CSS } from '@dnd-kit/utilities'
import { useTranslation } from "../../context/LocaleContext.tsx";

interface TaskCardProps {
    task: Task
    onDelete: (id: number) => void
    onMove: (id: number, status: Status) => void
    onEdit: (id: number, newTitle: string) => void
}

const PRIORITY_STYLES: Record<Priority, string> = {
    low: 'bg-green-400',
    medium: 'bg-yellow-400',
    high: 'bg-red-400',
}

const LOCALE_MAP: Record<Locale, string> = {
    ru: 'ru-RU',
    en: 'en-US',
    ua: 'uk-UA'
}

const STATUS_ORDER: Status[] = ['todo', 'inProgress', 'done']

export default function TaskCard({ task, onDelete, onMove, onEdit } : TaskCardProps) {

    const { t, locale } = useTranslation()
    const [isEditing , setIsEditing] = useState(false)
    const [editValue, setEditValue] = useState(task.title)

    const handleEditSave = () => {
        if (editValue.trim()) {
            onEdit(task.id, editValue.trim())
        }
        setIsEditing(false)
    }

    const formattedDate = new Date(task.createdAt).toLocaleDateString(LOCALE_MAP[locale], {
        day: "2-digit",
        month: 'short',
    })
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: task.id
    })

    const dragStyle = {
        transform: CSS.Translate.toString(transform)
    }

    const currentIndex = STATUS_ORDER.indexOf(task.status)
    const canMoveLeft = currentIndex > 0
    const canMoveRight = currentIndex < STATUS_ORDER.length - 1

    return (
        <div
            ref={setNodeRef}
            style={dragStyle}
            {...attributes}
        >
        <motion.div
            {...listeners}
            className={`
            bg-slate-700 rounded-lg p-3 flex flex-col gap-2 cursor-grab active:cursor-grabbing
            ${isDragging ? 'opacity-50 shadow-2xl scale-105' : ''}
            `}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
        >

            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${PRIORITY_STYLES[task.priority ?? 'medium']}`}/>
                    {isEditing ? (
                        <input
                            value={editValue}
                            onPointerDown={(e) => e.stopPropagation()}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={handleEditSave}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleEditSave()
                                if (e.key === 'Escape') {
                                    setEditValue(task.title)
                                    setIsEditing(false)
                                }
                            }}
                            autoFocus
                            className="bg-slate-600 rounded px-2 py-0.5 text-sm flex-1 outline-none focus:ring-blue-500"
                        />
                    ) : (
                        <h3

                            onDoubleClick={(e) => {
                                e.stopPropagation()
                                setIsEditing(true)
                                setEditValue(task.title)
                            }}
                            className="font-medium text-sm flex-1 cursor-grab"
                        >
                            {task.title}
                        </h3>
                    )}
                </div>


                <button
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={() => onDelete(task.id)}
                    className="text-slate-400 hover:text-red-400 ml-2 text-xs transition-colors"
                >
                    ✕
                </button>
            </div>

            {task.description && (
                <p className="text-slate-400 text-xs">{task.description}</p>
            )}

            <div
                className="flex gap-1 mt-1"
                onPointerDown={(e) => e.stopPropagation()}
            >
                <button
                    onClick={() => onMove(task.id, STATUS_ORDER[currentIndex - 1])}
                    disabled={!canMoveLeft}
                    className="flex-1 text-xs bg-slate-600 hover:bg-slate-500 disabled:cursor-not-allowed rounded px-2 py-1 transition-colors"
                >
                    {t('task.moveBack')}
                </button>
                <button
                    onClick={() => onMove(task.id, STATUS_ORDER[currentIndex + 1])}
                    disabled={!canMoveRight}
                    className="flex-1 text-xs bg-slate-600 hover:bg-slate-500 disabled:opacity-30 disabled:cursor-not-allowed rounded px-2 py-1 transition-colors"
                >
                    {t('task.moveForward')}
                </button>
            </div>
            <p className="text-slate-500 text-xs mt-1">{formattedDate}</p>
        </motion.div>
        </div>
    )
}