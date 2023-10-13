// // import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
// import { revalidatePath } from "next/cache";
// // import { supabase } from "@/utils/supabaseClient";
// import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";

// type UpdateUsernameType = {
//     currentUsername: string;
// };

// export const dynamic = "force-dynamic";

// const UpdateUsername = ({ currentUsername }: UpdateUsernameType) => {
//     const updateUsername = async (formData: FormData) => {
//         "use server"; // Server-side logic indicator

//         const supabase = createServerActionClient({ cookies });

//         const newUsername = formData.get("newUsername");
//         if (newUsername === null) return;

//         // Check if user is authenticated
//         const { data: user } = await supabase.auth.getUser();
//         if (user === null) return;

//         let { data: updatedUsers } = await supabase
//         .from("users")
//         .select("username")
//         .eq("id", user?.user?.id);

//         console.log("updatedUsers before: ", updatedUsers);

//         // Update username
//         await supabase
//             .from("users")
//             .update({ username: newUsername })
//             .eq("id", user?.user?.id)
//             .select();

//             console.log("newUsername: ", newUsername);
//             console.log("updatedUsers after: ", updatedUsers);

//         revalidatePath("/profile"); // Update the profile page
//     };

//     return (
//         <form
//             action={updateUsername}
//             className="flex flex-1 flex-col gap-y-4 border-x-[1px] border-b-[1px] border-gray-400 border-opacity-20"
//         >
//             <div className="flex p-4 justify-center">
//                 <div className="flex flex-1 flex-col gap-y-4">
//                     <input
//                         type="text"
//                         name="newUsername"
//                         placeholder="New Username"
//                         className="text-black p-2 rounded-md"
//                     />
//                     <button className="update-username-button">
//                         Update Username
//                     </button>
//                 </div>
//             </div>
//         </form>
//     );
// };

// export default UpdateUsername;

import { revalidatePath } from "next/cache";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const UpdateUsername = () => {
    const updateUsername = async (formData: FormData) => {
        "use server";
        const supabase = createServerActionClient({ cookies });

        const newUsername = formData.get("newUsername");
        if (newUsername === null) return;

        const { data: user } = await supabase.auth.getUser();
        if (user === null) return;

        try {
            const { data: newUsernameVar, error } = await supabase
                .from("users")
                .update({ username: newUsername })
                .eq("id", "a9de1889-1ee8-4628-9382-f6677ed5abee");


        } catch (error) {
            console.log("Exception caught: ", error);
        }
        revalidatePath("/settings");
    };

    return (
        <form
            action={updateUsername}
            className="flex flex-1 flex-col gap-y-4 border-x-[1px] border-b-[1px] border-gray-400 border-opacity-20"
        >
            <div className="flex p-4 justify-center">
                <div className="flex flex-1 flex-col gap-y-4">
                    <input
                        type="text"
                        name="newUsername"
                        placeholder="New Username"
                        className="text-black p-2 rounded-md"
                    />
                    <button type="submit" className="update-username-button">
                        Update Username
                    </button>
                </div>
            </div>
        </form>
    );
};

export default UpdateUsername;
