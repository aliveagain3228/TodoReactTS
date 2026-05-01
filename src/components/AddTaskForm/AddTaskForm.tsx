import  { useState } from "react";
import type { Status, Priority } from '../../types'

interface AddTaskFormProps {
    columnStatus: Status
    onAdd: (title: string, description?: string, status?: Status, priority?: Priority) => void
}

export default function AddTaskForm({ columnStatus, onAdd } : AddTaskFormProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [priority, setPriority] = useState<Priority>('medium')

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = () => {

        if (!title.trim()) return

        onAdd(title.trim(), description.trim() || undefined, columnStatus, priority)

        setTitle('')
        setDescription('')
        setIsOpen(false)
    }

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="w-full text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg py-2 text-sm transition-colors text-left px-3"
            >
                + Добавить заметку
            </button>
        )
    }

    return (
        <div className="flex flex-col gap-2">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Название задачи"
                autoFocus
                className="bg-slate-600 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Описание (необязательно)"
                className="bg-slate-600 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-2">
                {(['low', 'medium', 'high'] as Priority[]).map(p => (
                    <button
                        key={p}
                        onClick={() => setPriority(p)}
                        className={`
                        flex-1 text-xs py-1 rounded border transition-colors
                        ${priority === p
                            ? p === 'low' ? 'bg-green-900/50 border-green-500 text-green-400'
                                : p === 'medium' ? 'bg-yellow-900/50 border-yellow-500 text-yellow-400'
                                    : 'bg-red-900/50 border-red-500 text-red-400'
                            : 'border-slate-700 text-slate-500 hover:text-slate-300'
                        }
                        `}
                    >
                        {p === 'low' ? '🟢 Низкий' : p === 'medium' ? '🟡 Средний' : '🔴 Высокий'}
                    </button>
                ))}
                <button
                    onClick={handleSubmit}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 rounded-lg py-2 text-sm font-medium transition-colors"
                >
                    Добавить
                </button>

                <button
                    onClick={() => {
                        setIsOpen(false)
                        setTitle('')
                        setDescription('')
                    }}
                    className="flex-1 bg-slate-600 hover:bg-slate-500 rounded-lg py-2 text-sm transition-colors"
                >
                    Отмена
                </button>
            </div>
        </div>
    )
}