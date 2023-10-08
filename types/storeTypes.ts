export type PostTypes = {
    post_id: string;
    created_at: string;
    content: string;
    username: string;
    users: {
        username: string;
        profile_pic: string;
        created_at: string;
        id: string;
    }
};