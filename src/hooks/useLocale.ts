import { useState } from "react";
import { translations } from "../i18n";
import type { Locale } from '../i18n'

export function useLocale() {
    const [locale, setLocale] = useState<Locale>(() => {
        const saved = localStorage.getItem('locale') as Locale | null
        return saved ?? 'ru'
    })

    const changeLocale = (newLocale: Locale) => {
        setLocale(newLocale)
        localStorage.setItem('locale', newLocale)
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

    return { locale, changeLocale, t }
}