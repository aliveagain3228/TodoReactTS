export type Status = 'todo' | 'inProgress' | 'done'

export interface Task {
    id: number
    title: string
    description?: string
    status: Status
    priority: Priority
    createdAt: number
}

export type Priority = 'low' | 'medium' | 'high'



export type SortOrder = 'newest' | 'oldest'

export interface Column {
    id: Status
    title: string
}
export const COLUMNS: Column[] = [
    { id: 'todo', title: '📋 Надо сделать'},
    { id: 'inProgress', title: '⚙️ В процессе'},
    { id: 'done', title: '✅ Готово'}
]