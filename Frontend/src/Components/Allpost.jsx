import React,{useState} from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Navbar,
  Nav
} from "react-bootstrap";

function createPost() {
      const [blogs] = useState([
    {
      id: 1,
      title: "Getting Started with React",
      excerpt: "Learn the basics of React and build dynamic interfaces.",
      date: "Feb 10, 2026",
      author: "Admin",
      image: "https://via.placeholder.com/400x250"
    },
    {
      id: 2,
      title: "Node.js Best Practices",
      excerpt: "Build scalable backend applications with Node.",
      date: "Feb 9, 2026",
      author: "Admin",
      image: "https://via.placeholder.com/400x250"
    },
    {
      id: 3,
      title: "Database Design Tips",
      excerpt: "Design clean and efficient databases.",
      date: "Feb 8, 2026",
      author: "Admin",
      image: "https://via.placeholder.com/400x250"
    }
  ]);
    return(
        <Container className="mt-4">
      <h2 className="mb-4">All Blog Posts</h2>
       <Row className="g-4 border">
            {blogs.map((blog) => (
              <Col md={6} lg={4} key={blog.id}>
                <Card className="blog-card h-100">
                  <Card.Img src={blog.image} />

                  <Card.Body>
                    <Card.Title>{blog.title}</Card.Title>
                    <Card.Text className="text-muted">
                      {blog.excerpt}
                    </Card.Text>
                  </Card.Body>

                  <Card.Footer className="bg-white d-flex justify-content-between">
                    <small>{blog.date}</small>
                    <Button size="sm" variant="outline-primary">
                      Read
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
    </Container>
    )
}

export default createPost;