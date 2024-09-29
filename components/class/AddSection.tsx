"use client"
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useDepartmentStore } from '@/stores/employeesRoles'
import createDepartment from '@/app/actions/employees/departments'
import { useClassStore, useSectionStore } from '@/stores/class'
import { createClass } from '@/app/actions/classes/class'
import { createSection } from '@/app/actions/classes/section'

type CampusClass = {
    id: number;
    name: string;
    campus: number;
}

const AddSection = ({campusClasses}: {campusClasses: CampusClass[]}) => {
    const sectionStore = useSectionStore()
    const router = useRouter()
    const [error, setError] = useState<string>("")
    
  
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setError("")

      const response = await createSection({name: sectionStore.name, class: sectionStore.class})
      if (response.errors) {
        setError(response.errors)
        return;
    }
    
      router.refresh()
      sectionStore.setName("")
      sectionStore.setClass("0")
      
    }
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            Add Section
          </CardTitle>  
          <CardDescription>
            Sections might get shown in Report.
          </CardDescription>
        </CardHeader>
        <CardContent>
        <form onSubmit={onSubmit} className='space-y-2 '>
  
          <div>
            <Label className='text-right'>Section Name</Label>
            <Input
            value={sectionStore.name}
            onChange={(e) => sectionStore.setName(e.target.value)}
            />
          </div>

          <div>
            <Label className=''>Class</Label>
            <Select value={sectionStore.class.toString()}
            onValueChange={(value) => sectionStore.setClass(value)}
            >
            <SelectTrigger className="">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
                  <SelectItem  value={"0"}>
                    Select Department
                  </SelectItem>
              {
                campusClasses.map((item) => (
                  <SelectItem key={item.id} value={item.id.toString()}>
                    {item.name}
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

export default AddSection