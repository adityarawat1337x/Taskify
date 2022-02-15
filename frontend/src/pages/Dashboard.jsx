import { Center, Heading } from "@chakra-ui/react"
import { React, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Dashboard = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) {
      toast.error("You must be logged in to view this page")
      navigate("/login")
    }
  }, [user, navigate])

  return (
    <Center h="100vh">
      <Heading>Dashboard</Heading>
    </Center>
  )
}

export default Dashboard
