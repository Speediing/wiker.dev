import type { NextPage } from "next";
import Head from "next/head";
import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Skills from "../components/home/Skills";
import CurrentWork from "../components/home/CurrentWork";
import Footer from "../components/home/Footer";
import BlogPosts from "../components/home/BlogPosts";
import { useEffect, useState } from "react";
import axios from "axios";

const Home: NextPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://dev.to/api/articles?username=wiker").then((res) => {
      console.log(res.data);
      setData(
        res.data.map((post: any) => {
          return {
            title: post.title,
            href: post.url,
            category: { name: post.type_of, href: "#" },
            description: post.description,
            date: post.readable_publish_date,
            datetime: post.published_at,
            imageUrl: post.social_image,
            readingTime: `${post.reading_time_minutes} min`,
            author: {
              name: post.user.name,
              href: post.user.website_url,
              imageUrl: post.user.profile_image,
            },
          };
        })
      );
    });
  }, []);

  return (
    <div className="h-screen">
      <Head>
        <title>Jason Wiker</title>
        <meta name="description" content="Jason Wiker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative overflow-hidden">
        <main className="h-full pt-10 bg-black sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
          <Hero />
          <About />
          <Skills />
          <CurrentWork />
          <BlogPosts />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
