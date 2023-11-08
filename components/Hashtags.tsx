import React from "react";
import { Chip } from "@nextui-org/react";
import { LiaHashtagSolid } from "react-icons/lia";

export default function Hashtags(
    {
        category
    } : {
        category: string
    }
) {
    return (
        <div className="flex gap-4 scale-[1] hover:scale-[105%] transition duration-200">
            <Chip
                startContent={<LiaHashtagSolid />}
                variant="faded"
                // color=""
                classNames={{
                    // base: "border-[2px] border-gray-400 border-opacity-20 text-gray-400 text-opacity-70"
                    base: "bg-transparent text-gray-400 text-opacity-70 border-[2px] border-gray-400 hover:border-anomalie-cyan border-opacity-20 shadow-pink-500/30 hover:text-anomalie-white",
                    content: "drop-shadow shadow-black text-gray-400 text-opacity-70 hover:text-anomalie-white",
                }}
            >
                {category}
            </Chip>
        </div>
    );
}
