import type { NextPage } from "next";
import Head from "next/head";
import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Skills from "../components/home/Skills";
import CurrentWork from "../components/home/CurrentWork";
import Footer from "../components/home/Footer";
import BlogPosts from "../components/home/BlogPosts";
import axios from "axios";

const Home: NextPage = ({ posts }: any) => {
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
          <BlogPosts posts={posts || []} />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  const data = await axios.get("https://dev.to/api/articles?username=wiker");
  const posts = data.data
    .map((post: any) => {
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
    .slice(0, 3);
  return { props: { posts } };
}

export default Home;
