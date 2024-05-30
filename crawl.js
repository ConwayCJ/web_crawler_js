import { JSDOM } from 'jsdom'

const normalizeURL = (url) => {
  const urlObj = new URL(url)
  console.log(url)
  let fullPath = `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}`
  if (fullPath.slice(-1) === '/') {
    fullPath = fullPath.slice(0, -1)
  }
  return fullPath
}

const getURLsFromHTML = (htmlBody, baseURL) => {

  const dom = new JSDOM(htmlBody)
  const anchors = dom.window.document.querySelectorAll("a")
  const urls = []

  anchors.forEach(anchor => {
    if (anchor.hasAttribute('href')) {
      let href = anchor.getAttribute('href')
      try {
        href = new URL(href, baseURL).href
        urls.push(href)
      } catch (e) {
        console.error(`${e.message}: ???  ${href}`)
      }
    }
  })  

  return urls
}

const getHTMLBody = async (rootURL) => {
  let res
  console.log(rootURL)
  try {
    res = await fetch(rootURL, {
      method: "GET"
    })
  } catch(err) {
    throw new Error(`Got Network error: ${err.message}`)
  }

  if (res.status >= 400) {
    console.error(`HTTP Error ${res.status} - ${res.statusText}`)
    return
  }

  const contentType = res.headers.get("content-type")
  if (!contentType || !contentType.includes("text/html")) {
    console.error("Non-HTML response: ", contentType)
    return
  }  

  const htmlBody = await res.text()
  return htmlBody
}

async function crawlPage (rootURL, currentURL = rootURL, pages = {}) {
  const currentURLObj = new URL(currentURL)
  const baseURLObj = new URL(rootURL)

  // if not same domain, exit
  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages
  }

  const normalizedURL = normalizeURL(currentURL)

  // increment the pages dict
  if (pages[normalizedURL] > 0) {
    pages[normalizedURL]++
    return pages
  }

  pages[normalizedURL] = 1
  
  // fetch/parse html of current URL
  const htmlBody = await getHTMLBody(normalizedURL)
  const urls = getURLsFromHTML(htmlBody, normalizedURL)

  // recur through pages links. get list of URL's from page - crawl all of them

  //I have to async the inner function of forEach lol
  urls.forEach(async (url) => {
    pages = await crawlPage(rootURL,url,pages)
  })
  
  for (const url of urls) {
    pages = await crawlPage(rootURL,url,pages)
  }

  //return
  return pages

}

export { normalizeURL, getURLsFromHTML, crawlPage }