import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "../../context/LocaleContext.tsx";

export default function PageLoader() {
    const { t } = useTranslation()
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(false), 1800)
        return () => clearTimeout(timer)
    }, [])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-center gap-6"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="flex gap-1.5">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-2 bg-blue-400 rounded-full"
                                animate={{
                                    height: ['16px', '48px', '16px'],
                                    opacity: [0.4, 1, 0.4]
                                }}
                                transition={{
                                    duration: 0.8,
                                    repeat: Infinity,
                                    delay: i * 0.1,
                                    ease: 'easeInOut'
                                }}
                            />
                        ))}
                    </div>

                    <motion.p
                        className="text-slate-400 text-sm tracking-widest uppercase"
                        animate={{ opacity: [0.4, 1, 0.4 ] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                    >
                        {t('loader.text')}
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    )
}