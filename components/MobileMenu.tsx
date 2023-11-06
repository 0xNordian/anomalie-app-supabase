"use client";

import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
} from "@nextui-org/react";
import AnomalieLogo from "./AnomalieLogo";
import { NAVIGATION_ITEMS } from "./NavigationItems";
import { UserSessionType } from "@/types/UserSession";
import { UserTypes } from "@/types/userTypes";
import LogoutButton from "./LogoutButton";

type MobileMenuTypes = {
    session: UserTypes;
    user: UserSessionType;
};

export default function MobileMenu({session, user}: MobileMenuTypes) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    console.log("User: ", user);

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="lg:hidden"
                />
                <NavbarBrand>
                    <div className="">
                        <AnomalieLogo />
                    </div>
                </NavbarBrand>
            </NavbarContent>

            {/* <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Features
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link href="#" aria-current="page">
                        Customers
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Integrations
                    </Link>
                </NavbarItem>
            </NavbarContent> */}
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link href="#">Login</Link>
                </NavbarItem>
                <NavbarItem>
                    {/* <Button as={Link} color="primary" href="#" variant="flat">
                        Sign Up
                    </Button> */}
                    {user ? (
                    <div className="flex items-center gap-4">
                        Hey, {session.username}!
                    </div>
                ) : (
                    <Link
                        href="/login"
                        className="flex py-2 px-3 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
                    >
                        Login
                    </Link>
                )}
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu className="w-full md:w-[93%] mx-auto">
                {NAVIGATION_ITEMS.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            // color={
                            //     index === 2
                            //         ? "primary"
                            //         : index === menuItems.length - 1
                            //         ? "warning"
                            //         : "foreground"
                            // }
                            className="w-full text-white"
                            href={
                                item.title.toLocaleLowerCase() === "home"
                                    ? "/"
                                    : item.title.toLocaleLowerCase() ===
                                    "profile"
                                    ? `/u/${session.id}`
                                    : `/${item.title.toLowerCase()}`
                            }
                            size="lg"
                        >
                            {item.title}
                        </Link>
                    </NavbarMenuItem>
                ))}
                        <LogoutButton />

            </NavbarMenu>
        </Navbar>
    );
}
