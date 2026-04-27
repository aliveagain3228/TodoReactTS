import  { useState } from "react";
import type { Status } from '../../types'

interface AddTaskFormProps {
    columnStatus: Status
    onAdd: (title: string, description?: string, status?: Status) => void
}

export default function AddTaskForm({ columnStatus, onAdd } : AddTaskFormProps) {
    const [isOpen, setIsOpen] = useState(false)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = () => {
        if (!title.trim()) return

        onAdd(title.trim(), description.trim() || undefined, columnStatus)

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