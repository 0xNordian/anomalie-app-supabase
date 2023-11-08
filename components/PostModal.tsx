'use client'
import React, { useEffect } from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
} from '@nextui-org/react'
import ComposePostClient from '@/components/compose-post-client'
import { PiPencilDuotone } from 'react-icons/pi'
import { FaRegComment } from 'react-icons/fa'

type PostModalType = {
    profile_pic: string | null
    type?: 'post' | 'comment'
    post_id?: string
    btnMsg?: string
    modalTitle?: string
    addPost: (formData: FormData) => void
}

export default function PostModal({
    profile_pic,
    type,
    post_id,
    btnMsg,
    modalTitle,
    addPost,
}: PostModalType) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [backdrop, setBackdrop] = React.useState('opaque')
    const [modalType, setModalType] = React.useState('')
    const [windowWidth, setWindowWidth] = React.useState(0)

    const backdrops = ['blur']

    const handleOpen = (backdrop: string) => {
        setBackdrop(backdrop)
        onOpen()
    }

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth)
        }

        setWindowWidth(window.innerWidth)
        window.addEventListener('resize', handleWindowResize)

        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [])

    React.useEffect(() => {
        setModalType(type === 'comment' ? type : 'post')
    }, [type])

    return (
        <>
            {modalType === 'post' ? (
                windowWidth < 1024 ? (
                    <div
                        onClick={() => handleOpen('blur')}
                        className="bg-twitterColor flex h-full w-[80px] justify-center rounded-full bg-anomalie-cyan p-4 text-anomalie-dark-blue"
                    >
                        <PiPencilDuotone />
                    </div>
                ) : (
                    <div
                        onClick={() => handleOpen('blur')}
                        className="m-4 flex w-4/5 cursor-pointer flex-wrap justify-center gap-3 rounded-2xl bg-anomalie-cyan p-2 text-xl text-anomalie-dark-blue transition duration-200 hover:bg-opacity-70 xl:w-1/2"
                    >
                        {backdrops.map((b) => (
                            <button key={b}>{btnMsg}</button>
                        ))}
                    </div>
                )
            ) : (
                <div onClick={() => handleOpen('blur')} className="">
                    {backdrops.map((b) => (
                        <button key={b}>{/* <FaRegComment /> */}</button>
                    ))}
                </div>
            )}

            <Modal
                placement={'center'}
                backdrop={'blur'}
                isOpen={isOpen}
                onClose={onClose}
                size={'3xl'}
                classNames={{
                    body: 'bg-anomalie-light-blue backdrop-opacity-20',
                    base: 'bg-anomalie-light-blue',
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {modalTitle}
                            </ModalHeader>
                            <ModalBody>
                                {modalType === 'post' ? (
                                    <ComposePostClient
                                        profile_pic={profile_pic}
                                        addPost={addPost}
                                        onPress={onClose}
                                    />
                                ) : (
                                    <ComposePostClient
                                        profile_pic={profile_pic}
                                        addPost={addPost}
                                        onPress={onClose}
                                    />
                                )}
                            </ModalBody>
                            {/* <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter> */}
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
