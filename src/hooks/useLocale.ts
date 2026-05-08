import { useState } from "react";
import { translations } from "../i18n";
import type { Locale } from '../i18n'

export function useLocale() {
    const [locale, setLocale] = useState<Locale>(() => {
        const saved = localStorage.getItem('locale') as Locale | null
        return saved ?? 'ru'
    })

    const toggleLocale = () => {
        const order: Locale[] = ['ru', 'en', 'ua']
        const currentIndex = order.indexOf(locale)
        const next = order[(currentIndex + 1) % order.length]
        setLocale(next)
        localStorage.setItem('locale', next)
    }

    const t = (path: string) : string => {
        const keys = path.split('.')

        let result: unknown = translations[locale]

        for (const key of keys) {
            if (typeof result === 'object' && result != null) {
                result = (result as Record<string, unknown>)[key]
            }
        }

        return typeof result === 'string' ? result : path
    }

    return { locale, toggleLocale, t }
}