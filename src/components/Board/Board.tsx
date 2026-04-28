import { useTasks } from '../../hooks/UseTasks'
import PageLoader from "../PageLoader/PageLoader.tsx";
import { COLUMNS } from "../../types";
import Column from "../Column/Column"
import Header from "../Header/Header"

export default function Board() {
    const { tasks, addTask, deleteTask, moveTask } = useTasks()

    return (
        <div className="min-h-screen flex flex-col">
            <PageLoader />
            <Header tasks={tasks} />

            <div className="p-8 flex-1">
                <div className="grid grid-cols-3 gap-6 items-start">
                    {COLUMNS.map(column => (
                        <Column
                            key={column.id}
                            column={column}
                            tasks={tasks.filter(t => t.status === column.id)}
                            onAddTask={addTask}
                            onDeleteTask={deleteTask}
                            onMoveTask={moveTask}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}