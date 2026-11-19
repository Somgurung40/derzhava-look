declare module 'claude-code' {
  interface PluginState {
    'derzhava-look': {
      /** Момент первого нажатия «Очистить контекст» (мс), null — не ждём подтверждения */
      armedAt: number | null
      /** Id сессии, для которой уже поставлена тема (после /clear id меняется) */
      themeSession: string | null
      /** Режим оформления: auto — как у человека, light/dark — кнопками над вводом */
      scheme: 'auto' | 'light' | 'dark'
    }
  }
}
export type ArmedAt = number | null
