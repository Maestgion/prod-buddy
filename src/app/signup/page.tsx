"use client"
import React, {useState, useEffect, FormEvent} from 'react'
// import { publicReq } from '@/helpers/axios'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import Link from 'next/link'

const signupPage = () => {
    
    const router = useRouter();

    // user-state
      const [user, setUser]  = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword:"",
      });
    
    // loading state
    const [loading, setLoading] = useState(false);
  
    // button-state
    const [disabledButton, setDisabledButton] = useState(true)
  
  
  
    async function handleSubmit (e:FormEvent<HTMLFormElement>){
      e.preventDefault();
      try {
          setLoading(true);
    // console.log(process.env.NEXT_PUBLIC_SECRET_KEY)

          // const response = await publicReq.post("/users/signup", user)
          const response = await axios.post("api/users/signup", user)
          console.log("signup successful", response.data)
          router.push("/login")
      } catch (error: any) {
        console.log("error: ", error.message );
        
      }finally{
        setLoading(false);
  
      }
     }
  
     useEffect(()=>{
      if(user.email.length>0 && user.password.length>0)
      {
        setDisabledButton(false);
      }else{
        setDisabledButton(true);
      }
    }, [user])

    return ( 
        <>
          {/* container */}
          <div className='min-h-screen flex flex-col items-center justify-center bg-black  gap-16 '>
    
            {/* logo and greeting */}
    
            <div className='text-white flex flex-col gap-20 items-center'>
              <p className='text-5xl'>proby</p>
              <div>
                <p className='font-semibold text-4xl tracking-wider  text-center '>Hey Buddy! </p>
                <p className='text-center pt-4 text-lg'>{loading ? "Processing..." : "Let's get started..." }</p>
              </div>
            </div>
    
             {/*form*/}
    
             <form onSubmit={handleSubmit} className=' text-base flex flex-col gap-12  w-[35vw]' >
    
            <div className='bg-zinc-900 flex flex-col rounded-md'>
              <input type="name"  className='text-zinc-400  outline-none bg-transparent py-4 px-6' placeholder="Name" value={user.name} onChange={(e)=>setUser({...user, name: e.target.value})}/>
              <hr className='border-b-1 border-zinc-800 mx-2'/>
              <input type="email"  className='text-zinc-400  outline-none bg-transparent py-4 px-6' placeholder="Email" value={user.email} onChange={(e)=>setUser({...user, email: e.target.value})}/>
            <hr className='border-b-1 border-zinc-800 mx-2'/>
              <input type="password" className='text-zinc-400   outline-none bg-transparent py-4 px-6' placeholder="Password" value={user.password} onChange={(e)=>setUser({...user, password: e.target.value})} />
            <hr className='border-b-1 border-zinc-800 mx-2'/>
              <input type="password" className='text-zinc-400   outline-none bg-transparent py-4 px-6' placeholder="Confirm Password" value={user.confirmPassword} onChange={(e)=>setUser({...user, confirmPassword: e.target.value})} />
              </div>
    
    
            <div className='text-center'>
              <button type="submit" className='bg-orange-400 text-black w-[10vw] rounded-full py-2 font-bold' disabled={disabledButton} >Sign Up</button>
        
            </div>
    
            <div className='w-[100%] flex justify-between px-8'>
              <p className='text-white'>Already have an account?</p>
              <Link href="/login" className='text-orange-400 '>Log In</Link>
            </div>
             </form>
    
    
          </div>
        </>
      )
    }




export default signupPage