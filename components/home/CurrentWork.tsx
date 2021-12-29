import React from "react";

export default function CurrentWork() {
  return (
    <div className=" bg-black relative pt-10">
      <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
        <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
          <div>
            <div className="pt-6">
              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                What am I working on?
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                I am currently working on a side-project to help sharpen both my
                Web3 skills and getting to play with the three.js ecosystem.
                I&apos;m building a basic 3D game using{" "}
                <a
                  className={"text-gray-300"}
                  href={
                    "https://docs.pmnd.rs/react-three-fiber/getting-started/introduction"
                  }
                >
                  React-three-fiber
                </a>
                {" and "}
                <a className={"text-gray-300"} href={"https://nextjs.org/"}>
                  Next.js,
                </a>{" "}
                and then building a token and NFT game ecosystem around it based
                on the{" "}
                <a
                  className={"text-gray-300"}
                  href={"https://polygon.technology/"}
                >
                  Polygon Network
                </a>{" "}
                and{" "}
                <a className={"text-gray-300"} href={"https://hardhat.org/"}>
                  Hardhat.
                </a>{" "}
                I&apos;m still in the initial stages of building the game, but
                hopefully I&apos;ll have a working prototype in the near future.
              </p>
              <div className="mt-6">
                <a
                  href="#"
                  className="inline-flex px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-400 hover:bg-orange-500"
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
                  &ldquo;Whereas most technologies tend to automate workers on
                  the periphery doing menial tasks, blockchains automate away
                  the center. Instead of putting the taxi driver out of a job,
                  blockchain puts Uber out of a job and lets the taxi drivers
                  work with the customer directly.&rdquo;
                </p>
              </div>
              <footer className="mt-3">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <img
                      className="h-6 w-6 rounded-full"
                      src="https://pbs.twimg.com/profile_images/977496875887558661/L86xyLF4_400x400.jpg"
                      alt=""
                    />
                  </div>
                  <div className="text-base font-medium text-white">
                    Vitalik Buterin, Co-Founder of Ethereum
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
              src="https://blogs-images.forbes.com/erikkain/files/2018/04/41191074732_9b01fd89cb_k.jpg"
              alt="Inbox user interface"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
