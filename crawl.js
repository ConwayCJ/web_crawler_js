import { JSDOM } from 'jsdom'

const normalizeURL = (url) => {
  const regex = /^(?:https?:\/\/)?(?:www\.)?([^\/]+)(\/[^?#]*)?.*$/
  const match = url.match(regex);

    if (match) {
      const domain = match[1]
      const path = match[2]
      return `${domain}${path}`
    }

  return url
}

const getURLsFromHTML = (htmlBody, baseURL) => {

  const dom = new JSDOM(htmlBody)
  const anchors = dom.window.document.querySelectorAll("a")
  const urls = []

  anchors.forEach(anchor => {
    if (anchor.hasAttribute('href')) {
      let href = anchor.getAttribute('href')

      try {
        let url = new URL(href, baseURL)
        urls.push(normalizeURL(url.href))
      } catch (e) {
        console.error(`${e.message}: ${href}`)
      }
    }
  })  
  return urls

}

export { normalizeURL, getURLsFromHTML }