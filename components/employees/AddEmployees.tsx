"use client"
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useEmployeeStore } from '@/stores/employees'
import { createEmployee } from '@/app/actions/employees/employees'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { CalendarIcon } from '@radix-ui/react-icons'
import { Calendar } from '../ui/calendar'
import { format } from 'date-fns';

type Department = {
  name: string
  id: number
}

type Designation = {
  name: string;
  id: number;
  department: number;
}

type Status = {
  name: string;
  id: number;
}

const AddEmployees = ({ departments, designations, status }: { departments: Department[], designations: Designation[], status: Status[] }) => {
  const employeeStore = useEmployeeStore()
  const router = useRouter()
  const [error, setError] = useState<string>("")
  const [filteredDesignations, setFilteredDesignations] = useState<Designation[]>([])

  const [selectedDepartment, setSelectedDepartment] = useState<number>(0)

  useEffect(() => {
    // Filter designations based on selected department
    if (selectedDepartment === 0) {
      setFilteredDesignations(designations)
    } else {
      const filtered = designations.filter(designation => designation.department === selectedDepartment)
      setFilteredDesignations(filtered)
    }
  }, [selectedDepartment, designations])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    const response = await createEmployee({
      name: employeeStore.name,
      designation: employeeStore.designation,
      salary: employeeStore.salary,
      status: employeeStore.status
    })

    if (response.errors) {
      setError(response.errors)
      return
    }

    router.refresh()
    employeeStore.setName("")
    employeeStore.setDesignation("0")
    employeeStore.setSalary("0")
    employeeStore.setStatus("0")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Employee</CardTitle>
        <CardDescription>
          Please ensure accurate entries as this will affect all reports.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className='space-y-2 flex justify-between w-full items-end bg-accent p-4 rounded-xl'>

          <div>
            <Label>Name</Label>
            <Input
              value={employeeStore.name}
              onChange={(e) => employeeStore.setName(e.target.value)}
            />
          </div>
         

          <div>
            <Label>Department</Label>
            <Select value={selectedDepartment.toString()}
              onValueChange={(value) => setSelectedDepartment(Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"0"}>Select Department</SelectItem>
                {departments.map(dep => (
                  <SelectItem key={dep.id} value={dep.id.toString()}>{dep.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Designation</Label>
            <Select value={employeeStore.designation.toString()}
              onValueChange={(value) => employeeStore.setDesignation(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Designation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"0"}>Select Designation</SelectItem>
                {filteredDesignations.map(des => (
                  <SelectItem key={des.id} value={des.id.toString()}>{des.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Salary</Label>
            <Input
              value={employeeStore.salary}
              onChange={(e) => employeeStore.setSalary(e.target.value)}
              type='number'
            />
          </div>
          
          <div>
            <Label>Date Joined</Label>
            <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[280px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {employeeStore.datejoined ? (
                    format(new Date(employeeStore.datejoined), "PPP") // Ensure datejoined is a Date object
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={employeeStore.datejoined}
                  onSelect={(e) => employeeStore.setDateJoined(e as Date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            </div>
          </div>


          <div>
            <Label>Status</Label>
            <Select value={employeeStore.status.toString()}
              onValueChange={(value) => employeeStore.setStatus(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Designation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"0"}>Select Designation</SelectItem>
                {status.map(des => (
                  <SelectItem key={des.id} value={des.id.toString()}>{des.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          

          <Button type='submit'>Add</Button>
        </form>

        <div className='py-4'>
        {error && (
          <Alert variant={'destructive'}>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          </div>
      </CardContent>
    </Card>
  )
}

export default AddEmployees
