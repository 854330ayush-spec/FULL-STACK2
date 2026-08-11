import React, { useState } from "react";

function PostComposer({ role, currentUser, onCreate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  if (role === "viewer") return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) return;

    onCreate({
      title: title.trim(),
      content: content.trim(),
      author: currentUser || `${role}-user`
    });

    setTitle("");
    setContent("");
  };

  return (
    <div className="composer-box">
      <h3>Create Post</h3>
      <form onSubmit={handleSubmit} className="composer-form">
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows="4"
          placeholder="Write your post here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Publish</button>
      </form>
    </div>
  );
}

export default PostComposer;
