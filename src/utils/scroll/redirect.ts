import type ASScroll from "@ashthornton/asscroll";

export function redirect(asscroll: ASScroll) {
  var hash = window.location.hash;

  if(!hash) {
    return
  }

  const target = document.querySelector(hash)

  if (!target) {
    return
  }
  const data = target.getBoundingClientRect()
  console.log(data, target);
  asscroll.scrollTo(data.top)



}
