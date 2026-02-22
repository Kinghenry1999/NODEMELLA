import { useState, useEffect } from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import api from '../Utility/Api.jsx';

function Createpost() {
  const [formData, setFormData] = useState({
    heading: '',
    content: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState('');
  const [fileName, setFileName] = useState('');
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }

      setFileName(file.name);
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!user) {
      setError('Please login to create a post');
      return;
    }

    if (!formData.heading.trim() || !formData.content.trim() || !formData.image) {
      setError('All fields are required (including image)');
      return;
    }

    try {
      setLoading(true);

      // Convert image to base64
      const reader = new FileReader();
      reader.readAsDataURL(formData.image);
      reader.onload = async () => {
        const payload = {
          heading: formData.heading,
          content: formData.content,
          image: reader.result, // Base64 encoded image
          adminId: user.id,
        };

        try {
          const response = await api.post('/posts', payload);

          if (response.data.success) {
            setSuccess('✅ Post published successfully! It now appears on the homepage.');
            setFormData({ heading: '', content: '', image: null });
            setImagePreview('');
            setFileName('');
            setTimeout(() => setSuccess(''), 3000);
          }
        } catch (err) {
          console.error('Error creating post:', err);
          setError(err.response?.data?.error || 'Failed to create post. Please try again.');
        } finally {
          setLoading(false);
        }
      };
      reader.onerror = () => {
        setError('Failed to read image file');
        setLoading(false);
      };
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred. Please try again.');
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
    fileInput: {
      padding: '0.75rem 1rem',
      borderRadius: '8px',
      border: '2px dashed #667eea',
      background: '#f8f9ff',
      cursor: 'pointer',
      transition: 'all 0.3s',
      fontFamily: 'inherit',
    },
    imagePreview: {
      marginTop: '1rem',
      borderRadius: '8px',
      maxHeight: '300px',
      objectFit: 'cover',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
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
            <label style={styles.label}>Image Upload *</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={styles.fileInput}
              required
            />
            <small style={{ color: '#666', marginTop: '0.5rem' }}>
              📁 Supported formats: JPG, PNG, GIF, WebP (Max size: 5MB)
              {fileName && <span style={{ marginLeft: '1rem', color: '#667eea', fontWeight: '600' }}>✓ {fileName}</span>}
            </small>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                style={styles.imagePreview}
              />
            )}
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
