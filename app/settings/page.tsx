import React, { useEffect } from 'react'
import AppLayout from '@/app/layouts/AppLayout'
import NavBar from '@/components/NavBar'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import UpdateUserProfile from '@/components/UpdateUserProfile'
import { revalidatePath } from 'next/cache'
import { getUserSession } from '@/utils/getUserSession'
import MobilePostButton from '@/components/MobilePostButton'

const supabase = createServerComponentClient({ cookies })

export const dynamic = 'force-dynamic'

type SettingsMobilePostButtonProps = {
    userProfilePic: string | null
    matchingUser: any
}

const Settings = async () => {
    const sessionData = await getUserSession()

    if (sessionData === null) {
        // Handle the case where getUserSession returns null.
        return <div>Error: Not logged in</div>
    }

    const { userProfilePic, matchingUser }: SettingsMobilePostButtonProps =
        sessionData

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (user === null) {
        return <div>Error: Not logged in</div>
    }

    const {
        data: { session },
    } = await supabase.auth.getSession()

    const handleUpdateProfile = async (
        newUsername: string,
        newFullName: string,
        newLocation: string,
    ) => {
        'use server'
        try {
            const { data, error } = await supabase
                .from('users')
                .update({
                    username: newUsername,
                    full_name: newFullName,
                    user_location: newLocation,
                })
                .eq('id', session.user.id)
                .select()

            revalidatePath('/settings')
            if (error) {
                console.error('Error updating:', error)
            } else {
                console.log('Updated data:', data)
            }
        } catch (error) {
            console.error('Error updating:', error)
        }
    }

    const userSession = user as {
        id: string
        aud: string
        role: string | undefined
        email: string
        email_confirmed_at: string
        app_metadata: {
            provider: string
            providers: string[]
        }
        confirmation_sent_at: string
        confirmed_at: string
        created_at: string
        identities: Array<any> // You can provide a more specific type if needed
        last_sign_in_at: string
        phone: string
        updated_at: string
        user_metadata: Record<string, any>
    }

    return (
        <div className="">
            <NavBar />
            <AppLayout>
                <div className="ml-6 p-2">
                    <h1 className="text-anomalie-white">Settings</h1>
                    <UpdateUserProfile
                        userSession={userSession}
                        handleUpdateProfile={handleUpdateProfile}
                    />
                </div>
                <MobilePostButton
                    session={session}
                    userProfilePic={userProfilePic}
                    matchingUser={matchingUser}
                />
                <div className="h-screen"></div>
            </AppLayout>
        </div>
    )
}

export default Settings
