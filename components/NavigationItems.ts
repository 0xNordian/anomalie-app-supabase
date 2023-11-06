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

export const NAVIGATION_ITEMS = [
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
        title: "Profile",
        icon: BiUser,
    },
    // {
    //     title: "Notifications",
    //     icon: BsBell,
    // },
    // {
    //     title: "Messages",
    //     icon: BsEnvelope,
    // },
    {
        title: "Calendar",
        icon: IoCalendarNumberOutline,
    },
    {
        title: "Settings",
        icon: FiSettings,
    },
];