import React,{useState} from 'react'

function ForgottenPassword() {
    const [email,setEmail]=useState('')

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response=await axios.post('/api/password/forgotpassword',{email})
        console.log(response)

    }
    return (
        <div className='max-h-full bg-blue-300'>
            <div className='h-screen flex flex-col items-center justify-center'>
                <div className='  rounded-md p-8  shadow-xl'>
                    <form onSubmit={handleSubmit}>
                        <div className=''>
                            <h1 className='font-bold font-serif text-center text-3xl'>Expence Tracker</h1>
                        </div>
                        <div className='text-2xl m-4'>
                            <label htmlFor='email'>Enter Your Email:</label><br></br>
                            <input onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='Enter Your Email' id='email' className='rounded-md' required />
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

export default ForgottenPassword
