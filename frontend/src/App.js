import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ChakraProvider } from "@chakra-ui/react"
import BackGroundProvider from "./components/BackGroundProvider"

function App() {
  return (
    <>
      <ChakraProvider>
        <Router>
          <Header />
          <BackGroundProvider>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </BackGroundProvider>
        </Router>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </ChakraProvider>
    </>
  )
}

export default App
