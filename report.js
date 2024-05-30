const obj = {
  'https://wagslane.dev': 63,
  'https://wagslane.dev/tags': 62,
  'https://wagslane.dev/about': 62,
  'https://wagslane.dev/index.xml': 62,
  'https://wagslane.dev/tags/business': 1,
  'https://wagslane.dev/posts/dark-patterns': 2,
  'https://wagslane.dev/posts/things-i-dont-want-to-do-to-grow-business': 2,
  'https://wagslane.dev/tags/clean-code': 1,
  'https://wagslane.dev/posts/zen-of-proverbs': 2,
  'https://wagslane.dev/posts/func-y-json-api': 2,
  'https://wagslane.dev/posts/keep-your-data-raw-at-rest': 2,
  'https://wagslane.dev/posts/continuous-deployments-arent-continuous-disruptions': 3,  
  'https://wagslane.dev/posts/optimize-for-simplicit-first': 2,
  'https://wagslane.dev/tags/devops': 1,
  'https://wagslane.dev/posts/no-one-does-devops': 2,
  'https://wagslane.dev/posts/leave-scrum-to-rugby': 5,
  'https://wagslane.dev/posts/managers-that-cant-code': 4,
  'https://wagslane.dev/posts/kanban-vs-scrum': 4,
  'https://wagslane.dev/tags/education': 1,
  'https://wagslane.dev/posts/college-a-solution-in-search-of-a-problem': 2,
  'https://wagslane.dev/tags/golang': 1,
  'https://wagslane.dev/posts/guard-keyword-error-handling-golang': 2,
  'https://wagslane.dev/posts/gos-major-version-handling': 2,
  'https://wagslane.dev/posts/go-struct-ordering': 2,
  'https://wagslane.dev/tags/management': 1,
  'https://wagslane.dev/tags/philosophy': 1,
  'https://wagslane.dev/posts/what-a-crazy-religion': 2,
  'https://wagslane.dev/posts/a-case-against-a-case-for-the-book-of-mormon': 2,
  'https://wagslane.dev/tags/writing': 1,
  'https://wagslane.dev/posts/seo-is-a-scam-job': 2,
  'https://wagslane.dev/posts/collapsing-quality-of-devto': 2,
  'https://wagslane.dev/posts/developers-learn-to-say-no': 1
}

const report = (obj) => {
  console.log(`
  ========
   REPORT
  ========`)

  const sortable = Object.entries(obj)
    .sort(([,a],[,b]) => a - b)

  for (let i = sortable.length - 1; i > 0; i--) {
    const url = sortable[i][0]
    const count = sortable[i][1]
    console.log(`Found ${count} internal links to ${url}`)
  }
}

export { report }