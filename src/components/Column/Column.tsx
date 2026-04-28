import type { Task, Column as ColumnType, Status } from "../../types";
import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "../TaskCard/TaskCard"
import AddTaskForm from "../AddTaskForm/AddTaskForm"

interface ColumnProps {
    column: ColumnType;
    tasks: Task[];
    onAddTask: ( title: string, description?: string, status?: Status) => void
    onDeleteTask: ( id: number ) => void
    onMoveTask: (id: number, status: Status) => void
}

export default function Column({ column, tasks, onAddTask, onDeleteTask, onMoveTask } : ColumnProps) {

    return (
        <motion.div
            className="bg-slate-800 rounded-xl p-4 flex flex-col gap-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
        >
            <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold text-lg">{column.title}</h2>
                <span className="bg-slate-700 text-slate-300 text-sm px-2 py-1 rounded-full">
                {tasks.length}
            </span>
            </div>

            <div className="flex flex-col gap-2 flex-1">
                <AnimatePresence>
                {tasks.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onDelete={onDeleteTask}
                        onMove={onMoveTask}
                    />
                ))}
                </AnimatePresence>

                {tasks.length === 0 && (
                    <p className="text-slate-500 text-sm text-center py-4">
                        Нет задач
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