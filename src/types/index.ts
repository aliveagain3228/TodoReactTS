export type Status = 'todo' | 'inProgress' | 'done'

export interface Task {
    id: number
    title: string
    description?: string
    status: Status
    createdAt: number
}

export interface Column {
    id: Status
    title: string
}
export const COLUMNS: Column[] = [
    { id: 'todo', title: '📋 Надо сделать'},
    { id: 'inProgress', title: '⚙️ В процессе'},
    { id: 'done', title: '✅ Готово'}
]