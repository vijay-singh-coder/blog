import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav className="bg-gray-600 py-4 border-b-2 border-gray-500">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-lg font-bold text-white">
                    Home
                </Link>
                <ul className="flex items-center space-x-4">
                    <li>
                        <Link to="/dashboard" className="text-white hover:text-gray-300">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className="text-white hover:text-gray-300">
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link to="/signup" className="text-white hover:text-gray-300">
                            Signup
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}