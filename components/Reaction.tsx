"use client";

import { useState } from "react";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
import Like from '../../components/Like'
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    Button,
} from "@nextui-org/react";

export default function App() {
    const validReactions = ["👍", <FcLike />, "😂", "🫂", "😲", "😢", "😡", "👎"];

    const [reaction, setReaction] = useState(<AiOutlineHeart />);

    const handleSetReaction = (emoji: string) => {
        setReaction(emoji);
    };

    const content = (
        <PopoverContent>
            <div className="px-1 py-2">
                {/* <div className="text-small font-bold">Select Reaction</div> */}
                <div className="flex gap-2 text-[1.5rem]">
                    {validReactions.map((emoji) => (
                        <div
                            key={emoji}
                            onClick={() => handleSetReaction(emoji)}
                            size="small"
                            className="transform scale-100 transition-transform hover:scale-125"

                        >
                            {emoji}
                        </div>
                    ))}
                </div>
            </div>
        </PopoverContent>
    );

    const placements = ["top"];

    return (
        // <div className="flex flex-wrap md:inline-grid md:grid-cols-3 gap-4">
        <div className="flex">
            {placements.map((placement) => (
                <Popover key={placement} placement={placement} color="primary">
                    <PopoverTrigger>
                        <div
                            color="primary"
                            variant="flat"
                            className="capitalize"
                            trigger="hover"
                        >
                            {reaction}
                        </div>
                    </PopoverTrigger>
                    {content} 
                </Popover>
            ))}
        </div>
    );
}