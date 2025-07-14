import '@expo/metro-runtime'
import { registerRootComponent } from 'expo'
import { ExpoRoot } from 'expo-router'
import './src/global.css'

// Must be exported or Fast Refresh won't update the context
export function App() {
  const ctx = require.context('./src/routes')
  return <ExpoRoot context={ctx} />
}

registerRootComponent(App)
