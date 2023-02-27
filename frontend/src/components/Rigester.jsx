import React, { useState } from 'react'
import { Form, Button } from "react-bootstrap"
import axios from 'axios'

const Rigester = () => {
  const [register, setRegister] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    adhar_no: '',
    role:"",
  })

  const handleInput = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value })
  }

  const postData = async (e) => {
    e.preventDefault()
    const config = {
      "Content-Type": 'application/json'
    }
    const api = await axios.post("http://localhost:3050/api/register", register, config)
    console.log(api, 'api response')
  }

  return (
    <div>
      <Form className='container' style={{ width: "500px" }} onSubmit={postData}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Your Name" name='name' onChange={handleInput} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name='email' onChange={handleInput} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter Password" name='password' onChange={handleInput} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="Number" placeholder="Enter Your Phone number" name='phone' onChange={handleInput} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Adhar No</Form.Label>
          <Form.Control type="Number" placeholder=" Enter your Adhar No" name='adhar_no' onChange={handleInput} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Control type="text" placeholder="Enter your Role" name='role' onChange={handleInput} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

    </div>
  )
}

export default Rigester
