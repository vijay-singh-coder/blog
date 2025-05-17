import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteBlog, fetchMyBlogs } from "../api/blog";
import { Link } from "react-router-dom";

export default function BlogTable() {

    const queryClient = useQueryClient();

    const { isPending, error, data: blogs = [] } = useQuery({
        queryKey: ['fetchMyBlogs'],
        queryFn: fetchMyBlogs
    });

    const { mutate: handleDelete, isLoading: isDeleting } = useMutation({
        mutationFn: deleteBlog,
        onSuccess: () => {
            queryClient.invalidateQueries(['fetchMyBlogs']);
        },
        onError: (err) => {
            console.error("Delete failed:", err);
        }
    });
    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <div className="bg-white shadow-md rounded-xl p-6 overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Blogs</h2>
            <table className="min-w-full table-auto text-sm text-left text-gray-700">
                <thead className="bg-gray-100 border-b text-gray-600 uppercase text-xs">
                    <tr>
                        <th className="px-6 py-3">Title</th>
                        <th className="px-6 py-3">Description</th>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center py-6 text-gray-500">
                                No blogs yet.
                            </td>
                        </tr>
                    ) : (
                        blogs?.map((blog) => (
                            <tr key={blog._id || blog.id} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium">{blog.title}</td>
                                <td className="px-6 py-4 truncate max-w-xs">{blog.description}</td>
                                <td className="px-6 py-4">{new Date(blog.createdAt).toLocaleDateString()
                                }</td>
                                <td className="px-6 py-4 text-center space-x-2">
                                    <Link
                                        to={`/edit/${blog._id || blog.id}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="text-red-500 hover:underline pointer-cursor"
                                        onClick={() => handleDelete(blog._id || blog.id)}
                                        disabled={isDeleting}
                                    >
                                        {isDeleting ? "Deleting..." : "Delete"}
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
