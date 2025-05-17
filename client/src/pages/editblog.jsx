import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchBlogById, updateBlog } from "../api/blog";
import { RiLoader4Line } from "react-icons/ri";

export default function EditBlog() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: existingBlog, isPending } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogById(id),
  });

  const [blog, setBlog] = useState(null);

 useEffect(() => {
  if (existingBlog?.success && existingBlog.responseData) {
    const blogData = existingBlog.responseData;
    setBlog({
      title: blogData.title || "",
      description: blogData.description || "",
      image: null,
    });
  }
}, [existingBlog]);

  const { mutate, isLoading } = useMutation({
    mutationFn: (updatedData) => updateBlog(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchMyBlogs"]);
      alert("Blog updated successfully!");
    },
    onError: (err) => {
      console.error("Update failed:", err);
      alert("Failed to update blog");
    },
  });

  function onchangeHandler(e) {
    const { name, value, files } = e.target;
    setBlog((prev) => ({
      ...prev,
      [name]: name === "image" ? files[0] : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", blog.title);
    formData.append("description", blog.description);
    if (blog.image) {
      formData.append("image", blog.image);
    }
    mutate(formData);
  }

  if (isPending || !blog) return <div className="text-center mt-10">Loading...</div>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white shadow-md p-8 rounded-xl space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">Edit Blog</h2>

      <div>
        <label className="block text-gray-700 font-medium mb-1" htmlFor="title">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={blog.title}
          onChange={onchangeHandler}
          required
          placeholder="Enter blog title"
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1" htmlFor="description">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={blog.description}
          onChange={onchangeHandler}
          required
          rows={6}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1" htmlFor="image">
          Replace Cover Image (optional)
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={onchangeHandler}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />
      </div>

      {blog.image ? (
        <div className="mt-2">
          <p className="text-sm text-gray-600 mb-1">New Preview:</p>
          <img
            src={URL.createObjectURL(blog.image)}
            alt="Preview"
            className="h-40 object-cover rounded-md border"
          />
        </div>
      ) : (
        <div className="mt-2">
          <p className="text-sm text-gray-600 mb-1">Current Image:</p>
          <img
            src={`${import.meta.env.VITE_SERVER_URL}/public/${existingBlog.responseData.image}`}
            alt="Current"
            className="h-40 object-cover rounded-md border"
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        disabled={isLoading}
      >
        {isLoading ? <RiLoader4Line className="animate-spin" /> : "Update Blog"}
      </button>
    </form>
  );
}
