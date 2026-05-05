import { SiTelegram, SiGithub } from "react-icons/si";

export default function ContactFooter() {
    return (
        <footer className="mt-auto border-t border-slate-800 py-12 px-8 text-center">
            <p className="text-slate-500 text-xs uppercase tracking-widest mb-2">
                Any questions?
            </p>
            <h2 className="text-white text-2xl font-bold mb-6">
                Contact me!
            </h2>

            <div className="flex justify-center gap-4">
                <a
                    href="https://t.me/tellmewhy322"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 border border-slate-700 rounded-full text-slate-300 hover:border-blue-400 hover:text-blue-400 transition-all duration-200"
                >
                    <SiTelegram />
                    <span>Telegram</span>
                </a>

                <a href="https://github.com/aliveagain3228"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center gap-2 px-6 py-3 border border-slate-700 rounded-full text-slate-300 hover:border-slate-400 hover:text-white transition-all duration-200"
                >
                    <SiGithub />
                    <span>GitHub</span>
                </a>
            </div>
        </footer>
    )
}