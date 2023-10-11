import { ReactElement } from "react";

// insertEmoji.js
const { createServerActionClient } = require("@supabase/supabase-js");

const supabase = createServerActionClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
);

exports.handler = async (event) => {
    try {
        const { selectedEmoji, postId, userId } = JSON.parse(event.body);

        const { data, error } = await supabase.rpc("insertEmoji", {
            selectedEmoji,
            postId,
            userId,
        });

        if (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Error inserting emoji" }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error inserting emoji" }),
        };
    }
};
