import { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../Utility/Api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      setMessage({ text: res.data.message, type: "success" });
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      const errorData = err.response?.data;
      let errorMessage = "Unknown error occurred";
      
      if (errorData?.errors && Array.isArray(errorData.errors)) {
        // Handle validation errors
        errorMessage = errorData.errors.map(e => e.msg).join(", ");
      } else if (errorData?.error) {
        errorMessage = errorData.error;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setMessage({
        text: "❌ Error: " + errorMessage,
        type: "danger",
      });
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "400px" }} className="p-4 shadow">
        <h2 className="text-center mb-4">Register</h2>

        {message.text && <Alert variant={message.type}>{message.text}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mb-3">
            Register
          </Button>
        </Form>

        <p className="text-center text-muted">
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Login
          </Link>
        </p>
      </Card>
    </Container>
  );
}
