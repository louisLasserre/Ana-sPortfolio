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

  asscroll.scrollTo(data.top)



}

export function onClickTo(id: string) {

  const elements = document.querySelectorAll(`[${id}]`);

  if (!elements) {
    return
  }
  elements.forEach((element) => element.addEventListener('click', (e) => {
    e.preventDefault()


    window.location.href = `/#${id}`

    location.reload()


  }))

}
