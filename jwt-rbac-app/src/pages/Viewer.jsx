import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Viewer() {
  const navigate = useNavigate();
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

  return (
    <div className="viewer">
      <nav className="top-nav">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/viewer">Viewer</Link>
        <button onClick={logout}>Logout</button>
      </nav>
      <h1>Viewer Panel</h1>
      <div className="posts-container">
        <h2>Posts</h2>
        {posts.map((post) => (
          <article key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <small>
              By {post.author} • {post.role}
            </small>
            <p>{post.content}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Viewer;