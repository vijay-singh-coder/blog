import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "../api/blog";
import { Link } from "react-router-dom";

export default function Home() {
    const { data: blogs = [], isLoading, error } = useQuery({
        queryKey: ['fetchBlogs'],
        queryFn: fetchBlogs,
    });

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">All Blogs</h1>
            {blogs.map(blog => (
                <div key={blog._id} className="border p-4 rounded mb-4 shadow">
                    <Link to={`/view/${blog._id}`}>
                        <h2 className="text-xl font-semibold text-blue-600 hover:underline">{blog.title}</h2>
                    </Link>
                    <p className="text-gray-700">{blog.description}</p>
                </div>
            ))}
        </div>
    );
}
