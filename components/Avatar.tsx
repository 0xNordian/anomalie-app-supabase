// import React from "react";
// import Image from "next/image";

// type ProfilePicType = {
//     profile_pic: string | null;
//     w?: string;
//     h?: string;
// };

// const Avatar = ({ profile_pic, w, h }: ProfilePicType) => {
//     if (profile_pic === null) {
//         return (
//             <Image
//                 // className="w-8 h-8"
//                 src="/icons/user.png"
//                 alt="Default Avatar"
//                 width={48}
//                 height={48}
//             />
//         );
//     }
//     // console.log("Avatar profile_pic: ", profile_pic)
//     const width = w ? `w-${w}` : "w-11";
//     const height = h ? `h-${h}` : "h-10";
//     return (
//         <Image
//             className={`${width} ${height} rounded-full`}
//             src={profile_pic}
//             // src={`/icons/user.png`}
//             alt="User Avatar"
//             width={48}
//             height={48}
//         />
//     );
// };

// export default Avatar;

import React from "react";
import Image from "next/image";

type ProfilePicType = {
    profile_pic: string | null;
    w?: number;
    h?: number;
};

const Avatar = ({ profile_pic, w = 48, h = 48 }: ProfilePicType) => {
    if (profile_pic === null) {
        return <Image src="/icons/user.png" alt="Default Avatar" width={48} height={48} />;
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
