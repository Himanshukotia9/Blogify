import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchBlog } from "../api";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await fetchBlog(id);
      setBlog(data);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;

  if (!blog) return <p className="p-6">Blog not found.</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Link to="/" className="text-indigo-600 hover:underline">&larr; Back</Link>
      <h1 className="text-3xl font-bold mt-4">{blog.title}</h1>
      <p className="mt-2 text-gray-700 whitespace-pre-wrap">{blog.body}</p>
    </div>
  );
}
