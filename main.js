import { crawlPage } from "./crawl.js"
import { report } from "./report.js"
const args = process.argv

async function main(url) {  
  let baseURL = process.argv[2]
  if (!baseURL.startsWith("https://")) {
    baseURL = "https://" + baseURL
  }

  if (args.length < 3) {
    console.error("Provide a website. Retry with 'npm run start -- <url>'")
    return
  }

  if (args.length > 3) {
    console.error("Too many arguments.")
    return
  }

  console.log(`Starting crawl of website: ${baseURL}`)
  const pages = await crawlPage(baseURL)

  report(pages)
}

main(args)