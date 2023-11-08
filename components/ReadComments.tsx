import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Avatar from '@/components/Avatar'

type ReadCommentsTypes = {
    post_id: string
    profile_pic: string | null
}

type UserType = {
    id: string
    created_at: string
    username: string
    profile_pic: string | null
    full_name: string
    user_location: string
}

type CommentType = {
    comment_id: string
    created_at: string
    post_id: string
    parent_comment_id: string | null
    comment_content: string
    commenter_id: string
    users: UserType
}

export default async function ReadComments({
    post_id,
    profile_pic,
}: ReadCommentsTypes) {
    const supabase = createServerComponentClient({ cookies })

    let { data: comments, error } = await supabase
        .from('comments')
        .select('*, users(*)')
        .order('created_at', { ascending: false })
    console.log('comments: ', comments)
    const filteredComments = comments.filter(
        (comment: CommentType) => comment.post_id === post_id,
    )
    return (
        <>
            <>
                {filteredComments.map((comment: CommentType) => (
                    <div
                        key={comment.comment_id}
                        className="flex flex-col border-x-[1px] border-gray-400 border-opacity-20"
                    >
                        <div className="h-full w-full border-b-[1px] border-gray-400 border-opacity-20 p-6">
                            <div className="flex flex-col">
                                {comment.users && (
                                    <div className="flex">
                                        <div className="scale-[100%]">
                                            <Avatar
                                                profile_pic={
                                                    comment.users.profile_pic
                                                }
                                                w={48}
                                                h={48}
                                            />
                                        </div>
                                        <div className="ml-2 flex w-full flex-col items-center justify-center gap-2">
                                            <div className="flex w-full items-center justify-between pl-2">
                                                <div className="flex items-center gap-2">
                                                    <p>
                                                        @
                                                        {comment.users.username}
                                                    </p>
                                                    {/* <span
                                                    className="text-gray-400 text-sm hover:text-gray-500 cursor-help"
                                                    title={formatDate(
                                                        new Date(post.created_at)
                                                        )}
                                                        >
                                                        {formatElapsedTime(
                                                            new Date(post.created_at)
                                                            )}
                                                        </span> */}
                                                </div>
                                                <div>
                                                    {/* <BsThreeDots /> */}
                                                </div>
                                            </div>

                                            <p className="w-full break-all p-2">
                                                {comment.comment_content}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </>
        </>
    )
}
