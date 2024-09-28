"use client"
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useDepartmentStore, useDesignationStore } from '@/stores/employees'
import createDepartment from '@/app/actions/employees/departments'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { create } from 'domain'
import { createDesignation } from '@/app/actions/employees/dessignations'

type department = {
  name: string
  id: number
}

const AddDesignation = ({departments}: {departments: department[]}) => {
    const desigmationStore = useDesignationStore()
    const router = useRouter()
    const [error, setError] = useState<string>("")
    
  
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setError("")
  
      const response = await createDesignation({name: desigmationStore.name, department: desigmationStore.department})
  
      if (response.errors) {
        setError(response.errors)
        return;
    }
    
      router.refresh()
      desigmationStore.setName("")
      desigmationStore.setDepartment("0")
    }
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            Add Designation
          </CardTitle>  
          <CardDescription>
            Please! Be Mindful as this will affect <strong>all Principal Reports</strong>.
          </CardDescription>
        </CardHeader>
        <CardContent>
        <form onSubmit={onSubmit} className='space-y-2 '>
  
          <div>
            <Label className='text-right'>Designation Name</Label>
            <Input
            value={desigmationStore.name}
            onChange={(e) => desigmationStore.setName(e.target.value)}
            />
          </div>

          <div>
            <Label className=''>Department</Label>
            <Select value={desigmationStore.department.toString()}
            onValueChange={(value) => desigmationStore.setDepartment(value)}
            >
            <SelectTrigger className="">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
                  <SelectItem  value={"0"}>
                    Select Department
                  </SelectItem>
              {
                departments.map((dep) => (
                  <SelectItem key={dep.id} value={dep.id.toString()}>
                    {dep.name}
                  </SelectItem>
                ))
              }
            </SelectContent>
          </Select>
          </div>
          
          {error &&
            <Alert variant={'destructive'}>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
          }
  
          <Button type='submit'>Add</Button>
        </form>
        </CardContent>
      </Card>
    )
  }

export default AddDesignation