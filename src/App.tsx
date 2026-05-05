import { BrowserRouter, Routes, Route } from "react-router-dom";
import Board from './components/Board/Board.tsx'

export default function App() {
    return (
        <BrowserRouter basename="/TodoReactTS">
            <div className="min-h-screen bg-slate-900 text-white">
                <Routes>
                    <Route path="/" element={<Board />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}