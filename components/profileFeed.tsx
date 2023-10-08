// src/app/pages/page.tsx
import FetchPosts from "../utils/FetchPosts";
import Avatar from "./Avatar";

const ProfileFeed = async () => {
    const posts = await FetchPosts();
    return (
        <div className="flex flex-col p-4 gap-4">
            {posts &&
                posts.map((post) => (
                    <div key={post.post_id} className="">
                        <div className="">
                            <Avatar profile_pic={post.users.profile_pic} />
                            <p>Username: {post.users.username}</p>
                            <p className="">Content: {post.content}</p>
                            <p className="text-gray-400 text-sm">
                                Date: {post.created_at}
                            </p>
                            <p className="text-gray-400 text-sm">
                                Id: {post.post_id}
                            </p>
                            {/* <div className="mt-4">
                                <pre>{JSON.stringify(post, null, 2)}</pre>
                            </div> */}
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default ProfileFeed;
