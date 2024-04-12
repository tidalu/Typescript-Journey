import fetch from "node-fetch";

class SelectorResult {
  #elements
  constructor(elements: NodeListOf<Element>) {
    this.#elements = elements
  }
  html(contents: string) {
    this.#elements.forEach(el => {
      el.innerHTML = contents
    })
  }
  on<K extends keyof HTMLElementEventMap>(eventName: K,
    cb: (event: HTMLElementEventMap[K]) => any) {
    this.#elements.forEach(el => {
      // typeguard
      const htmlElem = el as HTMLElement
      htmlElem.addEventListener(eventName, cb)
    })
  }
  show() {
    this.#elements.forEach(el => {
      // typeguard
      const htmlElem = el as HTMLElement
      htmlElem.style.visibility = 'visible'
    })
  }
  hide() {
    this.#elements.forEach(el => {
      // typeguard
      const htmlElem = el as HTMLElement
      htmlElem.style.visibility = 'hidden'
    })
  }
}


function $(selector: string) {
  return new SelectorResult(
    document.querySelectorAll(selector)
  )
}

namespace $ {
  export function ajax({ url, successCb } : { url: string, successCb: (data: any) => void }): any {
    return fetch(url)
      .then(resp => resp.json())
      .then(successCb)
  }
}
// $("button.continue").html('Next Step...')

// const hiddenBox = $("#banner-message")

// $("#button-container button").on("click", (event) => {
//   hiddenBox.show()
// })
 
// $.ajax({
//   url: "https://jsonplaceholder.typicode.com/posts/33",
//   success: (result) => {
//     $("#post-info").html(
//       "<strong>" + result.title + "</strong>" + result.body
//     )
//   },
// })

export default $;


