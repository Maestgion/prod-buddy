"use client"
import React, {useState} from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import { data } from 'autoprefixer'

const ProfilePage = () => {
  const router = useRouter()

  const [data, setData]= useState("");

  const logout = async ()=>{
      const response = await axios.get("/api/users/logout")
      console.log(response.data)
      router.push("/login")
  }

  const getUserDetails = async ()=>{
    try{
      const response = await axios.get("/api/users/profile")
      console.log(response.data)
      setData(response.data.data._id)
    }catch(error:any){
      console.log(error.message)
    }
  }
  
  return (
    <>

    <div className='min-h-screen flex flex-col items-center justify-center bg-black'>

    <div>
    <h1 className='text-white'>Profile</h1>
    <p className="text-white">{data===""?"no data":<Link href={`/profile/${data}`}>{data}</Link>}</p>
    </div>

    <div className='w-[30vw] flex justify-between'>
    <button onClick={logout} className='bg-orange-400 text-black w-[10vw] rounded-full py-2 font-bold'>Logout</button>
    <button onClick={getUserDetails} className='bg-orange-400 text-black w-[10vw] rounded-full py-2 font-bold'>Get Details</button>
    </div>

    </div>  


    </>
  )
}

export default ProfilePage