import React from "react";
import {
  GlobeAltIcon,
  LightningBoltIcon,
  CloudIcon,
  BeakerIcon,
} from "@heroicons/react/outline";

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

export default function Skills() {
  return (
    <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <svg
        className="hidden lg:block  absolute top-0 left-full transform -translate-x-1/2 -translate-y-3/4 lg:left-auto lg:right-full lg:translate-x-3/4 lg:translate-y-1/4"
        width={404}
        height={515}
        fill="none"
        viewBox="0 0 404 515"
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
          height={515}
          fill="url(#8b1b5f72-e944-4457-af67-0c6d15a99f38)"
        />
      </svg>

      <div className="relative lg:grid lg:grid-cols-3 lg:gap-x-8 ">
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
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
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
  );
}
