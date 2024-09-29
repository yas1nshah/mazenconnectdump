"use client"
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useDepartmentStore } from '@/stores/employeesRoles'
import createDepartment from '@/app/actions/employees/departments'
import { useClassStore } from '@/stores/class'
import { createClass } from '@/app/actions/classes/class'

const AddClass = () => {
    const classStore    = useClassStore()
    const router = useRouter()
    const [error, setError] = useState<string>("")
    
  
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setError("")

      const response = await createClass({name: classStore.name})
      if (response.errors) {
        setError(response.errors)
        return;
    }
    
      router.refresh()
      classStore.setName("")
      
    }
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            Add Class
          </CardTitle>  
          <CardDescription>
            Classes will be shown on the Principal Reports.
          </CardDescription>
        </CardHeader>
        <CardContent>
        <form onSubmit={onSubmit} className='space-y-2 '>
  
          <div>
            <Label className='text-right'>Class Name</Label>
            <Input
            value={classStore.name}
            onChange={(e) => classStore.setName(e.target.value)}
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

export default AddClass