import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createBlog } from "../api";

export default function BlogCreate() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    await createBlog({ title, body });
    navigate("/");
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Body"
          className="w-full border p-2 rounded h-32"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <div className="flex gap-2">
          <Link
            to="/"
            className="px-4 py-2 bg-gray-200 rounded text-gray-700"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
