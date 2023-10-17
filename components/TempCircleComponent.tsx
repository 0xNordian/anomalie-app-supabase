import React, { useState } from "react";
import { Avatar, AvatarGroup } from "@nextui-org/react";

export default function CirclesComponent() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <AvatarGroup
            isBordered
            max={3}
            className={`${isHovered ? "pl-2" : ""} transition-all duration-300 ease-in-out`}
        >
            <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                size="sm"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            />
            <Avatar
                src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                size="sm"
            />
            <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size="sm"
            />
            <Avatar
                src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                size="sm"
            />
            <Avatar
                src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                size="sm"
            />
            <Avatar
                src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                size="sm"
            />
        </AvatarGroup>
    );
}
