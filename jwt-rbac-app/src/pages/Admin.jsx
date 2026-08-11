import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PostComposer from "../components/PostComposer";

function Admin() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role") || "admin";
  const username = localStorage.getItem("username") || "Admin User";
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts") || "null");
    setPosts(storedPosts && storedPosts.length ? storedPosts : []);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const handleCreatePost = ({ title, content, author }) => {
    const newPost = {
      id: Date.now(),
      title,
      content,
      author,
      role,
      createdAt: new Date().toISOString()
    };

    setPosts((prev) => [newPost, ...prev]);
  };

  const handleDeletePost = (postId) => {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
  };

  return (
    <div className="admin">
      <nav className="top-nav">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/viewer">Viewer</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/editor">Editor</Link>
        <button onClick={logout}>Logout</button>
      </nav>
      <h1>Admin Panel</h1>
      <PostComposer role={role} currentUser={username} onCreate={handleCreatePost} />

      <div className="posts-container">
        <h2>All Posts</h2>
        {posts.map((post) => (
          <article key={post.id} className="post-card">
            <div className="post-header">
              <div>
                <h3>{post.title}</h3>
                <small>
                  By {post.author} • {post.role}
                </small>
              </div>
              <button className="danger-btn" onClick={() => handleDeletePost(post.id)}>
                Delete
              </button>
            </div>
            <p>{post.content}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Admin;