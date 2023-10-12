"use client";

import { ReactNode, useState } from "react";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    Button,
} from "@nextui-org/react";
import { type ReactionsType } from "@/types/reactionsTypes"

type ReactionProps = {
    reactions: Array<ReactionsType>;
    postId: string;
    reactionsCount: number | undefined,
};

export default function Reaction({ reactions, postId, reactionsCount }: ReactionProps) {
    {console.log(reactions, postId, reactionsCount)}
    const validReactions: (string | JSX.Element)[] = [
        "👍",
        <FcLike key="filledHeart"/>,
        "😂",
        "😲",
        "😢",
        "😡",
        "👎",
        <AiOutlineHeart key="emptyHeart"/>,
    ];
    const [reaction, setReaction] = useState<ReactNode>(<AiOutlineHeart />);

    const handleSetReaction = (emoji: string | JSX.Element) => {
        setReaction(emoji);
    };

    const content = (
        <PopoverContent>
            <div className="px-1 py-2">
                <div className="flex gap-3 text-[1.5rem]">
                    {validReactions.map((emoji) => (
                        <div
                            key={emoji.toString()}
                            onClick={() => handleSetReaction(emoji)}
                            // size="small"
                            className="transform scale-100 transition-transform hover:scale-125"
                        >
                            {emoji}
                        </div>
                    ))}
                </div>
            </div>
        </PopoverContent>
    );

    return (
        <div className="flex justify-center items-center gap-1">
                <Popover
                    placement={"top"}
                    className="bg-neutral-900"
                >
                    <PopoverTrigger>
                        <div
                            color="primary"
                            className="capitalize"
                        >
                            {reaction}
                        </div>
                    </PopoverTrigger>
                    {content}
                </Popover>
            <small className="text-xs">
                {/* <ReactionCounter reactions={reactions} postId={postId} /> */}
                <small>{reactionsCount}</small>
            </small>
        </div>
    );
}
