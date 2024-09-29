import { create } from "zustand"

interface ClassState {
    name: string
    setName: (name: string) => void
}

export const useClassStore = create<ClassState>()((set)=>({
    name: '',
    setName: (name: string) => {
        set({name})
    },
}))


interface SectionState {
    name: string,
    class: number,
    setName: (name: string) => void,
    setClass: (id: string) => void
}

export const useSectionStore = create<SectionState>()((set)=>({
    name: '',
    class: 0,
    setName: (name: string) => {
        set({name})
    },
    setClass: (id: string) => {
        const classNumber = parseInt(id, 10);
        set({ class: isNaN(classNumber) ? 0 : classNumber });
    }
})) 