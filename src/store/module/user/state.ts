export function createState() {
  const state = {
    user: '',
    token: null as string | null,
  }
  return state
}

export type UserState = ReturnType<typeof createState>
