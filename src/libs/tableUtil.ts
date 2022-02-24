import { useStore } from 'vuex'
import { key } from '../store'

export function up(index: number) {
  const store = useStore(key)
  const datum = store.state.massDatum
  if (index === 0) return

  const data = datum[index]
  const prevData = datum[index - 1]
  datum.splice(index - 1, 1, data)
  datum.splice(index, 1, prevData)

  store.commit('update', datum)
}

export function down(index: number) {
  const store = useStore(key)
  const datum = store.state.massDatum
  if (index === datum.length - 1) return

  const data = datum[index]
  const nextData = datum[index + 1]
  datum.splice(index + 1, 1, data)
  datum.splice(index, 1, nextData)

  store.commit('update', datum)
}

export function remove(index: number) {
  const store = useStore(key)
  const datum = store.state.massDatum
  datum.splice(index, 1)

  store.commit('update', datum)
}
