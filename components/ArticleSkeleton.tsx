"use client";
import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

export default function ArticleSkeleton() {
    return (
        <Card
            className="w-[200px] space-y-5 p-4 hide-scrollbar overflow-y-scroll"
            radius="lg"
            classNames={{
                base: "bg-slate-500 bg-opacity-20",
            }}
        >
            <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300"></div>
            </Skeleton>
            <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
            </div>
        </Card>
    );
}
