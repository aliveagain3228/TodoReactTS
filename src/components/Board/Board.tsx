import { useTasks } from '../../hooks/UseTasks'
import ContactFooter from "../Footer/ContactFooter.tsx";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useState } from 'react';
import TaskCard from "../TaskCard/TaskCard.tsx";
import type { DragEndEvent } from "@dnd-kit/core";
import type { Status, Task } from "../../types"
import PageLoader from "../PageLoader/PageLoader.tsx";
import { COLUMNS } from "../../types";
import Column from "../Column/Column"
import Header from "../Header/Header"

export default function Board() {
    const { tasks, addTask, deleteTask, moveTask, editTask } = useTasks()

    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
    const [search, setSearch ] = useState('')
    const filteredTasks = (columnId: Status) =>
        tasks
            .filter(t => t.status === columnId)
            .filter(t => t.title.toLowerCase().includes(search.toLowerCase()))
            .sort((a, b) =>
                sortOrder === 'newest'
                ? b.createdAt - a.createdAt
                    : a.createdAt - b.createdAt
            )
    const [activeTask, setActiveTask] = useState<Task | null>(null)

    const handleDragStart = (event: DragEndEvent) => {
        const task = tasks.find(t => t.id === event.active.id)
        setActiveTask(task ?? null)
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        setActiveTask(null)
        if (!over) return

        const taskId = active.id as number
        const newStatus = over.id as Status
        moveTask(taskId, newStatus)
    }

    return (
        <div className="min-h-screen flex flex-col">
            <PageLoader />
            <Header
                search={search}
                sortOrder={sortOrder}
                onSortChange={() => setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest')}
                onSearchChange={setSearch}
                tasks={tasks}
            />

            <div className="p-8 flex-1">
                <DndContext
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                <div className="grid grid-cols-3 gap-6 items-start">
                    {COLUMNS.map(column => (
                        <Column
                            key={column.id}
                            column={column}
                            tasks={filteredTasks(column.id)}
                            onAddTask={addTask}
                            onDeleteTask={deleteTask}
                            onMoveTask={moveTask}
                            onEditTask={editTask}
                        />
                    ))}
                </div>

                    <DragOverlay>
                        {activeTask ? (
                            <TaskCard
                            task={activeTask}
                            onDelete={() => {}}
                            onMove={() => {}}
                            onEdit={() => {}}
                            />
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </div>
            <ContactFooter />
        </div>
    )
}