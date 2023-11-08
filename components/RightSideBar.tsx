import React from "react";
import NewsFeed from "./NewsFeed";
import Avatar from "./Avatar";

const RightSideBar = () => {
    return (
        <>
            <section className="w-[25%] sticky hidden top-2 overflow-y-auto mt-2 xl:flex flex-col items-stretch h-[90vh] overflow-x-hidden px-6">
                <div className="flex flex-col rounded-xl bg-anomalie-light-blue hide-scrollbar overflow-y-scroll">
                    <h3 className="font-bold text-xl my-4 px-4">
                        What’s happening
                    </h3>
                    <NewsFeed />
                    <div>
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i}></div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col rounded-xl bg-anomalie-light-blue my-4">
                    <h3 className="font-bold text-xl my-4 px-4">
                        Who to follow
                    </h3>
                    <div>
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div
                                key={i}
                                className="hover:bg-white/10 p-2 flex justify-start items-center last:rounded-b-xl transition duration-200"
                            >
                                <div className="flex items-center space-x-2">
                                    <div className="w-10 h-10 bg-transparent rounded-full flex-none">
                                        {/* <img src="http://localhost:3000/_next/image?url=%2Fanomalie-short-transparent.png&w=96&q=75" alt="" /> */}
                                        <Avatar
                                        profile_pic={"/anomalie-short-transparent.png"}
                                    />
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="font-bold text-white">
                                            {`User ${i + 1}`}
                                        </div>
                                        <div className="text-gray-500 text-xs">
                                        {`@user${i + 1}`}
                                        </div>
                                    </div>
                                </div>

                                <button className="scale-[50%] rounded-2xl px-4 py-2 w-[90px] text-lg text-anomalie-dark-blue hover:bg-opacity-70 transition duration-200 bg-anomalie-cyan">
                                    Follow
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default RightSideBar;
