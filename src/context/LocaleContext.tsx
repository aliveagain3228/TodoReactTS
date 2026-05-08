import { createContext, useContext, type ReactNode } from "react";
import { useLocale } from '../hooks/useLocale.ts'
import type { Locale } from '../i18n'

interface LocaleContextType {
    locale: Locale
    toggleLocale: () => void
    t: (path: string) => string
}

const LocaleContext = createContext<LocaleContextType | null>(null)

export function LocaleProvider({ children }: {children: ReactNode}) {
    const localeData = useLocale()

    return (
        <LocaleContext.Provider value={localeData}>
            {children}
        </LocaleContext.Provider>
    )
}

export function useTranslation() {
    const ctx = useContext(LocaleContext)
    if (!ctx) throw new Error('useTranslation must be defined')
    return ctx
}