import { useQuery } from "@tanstack/react-query";
import { fetchDashboard } from "../api/user";

export default function Profile() {
    const { data: user, isLoading, error } = useQuery({
        queryKey: ['dashboardUser'],
        queryFn: fetchDashboard,
    });

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <>
            <div className="card w-76 bg-base-100 card-xs shadow-sm">
                <div className="card-body flex flex-col gap-4">
                    <div className="avatar flex items-center justify-center">
                        <div className="mask mask-squircle w-24">
                            <img src="https://img.daisyui.com/images/profile/demo/distracted1@192.webp" />
                        </div>
                    </div>

                    <ul className="list bg-base-100 ">
                        <li className="list-row flex flex-col justify-center pl-12">
                            <div className="flex gap-2">
                                <div>Name</div>
                                <div className="text-xs uppercase font-semibold opacity-60">{user?.email}</div>
                            </div>
                            <div className="flex gap-2">
                                <div>Name</div>
                                <div className="text-xs uppercase font-semibold opacity-60">{user?._id}</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
