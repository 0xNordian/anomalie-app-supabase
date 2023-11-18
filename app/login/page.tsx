import Link from "next/link";
import Messages from "./messages";
import AnomalieLogo from "@/components/AnomalieLogo";
import styles from './Login.module.css'
// import { getUserSession } from "@/utils/userSessionUtils";

export default async function Login() {
    return (
        <div className={`${styles.bgLogin} flex-1 flex flex-col w-screen px-8 sm:max-w-md xl:max-w-none justify-center gap-2`}>
        {/* <div className="flex-1 flex flex-col w-screen px-8 sm:max-w-md justify-center gap-2"> */}
            {/* <Link
            href="/"
            className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-anomalie-dark-blue hover:bg-btn-background-hover flex items-center group text-sm border-[1px] border-gray-400 border-opacity-20"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
                >
                    <polyline points="15 18 9 12 15 6" />
                </svg>{" "}
                Back
            </Link> */}
            <div className="flex flex-col items-center">
                <div className="w-1/2 flex justify-center mb-4">
                    <AnomalieLogo />
                </div>
                <form
                    className="flex-1 flex flex-col w-full xl:w-[450px] justify-center gap-2 text-foreground"
                    action="/auth/sign-in"
                    method="post"
                    >
                    <label className="text-md" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="rounded-md px-4 py-2 bg-inherit mb-6 border-[2px] border-gray-400 border-opacity-20"
                        name="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                        />
                    <label className="text-md" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="rounded-md px-4 py-2 bg-inherit mb-6 border-[2px] border-gray-400 border-opacity-20"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        autoComplete="password"
                        required
                        />
                    <button className="bg-anomalie-cyan rounded px-4 py-2 mb-2 text-anomalie-light-blue border-[1px] border-gray-400 border-opacity-20">
                        Sign In
                    </button>
                    <button
                        formAction="/auth/sign-up"
                        className="border-[1px] border-gray-400 border-opacity-20 rounded px-4 py-2 text-anomalie-white mb-2 bg-anomalie-dark-blue"
                        >
                        Sign Up
                    </button>
                    <Messages />
                </form>
            </div>
        </div>
    );
}
