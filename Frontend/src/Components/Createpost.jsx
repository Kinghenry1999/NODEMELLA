import { useState, useEffect } from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import api from '../Utility/Api.jsx';

function Createpost() {
  const [formData, setFormData] = useState({
    heading: '',
    content: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!user) {
      setError('Please login to create a post');
      return;
    }

    if (!formData.heading.trim() || !formData.content.trim() || !formData.image.trim()) {
      setError('All fields are required');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        heading: formData.heading,
        content: formData.content,
        image: formData.image,
        adminId: user.id,
      };

      const response = await api.post('/posts', payload);

      if (response.data.success) {
        setSuccess('✅ Post published successfully! It now appears on the homepage.');
        setFormData({ heading: '', content: '', image: '' });
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      console.error('Error creating post:', err);
      setError(err.response?.data?.error || 'Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      padding: '2rem',
      minHeight: '500px',
    },
    form: {
      width: '100%',
      maxWidth: '700px',
      background: '#ffffff',
      padding: '2.5rem',
      borderRadius: '15px',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
    },
    title: {
      marginBottom: '1.5rem',
      fontWeight: '800',
      fontSize: '1.8rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    group: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '1.5rem',
    },
    label: {
      marginBottom: '0.5rem',
      fontWeight: '600',
      fontSize: '1rem',
      color: '#1a1a2e',
    },
    input: {
      padding: '0.75rem 1rem',
      borderRadius: '8px',
      border: '1px solid #ddd',
      fontSize: '0.95rem',
      fontFamily: 'inherit',
      transition: 'border-color 0.3s',
    },
    textarea: {
      padding: '0.75rem 1rem',
      borderRadius: '8px',
      border: '1px solid #ddd',
      fontSize: '0.95rem',
      fontFamily: 'inherit',
      resize: 'vertical',
      minHeight: '150px',
      transition: 'border-color 0.3s',
    },
    button: {
      marginTop: '1.5rem',
      padding: '0.75rem 2rem',
      borderRadius: '8px',
      border: 'none',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      color: 'white',
      fontWeight: '700',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      width: '100%',
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.form}>
        {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
        {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}

        <form onSubmit={handleSubmit}>
          <h3 style={styles.title}>✍️ Create New Post</h3>

          <div style={styles.group}>
            <label style={styles.label}>Post Heading *</label>
            <input
              type="text"
              name="heading"
              placeholder="Enter your post title..."
              style={styles.input}
              value={formData.heading}
              onChange={handleChange}
              required
              onFocus={(e) => (e.target.style.borderColor = '#667eea')}
              onBlur={(e) => (e.target.style.borderColor = '#ddd')}
            />
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Content *</label>
            <textarea
              name="content"
              placeholder="Write your amazing story here..."
              style={styles.textarea}
              value={formData.content}
              onChange={handleChange}
              required
              onFocus={(e) => (e.target.style.borderColor = '#667eea')}
              onBlur={(e) => (e.target.style.borderColor = '#ddd')}
            />
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Image URL *</label>
            <input
              type="url"
              name="image"
              placeholder="https://example.com/image.jpg"
              style={styles.input}
              value={formData.image}
              onChange={handleChange}
              required
              onFocus={(e) => (e.target.style.borderColor = '#667eea')}
              onBlur={(e) => (e.target.style.borderColor = '#ddd')}
            />
          </div>

          <button
            type="submit"
            style={styles.button}
            disabled={loading}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 10px 25px rgba(245, 87, 108, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  style={{ marginRight: '0.5rem' }}
                />
                Publishing...
              </>
            ) : (
              '🚀 Publish Post'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Createpost;
