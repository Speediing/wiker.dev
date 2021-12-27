import type { NextPage } from "next";
import { Canvas } from "@react-three/fiber";
import profilePic from "../public/jason2.jpg";

import { CameraIcon, ChevronRightIcon } from "@heroicons/react/solid";
import Head from "next/head";
import {
  GlobeAltIcon,
  LightningBoltIcon,
  CloudIcon,
  BeakerIcon,
} from "@heroicons/react/outline";

import Box from "../components/threejs/Box";
import Image from "next/image";
import Hero from "../components/home/hero";
import About from "../components/home/About";
import Skills from "../components/home/Skills";
import CurrentWork from "../components/home/CurrentWork";
import Footer from "../components/home/Footer";
import BlogPosts from "../components/home/BlogPosts";

const Home: NextPage = () => {
  return (
    <div className="h-screen ">
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
