"use client";
import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
} from "@nextui-org/react";
import ComposePostClient from "@/components/compose-post-client";
import Comments from "@/components/Comments";
import { FaRegComment } from "react-icons/fa";

type PostModalType = {
    profile_pic: string | null;
    type?: "post" | "comment";
    post_id?: string;
    btnMsg?: string;
    modalTitle?: string;
};

export default function PostModal({
    profile_pic,
    type,
    post_id,
    btnMsg,
    modalTitle,
}: PostModalType) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [backdrop, setBackdrop] = React.useState("opaque");
    const [modalType, setModalType] = React.useState("");

    const backdrops = ["blur"];

    const handleOpen = (backdrop: string) => {
        setBackdrop(backdrop);
        onOpen();
    };

    React.useEffect(() => {
        setModalType(type === "comment" ? type : "post");
    }, [type]);

    return (
        <>
            {modalType === "post" ? (
                <div
                    onClick={() => handleOpen("blur")}
                    className="flex flex-wrap gap-3 justify-center rounded-2xl m-4 bg-twitterColor p-4 text-xl text-anomalie-dark-blue hover:bg-opacity-70 transition duration-200 bg-anomalie-cyan cursor-pointer"
                >
                    {backdrops.map((b) => (
                        <button key={b}>{btnMsg}</button>
                    ))}
                </div>
            ) : (
                <div onClick={() => handleOpen("blur")} className="">
                    {backdrops.map((b) => (
                        <button key={b}><FaRegComment /></button>
                    ))}
                </div>
            )}
            <Modal
                backdrop={"blur"}
                isOpen={isOpen}
                onClose={onClose}
                classNames={{
                    body: "bg-anomalie-light-blue backdrop-opacity-20",
                    base: "bg-anomalie-light-blue",
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {modalTitle}
                            </ModalHeader>
                            <ModalBody>
                                {modalType === "post" ? (
                                    <ComposePostClient
                                        profile_pic={profile_pic}
                                    />
                                ) : (
                                    // <Comments profile_pic={profile_pic} post_id={post_id}/>
                                    "Placeholder"
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
    );
}
