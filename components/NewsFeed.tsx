"use client";

import React, { useState, useEffect } from "react";
import ArticleSkeleton from "./ArticleSkeleton";

const rssFeeds = [
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@danielrizea",
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@karenworden",
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@davidbryson_82145",
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@regia-marinho",
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@evartology",
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@lizadonnelly",
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@christopherpjones",
];

interface Article {
    link: string;
    title: string;
    pubDate: string;
    thumbnail: string;
    author: string;
    categories: string[];
    content: string;
    description: string;
    enclosure: object;
    guid: string;
}

const NewsFeed = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const MAX_ARTICLES = 5;

    const shuffleArray = (array: any[]) => {
        // Shuffling algorithm (Fisher-Yates shuffle)
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    useEffect(() => {
        // const interval = setInterval(() => {
        //     loadRandomArticles();
        // }, 60000); // Refresh every minute

        // return () => clearInterval(interval);

        const loadRandomArticles = async () => {
            try {
                const fetchPromises = rssFeeds.map(async (feedUrl) => {
                    const response = await fetch(feedUrl, {
                        headers: { Accept: "application/json" },
                    });
                    const data = await response.json();
                    data && setIsLoaded(true);
                    return data.items.filter((item) => item.title.length > 0);
                });
    
                const articlesArrays = await Promise.all(fetchPromises);
    
                // Create a mixed array of articles by randomly selecting from each feed
                const mixedArticles = [];
                for (let i = 0; i < MAX_ARTICLES; i++) {
                    for (const articlesArray of articlesArrays) {
                        if (i < articlesArray.length) {
                            mixedArticles.push(articlesArray[i]);
                        }
                    }
                }
    
                // Shuffle the mixed articles
                const shuffledArticles = shuffleArray(mixedArticles);
    
                setArticles(shuffledArticles.slice(0, 5)); // Display two articles at a time
            } catch (error) {
                console.error("Error fetching or parsing RSS feed:", error);
            }
        };
        
        loadRandomArticles();
    }, []);

    return (
        <div className="flex flex-col items-center">
            <ul className="flex flex-col gap-4 w-full max-w-xl ">
                {!isLoaded ? (
                    Array.from({ length: MAX_ARTICLES }).map((_, index) => (
                        <ArticleSkeleton key={index} />
                    ))
                ) : articles.length > 0 ? (
                    articles.map((item, index) => (
                        <li
                            key={index}
                            className="p-4 rounded-md border-[1px] border-gray-400 border-opacity-10"
                        >
                            <div className="flex flex-col gap-4">
                                <img
                                    className="w-full object-cover rounded-md"
                                    src={item.thumbnail}
                                    alt={item.title}
                                />
                                <div className="flex flex-col gap-1 justify-between">
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xl text-blue-500 hover:underline"
                                    >
                                        {item.title}
                                    </a>
                                    <p className="text-gray-600">
                                        {item.author}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {new Date(
                                            item.pubDate
                                        ).toLocaleDateString()}
                                    </p>
                                    <small className="text-sm text-gray-500">
                                        #{item.categories.join(", #")}
                                    </small>
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-center text-gray-600">
                        No articles to display.
                    </p>
                )}
            </ul>
        </div>
    );
};

export default NewsFeed;
