function Createpost() {

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
