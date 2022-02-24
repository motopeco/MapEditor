import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

export interface MassData {
  type: number
  x: number
  y: number
}

export interface RootState {
  massDatum: MassData[]
  massType: number
}

export const key: InjectionKey<Store<RootState>> = Symbol()

export const store = createStore<RootState>({
  state: {
    massDatum: [],
    massType: 1,
  },
  mutations: {
    add(state, massData: MassData) {
      state.massDatum.push(massData)
    },
    update(state, massDatum: MassData[]) {
      state.massDatum = massDatum
    },
    setMassType(state, type: number) {
      state.massType = type
    }
  }
})
