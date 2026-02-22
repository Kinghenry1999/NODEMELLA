import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import api from "../Utility/Api.jsx";
import { useNavigate } from "react-router-dom";

function Allpost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user info from localStorage
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
      fetchAdminPosts(JSON.parse(userInfo).id);
    }
  }, []);

  const fetchAdminPosts = async (adminId) => {
    try {
      setLoading(true);
      const response = await api.get(`/posts/admin/${adminId}`);
      if (response.data.success) {
        setPosts(response.data.posts);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const response = await api.delete(`/posts/${postId}`, {
        data: { adminId: user.id },
      });

      if (response.data.success) {
        setPosts(posts.filter((post) => post.id !== postId));
        alert('Post deleted successfully!');
      }
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Failed to delete post.');
    }
  };

  const handleEdit = (postId) => {
    // Implement edit functionality if needed
    navigate(`/dashboard/editpost/${postId}`);
  };
  return (
    <Container className="mt-4">
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#1a1a2e', marginBottom: '0.5rem' }}>
          Your Published Posts
        </h2>
        <p style={{ color: '#666', fontSize: '0.95rem' }}>
          Manage and view all your published blog posts.
        </p>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <Spinner animation="border" variant="primary" />
          <p style={{ marginTop: '1rem', color: '#666' }}>Loading your posts...</p>
        </div>
      )}

      {!loading && posts.length === 0 && (
        <Alert variant="info" style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: 0 }}>No posts yet!</p>
          <small>Create your first post to see it here.</small>
        </Alert>
      )}

      {!loading && posts.length > 0 && (
        <Row className="g-4">
          {posts.map((post) => (
            <Col md={6} lg={4} key={post.id}>
              <Card className="blog-card h-100" style={{
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}>
                {post.image && (
                  <Card.Img 
                    src={post.image} 
                    alt={post.heading}
                    style={{ objectFit: 'cover', height: '200px' }}
                  />
                )}

                <Card.Body>
                  <Card.Title style={{ fontSize: '1.15rem', fontWeight: '700', color: '#1a1a2e' }}>
                    {post.heading}
                  </Card.Title>
                  <Card.Text style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    {post.content.substring(0, 100)}...
                  </Card.Text>
                  <small style={{ color: '#999' }}>
                    Published: {new Date(post.created_at).toLocaleDateString()}
                  </small>
                </Card.Body>

                <Card.Footer style={{ background: '#f9fafb', borderTop: '1px solid #e0e0e0' }} className="d-flex justify-content-between">
                  <Button 
                    size="sm" 
                    variant="primary"
                    onClick={() => handleEdit(post.id)}
                  >
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="danger"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Allpost;