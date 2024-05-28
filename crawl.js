const normalizeURL = (url) => {
  const regex = /^(?:https?:\/\/)?(?:www\.)?([^\/]+)(\/[^?#]*)?.*$/
  const match = url.match(regex);

  try {
    if (match) {
      const domain = match[1]
      const path = match[2]
      return `${domain}${path}`
    }
    
  } catch (error) {
    console.log(error)
  }
 
  return url
}

export { normalizeURL }