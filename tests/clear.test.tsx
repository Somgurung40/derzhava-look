import { expect, mock, test } from 'claude-code/testing'

const BAND = { plugin: 'derzhava-look', surface: 'desktop', component: 'AbovePrompt' } as const

test('одно нажатие не чистит, второе в 5 с — запускает /clear, через 5 с — сброс', async ($, on) => {
  const clock = mock.clock(on, { now: 1000 })
  mock.store(on)
  on('session.id', () => ({ value: 'test-session' }))
  const ran: string[] = []
  on('command.run', (_, e) => {
    ran.push(e.command)
    return { text: '' }
  })

  const ui = await $.ui.mount({ ...BAND, props: { hasSurvey: false, isCollapsed: false, isWorking: false, maxRows: 10, bodyColumns: 100, scroll: { top: 0 }, view: {} } as never })
  void ui.press({ key: 'clear' })
  await clock.settle()
  expect(ran).toEqual([])
  expect((await ui.find({ key: 'clear' }))?.text).toMatch(/Точно/)

  await clock.advance(6000)
  expect((await ui.find({ key: 'clear' }))?.text).toMatch(/Очистить контекст/)

  void ui.press({ key: 'clear' })
  await clock.advance(1000)
  await ui.press({ key: 'clear' })
  expect(ran).toEqual(['clear'])
  await ui.unmount()
})

test('пляж рисуется фоном на desktop', async $ => {
  const ui = await $.ui.mount({ plugin: 'derzhava-look', surface: 'desktop', component: 'Backdrop', props: { scene: 'beach', plugin: 'derzhava-look', glass: false } as never })
  expect(await ui.find({ type: 'Svg' })).toBeDefined()
  await ui.unmount()
})
