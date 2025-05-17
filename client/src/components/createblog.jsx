import { useState } from "react";
import { createBlog } from "../api/blog";
import { RiLoader4Line } from "react-icons/ri";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CreateBlog() {
    const initialState = {
        title: "",
        description: "",
        image: null
    }
    const [blog, setBlog] = useState(initialState);

    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation({
        mutationFn: createBlog,
        onSuccess: () => {
            alert("Blog created!");
            queryClient.invalidateQueries(["fetchMyBlogs"]);
            setBlog(initialState);
        },
        onError: (err) => {
            console.error("Blog creation failed:", err);
            alert("Failed to create blog.");
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

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto bg-white shadow-md p-8 rounded-xl space-y-6"
        >
            <h2 className="text-2xl font-bold text-gray-800">Create New Blog</h2>

            <div>
                <label htmlFor="title" className="block font-medium text-gray-700 mb-1">
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
                <label htmlFor="description" className="block font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={blog.description}
                    onChange={onchangeHandler}
                    required
                    placeholder="Write your blog content here..."
                    rows={6}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
            </div>

            <div>
                <label htmlFor="image" className="block font-medium text-gray-700 mb-1">
                    Upload Cover Image
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

            {blog.image && (
                <div className="mt-2">
                    <p className="text-sm text-gray-600 mb-1">Preview:</p>
                    <img
                        src={URL.createObjectURL(blog.image)}
                        alt="Preview"
                        className="h-40 object-cover rounded-md border"
                    />
                </div>
            )}

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                disabled={isLoading}
            >
                {isLoading ? <RiLoader4Line className="animate-spin mx-auto" /> : "Publish Blog"}
            </button>
        </form>
    );
}
