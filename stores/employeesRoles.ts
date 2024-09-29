import {create} from 'zustand'

interface DepartmentState {
    name: string
    setName: (name: string) => void
}

export const useDepartmentStore = create<DepartmentState>()((set)=>({
    name: '',
    setName: (name: string) => {
        set({name})
    }
}))


interface DesignationState {
    name: string
    department: number
    setName: (name: string) => void
    setDepartment: (department: string) => void
}

export const useDesignationStore = create<DesignationState>()((set)=>({
    name: '',
    department: 0,
    setName: (name: string) => {
        set({name})
    },
    setDepartment: (department: string) => {
        const departmentNumber = parseInt(department, 10);
        set({ department: isNaN(departmentNumber) ? 0 : departmentNumber });
    }
}))