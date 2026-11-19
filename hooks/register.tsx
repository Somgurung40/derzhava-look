import { atom, read, update } from 'claude-code'
import type { Register, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'
import { SCENE } from './scene'

// «Державный»: днём сине-жёлтый пляж, ночью красно-чёрный.
const { theme, problems } = makeColors({
  label: 'Державный',
  roles: { accent: '#0057b7', danger: '#b3392f', success: '#4e7d3a', warning: '#e0a800', pro: '#c98a00' },
  light: {
    gray: {
      anchors: {
        'surface-0': '#e9ecf2',
        'surface-1': '#f1f3f7',
        'surface-2': '#f8f9fb',
        'text-primary': '#1c2433',
        'text-secondary': '#3f4a5e',
        'text-muted': '#5a6478',
      },
    },
  },
  dark: {
    roles: { accent: '#d22630' },
    gray: {
      anchors: {
        'surface-0': '#120a0b',
        'surface-1': '#1a1011',
        'surface-2': '#221516',
        'surface-3': '#2a1a1b',
        'text-primary': '#f3ecec',
        'text-secondary': '#d3c6c6',
        'text-muted': '#a8999a',
      },
    },
  },
})

// Живая сцена-пляж за разговором; панели поверх — матовое стекло, чтобы текст читался.
const LOOK: ThemeSetArgs = {
  colors: theme,
  backdrop: { scene: 'beach', glass: { blur: 14, opacity: 0.6 } },
}

// Режим: auto — как у человека в Claude Code, light/dark — принудительно кнопками над вводом.
type Scheme = 'auto' | 'light' | 'dark'
const lookFor = (mode: Scheme): ThemeSetArgs => (mode === 'auto' ? LOOK : { ...LOOK, overrideColorScheme: mode })

const armedAt = atom({ plugin: 'derzhava-look', key: 'armedAt' } as const, null)
const themeSession = atom({ plugin: 'derzhava-look', key: 'themeSession' } as const, null)
const scheme = atom({ plugin: 'derzhava-look', key: 'scheme' } as const, 'auto' as Scheme)
const CONFIRM_MS = 5000

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))
    if (unpainted !== undefined) $.ui.toast(unpainted)

    const set = await $.theme.set(lookFor(await read($, scheme)))
    if (!set.isDrawn) $.ui.status(set.reason)

    return next(e)
  })

  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    if ((e.surface !== 'desktop' && e.surface !== 'mobile') || e.props.scene !== 'beach') return next(e)
    const { Svg } = $.ui.resolve(e)
    return <Svg source={SCENE} alt="Пляж: днём сине-жёлтый, ночью красно-чёрный" />
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (e.props.hasSurvey) return next(e)

    // /clear даёт новую сессию без session.start — тему ставим заново для каждой сессии.
    const sid = await $.session.id()
    if ((await read($, themeSession)) !== sid) {
      await update($, themeSession, () => sid)
      await $.theme.set(lookFor(await read($, scheme)))
    }

    const mode = await read($, scheme)
    const pick = (next: Scheme) => async () => {
      await update($, scheme, () => next)
      await $.theme.set(lookFor(next))
    }

    const { Box, Button, Text } = $.ui.resolve(e)
    const since = await read($, armedAt)
    const now = await $.clock.now()
    const isArmed = since !== null && now - since < CONFIRM_MS

    let fill = ''
    try {
      const { context } = await $.session.usage()
      if (context.percent !== undefined && context.percent !== null) fill = `Контекст: ${Math.round(context.percent)}%  `
    } catch {
      fill = ''
    }

    const press = async () => {
      const t = await $.clock.now()
      const s = await read($, armedAt)
      if (s !== null && t - s < CONFIRM_MS) {
        await update($, armedAt, () => null)
        try {
          await $.command.run({ command: 'clear' })
        } catch (err) {
          $.ui.toast(`Не удалось очистить: ${String(err)}`)
        }
        return
      }
      await update($, armedAt, () => t)
      await $.clock.sleep(CONFIRM_MS)
      const later = await read($, armedAt)
      if (later === t) await update($, armedAt, () => null)
    }

    return (
      <Box>
        <Text dimColor>{fill}</Text>
        <Button
          key="clear"
          variant={isArmed ? 'primary' : undefined}
          onPress={press}
        >
          {isArmed ? 'Точно очистить? Нажмите ещё раз' : '🧹 Очистить контекст (/clear)'}
        </Button>
        <Button key="scheme-light" variant={mode === 'light' ? 'primary' : undefined} onPress={pick('light')}>
          ☀ Светлая
        </Button>
        <Button key="scheme-dark" variant={mode === 'dark' ? 'primary' : undefined} onPress={pick('dark')}>
          🌙 Тёмная
        </Button>
        <Button key="scheme-auto" variant={mode === 'auto' ? 'primary' : undefined} onPress={pick('auto')}>
          ◐ Как в системе
        </Button>
      </Box>
    )
  })
}
