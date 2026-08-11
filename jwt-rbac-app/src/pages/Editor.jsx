import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PostComposer from "../components/PostComposer";

function Editor() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role") || "editor";
  const username = localStorage.getItem("username") || "Editor User";
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

  const handleDeletePost = (postId, postAuthor) => {
    if (postAuthor === username) {
      setPosts((prev) => prev.filter((post) => post.id !== postId));
    }
  };

  return (
    <div className="editor">
      <nav className="top-nav">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/viewer">Viewer</Link>
        <Link to="/editor">Editor</Link>
        <button onClick={logout}>Logout</button>
      </nav>
      <h1>Editor Panel</h1>
      <PostComposer role={role} currentUser={username} onCreate={handleCreatePost} />

      <div className="posts-container">
        <h2>My Posts</h2>
        {posts.map((post) => (
          <article key={post.id} className="post-card">
            <div className="post-header">
              <div>
                <h3>{post.title}</h3>
                <small>
                  By {post.author} • {post.role}
                </small>
              </div>
              {post.author === username && (
                <button className="danger-btn" onClick={() => handleDeletePost(post.id, post.author)}>
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

export default Editor;