import { useState } from 'react';
import Navbar from './components/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './components/home/Home.jsx'
import Expences from './components/expences/Expences.jsx'
import Signin from './components/signin/Signin.jsx'
import Signup from './components/signup/Signup.jsx'
import { LoginProvider } from './components/context/LoginContext.js';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute.js';
import { Navigate } from 'react-router-dom';





function App() {
  const token=localStorage.getItem('token')
  const [user, setUser] = useState (token? true:false)
  
  // console.log(user)


  function Login() {
    setUser(true)
  }
  function Logout() {
    setUser(false)
  }


  return (



    <>
      <div>
        <LoginProvider value={{ user,Login, Logout }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contactus" element={<Home />} />
            <Route path="/expences" element={
              <ProtectedRoute user={user}>
                <Expences />
              </ProtectedRoute>} />
            <Route path="/signin" element={<Signin Login={Login} />} />
            <Route path="/signup" element={<Signup/>} />
          </Routes>
        </LoginProvider>
      </div>
    </>

  )

}

export default App


// export default protectedRoute;
