'use client'
import Avatar from "./Avatar";
import ComposePostTextArea from "./compose-post-textarea";

type ComposePostType = {
    profile_pic: string | null;
    addPost: (formData: FormData) => void;
    onPress?: () => void;
};

export const dynamic = "force-dynamic";

const ComposePostClient = ({ profile_pic, addPost, onPress }: ComposePostType) => {
    const handleSubmit = async (formData: FormData) => {
        await addPost(formData);

        if (onPress) {
            onPress();
        }
    }
    return (
        <form
            action={handleSubmit}
            className="flex flex-1 flex-col gap-y-4 "
        >
            <div className="flex p-4 justify-center">
                <div className="scale-[100%]">
                <Avatar profile_pic={profile_pic} w={48} h={48}/>
                </div>
                <div className="flex flex-1 flex-col gap-y-4">
                    <ComposePostTextArea />
                    {/* <button className="post-button">Post</button>
                     */}
                    <button className="w-[90px] self-end rounded-2xl m-2 bg-twitterColor p-2 text-lg text-anomalie-dark-blue hover:bg-opacity-70 transition duration-200 bg-anomalie-cyan">
                        Post
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ComposePostClient;
