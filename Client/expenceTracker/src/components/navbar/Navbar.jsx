import React, { useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../context/userContext';

function Navbar() {
  const { user, setUser, Logout } = useLogin()
  console.log(user.isPremium)
  const navigate = useNavigate();
  // console.log(user.isLoggedIn)


  const handlePurchase = async () => {
    const token = localStorage.getItem('token')
    const response = await axios.get('/api/purchase/premiummembership', { headers: { Authorization: token } })
    const options = {
      key: response.data.key_id,
      order_id: response.data.order.id,
      handler: async (response) => {
        await axios.post('/api/purchase/updatetransactionstatus',
          {
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            status: true
          }, { headers: { Authorization: token } })

        alert('you are a premium user')
        console.log(user)
        await setUser(prev => (
          { ...prev, isPremium: !user.isPremium }
        ))
        console.log(user)
      }
    }
    const rzp = new Razorpay(options)
    rzp.open()

    rzp.on('payment.failed', async (response) => {
      await axios.post('/api/purchase/updatetransactionstatus',
        {
          payment_id: response.error.metadata.payment_id,
          order_id: response.error.metadata.order_id,
          status: false
        }, { headers: { Authorization: token } })

      alert('payment failed')
    })

  }
 

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
            <li className='font-serif text-md text-blue-500 font-bold cursor-pointer px-1 hover:text-red-500 underline md:px-4'>
              <Link to='/leaderboard'>
                LeaderBoard
              </Link>
            </li>
          </ul>
        </div>
        <div>
          {!user.isLoggedIn ?
            <div>

              <button className='bg-blue-300 px-4 mx-2 py-1 rounded-md font-bold'>
                <Link to='/signin'>
                  Login
                </Link>

              </button>
            </div>
            :
            <div>
              <h4>hello {user.name}</h4>
              {!user.isPremium ?
                <button onClick={handlePurchase} className='bg-blue-300 px-4 mx-2 py-1 rounded-md font-bold'>
                  <Link to='#'>
                    Buy Premium
                  </Link>

                </button> :
                <button className='bg-blue-300 px-4 mx-2 py-1 rounded-md font-bold'>Premium User</button>
              }

              <button onClick={() => {
                Logout()
                localStorage.removeItem('token')
                navigate('/')
              }} className='bg-blue-300 px-4 mx-2 py-1 rounded-md font-bold'>Logout</button>
            </div>

          }
        </div>
      </div>
    </div>
  )
}

export default Navbar