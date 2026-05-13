"use client";

import { useState, useEffect } from "react";

import { db } from "../lib/firebase";

import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

export default function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [blogs, setBlogs] = useState<any[]>([]);

  // Save Blog
  const handlePost = async () => {
    if (!title || !content) {
      alert("Please fill all fields");
      return;
    }

    await addDoc(collection(db, "blogs"), {
      title,
      content,
      createdAt: serverTimestamp(),
    });

    alert("Blog Posted Successfully");

    setTitle("");
    setContent("");
  };

  // Fetch Blogs
  useEffect(() => {
    const q = query(
      collection(db, "blogs"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBlogs(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsubscribe();
  }, []);

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "50px auto",
        padding: "20px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        Cloud Blog Platform
      </h1>

      <input
        type="text"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "20px",
        }}
      />

      <textarea
        placeholder="Write your blog..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          width: "100%",
          height: "200px",
          padding: "10px",
          marginTop: "20px",
        }}
      />

      <button
        onClick={handlePost}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Post Blog
      </button>

      <hr style={{ margin: "40px 0" }} />

      <h2>All Blogs</h2>

      {blogs.map((blog) => (
        <div
          key={blog.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginTop: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
        </div>
      ))}
    </div>
  );
}