import { MMKV } from 'react-native-mmkv'

const storage = new MMKV()

const MMKVStorage = {
  getItem: (name: string) => {
    const value = storage.getString(name)
    return value ? JSON.parse(value) : null
  },
  setItem: (name: string, value: any) => {
    storage.set(name, JSON.stringify(value))
  },
  removeItem: (name: string) => {
    storage.delete(name)
  },
}

export default MMKVStorage
