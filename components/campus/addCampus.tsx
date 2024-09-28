'use client'
import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { AlertCircle } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCampusStore } from '@/stores/campus'
import { useRouter } from 'next/navigation'
import { createCampus } from '@/actions/campus/campus'



type city = {
  name: string
  id: number
}

const AddCampus =  ({cities}: {cities: city[]}) => {

  const campusStore = useCampusStore()
  const [error, setError] = useState<string>("")
  const router = useRouter()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    // const response = await createCity({name: campusStore.name})
    const response = await createCampus({name: campusStore.name, email: campusStore.email, city: campusStore.city, password: campusStore.password})
  
    if (response.errors) {
      setError(response.errors)
      return;
    }
    router.refresh()
    campusStore.setName("")
    campusStore.setEmail("")
    campusStore.setCity("0")  
    campusStore.setPassword("")
  }

  return (

  <Card>
    <CardHeader>
      <CardTitle>
      Add Campus
      </CardTitle>  
      <CardDescription>
        Add a new campus to your account.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className=' '>
      <form onSubmit={onSubmit} className='space-y-2'>
          <div>
            <Label className=''>Campus Name</Label>
            <Input
              value={campusStore.name}
              onChange={(e) => campusStore.setName(e.target.value)}
              placeholder='Bahria Campus'
            />
          </div>

          <div>
            <Label className=''>Campus Email</Label>
            <Input
            placeholder='bahria@mazenschools.edu.pk'
            value={campusStore.email}
            onChange={(e) => campusStore.setEmail(e.target.value)}
            />
          </div>

          <div>
            <Label className=''>Campus City</Label>
            <Select value={campusStore.city.toString()}
            onValueChange={(value) => campusStore.setCity(value)}
            >
            <SelectTrigger className="">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
                  <SelectItem  value={"0"}>
                    Select
                  </SelectItem>
              {
                cities.map((city) => (
                  <SelectItem key={city.id} value={city.id.toString()}>
                    {city.name}
                  </SelectItem>
                ))
              }
            </SelectContent>
          </Select>
          </div>

          <div>
            <Label className=''>Password</Label>
            <Input
            placeholder='********'
            value={campusStore.password}
            onChange={(e) => campusStore.setPassword(e.target.value)}
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
      </div>
    </CardContent>
  </Card>
  )
}

export default AddCampus


