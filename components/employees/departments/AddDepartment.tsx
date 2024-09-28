"use client"
import React, { useState } from 'react'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { useRouter } from 'next/navigation'
import { Label } from '../../ui/label'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card'
import { useDepartmentStore } from '@/stores/employees'
import createDepartment from '@/app/actions/employees/departments'

const AddDepartment = () => {
    const departmentStore = useDepartmentStore()
    const router = useRouter()
    const [error, setError] = useState<string>("")
    
  
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setError("")
  
      const response = await createDepartment({name: departmentStore.name})
  
      if (response.errors) {
        setError(response.errors)
        return;
    }
    
      router.refresh()
      departmentStore.setName("")
    }
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            Add Department
          </CardTitle>  
          <CardDescription>
            Please! Don't Add unessary Departments as this will affect <strong>all Principal Reports</strong>.
          </CardDescription>
        </CardHeader>
        <CardContent>
        <form onSubmit={onSubmit} className='space-y-2 '>
  
          <div>
            <Label className='text-right'>Department Name</Label>
            <Input
            value={departmentStore.name}
            onChange={(e) => departmentStore.setName(e.target.value)}
            />
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

export default AddDepartment