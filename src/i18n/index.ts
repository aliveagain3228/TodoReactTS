import ru from './ru'
import en from './en'
import ua from './ua'

export type Locale = 'ru' | 'en' | 'ua'

export type  Translation = typeof ru

export const translations: Record<Locale, Translation> = { ru, en, ua }