// app/u/[author_id]/page.tsx
import AppLayout from "@/app/layouts/page";
import NavBar from "@/components/NavBar";
import ProfileHeader from "@/components/ProfileHeader";
import ComposePost from "@/components/compose-post";
import ProfileFeed from "@/components/profileFeed";
import { getUserSession } from "@/utils/userSessionUtils";

type AuthorPageType = {
    params: {
        author_id: string;
    };
};

const AuthorPage = async ({params}: AuthorPageType) => {
  const sessionData = await getUserSession(); 
  if (sessionData === null) return null;

  const { userProfilePic } = sessionData;

  return (
      <div className="w-full flex flex-col items-center">
        <NavBar />
        <AppLayout>
            <ProfileHeader profile_pic={userProfilePic}/>
            {/* <ComposePost profile_pic={userProfilePic} />  */}
            <ProfileFeed type={"profile"} author_id={params.author_id}/>
        </AppLayout>
      </div>
    );
};

export default AuthorPage;