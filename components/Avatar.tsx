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
    return (
        <Image
            // className="w-6 h-6"
            src={`${profile_pic}`}
            alt="User Avatar"
            width={48}
            height={48}
        />
    );
};

export default Avatar;
