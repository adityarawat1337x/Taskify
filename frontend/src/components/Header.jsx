import React from "react"
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { logout, reset } from "../features/auth/authSlice"

const Header = () => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <header>
      <ul className="header">
        <li>
          <Link to="/">Task Setter</Link>
        </li>
        {user ? (
          <li>
            <button
              onClick={() => {
                dispatch(reset())
                dispatch(logout()).then(() => {
                  toast.warn("Logout Successful")
                  navigate("/")
                })
              }}
            >
              <FaSignOutAlt />
              logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt />
                Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser />
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header
