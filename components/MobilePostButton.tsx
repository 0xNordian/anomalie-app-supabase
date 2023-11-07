import { Button } from "@nextui-org/react";

import PostModal from "@/components/PostModal";
import { addPost } from "@/utils/addPost";

type MobilePostButtonProps = {
    session: any;
    userProfilePic: string | null;
    matchingUser: any;
};

export default function MobilePostButton({ session, userProfilePic, matchingUser }: MobilePostButtonProps) {
    return (
        <div className="flex gap-4 items-center mobile-post-button lg:hidden">

            <PostModal
                profile_pic={matchingUser.profile_pic}
                modalTitle={"Create Post"}
                btnMsg={"Post"}
                type={"post"}
                addPost={addPost}
            />
            {/* <Button
                isIconOnly
                color="warning"
                variant="faded"
                aria-label="Take a photo"
            >
                <CameraIcon />
            </Button> */}
        </div>
    );
}
