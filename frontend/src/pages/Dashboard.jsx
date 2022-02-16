import { Center, Heading } from "@chakra-ui/react"
import { React, useEffect } from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import AnimatedRouteWrapper from "../providers/AnimatedRouteWrapper"

const Dashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, isLoading } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user && !isLoading && location.pathname === "/") {
      toast.error("You must be logged in to view this page")
      navigate("/login")
    }
  }, [user, isLoading, location, navigate])

  return (
    <AnimatedRouteWrapper>
      <Center h="100vh">
        <Heading>Dashboard</Heading>
      </Center>
    </AnimatedRouteWrapper>
  )
}

export default Dashboard
