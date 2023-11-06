import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../context/LoginContext';

function Navbar() {
  const {user,Logout}=useLogin()
  const navigate=useNavigate();
  return (
    <div>
      <div className='bg-yellow-400 w-full h-14 justify-between flex px-4 md:px-8
       pt-4'>
        <div className='font-bold text-md'>
          Expence Tracker
        </div>
        <div>
          <ul className='flex '>

            <li className='font-serif text-md text-blue-500 font-bold cursor-pointer px-1 hover:text-red-500 underline md:px-4'>
              <Link to='/'>
                Home
              </Link>
            </li>
            <li className='font-serif text-md text-blue-500 font-bold cursor-pointer px-1 hover:text-red-500 underline md:px-4'>
              <Link to='/'>
                Contact Us
              </Link>
            </li>
            <li className='font-serif text-md text-blue-500 font-bold cursor-pointer px-1 hover:text-red-500 underline md:px-4'>
              <Link to='/expences'>
                Expence
              </Link>
            </li>
          </ul>
        </div>
        <div>
          {!user ?
            <button className='bg-blue-300 px-4 mx-2 py-1 rounded-md font-bold'>
              <Link to='/signin'>
                Login
              </Link>

            </button> :
            <button onClick={()=>
            {
              Logout()
              navigate('/')
            }} className='bg-blue-300 px-4 mx-2 py-1 rounded-md font-bold'>Logout</button>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar
