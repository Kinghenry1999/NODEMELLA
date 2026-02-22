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
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1a1a2e', marginBottom: '0.5rem' }}>
          📋 Your Published Posts
        </h2>
        <p style={{ color: '#666', fontSize: '0.95rem' }}>
          Manage and view all your published blog posts. These posts are displayed on the homepage.
        </p>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading && (
        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
          <Spinner animation="border" variant="primary" />
          <p style={{ marginTop: '1rem', color: '#666' }}>Loading your posts...</p>
        </div>
      )}

      {!loading && posts.length === 0 && (
        <Alert variant="info" style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: 0 }}>📝 No posts yet!</p>
          <small>Click "Create Post" in the menu to publish your first post.</small>
        </Alert>
      )}

      {!loading && posts.length > 0 && (
        <Row className="g-4">
          {posts.map((post) => (
            <Col md={6} lg={4} key={post.id}>
              <Card className="blog-card h-100" style={{
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.15)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                {post.image && (
                  <Card.Img 
                    src={post.image} 
                    alt={post.heading}
                    style={{ objectFit: 'cover', height: '200px' }}
                  />
                )}

                <Card.Body style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Card.Title style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1a1a2e', marginBottom: '0.75rem' }}>
                    {post.heading}
                  </Card.Title>
                  <Card.Text style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.5', flex: 1 }}>
                    {post.content.substring(0, 120)}...
                  </Card.Text>
                  <small style={{ color: '#999', marginTop: '0.5rem' }}>
                    📅 {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </small>
                </Card.Body>

                <Card.Footer style={{ background: '#f9fafb', borderTop: '1px solid #e0e0e0', padding: '0.75rem 1rem' }} className="d-flex justify-content-between gap-2">
                  <Button 
                    size="sm" 
                    variant="outline-primary"
                    onClick={() => handleEdit(post.id)}
                    style={{ flex: 1, fontSize: '0.85rem', padding: '0.5rem' }}
                  >
                    ✏️ Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline-danger"
                    onClick={() => handleDelete(post.id)}
                    style={{ flex: 1, fontSize: '0.85rem', padding: '0.5rem' }}
                  >
                    🗑️ Delete
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default Allpost;