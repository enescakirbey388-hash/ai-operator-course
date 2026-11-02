import type { CourseModule } from './types'

export const module2: CourseModule = {
  id: 'data',
  number: '02',
  title: 'Collect data without becoming a problem',
  tagline: 'APIs first. Then polite public pages. Never “whatever the site will give me.”',
  why: 'Scraping is a power tool. In the EU it sits next to copyright, ToS, and GDPR. This module teaches the technical loop and the legal brakes together.',
  lessons: [
    {
      id: 'd1',
      title: 'HTTP, HTML, and what a page actually is',
      minutes: 26,
      summary: 'A scraper is not magic. It is a program pretending to be a browser, poorly. You need to know the request.',
      video: {
        title: 'HTTP Crash Course (Traversy Media)',
        youtubeId: 'iYM2zFP3Zn0',
        minutes: 49,
        why: 'GET, headers, status codes, JSON vs HTML. This is the substrate of every collector you will write.',
      },
      body: [
        { type: 'p', text: 'When you open a shop page, your browser sends an HTTP request and gets a response: HTML, JSON, images, cookies. DevTools → Network is the most important research tool you have after a notebook. If you cannot explain the request, you are not ready to automate it.' },
        { type: 'h', text: 'What you are looking at' },
        { type: 'ul', items: [
          'URL + method (almost always GET for public read).',
          'Status: 200 ok, 404 missing, 429 slow down, 403 you are not welcome.',
          'Content-Type: text/html vs application/json. JSON APIs are easier and more stable than HTML.',
          'Many “pages” are empty shells; the real products load from an XHR/fetch call. That JSON endpoint is often the thing you wanted.',
        ] },
        { type: 'callout', kind: 'info', title: 'Operator habit', text: 'Before writing a line of collector code, reproduce one request in the browser Network tab and, if it is a public JSON API, in a simple fetch. If you cannot do it by hand, the script will only hide your confusion.' },
        { type: 'code', lang: 'ts', code: `const res = await fetch('https://httpbin.org/get')
const data = await res.json()
console.log(res.status, data.url)` },
        { type: 'p', text: 'HTML is a tree. CSS selectors (and tools like Cheerio) let you say “all product titles in this list.” Selectors break when the site redesigns. APIs break less often. That is why APIs come first.' },
        { type: 'task', title: 'Do this now', text: 'Open any public news homepage. DevTools → Network → Fetch/XHR. Find one JSON response. Write down the URL, status, and two field names. You just did 80% of “scraping” without a scraper.' },
      ],
      checkpoint: [
        {
          id: 'd1q1',
          prompt: 'A product grid is empty in View Source but full in the browser. Most likely:',
          options: [
            { id: 'a', text: 'The products are painted on the monitor.' },
            { id: 'b', text: 'JavaScript loads JSON after the HTML shell.' },
            { id: 'c', text: 'HTTP is deprecated.' },
            { id: 'd', text: 'You need a GPU.' },
          ],
          correct: 'b',
          explanation: 'SPA / client-render. Look at XHR, not just the first HTML document.',
        },
        {
          id: 'd1q2',
          prompt: 'You get HTTP 429. What does that tell you?',
          options: [
            { id: 'a', text: 'The page does not exist.' },
            { id: 'b', text: 'You are sending too many requests; back off.' },
            { id: 'c', text: 'Your JSON is invalid.' },
            { id: 'd', text: 'You won. Download faster.' },
          ],
          correct: 'b',
          explanation: '429 is rate limiting. A polite collector slows down. A rude one gets blocked and looks like an attack.',
        },
      ],
    },
    {
      id: 'd2',
      title: 'APIs before scrapers',
      minutes: 24,
      summary: 'If a documented API exists, using HTML parsing is usually malpractice.',
      video: {
        title: 'freeCodeCamp — Web Scraping with Python & Beautiful Soup',
        youtubeId: 'XVv6mJpFOb0',
        minutes: 68,
        why: 'Watch for the parsing loop (request → tree → fields). Then notice how much of this is unnecessary when an API exists. Pause often; do not binge.',
      },
      body: [
        { type: 'p', text: 'Order of operations for data: official export, official API, partner feed, then public HTML as a last resort. Marketplaces, ad platforms, Shopify, Search Console, Meta, Google Business — they already give you structured data if the client logs in. That is not scraping. That is access.' },
        { type: 'h', text: 'When HTML collection is even on the table' },
        { type: 'ul', items: [
          'The data is publicly visible without a login.',
          'You are not bypassing a paywall, captcha, or bot defence.',
          'robots.txt and terms do not forbid automated access (read both).',
          'You identify your client, throttle, cache, and store only what you need.',
          'You would be comfortable explaining the job to the site owner and to a lawyer.',
        ] },
        { type: 'h', text: 'A minimal, polite pattern' },
        { type: 'code', lang: 'ts', code: `// Conceptual pattern — use only on sites you may access.
async function getPublic(url: string) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'OperatorCourse/1.0 (research; contact@you.example)' },
  })
  if (res.status === 429) throw new Error('Rate limited — wait and retry')
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
  return res.text()
}` },
        { type: 'callout', kind: 'warn', title: 'Out of scope on purpose', text: 'This course will not teach you to defeat captchas, rotate residential proxies to hide, steal session cookies, bypass logins, or hit authenticated endpoints you do not own. That is not research. That is unauthorized access.' },
        { type: 'task', title: 'Do this now', text: 'List three data sources for a fashion client. For each, write: export / official API / public HTML / do not touch. Example: Shopify products = API. Competitor prices behind login = do not touch. CBS clothing expenditure = download the table.' },
      ],
      checkpoint: [
        {
          id: 'd2q1',
          prompt: 'Client wants competitor stock levels from a site that requires an account. Best response?',
          options: [
            { id: 'a', text: 'Create fake accounts and scrape hourly.' },
            { id: 'b', text: 'Reuse a friend’s login cookies.' },
            { id: 'c', text: 'Refuse the login-gated scrape; propose public ads, reviews, and their own inventory data instead.' },
            { id: 'd', text: 'Hire a botnet.' },
          ],
          correct: 'c',
          explanation: 'Authenticated data you do not own is not a DIY scraper job.',
        },
        {
          id: 'd2q2',
          prompt: 'Why prefer an official API over parsing HTML?',
          options: [
            { id: 'a', text: 'APIs are always free.' },
            { id: 'b', text: 'Stable fields, clearer terms, less breakage, less “are we allowed?” ambiguity.' },
            { id: 'c', text: 'HTML is illegal in the EU.' },
            { id: 'd', text: 'APIs cannot be rate limited.' },
          ],
          correct: 'b',
          explanation: 'Stability and permission. Cost is a separate question.',
        },
      ],
    },
    {
      id: 'd3',
      title: 'Law, robots.txt, GDPR — the brakes',
      minutes: 30,
      summary: 'In NL/BE, privacy and unfair commercial practice are not vibes. They are statutes.',
      video: {
        title: 'GDPR in 10 minutes (simple overview)',
        youtubeId: 'qFZqTHNcjLE',
        minutes: 10,
        why: 'You need the spirit of GDPR: personal data, purpose, minimisation, not “I found it so I can keep it.”',
      },
      body: [
        { type: 'p', text: 'This is not legal advice. It is operator literacy so you know when to stop and ask a lawyer. Three files matter before any collector: the site’s terms, robots.txt, and whether the data is about people.' },
        { type: 'h', text: 'robots.txt' },
        { type: 'p', text: 'robots.txt is a request, not a force field. Ignoring Disallow while hammering a server is still how you get blocked, sued, or both. If you are doing commercial research, treat Disallow as “do not.” Many sites allow / but forbid /cart or /admin — read the file.' },
        { type: 'code', lang: 'text', code: `User-agent: *
Disallow: /admin
Disallow: /cart
Allow: /products` },
        { type: 'h', text: 'GDPR in one page for operators' },
        { type: 'ul', items: [
          'Personal data: anything that identifies a person (email, handle + city, customer id, face).',
          'You need a lawful basis. “It was on the internet” is not automatically one.',
          'Minimisation: do not store profiles “in case.” Scrape the field you need, or none.',
          'Scraping LinkedIn profiles into a cold-email database is a classic way to get into trouble.',
          'Client customer lists they already have ≠ you harvesting strangers.',
        ] },
        { type: 'callout', kind: 'nlbe', title: 'NL/BE reality', text: 'The Autoriteit Persoonsgegevens (NL) and Gegevensbeschermingsautoriteit (BE) care about this. E-commerce clients are already nervous. If your method sounds like “we vacuumed 40.000 emails,” you will not close the deal — and you should not.' },
        { type: 'h', text: 'Copyright and databases' },
        { type: 'p', text: 'Product photos and copy are someone’s copyright. A price you saw may be a fact; republishing their entire catalogue as yours is not research. The EU database right can also apply to substantial extraction of a structured dataset. Collect for analysis in a private memo. Do not clone a shop.' },
        { type: 'task', title: 'Do this now', text: 'Open robots.txt on two sites you like (site.com/robots.txt). Write three paths that are allowed and three that are not. Then write one sentence on whether a commercial collector should proceed at all.' },
      ],
      checkpoint: [
        {
          id: 'd3q1',
          prompt: 'Which dataset is the most GDPR-sensitive?',
          options: [
            { id: 'a', text: 'CBS table of clothing expenditure by age group.' },
            { id: 'b', text: 'Public product titles from a shop’s catalogue page.' },
            { id: 'c', text: 'A spreadsheet of names, emails, and “interested in dresses” scraped from a Facebook group.' },
            { id: 'd', text: 'EUR to USD exchange rate.' },
          ],
          correct: 'c',
          explanation: 'Identified people + inferred interest. That is personal data collected for outreach.',
        },
        {
          id: 'd3q2',
          prompt: 'robots.txt Disallow: /search for User-agent: *. You want search-result pages. You should:',
          options: [
            { id: 'a', text: 'Scrape them anyway; robots.txt is optional for humans too.' },
            { id: 'b', text: 'Not automate those URLs. Use official search APIs or manual sampling.' },
            { id: 'c', text: 'Spoof Googlebot.' },
            { id: 'd', text: 'Use a screenshot farm at 100 requests/second.' },
          ],
          correct: 'b',
          explanation: 'Commercial operators treat Disallow as a stop sign.',
        },
      ],
    },
    {
      id: 'd4',
      title: 'A real collector: small, cached, explainable',
      minutes: 28,
      summary: 'If you cannot explain every request in a sentence, the script is too clever.',
      video: {
        title: 'JSON and APIs in 100 seconds (Fireship)',
        youtubeId: 'iiADhChRriM',
        minutes: 3,
        why: 'JSON is the shape you actually want. Keep this short video, then do the lab in the lesson.',
      },
      body: [
        { type: 'p', text: 'A professional collector has five properties: a written purpose, a seed list of URLs, delay + jitter, a cache so you do not re-hit, and a log. It fails loud on 403/429. It does not run 24/7 on a random VPS “just in case.”' },
        { type: 'h', text: 'Fields, not pages' },
        { type: 'p', text: 'Decide the schema first: { url, title, price, fetched_at }. Parse into that. Throw away the rest. This is data minimisation and it also makes the code readable.' },
        { type: 'code', lang: 'ts', code: `type Row = { url: string; title: string; price: string | null; fetched_at: string }

function parseProduct(html: string, url: string): Row {
  // Cheerio / DOMParser would go here.
  // Return only the schema. No extra blobs, no emails, no users.
  return { url, title: '', price: null, fetched_at: new Date().toISOString() }
}` },
        { type: 'h', text: 'Practice on sites that want you there' },
        { type: 'ul', items: [
          'httpbin.org, example.com, Wikipedia’s API, government open data, a site you own.',
          'JSONPlaceholder (fake API) to practice mapping fields.',
          'Your own Next/Vite app’s public pages.',
        ] },
        { type: 'callout', kind: 'practice', title: 'Lab (safe)', text: 'Do not point a new scraper at a live shop today. Use JSONPlaceholder: GET https://jsonplaceholder.typicode.com/posts and map id + title into a CSV. That is the whole technical motion: request, parse, schema, save. Tomorrow you can apply it where you have permission.' },
        { type: 'p', text: 'When a client asks “can you scrape this,” your answer is a checklist out loud: public?, login?, personal data?, robots/terms?, volume?, storage?, alternative API? Saying no is a skill. It is also how you stay hireable.' },
        { type: 'task', title: 'Do this now', text: 'Write a 10-line checklist you will paste into Slack before any collection job. Include: purpose, URL sample, login?, PII?, delay, cache path, delete-by date.' },
      ],
      checkpoint: [
        {
          id: 'd4q1',
          prompt: 'A collector should stop and alert a human when it sees:',
          options: [
            { id: 'a', text: 'HTTP 200 with expected JSON.' },
            { id: 'b', text: 'HTTP 403/429 or an HTML login form where JSON used to be.' },
            { id: 'c', text: 'A slightly new CSS class name on a caption.' },
            { id: 'd', text: 'Slow but successful responses.' },
          ],
          correct: 'b',
          explanation: 'Auth walls and blocks mean your assumption died. Do not brute-force past them.',
        },
        {
          id: 'd4q2',
          prompt: 'Why a schema before parsing?',
          options: [
            { id: 'a', text: 'So you only keep what the job needs and the code stays reviewable.' },
            { id: 'b', text: 'Schemas are required by HTML5.' },
            { id: 'c', text: 'To store cookies more efficiently.' },
            { id: 'd', text: 'To impress the client with UML.' },
          ],
          correct: 'a',
          explanation: 'Minimisation plus maintainability. Bonus: you can test it.',
        },
      ],
    },
  ],
  exam: {
    id: 'exam-data',
    title: 'Module 2 exam — Data collection',
    minutes: 18,
    passPercent: 70,
    questions: [
      {
        id: 'de1',
        prompt: 'First place to look when a public page’s HTML has no products:',
        options: [
          { id: 'a', text: 'The site’s /admin.' },
          { id: 'b', text: 'DevTools Network for JSON/XHR.' },
          { id: 'c', text: 'Someone’s .env file.' },
          { id: 'd', text: 'A stolen cookie jar.' },
        ],
        correct: 'b',
        explanation: 'Client-side apps load data after paint. Network tab first.',
      },
      {
        id: 'de2',
        prompt: 'A client wants daily prices from Amazon. Terms forbid bots. You:',
        options: [
          { id: 'a', text: 'Scrape anyway; everyone does it.' },
          { id: 'b', text: 'Explain the restriction and offer allowed alternatives (official APIs, manual sample, client’s own Buy Box data).', },
          { id: 'c', text: 'Use headless Chrome with random fingerprints and hope.', },
          { id: 'd', text: 'DDoS the category page so it caches better.' },
        ],
        correct: 'b',
        explanation: 'You sell judgement. Circumventing explicit bot bans is not the job.',
      },
      {
        id: 'de3',
        prompt: 'Which header is the adult choice on a polite public GET?',
        options: [
          { id: 'a', text: 'A fake Googlebot UA so they like you.' },
          { id: 'b', text: 'A clear UA + contact, plus delays.' },
          { id: 'c', text: 'No User-Agent, to be mysterious.' },
          { id: 'd', text: 'Authorization: Bearer <token you found on GitHub>.' },
        ],
        correct: 'b',
        explanation: 'Identify yourself. Impersonating Googlebot is a lie and often a ToS violation.',
      },
      {
        id: 'de4',
        prompt: 'Storing scraped Instagram commenters “for later lookalike ads” is risky because:',
        options: [
          { id: 'a', text: 'CSV files are too big.' },
          { id: 'b', text: 'It is personal data collected without a clear lawful basis or the platform’s permission.' },
          { id: 'c', text: 'Instagram comments are not text.' },
          { id: 'd', text: 'Lookalike ads are illegal in every country.' },
        ],
        correct: 'b',
        explanation: 'People + targeting use-case. GDPR and platform rules both get unhappy.',
      },
      {
        id: 'de5',
        prompt: 'Best training ground for the mechanics of scraping:',
        options: [
          { id: 'a', text: 'A live bank’s authenticated dashboard.' },
          { id: 'b', text: 'JSONPlaceholder, Wikipedia API, open government data, sites you own.' },
          { id: 'c', text: 'CAPTCHA farms.' },
          { id: 'd', text: 'Scraping your ex’s private account.' },
        ],
        correct: 'b',
        explanation: 'Learn the motion where permission is obvious.',
      },
      {
        id: 'de6',
        prompt: 'HTTP 403 after 50 fast requests. Professional next step:',
        options: [
          { id: 'a', text: 'Ten parallel browsers.' },
          { id: 'b', text: 'Stop, log it, back off, re-read terms. Maybe you are done.' },
          { id: 'c', text: 'Post the payload on a forum asking for bypasses.' },
          { id: 'd', text: 'Switch to the /wp-admin endpoint.' },
        ],
        correct: 'b',
        explanation: '403 is a signal. Escalating looks like an attack.',
      },
      {
        id: 'de7',
        prompt: 'A shop offers a product CSV export in Shopify admin. You should:',
        options: [
          { id: 'a', text: 'Ignore it and write a scraper for sport.' },
          { id: 'b', text: 'Use the export / Admin API with the client’s permission. That is the product.' },
          { id: 'c', text: 'Scrape the storefront so the numbers are “more real.”' },
          { id: 'd', text: 'Both, to compare secretly.' },
        ],
        correct: 'b',
        explanation: 'Official access exists. Using it is competence, not laziness.',
      },
      {
        id: 'de8',
        prompt: 'Database right / copyright concern is highest when you:',
        options: [
          { id: 'a', text: 'Note three competitor prices in a memo.' },
          { id: 'b', text: 'Mirror an entire catalogue (photos, descriptions) onto a new domain.' },
          { id: 'c', text: 'Cite CBS.' },
          { id: 'd', text: 'Screenshot one hero image for a private teardown slide.' },
        ],
        correct: 'b',
        explanation: 'Substantial extraction + republication. Analysis in a private memo is a different act.',
      },
      {
        id: 'de9',
        prompt: 'Purpose limitation means:',
        options: [
          { id: 'a', text: 'You may reuse any collected data for any future product.' },
          { id: 'b', text: 'You collect for a stated job (e.g. “category price sample”) and do not quietly turn it into an outreach dossier.' },
          { id: 'c', text: 'You must delete data every 10 minutes.' },
          { id: 'd', text: 'You can only use Excel.' },
        ],
        correct: 'b',
        explanation: 'Purpose is part of GDPR’s spine. Scope creep is how innocent research becomes a problem.',
      },
      {
        id: 'de10',
        prompt: 'You would be comfortable emailing the webmaster: “We fetched /products every 6 hours with UA X, delayed 2s, stored title+price, contact Y.” If not, then:',
        options: [
          { id: 'a', text: 'The script is not ready to run.' },
          { id: 'b', text: 'You should hide the UA.' },
          { id: 'c', text: 'Comfort is irrelevant.' },
          { id: 'd', text: 'Run it from a café Wi-Fi.' },
        ],
        correct: 'a',
        explanation: 'The email test is an ethics compiler. Shame is a signal.',
      },
    ],
  },
}
