import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchBlogs, deleteBlog } from "../api";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const navigate = useNavigate();

  async function loadBlogs() {
    setLoading(true);
    const data = await fetchBlogs();
    console.log(data);
    
    setBlogs(data);
    setLoading(false);
  }

  useEffect(() => {
    loadBlogs();
  }, []);

  function openDeleteModal(id) {
    setDeleteId(id);
    setDeleteModalOpen(true);
  }

  async function handleDelete() {
    await deleteBlog(deleteId);
    setDeleteModalOpen(false);
    loadBlogs();
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>

      <button
        onClick={() => navigate("/create")}
        className="px-4 py-2 bg-indigo-600 text-white rounded mb-4"
      >
        + New Blog
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <ul className="space-y-3">
          {blogs.map((b) => (
            <li
              key={b.id}
              className="p-4 bg-white shadow rounded flex justify-between items-center"
            >
              <div>
                <Link
                  to={`/blogs/${b.id}`}
                  className="text-lg font-semibold text-indigo-700 hover:underline"
                >
                  {b.title}
                </Link>
                <p className="text-sm text-gray-600 truncate w-64">{b.body}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/edit/${b.id}`)}
                  className="px-3 py-1 border rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => openDeleteModal(b.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ConfirmDeleteModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
