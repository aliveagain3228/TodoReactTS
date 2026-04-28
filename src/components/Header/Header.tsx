import type { Task } from '../../types'
import { useState, useEffect } from "react";
import { GiNotebook } from "react-icons/gi";
import { MdOutlinePendingActions } from "react-icons/md";
import { BsCheckCircle } from "react-icons/bs";

interface HeaderProps {
    tasks: Task[]
}

export default function Header({ tasks }: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false)


    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const totalTasks = tasks.length
    const doneTasks = tasks.filter(t => t.status === 'done').length
    const progress = totalTasks === 0 ? 0 : Math.round(doneTasks / totalTasks * 100)

    return (
        <header className={`
        sticky top-0 z-50 px-8 py-4
        transition-all duration-300
        ${isScrolled
        ? 'bg-slate-900/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-slate-700'
        : 'bg-transparent border-b border-transparent'
        }
        `}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                <div className="flex items-center gap-3">
                    <GiNotebook className="text-blue-400 text-2xl" />
                    <div>
                        <h1 className="text-xl font-bold text-white">Kanban Board</h1>
                        <p className="text-slate-400 text-xs">Управление задачами</p>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <MdOutlinePendingActions className="text-yellow-400 text-lg" />
                        <div className="text-center">
                            <p className="text-white font-bold text-lg leading-none">{totalTasks}</p>
                            <p className="text-slate-400 text-xs">Всего</p>
                        </div>
                    </div>

                    <div className="w-px h-8 bg-slate-700" />
                    <div className="flex items-center gap-2">
                        <BsCheckCircle className="text-green-400 text-lg" />
                        <div className="text-center">
                            <p className="text-white font-bold text-lg leading-none">{doneTasks}</p>
                            <p className="text-slate-400 text-xs">Готово</p>
                        </div>
                    </div>

                    <div className="w-px h-8 bg-slate-700" />

                    <div className="flex items-center gap-2">
                        <div className="text-center">
                            <p className="text-white font-bold text-lg leading-none">
                                {progress}%
                            </p>
                            <p className="text-slate-400 text-xs">Прогресс</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-3">
                <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-green-400 rounded-full transition-all duration-500"
                         style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </header>
    )
}