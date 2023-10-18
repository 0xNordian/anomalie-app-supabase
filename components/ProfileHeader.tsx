"use client";
import Avatar from "@/components/Avatar";
import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";
import CircleComponent from "./TempCircleComponent";
import { UserTypes } from "@/types/userTypes";

type UserSessionTypes = {
    created_at: string;
    id: string;
    profile_pic: string | null;
    username: string | null;
};

type ComposePostType = {
    profile_pic: string | null;
    matchingUser: UserSessionTypes;
};

const ProfileHeader = ({ profile_pic, matchingUser }: ComposePostType) => {
    console.log("matchingUser2: ", matchingUser);
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
                className="flex absolute top-[35%] w-full h-1/2 items-center gap-4 px-8"
            >
                <div className="flex gap-4 pl-2 justify-start items-center w-full">
                    <div className="outline rounded-full outline-4">
                    <Avatar profile_pic={matchingUser.profile_pic} w={120} h={48} page="profile"/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col">
                            <h3>Bekir Simsek</h3>
                            <small>
                                @{matchingUser.username}
                            </small>
                        </div>
                        <div className="flex justify-start items-center w-full">
                            <small className="pr-1">
                                Lefkosia, <span>Cyprus</span>
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
                className="absolute top-[75%] w-full h-1/5 bg-pink-500 bg-opacity-0"
            ></div>
        </section>
    );
};

export default ProfileHeader;
