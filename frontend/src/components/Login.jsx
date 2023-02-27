import React, { useState } from 'react'
import { Form, Button } from "react-bootstrap"
import axios from 'axios'
import { ErrorNotification, SuccessNotification, WarningNotification } from './notification/Notification';
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  let [login, setLogin] = useState({
    email: "",
    password: "",
  })

  const handleInput = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value })
  }
  const postData = async (e) => {
    e.preventDefault()
    const config = {
      "Content-Type": 'application/json'
    }
    const api = await axios.post("http://localhost:3050/api/login", login, config)
    console.log(api.data.token)
    console.log(api.data)
    if (api.data.status == 200) {
      localStorage.setItem("token", api.data.token)
      console.log("user type", api.data.users.role)
      localStorage.setItem("role", api.data.users.role)
      navigate(`/home`)
    }
    if (api.data.status == 400) {
      ErrorNotification(api.data.response)
    } console.log(api.data.token, 'api response')

  }
  return (

    <div>

      <Form className="container" style={{ width: "500px" }} onSubmit={postData}>
        <Form.Group className="mb-3" >
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name='email' onChange={handleInput} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" onChange={handleInput} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

    </div>
  )
}

export default Login
