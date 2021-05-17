import { createStore } from 'vuex'
import { UserState } from './module/user/state'
import modules from './modules'

export type GlobState = {
  user: UserState
}

const store = createStore<GlobState>({
  modules,
})

export default store
