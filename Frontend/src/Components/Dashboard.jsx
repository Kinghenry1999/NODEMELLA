// import { useState } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Button,
//   Navbar,
//   Nav
// } from "react-bootstrap";
// import { useNavigate , Outlet , NavLink } from "react-router-dom";

// import "./Dashboard.css";

// export default function Dashboard() {
//   const navigate = useNavigate();

//   const [userInfo] = useState(() => {
//     const stored = localStorage.getItem("user");
//     return stored ? JSON.parse(stored) : null;
//   });



//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <div className="dashboard-wrapper">

//       {/* Top Navbar */}
//       <Navbar bg="dark" variant="dark" className="px-4 sticky-top">
//         <Navbar.Brand>📝 Blog Dashboard</Navbar.Brand>

//         <Nav className="ms-auto align-items-center">
//           <span className="text-white me-3">
//             Hi, {userInfo?.name || "User"}
//           </span>

//           <Button size="sm" variant="outline-light" onClick={handleLogout}>
//             Logout
//           </Button>
//         </Nav>
//       </Navbar>

//       <div className="dashboard-body">

//         {/* Sidebar */}
//         <div className="sidebar">
//           <h5 className="fw-bold mb-4">Menu</h5>

//           <Nav className="flex-column gap-2">
//             {/* <Nav Na Nav>All Posts</Nav.Link> */}
//             <NavLink to='allpost'>all post</NavLink>
//             <NavLink to='createpost' >Create Post</NavLink>
//             <Nav.Link>Drafts</Nav.Link>
//             <Nav.Link>Profile</Nav.Link>
//             <Nav.Link>Settings</Nav.Link>
//           </Nav>
//         </div>

//         {/* Main Content */}
//         <div className="content">

//           {/* Header */}
//           <div className="d-flex justify-content-between align-items-center mb-4">
//             <h3 className="fw-bold">Your Blog Posts</h3>

//             <Button variant="primary">
//               + New Post
//             </Button>
//           </div>

//           {/* Blog Grid */}
//           <div>
//              <Outlet />
//           </div>
           
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { Navbar, Nav, Button, Dropdown } from "react-bootstrap";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FiMenu, FiHome, FiEdit, FiFileText, FiUser, FiSettings } from "react-icons/fi";

import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const [userInfo] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const menuItems = [
    { name: "Dashboard", path: "allpost", icon: <FiHome /> },
    { name: "Create Post", path: "createpost", icon: <FiEdit /> },
    { name: "Drafts", path: "drafts", icon: <FiFileText /> },
    { name: "Profile", path: "profile", icon: <FiUser /> },
    { name: "Settings", path: "settings", icon: <FiSettings /> },
  ];

  return (
    <div className="dashboard-wrapper">

      {/* Top Navbar */}
      <Navbar className="dashboard-navbar px-4 shadow-sm">
        <div className="navbar-left">
          <Button variant="light" className="d-md-none me-2" onClick={toggleSidebar}>
            <FiMenu />
          </Button>
          <Navbar.Brand className="fw-bold text-primary">📝 Blog Dashboard</Navbar.Brand>
        </div>

        <div className="navbar-right d-flex align-items-center gap-3">
          <span className="d-none d-md-inline">Hi, {userInfo?.name || "User"}</span>

          <Dropdown align="end">
            <Dropdown.Toggle variant="outline-primary" id="dropdown-user">
              Profile
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => navigate("/profile")}>Profile</Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/settings")}>Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Navbar>

      <div className="dashboard-body">

        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="sidebar-header mb-4">
            <h4 className="text-primary fw-bold">Menu</h4>
          </div>

          <Nav className="flex-column gap-2">
            {menuItems.map((item) => (
              <NavLink
                to={item.path}
                key={item.name}
                className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}
              >
                <span className="icon">{item.icon}</span> {item.name}
              </NavLink>
            ))}
          </Nav>
        </aside>

        {/* Main Content */}
        <main className="content">
          {/* Header */}
          <div className="content-header d-flex justify-content-between align-items-center mb-4">
            <h3>Your Blog Posts</h3>
            <Button className="btn-gradient">+ New Post</Button>
          </div>

          {/* Blog Grid */}
          <div className="blog-grid">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}

