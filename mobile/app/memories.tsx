import Icon from '@expo/vector-icons/Feather'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { Link, useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { useEffect, useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import NlwLogo from '../src/assets/logo.svg'
import { api } from '../src/lib/api'

dayjs.locale(ptBr)

type Memory = {
  id: string
  excerpt: string
  coverUrl: string
  createdAt: string
}

export default function Memories() {
  const { bottom, top } = useSafeAreaInsets()
  const router = useRouter()
  const [memories, setMemories] = useState<Memory[]>([])

  const signOut = async () => {
    await SecureStore.deleteItemAsync('token')
    router.push('/')
  }

  const loadMemories = async () => {
    const token = await SecureStore.getItemAsync('token')

    const response = await api.get('/memories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setMemories(response.data)
  }

  useEffect(() => {
    loadMemories()
  }, [])

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="mt-4 flex-row items-center justify-between px-8">
        <NlwLogo />

        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={signOut}
            className="h-10 w-10 items-center justify-center rounded-full bg-red-500"
          >
            <Icon name="log-out" size={16} color="#000" />
          </TouchableOpacity>

          <Link href="/new" asChild>
            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-green-500">
              <Icon name="plus" size={16} color="#000" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <View className="mt-6">
        {memories.map((memory) => (
          <MemoryCard key={memory.id} {...{ memory }} />
        ))}
      </View>
    </ScrollView>
  )
}

function MemoryCard({ memory }: { memory: Memory }) {
  return (
    <View className="mb-6 space-y-4">
      <View className="flex-row items-center gap-2">
        <View className="h-px w-5 bg-gray-50" />
        <Text className="text-sx font-body text-gray-100">
          {dayjs(memory.createdAt).format('D[ de ]MMMM[, ] YYYY')}
        </Text>
      </View>

      <View className="space-y-4 px-8">
        <Image
          source={{
            uri: memory.coverUrl,
          }}
          alt="Memory cover"
          className="aspect-video w-full rounded-lg"
        />
        <Text className="font-body text-base leading-relaxed text-gray-100">
          {memory.excerpt}
        </Text>
        <Link href={`/memories/${memory.id}`} asChild>
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row items-center gap-2"
          >
            <Text className="font-body text-sm text-gray-200">Leia mais</Text>
            <Icon name="arrow-right" size={16} color="#9e9ea0" />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}
