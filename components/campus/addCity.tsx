"use client"
import { useCityStore } from '@/stores/campus'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import createCity from '@/app/actions/campus/cities'
import { useRouter } from 'next/navigation'
import { Label } from '../ui/label'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'


const AddCityForm = () => {
  const cityStore = useCityStore()
  const router = useRouter()
  const [error, setError] = useState<string>("")

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    const response = await createCity({name: cityStore.name})

    if (response.errors) {
      setError(response.errors)
      return;
  }
  
    router.refresh()
    cityStore.setName("")
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Add City
        </CardTitle>  
        <CardDescription>
          Add a new city to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
      <form onSubmit={onSubmit} className='space-y-2 '>

        <div>
          <Label className='text-right'>Add City</Label>
          <Input
          value={cityStore.name}
          onChange={(e) => cityStore.setName(e.target.value)}
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

export default AddCityForm