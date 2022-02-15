import React, { useState, useEffect } from "react"
import { FaUser } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { reset, login } from "../features/auth/authSlice"

const Login = () => {
  const [form, setform] = useState({
    emai: "",
    password: "",
  })

  const { email, password } = form

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  const handleChange = (e) => {
    setform((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const submitForm = (e) => {
    e.preventDefault()
    dispatch(login(form))
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      toast.success("Login Successful")
      navigate("/")
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, dispatch, navigate])

  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <div className="container">
      <section>
        <h1>
          <FaUser />
          Login
        </h1>
      </section>
      <section>
        <form onSubmit={submitForm} className="form">
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            placeholder="JohnDoe@gmail.com"
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleChange}
          />

          <button type="submit">Login</button>
        </form>
      </section>
    </div>
  )
}

export default Login
