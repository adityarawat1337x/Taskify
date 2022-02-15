import {
  Input,
  Box,
  VStack,
  FormControl,
  FormLabel,
  Button,
  Spacer,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import styled from "styled-components"
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
      toast.success("Sign Up Success")
      navigate("/")
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, dispatch, navigate])

  return (
    <VStack h="100vh" align="center">
      <Spacer />
      <Main>Sign Up</Main>
      <VStack h="max-content" align="center" justify="center">
        <FormControl>
          <Form onSubmit={submitForm}>
            <FormLabel htmlFor="name">Full Name</FormLabel>
            <Input
              width="xs"
              variant="filled"
              type="text"
              id="name"
              name="name"
              value={name}
              placeholder="John"
              onChange={handleChange}
              mb="3"
            />
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              width="xs"
              variant="filled"
              type="text"
              id="email"
              name="email"
              value={email}
              placeholder="JohnDoe@gmail.com"
              onChange={handleChange}
              mb="3"
            />
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              width="xs"
              variant="filled"
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={handleChange}
              mb="3"
            />
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <Input
              width="xs"
              variant="filled"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={handleChange}
              mb="3"
            />
            <Spacer />
            <Button
              isLoading={isLoading === true}
              loadingText="Signing Up"
              mt={5}
              width="100%"
              colorScheme="blue"
              type="submit"
            >
              Sign Up
            </Button>
          </Form>
        </FormControl>
      </VStack>
      <Spacer />
    </VStack>
  )
}
const Main = styled(Box)`
  font-size: 1.6rem;
  font-weight: bold;
`
const Form = styled.form`
  font-size: 1.6rem;
  font-weight: bold;
`

export default Register
