import NavBar from "./navBar";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div>
            <NavBar />
            <main className="p-4">
                <Outlet />
            </main>
        </div>
    );
}
