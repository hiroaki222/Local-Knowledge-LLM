import { atom } from 'jotai'
import { Thread } from '../types/user'

export const threadsAtom = atom<Thread[]>([])
export const isPendingAtom = atom<boolean>(false)
