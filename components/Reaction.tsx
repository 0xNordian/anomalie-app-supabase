"use client";

import { ReactNode, useEffect, useState } from "react";
import supabase from "@/utils/supabase";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    Button,
} from "@nextui-org/react";
import { type ReactionsType } from "@/types/reactionsTypes";
import { UserSessionType } from "@/types/UserSession";

type ReactionProps = {
    authUser: UserSessionType;
    reactions: Array<ReactionsType>;
    postId: string;
    reactionsCount: number | undefined;
};

type ReactionInsertTypes = {
    postId: string;
    react_giver_user_id: string;
    emoji: string | JSX.Element;
};

export default function Reaction({
    authUser,
    reactions,
    postId,
    reactionsCount,
}: ReactionProps) {
    // {console.log(reactions, postId, reactionsCount)}
    // const validReactions: (string | JSX.Element)[] = [
    //     "👍",
    //     <FcLike key="filledHeart" />,
    //     "😂",
    //     "😲",
    //     "😢",
    //     "😡",
    //     "👎",
    //     <AiOutlineHeart key="emptyHeart" />,
    // ];
    const validReactions: { emoji: string | JSX.Element; key: string }[] = [
        { emoji: "👍", key: "thumbsUp" },
        { emoji: <FcLike key="filledHeart" />, key: "filledHeart" },
        { emoji: "😂", key: "laughing" },
        { emoji: "😲", key: "surprised" },
        { emoji: "😢", key: "crying" },
        { emoji: "😡", key: "angry" },
        { emoji: "👎", key: "thumbsDown" },
        { emoji: <AiOutlineHeart key="emptyHeart" />, key: "emptyHeart" },
    ];

    const [reaction, setReaction] = useState<ReactNode>(<AiOutlineHeart />);

    // const handleSetReaction = (emoji: string | JSX.Element) => {
    //     setReaction(emoji);
    // };
    // console.log("reactions authUSer: ", authUser.id);
    const handleAddReaction = async (
        // authUser: UserSessionType,
        postId: string,
        emoji: string | JSX.Element
    ): Promise<ReactionInsertTypes> => {
        console.log("handleAddReaction called");
        setReaction(emoji);
        const { data, error } = await supabase
            .from("reactions")
            .insert([
                {
                    post_id: postId,
                    react_giver_user_id: authUser.id,
                    emoji: emoji,
                },
            ])
            .select();

        console.log("handleAddReaction data/error: ", data, error);
        return data;
    };

    // const fetchData = async () => {
    //     const { data, error } = await supabase.from("reactions").select("*");
    //     if (error) {
    //         console.error("Error fetching data:", error);
    //     } else {
    //         console.log("Fetched data:", data);
    //     }
    // };

    // // Call the fetchData function to test the Supabase configuration
    // fetchData();

    const content = (
        <PopoverContent>
            <div className="px-1 py-2">
                <div className="flex gap-3 text-[1.5rem]">
                    {validReactions.map((reaction) => (
                        <div
                            key={reaction.key}
                            onClick={() =>
                                handleAddReaction(postId, reaction.emoji)
                            }
                            className="transform scale-100 transition-transform hover:scale-125"
                        >
                            {reaction.emoji}
                        </div>
                    ))}
                </div>
            </div>
        </PopoverContent>
    );

    return (
        <div className="flex justify-center items-center gap-1">
            <Popover placement={"top"} className="bg-neutral-900">
                <PopoverTrigger>
                    <div color="primary" className="capitalize">
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
