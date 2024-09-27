import {create} from 'zustand'

interface CityState {
    name: string
    setName: (name: string) => void
}

export const useCityStore = create<CityState>()((set)=>({
    name: '',
    setName: (name: string) => {
        set({name})
    }
}))


interface CampusState {
    name: string
    email: string
    city: number
    password: string
    setName: (name: string) => void
    setEmail: (email: string) => void
    setCity: (city: string) => void
    setPassword: (password: string) => void
}

export const useCampusStore = create<CampusState>()((set)=>({
    name: '',
    email: '',
    city: 0,
    password: '',
    setName: (name: string) => {
        set({name})
    },
    setEmail: (email: string) => {
        set({email})
    },
    setCity: (city: string) => {
        const cityNumber = parseInt(city, 10);
        set({ city: isNaN(cityNumber) ? 0 : cityNumber });
    },
    setPassword: (password: string) => {
        set({password})
    }
}))


interface LoginState {
    email: string
    password: string
    setEmail: (email: string) => void
    setPassword: (password: string) => void
}

export const useLoginStore = create<LoginState>()((set)=>({
    email: '',
    password: '',
    setEmail: (email: string) => {
        set({email})
    },
    setPassword: (password: string) => {
        set({password})
    }
}))