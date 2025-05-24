import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

function App() {
  let [showContent, setShowContent] = useState(false);
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  });

  useGSAP(() => {
    if (!showContent) return;

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-1",
      ease: "Expo.easeInOut",
    });

    gsap.to(".sky", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".character", {
      scale: 0.5,
      // x: "-25%",
      // y:"11%",
      bottom: "-50%",
      right: "-15%",
      // rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".text", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    const main = document.querySelector(".main");

    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(".main .text", {
        x: `${xMove * 0.4}%`,
      });
      gsap.to(".sky", {
        x: xMove,
      });
      gsap.to(".bg", {
        x: xMove * 1.7,
      });
    });

    const video = document.querySelector(".hero-main-video");
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Video playing");
          })
          .catch((error) => {
            console.warn("Autoplay failed:", error);
          });
      }
    }
  }, [showContent]);

  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {showContent && (
        <div className="main w-full rotate-[-10deg] scale-[1.7]">
          <div className="landing overflow-hidden relative w-full h-screen bg-black">
            <div className="navbar absolute top-0 left-0 z-[10] w-full py-10 px-10">
              <div className="logo flex gap-7">
                <div className="lines flex flex-col gap-[5px]">
                  <div className="line w-15 h-2 bg-white"></div>
                  <div className="line w-8 h-2 bg-white"></div>
                  <div className="line w-5 h-2 bg-white"></div>
                </div>
                <h3 className="text-4xl -mt-[8px] leading-none text-white">
                  Rockstar
                </h3>
              </div>
            </div>

            <div className="imagesdiv relative overflow-hidden w-full h-screen">
              {/* <img
                className="absolute sky scale-[1.5] rotate-[-20deg] top-0 left-0 w-full h-full object-cover"
                src="./sky.png"
                alt=""
              />
              <img
                className="absolute scale-[1.8] rotate-[-3deg] bg top-0 left-0 w-full h-full object-cover"
                src="./bg.png"
                alt=""
              /> */}
              <video
                className="hero-main-video absolute  scale-[1.5] rotate-[-3deg]  top-0 left-0 w-full h-full object-cover"
                autoplay
                muted
                loop
                playsinline
                src="/gta_video.mp4"
              ></video>
              <div className="text absolute top-20 left-1/2 -translate-x-1/2 scale-[1] rotate-[-10deg] flex flex-col gap-1 font-black text-shadow-lg">
                <h1 className="text-[5rem] leading-none -ml-40 bg-gradient-to-r  text-white bg-clip-text drop-shadow-[0_0_10px_rgba(255,0,255,0.8)]">
                  grand
                </h1>
                <h1 className="text-[5rem] leading-none -ml-25 bg-gradient-to-r  text-white bg-clip-text drop-shadow-[0_0_10px_rgba(0,255,255,0.7)]">
                  theft
                </h1>
                <h1 className="text-[5rem] leading-none -ml-30 bg-gradient-to-r  text-white bg-clip-text drop-shadow-[0_0_10px_rgba(255,100,255,0.9)]">
                  auto{" "}
                  <span className="ml-0.5 bg-gradient-to-r from-yellow-300 via-orange-500 to-pink-600 text-transparent bg-clip-text drop-shadow-[0_0_12px_rgba(255,200,0,0.9)]">
                    VI
                  </span>
                </h1>
              </div>

              <img
                className="absolute character -bottom-[150%] right-0 -translate-x-1/2  scale-[1.5] "
                src="./girlbg.png"
                alt=""
              />
            </div>
            <div className="btmbar text-white absolute bottom-0 left-0 w-full py-15 px-10 bg-gradient-to-t from-black to-transparent">
              <div className="flex gap-4 items-center scroll">
                <i className="text-4xl ri-arrow-down-line"></i>
                <h3 className="text-xl font-[Helvetica_Now_Display]">
                  Scroll Down
                </h3>
              </div>
              <img
                className="absolute h-[55px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ps-icon"
                src="./ps5.png"
                alt=""
              />
            </div>
          </div>
          <div className="w-full h-screen flex items-center justify-center bg-black">
            <div className="cntnr flex text-white w-full h-[80%] ">
              <div className="limg relative w-1/2 h-full">
                <img
                  className="absolute scale-[1] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  src="./image_2.png"
                  alt=""
                />
              </div>
              <div className="rg w-[30%] py-30  ">
                <h1 className="text-8xl">Still Running,</h1>
                <h1 className="text-8xl">Not Hunting</h1>
                {/* <p className="mt-10 text-xl font-[Helvetica_Now_Display] ">
                  Grand Theft Auto VI is an open-world action-adventure game set in the fictional city of Vice City, based on Miami. The game follows the story of three main characters: Michael, a former bank robber; Franklin, a street hustler; and Trevor, a violent psychopath. The game takes place in the year 2006, and the player must navigate the city's criminal underworld, complete with gang wars, corrupt cops, and ruthless drug dealers. The game features a nonlinear storyline, allowing the player to choose their own path and explore the city at their own pace. The game also features a variety of side missions and activities, such as racing, tennis, and yoga. The game is developed by Rockstar North and published by Rockstar Games.
                </p> */}
                <button className="bg-yellow-500 px-10 py-10 text-black mt-10 text-4xl">
                  Download Now
                </button>
              </div>
            </div>
          </div>
          <footer
            className="bg-black text-white p-10 text-center relative bottom-0 left-0 w-full"
            style={{ transform: "translate(0px, 100%)", zIndex: -1 }}
          >
            <div className="flex justify-center gap-10">
              <p>&copy; 2025 er-raj-aryan</p>
              <p>Designed and Developed by</p>
              <p>
                <a
                  href="https://github.com/er-raj-aryan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-500"
                >
                  er-raj-aryan
                </a>
              </p>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}

export default App;
