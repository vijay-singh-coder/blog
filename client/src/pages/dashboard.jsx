
import BlogTable from "../components/blogtable";
import CreateBlog from "../components/createblog";
import Profile from "../components/profile";

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

                <aside className="w-full lg:w-1/4">
                    <Profile />
                </aside>

                <main className="w-full lg:w-3/4 space-y-8">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <CreateBlog />
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <BlogTable />
                    </div>
                </main>
            </div>
        </div>
    );
}
