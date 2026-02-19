import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Navbar,
  Nav
} from "react-bootstrap";
import { useNavigate , Outlet , NavLink } from "react-router-dom";

import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const [userInfo] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });



  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard-wrapper">

      {/* Top Navbar */}
      <Navbar bg="dark" variant="dark" className="px-4 sticky-top">
        <Navbar.Brand>📝 Blog Dashboard</Navbar.Brand>

        <Nav className="ms-auto align-items-center">
          <span className="text-white me-3">
            Hi, {userInfo?.name || "User"}
          </span>

          <Button size="sm" variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        </Nav>
      </Navbar>

      <div className="dashboard-body">

        {/* Sidebar */}
        <div className="sidebar">
          <h5 className="fw-bold mb-4">Menu</h5>

          <Nav className="flex-column gap-2">
            {/* <Nav Na Nav>All Posts</Nav.Link> */}
            <NavLink to='allpost'>all post</NavLink>
            <NavLink to='createpost' >Create Post</NavLink>
            <Nav.Link>Drafts</Nav.Link>
            <Nav.Link>Profile</Nav.Link>
            <Nav.Link>Settings</Nav.Link>
          </Nav>
        </div>

        {/* Main Content */}
        <div className="content">

          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold">Your Blog Posts</h3>

            <Button variant="primary">
              + New Post
            </Button>
          </div>

          {/* Blog Grid */}
          <div>
             <Outlet />
          </div>
           
        </div>
      </div>
    </div>
  );
}
