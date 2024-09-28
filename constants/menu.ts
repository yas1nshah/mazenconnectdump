import {
    Home,
    User,
    GraduationCap,
    FileCheck2Icon,
    Building2    
  } from "lucide-react"

export const menu = [
    {
        name: 'Home',
        path: '/',
        icon: Home,
        submenu: []
    },
    {
        name: 'Employees',
        path: '/employees',
        icon: User,
        submenu: [
            {
                name: 'Add Employee',
                path: '/employees/add',
            },
            {
                name: 'Manage Roles',
                path: '/employees/roles',
            },
            {
                name: 'Add Role',
                path: '/employees/roles/add',
            },
        ]
    },
    {
        name: 'Classes',
        path: '/classes',
        icon: GraduationCap,
        submenu: [
            {
                name: 'Add Class',
                path: '/classes/add',
            },
            {
                name: 'Add Section',
                path: '/classes/sections/add',
            }
        ]
    },
    {
        name: 'Principal_Report',
        path: '/principal-report',
        icon: FileCheck2Icon,
        submenu: [
            {
                name: 'Add Principal Report',
                path: '/principal-report/add',
            }
        ]
    },
    {
        name: 'Manage_Campus',
        path: '/campus',
        icon: Building2,
        submenu: [
            {
                name: 'Add Campus',
                path: '/campus/add',
            }
        ]
    }
]