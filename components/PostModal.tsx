'use client';
import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
} from "@nextui-org/react";
import ComposePostClient from "@/components/compose-post-client";

type PostModalType = {
    profile_pic: string | null;
};

export default function PostModal({profile_pic}: PostModalType) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [backdrop, setBackdrop] = React.useState("opaque");

    const backdrops = ["blur"];

    const handleOpen = (backdrop: string) => {
        setBackdrop(backdrop);
        onOpen();
    };

    return (
        <>
            <div
                onClick={() => handleOpen("blur")}
                className="flex flex-wrap gap-3 justify-center rounded-2xl m-4 bg-twitterColor p-4 text-xl text-anomalie-dark-blue hover:bg-opacity-70 transition duration-200 bg-anomalie-cyan cursor-pointer"
            >
                {backdrops.map((b) => (
                    <button key={b}>Post</button>
                ))}
            </div>
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
                                Create Post
                            </ModalHeader>
                            <ModalBody>
                                <ComposePostClient profile_pic={profile_pic}/>
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
