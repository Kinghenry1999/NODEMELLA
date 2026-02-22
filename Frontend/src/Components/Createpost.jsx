import { useState, useEffect } from 'react';
import { Container, Alert, Spinner } from 'react-bootstrap';
import api from '../Utility/Api.jsx';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  useEffect(() => {
    // Get user info from localStorage (set during login)
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
        setSuccess('Post published successfully! It will appear on the homepage soon.');
        setFormData({ heading: '', content: '', image: '' });
        
        // Redirect to dashboard or homepage after 2 seconds
        setTimeout(() => {
          navigate('/dashboard/allpost');
        }, 2000);
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
      display: "flex",
      justifyContent: "center",
      padding: "40px 20px"
    },

    form: {
      width: "100%",
      maxWidth: "600px",
      background: "#ffffff",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 4px 16px rgba(0,0,0,0.08)"
    },

    title: {
      marginBottom: "20px",
      fontWeight: "600",
      fontSize: "20px"
    },

    group: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "18px"
    },

    label: {
      marginBottom: "6px",
      fontWeight: "500",
      fontSize: "14px"
    },

    input: {
      padding: "10px 12px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      fontSize: "14px"
    },

    textarea: {
      padding: "10px 12px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      fontSize: "14px",
      resize: "none"
    },

    button: {
      marginTop: "10px",
      padding: "10px 14px",
      borderRadius: "8px",
      border: "none",
      backgroundColor: "#0d6efd",
      color: "white",
      fontWeight: "600",
      cursor: "pointer"
    }
  };

  return (
    <div style={styles.wrapper}>
      <form
        style={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          alert("Post created!");
        }}
      >
        <h3 style={styles.title}>Create New Post</h3>

        <div style={styles.group}>
          <label style={styles.label}>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Content</label>
          <textarea
            name="content"
            rows="4"
            placeholder="Write your post..."
            style={styles.textarea}
            required
          />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Image URL</label>
          <input
            type="text"
            name="image"
            placeholder="https://image-link.com"
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>
          Publish Post
        </button>
      </form>
    </div>
  );
}

export default Createpost;
