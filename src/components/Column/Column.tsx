import type { SortOrder, Task, Column as ColumnType, Status } from "../../types";
import { useState} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "../TaskCard/TaskCard"
import AddTaskForm from "../AddTaskForm/AddTaskForm"

interface ColumnProps {
    column: ColumnType;
    tasks: Task[];
    globalSort: SortOrder;
    onAddTask: ( title: string, description?: string, status?: Status) => void
    onDeleteTask: ( id: number ) => void
    onMoveTask: (id: number, status: Status) => void
    onEditTask: ( id: number, newTitle: string ) => void
}

export default function Column({ column, tasks, globalSort, onAddTask, onDeleteTask, onMoveTask, onEditTask } : ColumnProps) {

    const [localSort, setLocalSort] = useState<SortOrder | null>(null)
    const activeSort = localSort ?? globalSort
    const sortedTasks = [...tasks].sort((a, b) =>
        activeSort === 'newest'
        ? b.createdAt - a.createdAt
            : a.createdAt - b.createdAt
    )

    const { setNodeRef, isOver } = useDroppable({ id: column.id })

    return (
        <motion.div
            ref={setNodeRef}
            className={`bg-slate-800 rounded-xl p-4 flex flex-col gap-3
            transition-colors duration-200
            ${isOver ? 'bg-slate-700 ring-2 ring-blue-500' : ''}
            `}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
        >
            <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold text-lg">{column.title}</h2>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setLocalSort(prev =>
                            prev === 'newest' ? "oldest"
                                : prev === "oldest" ? null
                                : "newest"
                        )}
                        className={`
                        text-xs px-2 py-0.5 rounded border transition-colors
                        ${localSort
                            ? 'border-blue-500 text-blue-400'
                            : 'border-slate-700 text-slate-500 hover:text-slate-300'
                        }
                        `}
                    >
                        {localSort === 'newest' ? '↓ New'
                            : localSort === 'oldest' ? '↑ Oldest'
                                : '↕ Auto'
                        }
                    </button>

                    <span className="bg-slate-700 text-slate-300 text-sm px-2 py-1 rounded-full">
                        {tasks.length}
                    </span>
                </div>
            </div>

            <div className="flex flex-col gap-2 flex-1">
                <AnimatePresence>
                {sortedTasks.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onDelete={onDeleteTask}
                        onMove={onMoveTask}
                        onEdit={onEditTask}
                    />
                ))}
                </AnimatePresence>

                {tasks.length === 0 && (
                    <p className="text-slate-500 text-sm text-center py-4">
                        No tasks
                    </p>
                )}
            </div>

            <AddTaskForm
                columnStatus={column.id}
                onAdd={onAddTask}
            />
        </motion.div>
    )
}