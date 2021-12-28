import axios from "axios";
import React, { useEffect, useState } from "react";

export default function BlogPosts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://dev.to/api/articles?username=wiker").then((res) => {
      setData(
        res.data.map((post: any) => {
          return {
            title: post.title,
            href: post.canonical_url,
            category: {
              name: post.tag_list.map((x: string) => `#${x}`).join(" "),
              href: "#",
            },
            description: post.description,
            date: post.readable_publish_date,
            datetime: post.published_at,
            imageUrl: post.social_image,
            readingTime: `${post.reading_time_minutes} min`,
            author: {
              name: post.user.name,
              href: "https://dev.to/wiker",
              imageUrl: post.user.profile_image,
            },
          };
        })
      );
    });
  }, []);

  const getCardColor = (index: number) => {
    switch (index) {
      case 0:
        return "bg-emerald-400";
      case 1:
        return "bg-sky-300";
      case 2:
        return "bg-pink-400";
      default:
        break;
    }
  };

  return (
    <div className="relative bg-black pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="absolute inset-0">
        <div className="bg-black h-1/3 sm:h-2/3" />
      </div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl tracking-tight font-extrabold text-white sm:text-4xl">
            From the blog
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            I write about web development, cloud, blockchain, and other topics.
          </p>
        </div>
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          {data.map((post: any, index: number) => (
            <div
              key={post.title}
              className="flex flex-col rounded-lg shadow-lg overflow-hidden"
            >
              <div className="flex-shrink-0">
                <img
                  className="h-48 w-full object-cover"
                  src={post.imageUrl}
                  alt=""
                />
              </div>
              <div
                className={`flex-1 ${getCardColor(
                  index
                )} p-6 flex flex-col justify-between`}
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {post.category.name}
                  </p>
                  <a href={post.href} className="block mt-2">
                    <p className="text-xl font-semibold text-gray-900">
                      {post.title}
                    </p>
                    <p className="mt-3 text-base text-black">
                      {post.description}
                    </p>
                  </a>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <a href={post.author.href}>
                      <span className="sr-only">{post.author.name}</span>
                      <img
                        className="h-10 w-10 rounded-full"
                        src={post.author.imageUrl}
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      <a href={post.author.href} className="hover:underline">
                        {post.author.name}
                      </a>
                    </p>
                    <div className="flex space-x-1 text-sm text-gray-900">
                      <time dateTime={post.datetime}>{post.date}</time>
                      <span aria-hidden="true">&middot;</span>
                      <span>{post.readingTime} read</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
