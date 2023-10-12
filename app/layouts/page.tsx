import Link from "next/link";
import { ReactNode } from "react";
import { BiHomeCircle, BiUser } from "react-icons/bi";
import {
    BsBell,
    BsBookmark,
    BsTwitter,
    BsEnvelope,
    BsThreeDots,
} from "react-icons/bs";
import { HiOutlineHashtag } from "react-icons/hi";
import { HiEnvelope } from "react-icons/hi2";
import { BsSearch } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import FetchUsers from "@/utils/FetchUsers";
import Avatar from "@/components/Avatar";

export const dynamic = 'force-dynamic'

const NAVIGATION_ITEMS = [
    // {
    //     title: "Twitter",
    //     icon: BsTwitter,
    // },
    {
        title: "Home",
        icon: BiHomeCircle,
    },
    {
        title: "Explore",
        icon: HiOutlineHashtag,
    },
    {
        title: "Notifications",
        icon: BsBell,
    },
    {
        title: "Messages",
        icon: BsEnvelope,
    },
    {
        title: "Settings",
        icon: FiSettings,
    },
    {
        title: "Profile",
        icon: BiUser,
    },
];

export default async function AppLayout({ children }: {children: ReactNode}) {
    const supabase = createServerComponentClient({ cookies });
    if (!supabase) return null;
    const { data: userData, error: userError } = await supabase.auth.getUser();
    const users = await FetchUsers();
    const {
        data: { session },
    } = await supabase.auth.getSession();
    if(session === null) return;
    const matchingUser = users?.find(user => user.id === session.user.id);
    const userProfilePic = matchingUser?.profile_pic ?? null;
    console.log("matchingUser: ", matchingUser);
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="max-w-screen-log w-full h-full flex relative">
                <section className="w-[25%] sticky top-0 xl:flex flex-col items-stretch h-screen hidden">
                    <div className="flex flex-col items-stretch h-full space-y-4 mt-4">
                        {NAVIGATION_ITEMS.map((item) => (
                            <Link
                                className="hover:bg-white/10 text-2xl transition duration-200 flex items-center justify-start w-fit space-x-4 rounded-3xl py-2 px-6"
                                href={
                                    item.title.toLocaleLowerCase() === "home"
                                        ? "/"
                                        : item.title.toLocaleLowerCase() ===
                                        "profile"
                                        ? `/u/${session.user.id}`
                                        : `/${item.title.toLowerCase()}`
                                }
                                key={item.title}
                            >
                                <div>
                                    <item.icon />
                                </div>
                                {item.title !== "Anomalie" && (
                                    <div>{item.title}</div>
                                )}
                            </Link>
                        ))}
                        <button className="rounded-full m-4 bg-twitterColor p-4 text-2xl text-center hover:bg-opacity-70 transition duration-200 bg-[#4A99E9]">
                            Post
                        </button>
                    </div>
                    <button className="rounded-full flex items-center space-x-2 bg-transparent p-4 text-center hover:bg-white/10 transition duration-200 w-full justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="rounded-full bg-slate-400 w-10 h-10"><Avatar profile_pic={userProfilePic}/></div>
                            <div className="text-left text-sm">
                                <div className="font-semibold">
                                    Name Placeholder
                                </div>
                                <div className="">
                                    @{matchingUser?.username}
                                </div>
                            </div>
                        </div>
                        <div>
                            <BsThreeDots />
                        </div>
                    </button>
                </section>
                <div className="w-1/2">{children}</div>
                <section className="w-[25%] sticky hidden top-2 overflow-y-auto mt-2 xl:flex flex-col items-stretch h-[90vh] overflow-x-hidden px-6">
                    <div>
                        <div className="relative w-full h-full group">
                            <input
                                id="searchBox"
                                type="text"
                                placeholder="Search"
                                className="outline-none peer focus:border-primary focus:border bg-neutral-900/90 w-full h-full rounded-xl py-4 pl-14 pr-4"
                            />
                            <label
                                htmlFor="searchBox"
                                className="absolute top-0 left-0 h-full flex items-center justify-center p-4 text-gray-500 peer-focus:text-primary"
                            >
                                <BsSearch className="w-5 h-5" />
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col rounded-xl bg-neutral-900  my-4">
                        <h3 className="font-bold text-xl my-4 px-4">
                            What’s happening
                        </h3>
                        <div>
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="hover:bg-white/10 p-4 last:rounded-b-xl transition duration-200"
                                >
                                    <div className="font-bold text-lg ">
                                        #trending{i + 1}
                                    </div>
                                    <div className="text-xs text-neutral-400">
                                        35.4k
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i}></div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col rounded-xl bg-neutral-900 my-4">
                        <h3 className="font-bold text-xl my-4 px-4">
                            Who to follow
                        </h3>
                        <div>
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="hover:bg-white/10 p-4 flex justify-between items-center last:rounded-b-xl transition duration-200"
                                >
                                    <div className="flex items-center space-x-2">
                                        <div className="w-10 h-10 bg-neutral-600 rounded-full flex-none"></div>
                                        <div className="flex flex-col">
                                            <div className="font-bold text-white">
                                                Other User
                                            </div>
                                            <div className="text-gray-500 text-xs">
                                                @otheruser1232
                                            </div>
                                        </div>
                                    </div>

                                    <button className="rounded-full px-6 py-2 bg-white text-neutral-950">
                                        Follow
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
