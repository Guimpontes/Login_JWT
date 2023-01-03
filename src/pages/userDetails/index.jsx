import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../../components/context/context';

export default function UserDetails() {
  const [user, setUser] = useState({});
  const [logged, setLogged] = useContext(Context)

  const navigate = useNavigate()


  // Logout user
  function logoutUser() {
    localStorage.removeItem("token");
    localStorage.setItem("logged", false);
    setLogged(false)
    navigate("/", { replace: true })
  }

  // Load user datas
  useEffect(() => {
    const options = {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({ token: localStorage.getItem("token") })
    }

    fetch(`${process.env.REACT_APP_API_URL}/user-Detail`, options)
      .then((res) => res.json())
      .then((data) => {

        if (data.error) {
          localStorage.setItem("logged", false);
          setLogged(false)
          navigate("/", { replace: true })
        }

        setUser(data)
      })
  }, [])

  return (
    <div className="container">
      <div className="user-datails">
        <h2>Name: <span>{user.name}</span> </h2>
        <h2>Email: <span>{user.email}</span> </h2>
      </div>
      <button onClick={logoutUser} id="btn-logout">LOGOUT</button>
    </div>
  )
}
