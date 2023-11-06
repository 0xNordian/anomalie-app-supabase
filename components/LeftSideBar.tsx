import Link from "next/link";
import Avatar from "@/components/Avatar";
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
import { IoCalendarNumberOutline } from "react-icons/io5";
import PostModal from "@/components/PostModal";
import { NAVIGATION_ITEMS } from "./NavigationItems";

// const NAVIGATION_ITEMS = [
//     // {
//     //     title: "Twitter",
//     //     icon: BsTwitter,
//     // },

//     {
//         title: "Home",
//         icon: BiHomeCircle,
//     },
//     {
//         title: "Explore",
//         icon: HiOutlineHashtag,
//     },
//     {
//         title: "Profile",
//         icon: BiUser,
//     },
//     // {
//     //     title: "Notifications",
//     //     icon: BsBell,
//     // },
//     // {
//     //     title: "Messages",
//     //     icon: BsEnvelope,
//     // },
//     {
//         title: "Calendar",
//         icon: IoCalendarNumberOutline,
//     },
//     {
//         title: "Settings",
//         icon: FiSettings,
//     },
// ];

type LeftSideBarProps = {
    session: any;
    userProfilePic: string | null;
    matchingUser: any;
};

const LeftSideBar = ({
    session,
    userProfilePic,
    matchingUser,
}: LeftSideBarProps) => {
    return (
        <>
            {/* //? LEFT SIDEBAR */}
            <section className="w-[25%] sticky top-0 lg:flex xl:flex flex-col items-stretch h-screen hidden px-6">
                <div className="flex flex-col items-stretch h-full space-y-4 mt-4">
                    <div>
                        <div className="relative w-full h-full group">
                            <input
                                id="searchBox"
                                type="text"
                                placeholder="Search"
                                className="outline-none peer focus:border-primary focus:border bg-anomalie-dark-blue w-full h-full rounded-xl py-4 pl-14 pr-4"
                            />
                            <label
                                htmlFor="searchBox"
                                className="absolute top-0 left-0 h-full flex items-center justify-center p-4 text-gray-500 peer-focus:text-primary"
                            >
                                <BsSearch className="w-5 h-5" />
                            </label>
                        </div>
                    </div>
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
                    <PostModal profile_pic={matchingUser.profile_pic} modalTitle={"Create Post"} btnMsg={"Post"} type={"post"}/>
                </div>
                <Link href="/settings">
                    <button className="rounded-full flex items-center space-x-2 bg-transparent p-4 text-center hover:bg-white/10 transition duration-200 w-full justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="rounded-full w-10 h-10">
                                <Avatar profile_pic={userProfilePic} />
                            </div>
                            <div className="text-left text-sm">
                                <div className="font-semibold">
                                    {matchingUser.full_name}
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
                </Link>
            </section>
        </>
    );
};

export default LeftSideBar;
