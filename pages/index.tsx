import type { NextPage } from "next";
import * as THREE from "three";
import { useState, useRef, Suspense, useMemo } from "react";
import { Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";
import {
  Reflector,
  CameraShake,
  OrbitControls,
  useTexture,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import profilePic from "../public/jason2.jpg";

import {
  CameraIcon,
  ChevronRightIcon,
  InboxIcon,
} from "@heroicons/react/solid";
import Head from "next/head";
import {
  GlobeAltIcon,
  LightningBoltIcon,
  MailIcon,
  CloudIcon,
  BeakerIcon,
} from "@heroicons/react/outline";

import Box from "../components/threejs/Box";
import Image from "next/image";

const features = [
  {
    name: "Web and Mobile Development",
    description:
      "Designed and built websites and mobile apps for small businesses, startups and large corporations.",
    icon: GlobeAltIcon,
  },
  {
    name: "Cloud Architecture",
    description:
      "Tailored cloud solutions for businesses of all sizes, from data centers to private clouds.",
    icon: CloudIcon,
  },
  {
    name: "Leadership",
    description:
      "Lead teams of up to 10 people in the design, development and implementation of cloud solutions and application development.",
    icon: LightningBoltIcon,
  },
  {
    name: "Web3",
    description:
      "My new favorite technology, Ethereum, is the backbone of my web development and blockchain projects. I'm truly passionate about taking advantage of the power of the blockchain and powering the decentralized internet of the future.",
    icon: BeakerIcon,
  },
];

const posts = [
  {
    title: "Boost your conversion rate",
    href: "#",
    category: { name: "Article", href: "#" },
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
    readingTime: "6 min",
    author: {
      name: "Roel Aufderehar",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    title: "How to use search engine optimization to drive sales",
    href: "#",
    category: { name: "Video", href: "#" },
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro quaerat doloribus, eveniet dolore. Adipisci tempora aut inventore optio animi., tempore temporibus quo laudantium.",
    date: "Mar 10, 2020",
    datetime: "2020-03-10",
    imageUrl:
      "https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
    readingTime: "4 min",
    author: {
      name: "Brenna Goyette",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    title: "Improve your customer experience",
    href: "#",
    category: { name: "Case Study", href: "#" },
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.",
    date: "Feb 12, 2020",
    datetime: "2020-02-12",
    imageUrl:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
    readingTime: "11 min",
    author: {
      name: "Daniela Metz",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
];

const navigation = [
  {
    name: "GitHub",
    href: "https://github.com/Speediing",
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/jason-wiker/",
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
];

const Home: NextPage = () => {
  return (
    <div className="h-screen">
      <Head>
        <title>Jason Wiker</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" relative overflow-hidden">
        <main className="h-full">
          <div className="h-full pt-10 bg-black sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
            <div className="mx-auto max-w-7xl lg:px-8">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                  <div className="lg:py-24">
                    <a
                      href="https://dev.to/wiker"
                      className="inline-flex items-center text-white bg-gray-900 rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200"
                    >
                      <span className="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-orange-400 rounded-full">
                        I&apos;m Writing
                      </span>
                      <span className="ml-4 text-sm">Visit my blog</span>
                      <ChevronRightIcon
                        className="ml-2 w-5 h-5 text-gray-500"
                        aria-hidden="true"
                      />
                    </a>
                    <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                      <span className="block">Jason</span>
                      <span className="block text-orange-400">Wiker</span>
                    </h1>
                    <p className="mt-3 text-base text-gray-100 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                      Web and mobile developer specializing in cross-platform,
                      cloud-enabled, and Web3 application development
                    </p>
                    <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                      Currently working as a Solution Architect at
                      <a
                        href={"https://xerris.com"}
                        className="font-bold text-white"
                      >
                        {" "}
                        Xerris Inc.
                      </a>
                    </p>
                  </div>
                </div>
                <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
                  {/* <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0"> */}
                  {/* Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ */}
                  {/* <img
                      className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                      src="https://tailwindui.com/img/component-images/cloud-illustration-indigo-400.svg"
                      alt=""
                    /> */}
                  <Canvas className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none">
                    <pointLight position={[10, 10, 10]} />
                    <Box position={[0, 0, 0]} />
                  </Canvas>
                  {/* </div> */}
                </div>
              </div>
            </div>
            <div className="bg-black overflow-hidden">
              <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="hidden lg:block bg-black absolute top-0 bottom-0 left-3/4 w-screen" />
                <div className="mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none">
                  <div>
                    <h2 className="text-base text-orange-500 font-semibold tracking-wide uppercase">
                      Who am I?
                    </h2>
                    <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                      Meet Jason
                    </h3>
                  </div>
                </div>
                <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
                  <div className="relative lg:row-start-1 lg:col-start-2">
                    <svg
                      className="hidden lg:block absolute top-0 right-0 -mt-20 -mr-20"
                      width={404}
                      height={384}
                      fill="none"
                      viewBox="0 0 404 384"
                      aria-hidden="true"
                    >
                      <defs>
                        <pattern
                          id="de316486-4a29-4312-bdfc-fbce2132a2c1"
                          x={0}
                          y={0}
                          width={20}
                          height={20}
                          patternUnits="userSpaceOnUse"
                        >
                          <rect
                            x={0}
                            y={0}
                            width={4}
                            height={4}
                            className="text-gray-700"
                            fill="currentColor"
                          />
                        </pattern>
                      </defs>
                      <rect
                        width={404}
                        height={384}
                        fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)"
                      />
                    </svg>
                    <div className="relative text-base mx-auto max-w-prose lg:max-w-none">
                      <figure>
                        <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
                          {/* <img
                            className="rounded-lg shadow-lg object-cover object-center"
                            src="https://images.unsplash.com/photo-1546913199-55e06682967e?ixlib=rb-1.2.1&auto=format&fit=crop&crop=focalpoint&fp-x=.735&fp-y=.55&w=1184&h=1376&q=80"
                            alt="Whitney leaning against a railing on a downtown street"
                            width={1184}
                            height={1376}
                          /> */}
                          <Image
                            className="rounded-lg shadow-lg object-cover object-center"
                            alt="Whitney leaning against a railing on a downtown street"
                            width={1184}
                            height={1376}
                            src={profilePic}
                          />
                        </div>
                        <figcaption className="mt-3 flex text-sm text-gray-500">
                          <CameraIcon
                            className="flex-none w-5 h-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="ml-2">
                            Photograph by Simran Panag
                          </span>
                        </figcaption>
                      </figure>
                    </div>
                  </div>
                  <div className="mt-8 lg:mt-0">
                    <div className="text-base max-w-prose mx-auto lg:max-w-none">
                      <p className="text-lg text-gray-500">
                        Sagittis scelerisque nulla cursus in enim consectetur
                        quam. Dictum urna sed consectetur neque tristique
                        pellentesque. Blandit amet, sed aenean erat arcu morbi.
                      </p>
                    </div>
                    <div className="mt-5 prose prose-indigo text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
                      <p>
                        Sollicitudin tristique eros erat odio sed vitae,
                        consequat turpis elementum. Lorem nibh vel, eget pretium
                        arcu vitae. Eros eu viverra donec ut volutpat donec
                        laoreet quam urna.
                      </p>
                      <p>
                        Bibendum eu nulla feugiat justo, elit adipiscing. Ut
                        tristique sit nisi lorem pulvinar. Urna, laoreet fusce
                        nibh leo. Dictum et et et sit. Faucibus sed non gravida
                        lectus dignissim imperdiet a.
                      </p>
                      <p>
                        Dictum magnis risus phasellus vitae quam morbi. Quis
                        lorem lorem arcu, metus, egestas netus cursus. In.
                      </p>
                      <ul role="list">
                        <li>Quis elit egestas venenatis mattis dignissim.</li>
                        <li>
                          Cras cras lobortis vitae vivamus ultricies facilisis
                          tempus.
                        </li>
                        <li>
                          Orci in sit morbi dignissim metus diam arcu pretium.
                        </li>
                      </ul>
                      <p>
                        Rhoncus nisl, libero egestas diam fermentum dui. At quis
                        tincidunt vel ultricies. Vulputate aliquet velit
                        faucibus semper. Pellentesque in venenatis vestibulum
                        consectetur nibh id. In id ut tempus egestas. Enim sit
                        aliquam nec, a. Morbi enim fermentum lacus in. Viverra.
                      </p>
                      <h3>How we helped</h3>
                      <p>
                        Tincidunt integer commodo, cursus etiam aliquam neque,
                        et. Consectetur pretium in volutpat, diam. Montes, magna
                        cursus nulla feugiat dignissim id lobortis amet. Laoreet
                        sem est phasellus eu proin massa, lectus. Diam rutrum
                        posuere donec ultricies non morbi. Mi a platea auctor
                        mi.
                      </p>
                      <p>
                        Sagittis scelerisque nulla cursus in enim consectetur
                        quam. Dictum urna sed consectetur neque tristique
                        pellentesque. Blandit amet, sed aenean erat arcu morbi.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
              <svg
                className="hidden lg:block  absolute top-0 left-full transform -translate-x-1/2 -translate-y-3/4 lg:left-auto lg:right-full lg:translate-x-2/3 lg:translate-y-1/4"
                width={404}
                height={784}
                fill="none"
                viewBox="0 0 404 784"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="8b1b5f72-e944-4457-af67-0c6d15a99f38"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-700"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={784}
                  fill="url(#8b1b5f72-e944-4457-af67-0c6d15a99f38)"
                />
              </svg>

              <div className="relative lg:grid lg:grid-cols-3 lg:gap-x-8 pt-10 ">
                <div className="lg:col-span-1">
                  <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                    What are my skills?
                  </h2>
                </div>
                <dl className="mt-10 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:mt-0 lg:col-span-2">
                  {features.map((feature) => (
                    <div key={feature.name}>
                      <dt>
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-400 text-white">
                          <feature.icon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </div>
                        <p className="mt-5 text-lg leading-6 font-medium text-white">
                          {feature.name}
                        </p>
                      </dt>
                      <dd className="mt-2 text-base text-gray-300">
                        {feature.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
          <div className=" bg-black relative">
            <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
              <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
                <div>
                  {/* <div>
                    <span className="h-12 w-12 rounded-md flex items-center justify-center bg-green-500">
                      <InboxIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  </div> */}
                  <div className="pt-6">
                    <h2 className="text-3xl font-extrabold tracking-tight text-white">
                      What am I working on?
                    </h2>
                    <p className="mt-4 text-lg text-gray-500">
                      Semper curabitur ullamcorper posuere nunc sed. Ornare
                      iaculis bibendum malesuada faucibus lacinia porttitor.
                      Pulvinar laoreet sagittis viverra duis. In venenatis sem
                      arcu pretium pharetra at. Lectus viverra dui tellus ornare
                      pharetra.
                    </p>
                    <div className="mt-6">
                      <a
                        href="#"
                        className="inline-flex px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600"
                      >
                        View on Github
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <blockquote>
                    <div>
                      <p className="text-base text-gray-500">
                        &ldquo;Cras velit quis eros eget rhoncus lacus ultrices
                        sed diam. Sit orci risus aenean curabitur donec aliquet.
                        Mi venenatis in euismod ut.&rdquo;
                      </p>
                    </div>
                    <footer className="mt-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <img
                            className="h-6 w-6 rounded-full"
                            src="https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                            alt=""
                          />
                        </div>
                        <div className="text-base font-medium text-white">
                          Marcia Hill, Digital Marketing Manager
                        </div>
                      </div>
                    </footer>
                  </blockquote>
                </div>
              </div>
              <div className="mt-12 sm:mt-16 lg:mt-0">
                <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                  <img
                    className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                    src="https://tailwindui.com/img/component-images/inbox-app-screenshot-1.jpg"
                    alt="Inbox user interface"
                  />
                </div>
              </div>
            </div>
          </div>
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
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa
                  libero labore natus atque, ducimus sed.
                </p>
              </div>
              <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
                {posts.map((post) => (
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
                    <div className="flex-1 bg-orange-500 p-6 flex flex-col justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          <a
                            href={post.category.href}
                            className="hover:underline"
                          >
                            {post.category.name}
                          </a>
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
                            <a
                              href={post.author.href}
                              className="hover:underline"
                            >
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
        </main>
      </div>
      <footer className="bg-black">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">Jason Wiker</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
