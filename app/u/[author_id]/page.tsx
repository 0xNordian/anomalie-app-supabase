import AppLayout from "@/app/layouts/page";
import ComposePost from "@/components/compose-post";
import ProfileFeed from "@/components/profileFeed";

const AuthorPage = () => {
    return (
      <div className="w-full flex flex-col items-center">
        <AppLayout>
            {/* <ComposePost profile_pic={"picplaceholder"} /> */}
            <ProfileFeed type={"profile"}/>
        </AppLayout>
      </div>
    );
};

export default AuthorPage;
