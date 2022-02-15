import React, { useEffect, useState } from "react"
import { FaUser } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { register, reset } from "../features/auth/authSlice"

const Register = () => {
  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const { name, email, password, confirmPassword } = form

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  )
  if (user) console.log(user)

  const handleChange = (e) => {
    setform((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const submitForm = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
    } else {
      dispatch(register(form))
    }
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      toast.success("Register Successful")
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
          Register
        </h1>
      </section>
      <section>
        <form onSubmit={submitForm} className="form">
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder="John"
            onChange={handleChange}
          />
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
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </form>
      </section>
    </div>
  )
}

export default Register
