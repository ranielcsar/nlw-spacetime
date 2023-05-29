import { Memory } from '@prisma/client'

import { app } from '@/server'

describe('Memories', () => {
  let createdMemory: Memory | null = null

  const headers = {
    authorization: `Bearer ${process.env.TOKEN}`,
  }

  const newMemory = {
    content: '',
    coverUrl: '',
    isPublic: false,
  }

  test('should create a new memory', async () => {
    try {
      const response = await app
        .inject()
        .post('/memories')
        .headers(headers)
        .body(newMemory)

      expect(response.statusCode).toBe(200)
      createdMemory = response.json()

      expect(createdMemory).toEqual({
        content: expect.any(String),
        coverUrl: expect.any(String),
        createdAt: expect.any(String),
        id: expect.any(String),
        isPublic: expect.any(Boolean),
        userId: expect.any(String),
      })
    } catch (err) {
      console.error(err)
    }
  })

  test('should get all memories from user', async () => {
    try {
      const response = await app.inject().get('/memories').headers(headers)

      expect(response.statusCode).toBe(200)

      const memories = [
        {
          id: expect.any(String),
          coverUrl: expect.any(String),
          excerpt: expect.any(String),
          createdAt: expect.any(String),
        },
      ]

      expect(response.json()).toEqual(expect.arrayContaining(memories))
    } catch (err) {
      console.error(err)
    }
  })

  test('should get a specific memory', async () => {
    try {
      const response = await app
        .inject()
        .headers(headers)
        .get(`/memories/${createdMemory?.id}`)

      expect(response.statusCode).toBe(200)

      const memory = {
        content: expect.any(String),
        coverUrl: expect.any(String),
        createdAt: expect.any(String),
        id: expect.any(String),
        isPublic: expect.any(Boolean),
        userId: expect.any(String),
      }

      expect(response.json()).toEqual(memory)
    } catch (err) {
      console.error(err)
    }
  })

  test('should update a specific memory', async () => {
    try {
      const memory = {
        ...newMemory,
        isPublic: true,
      }

      const response = await app
        .inject()
        .headers(headers)
        .put(`/memories/${createdMemory?.id}`)
        .body(memory)

      expect(response.statusCode).toBe(200)

      expect(response.json()).toEqual({
        ...createdMemory,
        isPublic: true,
      })
    } catch (err) {
      console.error(err)
    }
  })

  test('should delete a specific memory', async () => {
    try {
      const response = await app
        .inject()
        .headers(headers)
        .delete(`/memories/${createdMemory?.id}`)

      expect(response.statusCode).toBe(200)

      expect(response.json()).toEqual(true)
    } catch (err) {
      console.error(err)
    }
  })
})
