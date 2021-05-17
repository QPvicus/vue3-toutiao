export function createState() {
  const state = {
    user: '',
    token: null,
  }
  return state
}

export type UserState = ReturnType<typeof createState>
