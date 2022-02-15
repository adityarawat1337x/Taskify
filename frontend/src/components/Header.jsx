import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { logout, reset } from "../features/auth/authSlice"
import {
  Flex,
  Spacer,
  Box,
  useColorMode,
  Button,
  HStack,
} from "@chakra-ui/react"
import { IconButton } from "@chakra-ui/button"
import { BsMoonFill } from "react-icons/bs"
import { FaSun } from "react-icons/fa"
import styled from "styled-components"

const Header = () => {
  const { user } = useSelector((state) => state.auth)
  const { colorMode, toggleColorMode } = useColorMode()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <Navbar
      pl="20"
      pr="20"
      mt="10"
      position="absolute"
      top="0"
      left="0"
      w="100%"
      align="center"
    >
      <Main>
        <Link to="/">Tasks</Link>
      </Main>
      <Spacer />
      <Sub spacing="2">
        {user ? (
          <Button variant="ghost">
            <button
              onClick={() => {
                dispatch(reset())
                dispatch(logout()).then(() => {
                  toast.success("Signed Out", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  })
                  navigate("/")
                })
              }}
            >
              logout
            </button>
          </Button>
        ) : (
          <>
            <Button variant="ghost">
              <Link to="/register">SignUp</Link>
            </Button>
            <Button variant="ghost">
              <Link to="/login">Login</Link>
            </Button>
          </>
        )}
        <Spacer />
        <IconButton
          aria-label="aria-label"
          icon={colorMode === "dark" ? <FaSun /> : <BsMoonFill />}
          onClick={toggleColorMode}
          isRound={true}
          size="sm"
        ></IconButton>
      </Sub>
    </Navbar>
  )
}

const Navbar = styled(Flex)`
  font-size: 1.2rem;
`
const Main = styled(Box)`
  font-size: 1.5rem;
`
const Sub = styled(HStack)``
export default Header
