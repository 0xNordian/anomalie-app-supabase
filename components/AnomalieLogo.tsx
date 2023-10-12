"use client";
import Image from "next/image";

export default function AnomalieLogo() {
    return (
        <Image
            src={"/anomalie.png"}
            alt="Anomalie Logo" // Add a descriptive alt text here
            width={100}
            height={100}
            className="w-1/5"
        />
    );
}
