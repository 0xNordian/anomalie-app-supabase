// // api/getUserData.js (or api/getUserData.ts)

// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// export default async function getUserData(req, res) {
//     try {
//         // Access cookies from the request headers and set up Supabase client
//         const supabase = createServerComponentClient({
//             cookies: req.headers.cookie,
//         });

//         // Fetch user data using Supabase
//         const { data: userData, error: userError } = await supabase.auth.getUser();

//         // Check for errors during user data retrieval
//         if (userError) {
//             throw new Error("Error fetching user data");
//         }

//         // Respond with the user data as JSON
//         res.status(200).json(userData);
//     } catch (error) {
//         // Handle errors gracefully and send an error response
//         res.status(500).json({ error: "Internal server error" });
//     }
// }
