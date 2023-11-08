'use client'

import supabase from '@/utils/supabase'
import { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'
import { UserTypes } from '@/types/userTypes'
import { FormEvent } from 'react'
import { UserSessionType } from '@/types/UserSession'

type UpdateFullNameType = {
    handleUpdateProfile: (
        newUsername: string,
        newFullName: string,
        newLocation: string,
    ) => void
    userSession: {
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
        identities: Array<any>
        last_sign_in_at: string
        phone: string
        updated_at: string
        user_metadata: Record<string, any>
    }
}

const UpdateUserProfile = ({
    userSession,
    handleUpdateProfile,
}: UpdateFullNameType) => {
    const [users, setUsers] = useState<UserTypes[]>([])
    const [userSessionId, setUserSessionId] = useState<string>('')
    const [currentUsername, setCurrentUsername] = useState('')
    const [currentFullName, setCurrentFullName] = useState('')
    const [currentUserLocation, setCurrentUserLocation] = useState('')

    useEffect(() => {
        if (!userSession) {
            console.error('No user session provided')
            return
        }
    }, [userSession])

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data: user, error } = await supabase
                    .from('users')
                    .select('*')
                if (user === null) {
                    setUsers([])
                } else {
                    setUsers(user as UserTypes[])
                }
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchUserData()

        try {
            setUserSessionId(userSession.id)
        } catch (error) {
            console.error('Error fetching session:', error)
            return () => {}
        }
        return () => {}
    }, [])

    useEffect(() => {
        // Look up the user once when users or userSessionId changes
        const filteredUser = users.find((user) => user.id === userSessionId) as
            | { username: string; full_name: string; user_location: string }
            | undefined

        console.log('filteredUser id: ', filteredUser)

        // Set the currentUsername and currentFullName state with the filtered data
        if (filteredUser) {
            setCurrentUsername(filteredUser.username)
            setCurrentFullName(filteredUser.full_name)
            setCurrentUserLocation(filteredUser.user_location)
        } else {
            // Set both to an empty string if no matching user
            setCurrentUsername('')
            setCurrentFullName('')
            setCurrentUserLocation('')
        }

        // console.log("users: ", users);
        return () => {}
    }, [users, userSessionId])

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        handleUpdateProfile(
            currentUsername,
            currentFullName,
            currentUserLocation,
        )
    }

    //!    (id = auth.uid())

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="flex w-full flex-col items-start justify-center gap-6 p-6">
                    <div className="flex w-full flex-col gap-2">
                        <div className="flex w-10/12 flex-col gap-1 sm:w-1/3">
                            <label htmlFor="newUsername">Username</label>
                            <input
                                value={currentUsername}
                                onChange={(e) =>
                                    setCurrentUsername(e.target.value)
                                }
                                name="newUsername"
                                id="newUsername"
                                placeholder="New Username"
                                className="rounded-md p-2 text-black "
                            />
                        </div>
                        <div className="flex w-10/12 flex-col gap-1 sm:w-1/3">
                            <label htmlFor="newFullName">Full Name</label>
                            <input
                                value={currentFullName}
                                onChange={(e) =>
                                    setCurrentFullName(e.target.value)
                                }
                                name="newFullName"
                                id="newFullName"
                                placeholder="New FullName"
                                className="rounded-md p-2 text-black"
                            />
                        </div>
                        <div className="flex w-10/12 flex-col gap-1 sm:w-1/3">
                            <label htmlFor="newUserLocation">Location</label>
                            <input
                                value={currentUserLocation}
                                onChange={(e) =>
                                    setCurrentUserLocation(e.target.value)
                                }
                                name="newUserLocation"
                                id="newUserLocation"
                                placeholder="New UserLocation"
                                className="rounded-md p-2 text-black"
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        color="primary"
                        className="w-1/12 bg-anomalie-cyan text-anomalie-dark-blue"
                    >
                        Save
                    </Button>
                </div>
            </form>
        </>
    )
}

export default UpdateUserProfile
