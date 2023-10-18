"use client";
import Image from "next/image";
import Link from "next/link";

export default function AnomalieLogo() {
    return (
        <Link href="/">
            <Image
                src={"/anomalie-transparent-logo.png"}
                alt="Anomalie Logo" // Add a descriptive alt text here
                width={100}
                height={100}
                className="w-full h-full"
            />
        </Link>
    );
}
