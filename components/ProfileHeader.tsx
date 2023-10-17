"use client";
import Avatar from "@/components/Avatar";
import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";
import CircleComponent from "./TempCircleComponent";

type ComposePostType = {
    profile_pic: string | null;
};

const ProfileHeader = ({ profile_pic }: ComposePostType) => {
    return (
        <section className="h-[500px] w-full relative">
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
                    <Avatar profile_pic={profile_pic} w={120} h={48} />
                    <div className="flex flex-col">
                        <h3>Bekir Simsek</h3>
                        <div className="flex justify-center items-center w-full">
                            <CiLocationOn className="flex justify-center items-center h-5 w-5" />
                            <div className="px-2">
                                Lefkosia, <span>Cyprus</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 w-full h-full items-center justify-end">
                    <small>255 connections</small>
                    <CircleComponent />
                </div>
            </div>
            <div
                id="profileHashtags"
                className="absolute top-[85%] w-full h-1/2 bg-pink-500"
            ></div>
        </section>
    );
};



export default ProfileHeader;
