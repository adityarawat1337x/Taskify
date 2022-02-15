import React, { useEffect, useState } from "react"
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"

const Login = () => {
  const [form, setform] = useState({
    emai: "",
    password: "",
  })

  const handleChange = (e) => {
    setform((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const submitForm = (e) => {
    e.preventDefault()
  }

  const { email, password } = form
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
