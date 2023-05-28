import { app } from '@/server'

afterAll(async () => {
  await app.close()
})
