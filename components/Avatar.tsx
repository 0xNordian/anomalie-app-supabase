import React from "react";
import Image from "next/image";

type ProfilePicType = {
    profile_pic: string | null;
};

const Avatar = ({ profile_pic }: ProfilePicType) => {
    if (profile_pic === null) {
        return (
            <Image
                // className="w-8 h-8"
                src="/icons/user.png"
                alt="Default Avatar"
                width={48}
                height={48}
            />
        );
    }
    // console.log("Avatar profile_pic: ", profile_pic)
    return (
        <Image
            className="w-10 h-10 rounded-full"
            src={profile_pic}
            // src={`/icons/user.png`}
            alt="User Avatar"
            width={48}
            height={48}
        />
    );
};

export default Avatar;
