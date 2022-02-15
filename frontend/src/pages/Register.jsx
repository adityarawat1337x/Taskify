import React, { useEffect, useState } from "react"
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
const Register = () => {
  const [form, setform] = useState({
    name: "",
    emai: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e) => {
    setform((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const submitForm = (e) => {
    e.preventDefault()
  }

  const { name, email, password, confirmPassword } = form
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
