import { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../Utility/Api";

export default function ResetPassword() {
  const [form, setForm] = useState({ email: "", newPassword: "", confirmPassword: "" });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (form.newPassword !== form.confirmPassword) {
      setMessage({
        text: "❌ Passwords do not match!",
        type: "danger",
      });
      return;
    }

    // Validate password length
    if (form.newPassword.length < 6) {
      setMessage({
        text: "❌ Password must be at least 6 characters long!",
        type: "danger",
      });
      return;
    }

    setIsLoading(true);
    try {
      const res = await api.post("/api/auth/reset-password", {
        email: form.email,
        newPassword: form.newPassword,
      });
      setMessage({ text: res.data.message, type: "success" });
      setForm({ email: "", newPassword: "", confirmPassword: "" });
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "400px" }} className="p-4 shadow">
        <h2 className="text-center mb-4">Reset Password</h2>

        {message.text && <Alert variant={message.type}>{message.text}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Form.Text className="text-muted">
              Enter the email associated with your account
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password (min 6 characters)"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm new password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit" 
            className="w-100 mb-3"
            disabled={isLoading}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </Form>

        <p className="text-center text-muted">
          Remember your password?{" "}
          <a href="/login" className="text-primary">
            Login
          </a>
        </p>
      </Card>
    </Container>
  );
}
