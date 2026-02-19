import { useState } from "react";
import { Container, Card, Form, Button, Alert, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../Utility/Api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/login", {
        email: form.email,
        password: form.password,
      });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMessage({ text: "✅ Login successful! Redirecting...", type: "success" });
      setForm({ email: "", password: "" });
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
    } catch (err) {
      setMessage({
        text: "❌ Error: " + (err.response?.data?.error || err.message),
        type: "danger",
      });
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.post("/api/auth/forgot-password", {
        email: forgotEmail,
      });
      setForgotMessage({ text: res.data.message, type: "success" });
      setForgotEmail("");
      setTimeout(() => {
        setShowForgotPassword(false);
        setForgotMessage({ text: "", type: "" });
      }, 3000);
    } catch (err) {
      setForgotMessage({
        text: "❌ Error: " + (err.response?.data?.error || err.message),
        type: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "400px" }} className="p-4 shadow">
        <h2 className="text-center mb-4">Login</h2>

        {message.text && <Alert variant={message.type}>{message.text}</Alert>}

        <Form onSubmit={handleSubmit}>
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
            Login
          </Button>
        </Form>

        <div className="d-grid gap-2">
          <Button 
            variant="link" 
            onClick={() => setShowForgotPassword(true)} 
            className="text-danger mb-3"
          >
            Forgot Password?
          </Button>
        </div>

        <p className="text-center text-muted">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary">
            Register
          </Link>
        </p>
      </Card>

      {/* Forgot Password Modal */}
      <Modal show={showForgotPassword} onHide={() => setShowForgotPassword(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {forgotMessage.text && (
            <Alert variant={forgotMessage.type}>{forgotMessage.text}</Alert>
          )}
          <Form onSubmit={handleForgotPassword}>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
              />
            </Form.Group>
            <p className="text-muted small">
              We'll send you an email with instructions to reset your password.
            </p>
            <Button 
              variant="primary" 
              type="submit" 
              className="w-100"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
