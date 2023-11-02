import React, { useState } from 'react'

function Signup() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

 const handleSubmit=async (e)=>{
  e.preventDefault();
  await axios.post('/api/users/signup',{
    name:name,
    email:email,
    password:password
  })
  setName("");
  setEmail("");
  setPassword("");
  alert("registered successfully")
  
 }

  return (
    <div  className='max-h-full bg-blue-300'>
      <div className='h-screen flex items-center justify-center'>
        <div className='  rounded-md p-8  shadow-xl'>
        <form onSubmit={handleSubmit}>
        <div className=''>
        <h1 className='font-medium font-serif text-center text-3xl'>Sign Up</h1>
        </div>
            <div className='text-2xl m-4'>
                <label  className='text' htmlFor='name'>Enter Your Name:</label><br></br>
                <input  onChange={(e)=>setName(e.target.value)}  type='text' placeholder='Enter Your Name' id='name' value={name} className='rounded-md' required/>
            </div>
            <div className='text-2xl m-4'>
                <label htmlFor='email'>Enter Your Email:</label><br></br>
                <input onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='Enter Your Email' id='email' value={email} className='rounded-md' required/>
            </div>
            <div className='text-2xl m-4'>
                <label htmlFor='password'>Enter Your Password:</label><br></br>
                <input onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='Enter Your Password' id='password' 
                value={password} className='rounded-md' required />
            </div>
            <div className='text-2xl text-center'>
              <button type="submit" className=' bg-sky-800 p-1 px-5 rounded-lg text-white '>Submit</button>
            </div>
        </form>    
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default Signup;
