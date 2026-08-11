import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PostComposer from "../components/PostComposer";
import { getInitialPosts } from "../data/fakePosts";

function Dashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role") || "viewer";
  const username = localStorage.getItem("username") || "Demo User";
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts") || "null");
    setPosts(storedPosts && storedPosts.length ? storedPosts : getInitialPosts());
  }, []);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

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

  const handleDeletePost = (postId, postAuthor, postRole) => {
    if (role === "admin") {
      setPosts((prev) => prev.filter((post) => post.id !== postId));
      return;
    }

    if (role === "editor" && postRole === "editor" && postAuthor === username) {
      setPosts((prev) => prev.filter((post) => post.id !== postId));
    }
  };

  return (
    <div className="dashboard">
      <nav className="top-nav">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/viewer">Viewer</Link>
        {role === "admin" && <Link to="/admin">Admin</Link>}
        {(role === "admin" || role === "editor") && <Link to="/editor">Editor</Link>}
        <button onClick={logout}>Logout</button>
      </nav>
      <h1>Dashboard</h1>
      <h3>Welcome, {username}!</h3>
      <p>Your Role: {role}</p>

      {role !== "viewer" && (
        <PostComposer role={role} currentUser={username} onCreate={handleCreatePost} />
      )}

      <div className="posts-container">
        <h2>Posts</h2>
        {posts.map((post) => (
          <article key={post.id} className="post-card">
            <div className="post-header">
              <div>
                <h3>{post.title}</h3>
                <small>
                  By {post.author} • {post.role}
                </small>
              </div>

              {(role === "admin" ||
                (role === "editor" && post.role === "editor" && post.author === username)) && (
                <button
                  className="danger-btn"
                  onClick={() => handleDeletePost(post.id, post.author, post.role)}
                >
                  Delete
                </button>
              )}
            </div>
            <p>{post.content}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;