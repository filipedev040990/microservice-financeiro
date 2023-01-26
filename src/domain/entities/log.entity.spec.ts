import MockDate from 'mockdate'
import { Log } from './log.entity'

describe('Log Entity', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })

  test('should create a new instance of Log', () => {
    const log = new Log('{Error: Teste}')

    expect(log).toBeTruthy()
    expect(log).toEqual({
      log: '{Error: Teste}',
      created_at: new Date()
    })
  })
})
