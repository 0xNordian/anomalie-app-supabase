import React from "react";
import Image from "next/image";

type ProfilePicType = {
    profile_pic: string | null;
    w?: number;
    h?: number;
    page?: "profile" | "feed";
};

const Avatar = ({ profile_pic, w = 48, h = 48, page }: ProfilePicType) => {
    if (profile_pic === null) {
        return page === "profile" ? (
            <Image
                src="/anomalie-short-transparent.png"
                alt="Default Avatar"
                width={120}
                height={48}
                className="bg-anomalie-dark-blue rounded-full"
            />
        ) : (
            <Image
                src="/anomalie-short-transparent.png"
                alt="Default Avatar"
                width={48}
                height={48}
            />
        );
    }

    return (
        <Image
            className={` rounded-full`}
            src={profile_pic}
            alt="User Avatar"
            width={`${w}`}
            height={`${h}`}
        />
    );
};

export default Avatar;

/*
    Unhandled Runtime Error
    TypeError: Cannot read properties of null (reading 'default')
    */
// return <Image src="/anomalie-short-transparent.png" alt="Default Avatar" width={48} height={48} />;
