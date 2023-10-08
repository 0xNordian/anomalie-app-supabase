// src/app/pages/page.tsx
import FetchPosts from "../utils/FetchPosts";

const Page = async () => {
    const posts = await FetchPosts();

    return (
        <div className="flex flex-col p-4 gap-4">
            {posts &&
                posts.map((post) => (
                    <div key={post.post_id} className="">
                        <div className="">
                            <p>Username: {post.username}</p>
                            <p className="">Content: {post.content}</p>
                            <p className="text-gray-400 text-sm">
                                Date: {post.created_at}
                            </p>
                            <p className="text-gray-400 text-sm">
                                Id: {post.post_id}
                            </p>
                            {/* <div className="">{JSON.stringify(post)}</div> */}
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Page;
