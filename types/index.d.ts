declare module 'claude-code' {
  interface PluginState {
    'derzhava-look': {
      /** Момент первого нажатия «Очистить контекст» (мс), null — не ждём подтверждения */
      armedAt: number | null
    }
  }
}
export type ArmedAt = number | null
