// app/u/[author_id]/page.tsx
import AppLayout from "@/app/layouts/page";
import NavBar from "@/components/NavBar";
import ComposePost from "@/components/compose-post";
import ProfileFeed from "@/components/profileFeed";

const AuthorPage = () => {
    return (
      <div className="w-full flex flex-col items-center">
        <NavBar />
        <AppLayout>
            <ComposePost profile_pic={"/icons/user.png"} /> 
            <ProfileFeed type={"profile"}/>
        </AppLayout>
      </div>
    );
};

export default AuthorPage;