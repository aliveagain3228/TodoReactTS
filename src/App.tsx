import { BrowserRouter, Routes, Route } from "react-router-dom";
import Board from './components/Board/Board.tsx'
import { LocaleProvider} from "./context/LocaleContext";

export default function App() {
    return (
        <LocaleProvider>
            <BrowserRouter basename="/TodoReactTS">
                <div className="min-h-screen bg-slate-900 text-white">
                    <Routes>
                        <Route path="/" element={<Board />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </LocaleProvider>

    )
}