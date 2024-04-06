import ASScroll from "@ashthornton/asscroll";
import { gsap as NpmGsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

export function scrollInstance() {
  NpmGsap.registerPlugin(ScrollTrigger, CustomEase);

  var ease1 = CustomEase.create("ease1", "0.165, 0.84, 0.44, 1");
  var ease2 = CustomEase.create("ease2", "M0,0 C0.496,0.004 0,1 1,1");

  return {
    gsap: NpmGsap,
    ease1,
    ease2,
  };
}

export function init() {
  const { gsap, ease1, ease2 } = scrollInstance();

  const pageElement: HTMLElement = document.querySelector(
    ".page"
  ) as HTMLElement;
  const containerElement: HTMLElement = document.querySelector(
    ".my-container"
  ) as HTMLElement;

  const asscroll = new ASScroll({
    containerElement: containerElement,
    scrollElements: pageElement,
    touchScrollType: "scrollTop",
    limitLerpRate: true,
    disableRaf: true,
    //touchEase: 0.7,
    ease: 0.12,
  });
  //use the raf of gsap
  gsap.ticker.add(asscroll.update);

  ScrollTrigger.defaults({
    scroller: asscroll.containerElement,
  });

  ScrollTrigger.scrollerProxy(asscroll.containerElement, {
    scrollTop(value) {
      return arguments.length
        ? (asscroll.currentPos = value)
        : asscroll.currentPos;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  asscroll.on("update", ScrollTrigger.update);
  ScrollTrigger.addEventListener("refresh", asscroll.resize);

  window.addEventListener("load", () => {
    asscroll.enable();
  });
  // cubic-bezier(0.22, 1, 0.36, 1)

  window.addEventListener("resize", () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    asscroll.resize({ width, height });
    ScrollTrigger.update();
  });

  return {
    asscroll,
    gsap,
    ease1,
    ease2,
  };
}
