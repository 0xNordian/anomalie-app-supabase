"use client";
import Avatar from "@/components/Avatar";
import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";
import CircleComponent from "./TempCircleComponent";
import { UserTypes } from "@/types/userTypes";
import Hashtags from "./Hashtags";

const testHashtags = [
    {
        id: 1,
        category: "dancer",
    },
    {
        id: 2,
        category: "musician",
    },
    {
        id: 3,
        category: "artist",
    },
    {
        id: 4,
        category: "photographer",
    },
    {
        id: 5,
        category: "videographer",
    },
    {
        id: 6,
        category: "producer",
    }
]

type ComposePostType = {
    profile_pic: string | null;
    matchingUser: UserTypes;
};

const ProfileHeader = ({ profile_pic, matchingUser }: ComposePostType) => {
    // console.log("matchingUser2: ", matchingUser);
    const { full_name, user_location } = matchingUser;
    return (
        <section className="h-[500px] w-full relative border-x-[1px] border-gray-400 border-opacity-20">
            <div id="banner" className="relative h-1/2">
                <Image
                    src="/banner-example.jpg"
                    alt="User Banner"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="0px -30px"
                />
            </div>
            <div
                id="profileInfo"
                className="flex flex-col md:flex-row absolute top-[50%] md:top-[35%] w-full h-1/2 items-center gap-4 px-8"
            >
                <div className="flex gap-4 pl-2 justify-start items-center w-full">
                    <div className="outline rounded-full outline-4">
                    <Avatar profile_pic={matchingUser.profile_pic} w={120} h={48} page="profile"/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col">
                            <h3>{full_name}</h3>
                            <small>
                                @{matchingUser.username}
                            </small>
                        </div>
                        <div className="flex justify-start items-center w-full">
                            <small className="pr-1">
                                {user_location}
                            </small>
                            <CiLocationOn />
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 w-3/5 h-1/4 items-center justify-end">
                    <small>255 connections</small>
                    <div className="">
                        <CircleComponent />
                    </div>
                </div>
            </div>
            <div
                id="profileHashtags"
                className="absolute top-[75%] w-full h-1/5 bg-pink-500 bg-opacity-0 hidden md:flex flex-wrap gap-4 p-10 ml-4"
            >
                {testHashtags.map(({id, category}) => (
                    <div key={id}>
                        <Hashtags category={category}/>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProfileHeader;
