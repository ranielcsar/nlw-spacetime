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
    const response = await app
      .inject()
      .post('/memories')
      .headers(headers)
      .body(newMemory)
      .catch((err) => console.error({ err }))

    expect(response?.statusCode).toBe(200)

    if (response) {
      createdMemory = response.json()
    }

    expect(response?.json()).toEqual({
      content: expect.any(String),
      coverUrl: expect.any(String),
      createdAt: expect.any(String),
      id: expect.any(String),
      isPublic: expect.any(Boolean),
      userId: expect.any(String),
    })
  })

  test('should get all memories from user', async () => {
    const response = await app
      .inject()
      .get('/memories')
      .headers(headers)
      .then((res) => res.json())

    const memories = [
      {
        id: expect.any(String),
        coverUrl: expect.any(String),
        excerpt: expect.any(String),
        createdAt: expect.any(String),
      },
    ]

    expect(response).toEqual(expect.arrayContaining(memories))
  })

  test('should get a specific memory', async () => {
    const response = await app
      .inject()
      .headers(headers)
      .get(`/memories/${createdMemory?.id}`)
      .then((res) => res.json())

    const memory = {
      content: expect.any(String),
      coverUrl: expect.any(String),
      createdAt: expect.any(String),
      id: expect.any(String),
      isPublic: expect.any(Boolean),
      userId: expect.any(String),
    }

    expect(response).toEqual(memory)
  })

  test('should update a specific memory', async () => {
    const memory = {
      ...newMemory,
      isPublic: true,
    }

    const response = await app
      .inject()
      .headers(headers)
      .put(`/memories/${createdMemory?.id}`)
      .body(memory)
      .then((res) => res.json())

    expect(response).toEqual({
      ...createdMemory,
      isPublic: true,
    })
  })

  test('should delete a specific memory', async () => {
    const response = await app
      .inject()
      .headers(headers)
      .delete(`/memories/${createdMemory?.id}`)
      .then((res) => res.json())

    expect(response).toEqual(true)
  })
})
