"use client";

import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";

const LikeIcon: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered ? <FcLike /> : <AiOutlineHeart />}
        </div>
    );
};

export default LikeIcon;
