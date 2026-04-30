import type { Task, Status } from '../types'
import {useEffect, useState} from "react";

const STORAGE_KEY = 'kanban-tasks'

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>(() => {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    })


useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}, [tasks])

const addTask = (title: string, description?: string, status: Status = 'todo') => {
    const newTask: Task = {
        id: Date.now(),
        title,
        description,
        status,
        createdAt: Date.now()
    }
    setTasks(prev => [...prev, newTask])
}

const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id))
}

const moveTask = (id: number, newStatus: Status) => {
    setTasks(prev => prev.map(t =>
        t.id === id ? {...t, status: newStatus} : t
    ))
}

const editTask = (id: number, newTitle: string) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, title: newTitle } : t ))
    }

return { tasks, addTask, deleteTask, moveTask, editTask }
}