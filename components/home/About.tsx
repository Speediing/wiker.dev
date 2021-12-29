import { CameraIcon } from "@heroicons/react/solid";
import Image from "next/image";
import React from "react";
import profilePic from "../../public/jason2.jpg";

export default function About() {
  return (
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
                  <Image
                    className="rounded-lg shadow-lg object-cover object-center"
                    alt="Jason leaning against a railing on a downtown street"
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
                  <span className="ml-2">Photograph by Simran Panag</span>
                </figcaption>
              </figure>
            </div>
          </div>
          <div className="mt-8 lg:mt-0">
            <div className="text-base max-w-prose mx-auto lg:max-w-none">
              <p className="text-lg text-gray-500">
                I've been working on the web professionally since 2017, and
                unprofessionally since 2012 when I blinked my first light with a
                Raspberry Pi.
              </p>
            </div>
            <div className="mt-5 prose prose-indigo text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
              <p>
                I consider myself a t-shaped individual. Over the years I have
                aquired experience in a variety of areas, from backend
                microservice developement to frontend mobile development to core
                platform infrastrcture. I have a passion for learning and
                constantly seek to improve my skills. I do however have specific
                interests in a few fields that I am most passionate about.
              </p>
              <br />
              <p>
                Currently I work as a Solution Architect where I act as a
                trusted advisor to clients for anything techncial in their
                digital transformation journey. I work with clients that range
                from small public sector organisations to large enterprise
                companies.
              </p>
              <br />
              <p>
                My main vertical is in application modernization where I take
                either old existing software or new grenfield ideas and
                transform them into modern custom applications.
              </p>
              <br />
              <p>
                This blog is a place where I can explore new ideas, experiment
                with different techniques, and muse on best practices. If you're
                interested in my thoughts on something, please let me know!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
