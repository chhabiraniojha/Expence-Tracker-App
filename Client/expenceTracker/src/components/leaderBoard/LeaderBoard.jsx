import React, { useEffect, useState } from 'react'
import { useLogin } from '../context/userContext';

function LeaderBoard() {
    const {user}=useLogin();
    const [leaderBoard,setLeaderBoard]=useState([])

    useEffect(()=>{
      const token=localStorage.getItem('token')
      axios.get('/api/leaderboard',{headers:{Authorization:token}})
      .then(res=>{
        if(res.status==200){
          setLeaderBoard(res.data.data)
        }
      })
    })

  return (
    <div>
    {user.isPremium?
      <div>
    <h1>Leader Board</h1>
      <ul>
      {leaderBoard.map((leader)=>(
        <li>{leader.name}-{leader.totalExpence==null?0:leader.totalExpence}</li>
      ))}

      </ul>
      </div> :<div>You are not a premium user</div>
    }
     
    </div>
  )
}

export default LeaderBoard
