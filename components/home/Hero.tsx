import { ChevronRightIcon } from "@heroicons/react/solid";
import { Canvas } from "@react-three/fiber";
import React from "react";
import Box from "../threejs/Box";

export default function Hero() {
  return (
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
              Web and mobile developer passionate about building the experiences
              of the future.
            </p>
            <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Currently working as a Sales Engineer at
              <a href={"https://vercel.com"} className="font-bold text-white">
                {" "}
                Vercel
              </a>
            </p>
          </div>
        </div>
        <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
          <Canvas className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none">
            <pointLight position={[10, 10, 10]} />
            <Box position={[0, 0, 0]} />
          </Canvas>
        </div>
      </div>
    </div>
  );
}
