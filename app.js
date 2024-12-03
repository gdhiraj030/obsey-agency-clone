const spanText = document.querySelector(".loader__title span");
console.log(spanText.textContent);
const videoContainer = document.querySelector(".video__container");
const videoPlay = document.querySelector(".video__play");
const myVideo = document.querySelector(".myvideo");
const coverImage = document.querySelector(".coverimage");
const play = document.querySelector(".play");
const pause = document.querySelector(".pause");
const cursor = document.querySelector("#cursor");

// main cursor animation
function maincursor() {
  let xscale = 1;
  let yscale = 1;

  let xpos = 0;
  let ypos = 0;

  let timeout;
  document.addEventListener("mousemove", (e) => {
    clearTimeout(timeout);
    let xdiff = Math.abs(e.clientX - xpos);
    let ydiff = Math.abs(e.clientY - ypos);
    xpos = e.clientX;
    ypos = e.clientY;

    xscale = gsap.utils.clamp(0.8, 1.2, xdiff / 100);
    yscale = gsap.utils.clamp(0.8, 1.2, ydiff / 100);

    gsap.to("#cursor", {
      x: e.clientX,
      y: e.clientY,
      scaleX: xscale,
      scaleY: yscale,
    });
    timeout = setTimeout(() => {
      gsap.to("#cursor", {
        scaleX: 1,
        scaleY: 1,
      });
    }, 100);
    // cursor.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
  });
}
maincursor();
// video function
function videoPlayAnimation() {
  videoContainer.addEventListener("mouseenter", () => {
    videoContainer.addEventListener("mousemove", (e) => {
      gsap.to(".video__play", {
        x: e.clientX - 600,
        y: e.clientY - 300,
      });
    });
  });
  videoContainer.addEventListener("mouseleave", () => {
    gsap.to(".video__play", {
      x: "50%",
      y: "50%",
    });
  });
  videoContainer.addEventListener("click", () => {
    if (myVideo.paused) {
      coverImage.style.opacity = "0";
      myVideo.play();
      pause.style.display = "block";
      play.style.display = "none";
    } else {
      myVideo.pause();
      pause.style.display = "none";

      play.style.display = "block";
    }
  });
}
videoPlayAnimation();

// loader
gsap.to("#loader", {
  y: "-100%",
  delay: 4.8,
  duration: 0.5,
});

// SMOOTH SCROLLING
function smoothScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
smoothScroll();

// MAGNETIC EFFECT NAVBAR
function magnetEffect() {
  Shery.makeMagnet(".nav__logo svg,.nav__menu li", {
    //Parameters are optional.
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
  });
}
magnetEffect();
// LOADER ANIMATION TIME COUNTER
function timer() {
  let counter = 0;
  let setTimer = setInterval(() => {
    if (counter < 100) {
      counter++;
      spanText.textContent = counter;
    } else {
      // counter=counter
      clearInterval(setTimer);
    }
  }, 45);
}
timer();
// goey effect
function gooeyEffect() {
  Shery.imageEffect(".image", {
    style: 6,
    // debug: true,
    gooey: true,
    config: {
      noiseDetail: { value: 7.44, range: [0, 100] },
      distortionAmount: { value: 2.98, range: [0, 10] },
      scale: { value: 36.36, range: [0, 100] },
      speed: { value: 0.79, range: [0, 1] },
      zindex: { value: 5 },
      aspect: { value: 0.8000000122070305 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 0 },
      noise_speed: { value: 0.2, range: [0, 10] },
      metaball: { value: 0.46, range: [0, 2] },
      discard_threshold: { value: 0.63, range: [0, 1] },
      antialias_threshold: { value: 0, range: [0, 0.1] },
      noise_height: { value: 0.53, range: [0, 2] },
      noise_scale: { value: 10, range: [0, 100] },
    },
  });
}
gooeyEffect();
