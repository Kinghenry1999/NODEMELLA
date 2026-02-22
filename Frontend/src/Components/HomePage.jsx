import { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFeather, FaUsers, FaFire, FaArrowRight } from 'react-icons/fa';
import api from '../Utility/Api.jsx';

const HomePage = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/posts');
      if (response.data.success) {
        setPosts(response.data.posts);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts. Please try again later.');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const navbarStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
    padding: '1rem 0',
  };

  const brandStyle = {
    fontSize: '1.8rem',
    fontWeight: '800',
    letterSpacing: '1px',
    background: 'linear-gradient(45deg, #ffffff, #f0f0f0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textDecoration: 'none',
  };

  const heroContainerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    color: 'white',
    padding: '2rem 0',
  };

  const heroContentStyle = {
    textAlign: 'center',
  };

  const mainHeadingStyle = {
    fontSize: '3.5rem',
    fontWeight: '900',
    marginBottom: '1rem',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
    letterSpacing: '-1px',
  };

  const subHeadingStyle = {
    fontSize: '1.3rem',
    marginBottom: '2rem',
    opacity: 0.95,
    fontWeight: '300',
    maxWidth: '500px',
    margin: '0 auto 2rem',
  };

  const ctaButtonStyle = {
    padding: '12px 32px',
    fontSize: '1.1rem',
    fontWeight: '600',
    borderRadius: '50px',
    marginRight: '1rem',
    marginBottom: '1rem',
    border: 'none',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  };

  const primaryButtonStyle = {
    ...ctaButtonStyle,
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: 'white',
  };

  const secondaryButtonStyle = {
    ...ctaButtonStyle,
    background: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
  };

  const featureSection = {
    padding: '4rem 0',
    background: '#f8f9ff',
  };

  const featureCardStyle = {
    border: 'none',
    borderRadius: '15px',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
    padding: '2rem',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    height: '100%',
  };

  const featureCardHover = {
    ...featureCardStyle,
    boxShadow: '0 15px 40px rgba(102, 126, 234, 0.2)',
    transform: 'translateY(-5px)',
  };

  const iconStyle = {
    fontSize: '2.5rem',
    color: '#667eea',
    marginBottom: '1rem',
  };

  const ctaSection = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '3rem 0',
    color: 'white',
    textAlign: 'center',
    borderRadius: '20px',
    marginTop: '2rem',
  };

  const footerStyle = {
    background: '#1a1a2e',
    color: '#aaa',
    padding: '2rem 0',
    marginTop: '4rem',
    textAlign: 'center',
    fontSize: '0.95rem',
  };

  const features = [
    {
      icon: <FaFeather style={iconStyle} />,
      title: 'Write Your Story',
      description: 'Share your thoughts, ideas, and expertise with our vibrant community of writers and readers.',
    },
    {
      icon: <FaUsers style={iconStyle} />,
      title: 'Connect & Engage',
      description: 'Build meaningful connections with fellow bloggers and grow your audience organically.',
    },
    {
      icon: <FaFire style={iconStyle} />,
      title: 'Go Viral',
      description: 'Discover trending posts and get featured on our homepage to reach thousands of readers.',
    },
  ];

  return (
    <>
      {/* Navbar */}
      <Navbar
        expand="lg"
        sticky="top"
        style={navbarStyle}
        onToggle={() => setIsNavExpanded(!isNavExpanded)}
      >
        <Container>
          <Navbar.Brand as={Link} to="/" style={brandStyle}>
            247 GIST
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link
                as={Link}
                to="/login"
                style={{ color: 'white', fontWeight: '600', marginRight: '0.5rem' }}
              >
                Login
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/register"
                style={{ color: 'white', fontWeight: '600' }}
              >
                Sign Up
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <div style={heroContainerStyle}>
        <Container>
          <Row style={heroContentStyle}>
            <Col lg={8} className="mx-auto">
              <h1 style={mainHeadingStyle}>247 GIST</h1>
              <p style={subHeadingStyle}>
                Your ultimate blogging platform to share stories, connect with readers, and inspire the world with your words.
              </p>
              <div style={{ marginTop: '2rem' }}>
                <Link to="/register">
                  <button
                    style={primaryButtonStyle}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 10px 25px rgba(245, 87, 108, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    Get Started <FaArrowRight style={{ marginLeft: '0.5rem' }} />
                  </button>
                </Link>
                <Link to="/login">
                  <button
                    style={secondaryButtonStyle}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                    }}
                  >
                    Login Now
                  </button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <div style={featureSection}>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1a1a2e', marginBottom: '0.5rem' }}>
              Why Choose 247 Gist?
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
              Everything you need to become a successful blogger and reach millions of readers.
            </p>
          </div>
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col lg={4} md={6} key={index}>
                <Card
                  style={featureCardStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Card.Body>
                    {feature.icon}
                    <Card.Title style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1a1a2e', marginBottom: '1rem' }}>
                      {feature.title}
                    </Card.Title>
                    <Card.Text style={{ color: '#666', lineHeight: '1.6' }}>
                      {feature.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Posts Section */}
      <div style={{ padding: '4rem 0', background: 'white' }}>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1a1a2e', marginBottom: '0.5rem' }}>
              Latest Posts
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
              Discover stories from our community of writers and bloggers.
            </p>
          </div>

          {loading && (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <Spinner animation="border" variant="primary" />
              <p style={{ marginTop: '1rem', color: '#666' }}>Loading posts...</p>
            </div>
          )}

          {error && (
            <Alert variant="warning" style={{ marginBottom: '2rem' }}>
              {error}
            </Alert>
          )}

          {!loading && posts.length === 0 && (
            <Alert variant="info" style={{ textAlign: 'center' }}>
              No posts yet. Check back soon for amazing stories!
            </Alert>
          )}

          {!loading && posts.length > 0 && (
            <Row className="g-4">
              {posts.map((post) => (
                <Col lg={4} md={6} key={post.id}>
                  <Card
                    style={{
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                      overflow: 'hidden',
                      height: '100%',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.2)';
                      e.currentTarget.style.transform = 'translateY(-5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {post.image && (
                      <div style={{
                        width: '100%',
                        height: '200px',
                        backgroundColor: '#f5f5f5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                      }}>
                        <Card.Img
                          variant="top"
                          src={post.image}
                          alt={post.heading}
                          style={{ objectFit: 'contain', maxHeight: '100%', maxWidth: '100%' }}
                        />
                      </div>
                    )}
                    <Card.Body style={{ display: 'flex', flexDirection: 'column' }}>
                      <Card.Title style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1a1a2e' }}>
                        {post.heading}
                      </Card.Title>
                      <Card.Text style={{ color: '#666', fontSize: '0.95rem', flex: 1 }}>
                        {post.content.substring(0, 150)}...
                      </Card.Text>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                        <small style={{ color: '#999' }}>
                          By {post.admin_name}
                        </small>
                        <small style={{ color: '#999' }}>
                          {new Date(post.created_at).toLocaleDateString()}
                        </small>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </div>

      {/* CTA Section */}
      <Container>
        <div style={ctaSection}>
          <h3 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>
            Ready to Start Blogging?
          </h3>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.95 }}>
            Join thousands of writers sharing their stories on 247 Gist today.
          </p>
          <Link to="/register">
            <button
              style={{
                padding: '12px 32px',
                fontSize: '1.1rem',
                fontWeight: '600',
                borderRadius: '50px',
                background: 'white',
                color: '#667eea',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Create Your Free Account
            </button>
          </Link>
        </div>
      </Container>

      {/* Footer */}
      <footer style={footerStyle}>
        <Container>
          <p style={{ marginBottom: '0' }}>
            © 2026 247 Gist. All rights reserved. | Share your story with the world.
          </p>
        </Container>
      </footer>
    </>
  );
};

export default HomePage;
