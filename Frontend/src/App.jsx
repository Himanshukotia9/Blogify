import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetails";
import BlogCreate from "./pages/BlogCreate";
import BlogEdit from "./pages/BlogEdit";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/create" element={<BlogCreate />} />
        <Route path="/edit/:id" element={<BlogEdit />} />
      </Routes>
    </Router>
  );
}
