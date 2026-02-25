import { useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FiMenu, FiFileText, FiEdit, FiLogOut } from "react-icons/fi";
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
    { name: "All Posts", path: "allpost", icon: <FiFileText /> },
    { name: "Create Post", path: "createpost", icon: <FiEdit /> },
  ];

  const navbarStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
    padding: '1rem 0',
  };

  const sidebarStyle = {
    background: '#f8f9fa',
    borderRight: '1px solid #e0e0e0',
    minHeight: 'calc(100vh - 60px)',
    padding: '2rem 0',
    transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
    transition: 'transform 0.3s ease',
    position: 'fixed',
    left: 0,
    top: 60,
    width: '250px',
    zIndex: 999,
  };

  const contentStyle = {
    marginLeft: sidebarOpen ? '250px' : '0',
    padding: '2rem',
    transition: 'margin-left 0.3s ease',
    minHeight: 'calc(100vh - 60px)',
    background: '#ffffff',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff' }}>
      {/* Navbar */}
      <Navbar style={navbarStyle} fixed="top" className="w-100">
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', paddingLeft: '1rem', paddingRight: '1rem' }}>
          <Button 
            variant="light" 
            className="d-md-none me-3" 
            onClick={toggleSidebar}
            style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white' }}
          >
            <FiMenu size={24} />
          </Button>
          <h2 style={{ 
            color: 'white', 
            fontWeight: '800', 
            margin: 0,
            fontSize: '1.8rem',
            letterSpacing: '1px'
          }}>
            📝 247 Gist Dashboard
          </h2>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: 'white', fontWeight: '600' }}>
              Hi, {userInfo?.name || "Admin"}
            </span>
            <Button 
              size="sm" 
              onClick={handleLogout}
              style={{ 
                background: 'rgba(255,255,255,0.2)', 
                border: '1px solid rgba(255,255,255,0.4)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem'
              }}
            >
              <FiLogOut size={16} /> Logout
            </Button>
          </div>
        </div>
      </Navbar>

      <div style={{ display: 'flex', marginTop: '60px' }}>
        {/* Sidebar */}
        <aside style={sidebarStyle}>
          <div style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
            <h4 style={{ color: '#1a1a2e', fontWeight: '800', marginBottom: '2rem' }}>Menu</h4>
            <Nav className="flex-column" style={{ gap: '0.5rem' }}>
              {menuItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: isActive ? 'white' : '#333',
                    background: isActive ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                    fontWeight: isActive ? '600' : '500',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  })}
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      setSidebarOpen(false);
                    }
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                  {item.name}
                </NavLink>
              ))}
            </Nav>
          </div>
        </aside>

        {/* Main Content */}
        <main style={contentStyle}>
          <Outlet context={{ userInfo }} />
        </main>
      </div>
    </div>
  );
}

