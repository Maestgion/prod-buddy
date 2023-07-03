"use client"
import React, {useState, useEffect, FormEvent} from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import Link from 'next/link'

const LoginPage = () => {


  // user-state
    const [user, setUser]  = useState({
      userName: "",
      email: "",
      password: ""
    });
  
  // loading state
  const [loading, setLoading] = useState(false);


  function handleSubmit (e:FormEvent<HTMLFormElement>){
    e.preventDefault();

   }


  return ( 
    <>
      {/* container */}
      <div className='min-h-screen flex flex-col items-center justify-center bg-black  gap-16 '>

        {/* logo and greeting */}

        <div className='text-white flex flex-col gap-20 items-center'>
          <p className='text-5xl  '>proby</p>
          <div>
            <p className='font-semibold text-4xl tracking-wider'>Welcome back!</p>
            <p className='text-center pt-4 text-lg'>Login to your account</p>
          </div>
        </div>

         {/*form*/}

         <form onSubmit={handleSubmit} className=' text-base flex flex-col gap-12  w-[35vw]' >

        <div className='bg-zinc-900 flex flex-col rounded-md'>
          <input type="email"  className='text-zinc-400  outline-none bg-transparent py-4 px-6' placeholder="Email"/>
        <hr className='border-b-1 border-zinc-800 mx-2'/>
          <input type="password" className='text-zinc-400   outline-none bg-transparent py-4 px-6' placeholder="Password"/>
          </div>


        <div className='flex flex-col items-center gap-4'>
          <button type="submit" className='bg-orange-400 text-black w-[10vw] rounded-full py-2 font-bold'>Login</button>
          <Link href="/resetpassword" className='text-orange-400 tracking-wide '>Forgot password?</Link>
        </div>

        <div className='w-[100%] flex justify-between px-8'>
          <p className='text-white'>Don't have an account?</p>
          <Link href="/signup" className='text-orange-400 '>Let's Signup</Link>
        </div>
         </form>


      </div>
    </>
  )
}

export default LoginPage