import React, { useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  return (
    <div className='main-auth'>
      <Register />
      <Login />
    </div>
  )
}


const Register = ()=>{

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post("http://localhost:3001/auth/register",{
        username : username , 
        password : password
      })

      alert("Registration is Successful! Now Login.")
      
    } catch (error) {
      console.error(error)
    }
  }

  return(
    <div className="auth-card">
      <form onSubmit={onSubmit}>
        <h2>Sign Up</h2>
        <label htmlFor="username">Username</label><br />
        <input type="text" id="username" name="username" value={username} onChange={(event)=>setUsername(event.target.value)}/><br/>
        <label htmlFor="password">Password</label><br />
        <input type="password" id="password" name="password" value={password} onChange={(event)=>setPassword(event.target.value)}/><br/>
        <button type='submit' className='btn'>Register</button>
      </form>
    </div>
  )
}

const Login = ()=>{

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")

  const navigate = useNavigate()

  const [_,setCookies] = useCookies(["access_token"]) //access_name is access_token

  const onSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post("http://localhost:3001/auth/login",{
      username:username,
      password:password
    })

    //storing cookie that is brought by backend and stored in response
    setCookies("access_token",response.data.token)
    //for faster access of the userid that is got from backend store in local strage with name -> userID
    window.localStorage.setItem("userID",response.data.userID)

    navigate("/") //go to home page if login is successful
  }
  
  return(
    <div className="auth-card">
      <form onSubmit={onSubmit}>
        <h2>Log In</h2>
        <label htmlFor="username">Username</label><br />
        <input type="text" id="username" name="username" value={username} onChange={(e)=>setUsername(e.target.value)}/><br/>
        <label htmlFor="password">Password</label><br />
        <input type="password" id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/><br/>
        <button type='submit' className='btn'>Login</button>
      </form>
    </div>
  )
}


export default Auth
