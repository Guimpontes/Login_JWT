import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, } from 'react-router-dom';
import { RxEnter } from 'react-icons/rx';
import {
  AiFillEye,
  AiFillEyeInvisible
} from 'react-icons/ai';
import { Context } from '../../components/context/context';


export default function Login() {
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({});
  const [logged, setLogged] = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (logged) {
      navigate("/user-details", { replace: true });
      console.log(logged)
    }
  }, [])

  function updateUser(e) {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }))
  }

  function loginUser(e) {
    e.preventDefault(e)

    const options = {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(user)
    }

    fetch(`${process.env.REACT_APP_API_URL}/login`, options)
      .then((res) => res.json())
      .then((data) => {

        if (data.msg) {
          alert(data.msg);
          setLogged(true);
          navigate("/user-details", { replace: true })
          localStorage.setItem("token", data.token);
          localStorage.setItem("logged", true);
        } else {
          alert(data.error)
        }
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


  // Future implementation
  function onChecked() {
    if (checked) {
      setChecked(false)
    } else {
      setChecked(true)
    }
  }

  return (
    <div className="container">
      <form className="login-form" onSubmit={loginUser}>
        <h2 className="form-title">LOGIN</h2>

        <div className="email-field fields">
          <label htmlFor="email_input">E-mail</label>
          <input type="email" name="email" id="email_input" onChange={(e) => updateUser(e)} />
        </div>

        <div className="password-field fields">
          <label htmlFor="password_input">Password</label>
          <input type={showPassword ? "text" : "password"} name="password" id="password_input" onChange={(e) => updateUser(e)} />
          <button type="button" onClick={onShowPassword} id="btn-showAndHidePassword"><PasswordIcon /></button>
        </div>

        <div className="forgot-password">
          <a href="#">Forgot password?</a>
        </div>

        <div className="remember-password-field">
          <input type="checkbox" id="input_remember" />
          <label htmlFor="input_remember">Remember</label>
        </div>

        <button type="submit" id="btn-send"><RxEnter />LOGIN</button>
      </form>

      <h3 className="page-signup-link">Not registered? <Link to="/sign-up">Sign up</Link></h3>
    </div>
  )
}
