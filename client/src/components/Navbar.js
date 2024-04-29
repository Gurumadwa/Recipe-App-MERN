import React from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const [cookies,setCookies] = useCookies(["access_token"])
    const navigate = useNavigate()

    const handleLogout = () => {

        setCookies("access_token","") //empty the cookies
        window.localStorage.removeItem("userID");

        navigate("/auth")
    }

  return (
    <div className='nav-items'>
        <Link to="/" className='link'>Home</Link>
        <Link to="/createrecipe" className='link'>Create Recipe</Link>
        <Link to="/savedrecipe" className='link'>Saved Recipe</Link>

        {/* we want to show log out button if the cookie is present cookie variable that we set when login
        we will check if cookie is present then we will display log out button  */}

        {!cookies.access_token ? (
            <Link to="/auth" className='link'>Login/Register</Link>
        ) : (
            <button className='btn' onClick={handleLogout}>Logout</button>
        )}

    </div>
  )
}

export default Navbar