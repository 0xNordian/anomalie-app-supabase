"use client";

import { useEffect, useRef } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

const ComposePostTextArea = () => {
    const { pending } = useFormStatus();
    const alreadySent = useRef(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textAreaRef.current === null) return;

        if (!pending && alreadySent.current) {
            alreadySent.current = false;
            textAreaRef.current.value = '';
            return;
        }

        if (pending && !alreadySent.current) {
            alreadySent.current = true;
            textAreaRef.current.value = 'Sending...';
            return;
        }

        // alreadySent.current = pending;
    }, [pending]);
    return (
        <textarea
            ref={textAreaRef}
            name="content"
            rows={4}
            className="custom-textarea"
            placeholder="What is on your mind?"
        ></textarea>
    );
};

export default ComposePostTextArea;
