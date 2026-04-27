import type { Task, Status } from "../../types"

interface TaskCardProps {
    task: Task
    onDelete: (id: number) => void
    onMove: (id: number, status: Status) => void
}

const STATUS_ORDER: Status[] = ['todo', 'inProgress', 'done']

export default function TaskCard({ task, onDelete, onMove } : TaskCardProps) {
    const currentIndex = STATUS_ORDER.indexOf(task.status)
    const canMoveLeft = currentIndex > 0
    const canMoveRight = currentIndex < STATUS_ORDER.length - 1

    return (
        <div className="bg-slate-700 rounded-lg p-3 flex flex-col gap-2">
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
        </div>
    )
}