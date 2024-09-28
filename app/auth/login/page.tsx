"use client"
import { loginCampus } from '@/actions/campus/campus'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useLoginStore } from '@/stores/campus'
import { Label } from '@radix-ui/react-label'
import { AlertCircle } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const LoginPage = () => {
  const loginStore = useLoginStore()
  const [error, setError] = React.useState<string>("")

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    console.log("sending email")
    const response = await loginCampus({email: loginStore.email, password: loginStore.password})
    if (response.error) {
      setError(response.error)
      return;
    }

    loginStore.setEmail("")
    loginStore.setPassword("")
  }

  return (
    <div className='space-y-6'>
      <div className="h-20 w-20">
        <Image src="/mazen_icon.png" alt="Logo" width={200} height={200} />
      </div>
      
      <div>
        <h1 className='text-4xl font-semibold'>Get Started</h1>
        <p className='text-xl font-extralight'>Login to Digital Connect - Mazen Schools Digital Reporting</p>
      </div>

      <Separator className="my-4 opacity-20"/>
      <form onSubmit={onSubmit} className='space-y-2'>
      <div className='space-y-4'>
        <div>
          <Label className=''>Email</Label>
          <Input
            type='email'
            placeholder='campus@mazenschools.edu.pk'
            value={loginStore.email}
            onChange={(e) => loginStore.setEmail(e.target.value)}
            />
        </div>
        <div>
          <Label className=''>Password</Label>
          <Input
            type='password'
            placeholder='pa$$word'
            value={loginStore.password}
            onChange={(e) => loginStore.setPassword(e.target.value)}
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

        <div className="h-2"></div>
        <Button type='submit' className='w-full'>Log In</Button>
      </div>
      </form>
    </div>
  )
}

export default LoginPage