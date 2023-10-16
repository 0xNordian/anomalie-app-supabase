export type UserSessionType = {
        id: string;
        aud: string;
        role: string;
        email: string;
        email_confirmed_at: string;
        app_metadata: {
            provider: string;
            providers: string[];
        };
        confirmation_sent_at: string;
        confirmed_at: string;
        created_at: string;
        identities: Array<any>; // You can provide a more specific type if needed
        last_sign_in_at: string;
        phone: string;
        updated_at: string;
        user_metadata: Record<string, any>;
};