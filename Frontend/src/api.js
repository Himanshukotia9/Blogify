const BASE_URL = "http://127.0.0.1:8000";

export async function fetchBlogs() {
  const res = await fetch(`${BASE_URL}/blog`);
  return res.json();
}

export async function fetchBlog(id) {
  const res = await fetch(`${BASE_URL}/blog/${id}`);
  return res.json();
}

export async function createBlog(data) {
  const res = await fetch(`${BASE_URL}/blog`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateBlog(id, data) {
  const res = await fetch(`${BASE_URL}/blog/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteBlog(id) {
  return fetch(`${BASE_URL}/blog/${id}`, { method: "DELETE" });
}
