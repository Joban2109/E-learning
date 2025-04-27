import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { setUser } from '@/redux/authSlice'
import { startScreenTimeTracking } from '@/redux/screenTimeSlice'
import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    email:"",
    password:""
  })
  const handleChange =(e)=>{

    const{name,value} = e.target
    setInput((prev)=>({
      ...prev,
      [name]:value,
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(input);
    try {

      const response =await axios.post('http://localhost:8000/api/v1/user/login', input,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })
      if(response.data.success){
        navigate('/')
        dispatch(setUser(response.data.user))
        
        // Screen time tracking will auto-start via the ScreenTimeTracker component
        toast.success(response.data.message)

      }else{
        toast.error("Something went wrong")
      }
    } catch (error) {
       console.log(error)
    }
  }



  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100  ">
          <div className="bg-white shadow-lg p-8 max-w-md w-full">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
              Welcome Back
            </h1>
            <p className=" text-center text-gray-600 mb-8">
              Please Login to your account
            </p>
            {/* Name input */}
            
            <div className=" mb-4 ">
              <Label> Email</Label>
              <Input placeholder=" Enter Your Email" name="email" type="email" value={input.email} onChange={handleChange} />
            </div>
            <div className=" mb-4 ">
              <Label> Password</Label>
              <Input placeholder=" Enter Your Password" name="password" type="password" value={input.password} onChange={handleChange} />
            </div>
            
            <Button onClick={handleSubmit} className="w-full bg-violet-900 hover:bg-violet-600">Login</Button>
            {/* divider */}
            <div className='flex items-center my-6'>
                <hr className='flex-grow border-violet-300'/>
                <span className='mx-3 text-violet-500'>OR</span>
                <hr className='flex-grow border-violet-300'/>
            </div>
            <p className="text-center mt-4"> Don't have an account? <Link to='/signup' className="text-violet-600 hover:underline">Sign up </Link></p>
          </div>
        </div>
  )
}

export default Login