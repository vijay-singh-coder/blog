import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchBlogById } from "../api/blog";
import { useState } from "react";
import { postComment } from "../api/comment";

export default function ViewBlog() {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const [comment, setComment] = useState("");

    const { data: blog, isLoading, error } = useQuery({
        queryKey: ['blog', id],
        queryFn: () => fetchBlogById(id),
    });

    const commentMutation = useMutation({
        mutationFn: ({ blogId, content }) => postComment(blogId, content),
        onSuccess: () => {
            setComment("");
            queryClient.invalidateQueries(['blog', id]); 
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (comment.trim()) {
            commentMutation.mutate({ blogId: id, content: comment });
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">{blog.responseData.title}</h1>
            <p className="mb-4">{blog.responseData.description}</p>

            <h2 className="text-xl font-semibold mt-6 mb-2">Comments</h2>
            <ul className="mb-4">
                {blog.responseData.comments && blog.responseData.comments.length > 0 ? (
                    blog.responseData.comments.map((c, idx) => (
                        <li key={idx} className="mb-2 border-b pb-2">
                            {c.content }
                        </li>
                    ))
                ) : (
                    <li>No comments yet.</li>
                )}
            </ul>

            <form onSubmit={handleSubmit} className="mt-4">
                <textarea
                    className="w-full p-2 border rounded"
                    rows="3"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <button
                    type="submit"
                    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    disabled={commentMutation.isLoading}
                >
                    {commentMutation.isLoading ? "Posting..." : "Post Comment"}
                </button>
            </form>
        </div>
    );
}
