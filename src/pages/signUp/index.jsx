import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AiFillEye,
  AiFillEyeInvisible
} from 'react-icons/ai';


export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({});

  function updateUser(e) {
    const { name, value } = e.target
    setUser((prevState) => ({ ...prevState, [name]: value }))
  }

  function createUser(e) {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(user)
    }

    fetch(`${process.env.REACT_APP_API_URL}/sign-up`, options)
      .then((res) => res.json())
      .then((data) => {

        if (data.msg) {
          alert(data.msg);
          setUser({})
        } else {
          alert(data.error)
        }

      }).catch((error) => {
        console.log(error);
      })
  }

  function onShowPassword() {
    if (showPassword) {
      setShowPassword(false)
    } else {
      setShowPassword(true)
    }
  }

  function PasswordIcon() {
    if (showPassword) {
      return <AiFillEye />
    } else {
      return <AiFillEyeInvisible />
    }
  }

  return (
    <div className="container">
      <form className="sign-form" onSubmit={createUser}>
        <h2 className="form-title">SIGN UP</h2>

        <div className="name-field fields">
          <label htmlFor="name_input">Name</label>
          <input type="text" name="name" id="name_input" onChange={(e) => { updateUser(e) }} value={user.name ? user.name : ""} />
        </div>

        <div className="email-field fields">
          <label htmlFor="email_input">E-mail</label>
          <input type="email" name="email" id="email_input" onChange={(e) => { updateUser(e) }} value={user.email ? user.email : ""} />
        </div>

        <div className="password-field fields">
          <label htmlFor="password_input">Password</label>
          <input type={showPassword ? "text" : "password"} name="password" id="password_input" onChange={(e) => { updateUser(e) }} value={user.password ? user.password : ""} />
          <button type="button" onClick={onShowPassword} id="btn-showAndHidePassword"><PasswordIcon /></button>
        </div>

        <div className="confirm-password-field fields">
          <label htmlFor="confirm_password_input">Confirm password</label>
          <input type={showPassword ? "text" : "password"} name="confirm_password" id="confirm_password_input" onChange={(e) => { updateUser(e) }} value={user.confirm_password ? user.confirm_password : ""} disabled={user.password || user.confirm_password ? false : true} />
        </div>

        <button type="submit" id="btn-send">SING UP</button>
      </form>

      <h3 className="page-signup-link">Already have an account? <Link to="/">Login Now </Link></h3>
    </div>
  )
}
