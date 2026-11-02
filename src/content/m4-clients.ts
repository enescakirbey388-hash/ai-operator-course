import type { CourseModule } from './types'

export const module4: CourseModule = {
  id: 'clients',
  number: '04',
  title: 'Find people who will actually pay',
  tagline: 'A market is a list of names, not a vibe.',
  why: 'Skill without a buyer is a hobby. This module is how you get conversations in NL/BE without becoming a spam cannon.',
  lessons: [
    {
      id: 'f1',
      title: 'Who buys this work',
      minutes: 22,
      summary: 'Owners with a leaky bucket. Not “anyone interested in AI.”',
      video: {
        title: 'Simon Sinek — Start with Why (TED)',
        youtubeId: 'qp0HIF3SfI4',
        minutes: 18,
        why: 'Useful for positioning. Then ignore the cult: your “why” in this course is a commercial reason a shop owner cares.',
      },
      body: [
        { type: 'p', text: 'People do not buy “an AI course you took.” They buy a reduction in a painful job: more content that does not embarrass them, clearer research before they spend ad money, a junior-level ops person who does not need babysitting. You are selling a job-to-be-done.' },
        { type: 'h', text: 'ICPs that fit an operator (NL/BE)' },
        { type: 'ul', items: [
          'DTC / boutique retail with a site and weak content cadence.',
          'Small agencies who need production capacity, not another strategist slide.',
          'Local services (clinics, trades, education) who are losing to whoever posts weekly.',
          'Founders who tried ChatGPT, got generic Dutch, and felt cheated — they will pay for taste + process.',
        ] },
        { type: 'p', text: 'Bad ICP: “anyone.” Also bad: enterprise RFPs in year one, and people who want a magic content button with no brand input. They will drain you and not pay invoices on time.' },
        { type: 'callout', kind: 'nlbe', title: 'Where the money is', text: 'Look at shops that already spend on Meta, photographers, or an agency. They have a budget line. A café with no site is a friendship, not a client. KvK + ads library + their own job ads tell you who is in motion.' },
        { type: 'task', title: 'Do this now', text: 'Write one ICP in one sentence: industry, size, language, who signs, what they already spend. List 15 companies that match. If you cannot name 15, the ICP is a fantasy.' },
      ],
      checkpoint: [
        {
          id: 'f1q1',
          prompt: 'Strongest buying signal?',
          options: [
            { id: 'a', text: 'They liked a post about ChatGPT.' },
            { id: 'b', text: 'They already pay for ads or content and the output is inconsistent.' },
            { id: 'c', text: 'They asked “can AI do my taxes for free?”' },
            { id: 'd', text: 'They have a nephew who “knows computers.”' },
          ],
          correct: 'b',
          explanation: 'Existing spend + pain. That is a budget with a hole.',
        },
        {
          id: 'f1q2',
          prompt: 'You cannot list 15 real companies in the niche. What does that mean?',
          options: [
            { id: 'a', text: 'The niche is “exclusive.”' },
            { id: 'b', text: 'You do not have a market yet — broaden geography/segment or pick a real category.' },
            { id: 'c', text: 'You should raise VC.' },
            { id: 'd', text: 'LinkedIn is down.' },
          ],
          correct: 'b',
          explanation: 'A market you cannot enumerate is a mood board.',
        },
      ],
    },
    {
      id: 'f2',
      title: 'An offer that is not “I do AI”',
      minutes: 24,
      summary: 'Package a result, a time box, and what you need from them.',
      video: {
        title: 'Y Combinator — How to Start a Startup (Sam Altman, lecture 1)',
        youtubeId: 'CBYhVcO4Wr0',
        minutes: 48,
        why: 'Listen for “make something people want.” Then shrink it to a two-week paid diagnostic, not a unicorn.',
      },
      body: [
        { type: 'p', text: '“I can help with AI” is un-buyable. A buyable offer sounds like: “In 10 business days I interview you, pull Search Console + 20 competitor ads, and deliver a 2-page plan plus 8 NL captions you can run. €1.500. You give access and one 45-minute call.”' },
        { type: 'h', text: 'Anatomy of a first offer' },
        { type: 'ol', items: [
          'Who it is for (one sentence).',
          'The painful job (content, research, messy Shopify data…).',
          'What you will physically deliver (files, not vibes).',
          'What you need from them (access, assets, decision-maker).',
          'Price and calendar (start date, end date).',
          'What happens next if it works (monthly ops).',
        ] },
        { type: 'callout', kind: 'info', title: 'Price the diagnostic', text: 'Free work trains people to ghost you. A paid diagnostic is a filter: they invest a little, you both see if the working relationship exists. You can still be cheap. You should not be imaginary.' },
        { type: 'p', text: 'Lead with the research and content muscles from modules 1–3. Do not lead with scrapers. Scraping is a method inside a job, and it scares legal-minded owners. “We look at public ads and your own exports” is enough.' },
        { type: 'task', title: 'Do this now', text: 'Write your offer on half a page with the six bullets above. Read it to a friend who is not in tech. If they cannot repeat the deliverable, rewrite until they can.' },
      ],
      checkpoint: [
        {
          id: 'f2q1',
          prompt: 'Which offer can someone say yes to this week?',
          options: [
            { id: 'a', text: '“AI transformation partner.”' },
            { id: 'b', text: '“€1.500 / 10 days: access + call → memo + 8 captions.”' },
            { id: 'c', text: '“Let’s stay in touch.”' },
            { id: 'd', text: '“I will see what the model says.”' },
          ],
          correct: 'b',
          explanation: 'Price, time, inputs, outputs. That is a product.',
        },
        {
          id: 'f2q2',
          prompt: 'Why not headline with “custom scrapers”?',
          options: [
            { id: 'a', text: 'Scraping is never useful.' },
            { id: 'b', text: 'Owners hear legal risk and grey-hat. Lead with the decision and allowed data.' },
            { id: 'c', text: 'It is too cheap.' },
            { id: 'd', text: 'TikTok forbids the word.' },
          ],
          correct: 'b',
          explanation: 'Method last. Outcome first. Especially in the EU.',
        },
      ],
    },
    {
      id: 'f3',
      title: 'Where to find them without burning the room',
      minutes: 26,
      summary: 'Warm > tiny-personal cold > spray. NL/BE is a village with fibre internet.',
      video: {
        title: 'How to Get Startup Ideas (Paul Graham, Stanford)',
        youtubeId: 'iiChxN0R1aY',
        minutes: 4,
        why: 'Short reminder: look at what is annoying you and people you know. Then we get tactical for local outreach.',
      },
      body: [
        { type: 'p', text: 'Channels that actually work here: people you already know, their intros, LinkedIn with a specific note, industry WhatsApp/Facebook groups you contribute to, local events, and a simple site that shows one case. Channels that mostly waste March: 2.000 scraped emails, generic “I help brands scale with AI.”' },
        { type: 'h', text: 'A week of outbound that is still decent' },
        { type: 'ol', items: [
          'Pick 20 names from your ICP list. Research each for 10 minutes (module 1).',
          'Write a 6-line note: what you noticed on their site/ads, one hypothesis, a 15-minute ask. No attachment, no 14 links.',
          'Send 5 per day. Log replies. Do not automate 200 until your first 20 are good.',
          'Publish one public teardown (with fair-use screenshots of public ads, no stolen catalogues).',
        ] },
        { type: 'code', lang: 'text', code: `Subject: your Reels vs the product page

Hoi [Name], I watched 4 of your IG Reels. The hook on Tuesday is strong;
the product page still opens on a lifestyle crop with no price in view.
I do research + short-form for NL/BE shops. Open to a 15-min look
at whether Reels are even the bottleneck? If not, ignore this.

[Your name]` },
        { type: 'callout', kind: 'warn', title: 'GDPR & cold email', text: 'B2B contact details are not a free-for-all. Prefer published work emails, LinkedIn, forms they asked for. Do not harvest private groups. Keep a suppression list. If someone says stop, you stop the same day. When in doubt, use LinkedIn and intros.' },
        { type: 'task', title: 'Do this now', text: 'Write two outreach notes to two real companies (you do not have to send them yet). One must mention a specific public page or ad. If it could be sent to any shop by changing the name, it fails.' },
      ],
      checkpoint: [
        {
          id: 'f3q1',
          prompt: 'A message that could be mailed to 500 shops with a mail merge is:',
          options: [
            { id: 'a', text: 'Efficient and therefore good.' },
            { id: 'b', text: 'A commodity. It trains them to ignore you.' },
            { id: 'c', text: 'Required by KvK.' },
            { id: 'd', text: 'A GDPR exemption.' },
          ],
          correct: 'b',
          explanation: 'Specificity is the filter that gets replies in a small market.',
        },
        {
          id: 'f3q2',
          prompt: 'You found 8.000 emails in a scraped member directory. Next:',
          options: [
            { id: 'a', text: 'Import to Mailchimp tonight.' },
            { id: 'b', text: 'Do not. That is a personal-data dump you likely have no right to use for marketing.' },
            { id: 'c', text: 'Sell the list to recoup research time.' },
            { id: 'd', text: 'CC the AP on the first campaign for transparency.' },
          ],
          correct: 'b',
          explanation: 'Module 2 was not optional. Outreach inherits those brakes.',
        },
      ],
    },
    {
      id: 'f4',
      title: 'Qualify so you do not date time-wasters',
      minutes: 20,
      summary: 'A conversation is a filter. You are allowed to say no.',
      video: {
        title: 'Y Combinator — How to Talk to Users',
        youtubeId: 'MT4P_Blh1sA',
        minutes: 24,
        why: 'Listen for questions that reveal behaviour, not compliments about your idea.',
      },
      body: [
        { type: 'p', text: 'You want four truths before you write a proposal: they have a problem that costs them money or time; they have tried something; someone can sign; there is a calendar. Compliments (“so cool what you do with AI”) are not those truths.' },
        { type: 'h', text: 'Questions that qualify' },
        { type: 'ul', items: [
          'What did you spend last quarter on content/ads/agencies?',
          'What happens if you do nothing for 90 days?',
          'Who else has to like this?',
          'When do you need the first piece live?',
          'What have you already tried (freelancer, intern, ChatGPT, agency)?',
        ] },
        { type: 'p', text: 'If they will not answer budget even as a band (“under €1k / 1–3k / more”), you do not have a buyer. You have a curiosity. Curiosity is allowed to stay in your newsletter. It does not get a custom 12-page proposal.' },
        { type: 'callout', kind: 'nlbe', title: 'Politeness trap', text: 'Dutch directness is an asset. You can say: “Ik denk dat dit nog geen goed moment is — jullie hebben geen eigenaar in de call en geen budgetrange. Zal ik over 3 maanden terugkomen?” That earns more respect than a desperate discount.' },
        { type: 'task', title: 'Do this now', text: 'Write your “disqualify” line: the sentence you will use when there is no budget, no access, or no decision-maker. Practise it out loud once. It should feel slightly too blunt. Then soften one notch, not five.' },
      ],
      checkpoint: [
        {
          id: 'f4q1',
          prompt: 'They love your work, no one who can sign is in the meeting, no date. You:',
          options: [
            { id: 'a', text: 'Send a 20-page proposal tonight to “keep momentum.”' },
            { id: 'b', text: 'Ask for the decision-maker and a date, or park it.' },
            { id: 'c', text: 'Start unpaid production to impress them.' },
            { id: 'd', text: 'Lower the price to €0.' },
          ],
          correct: 'b',
          explanation: 'Proposals without a signer are fan fiction.',
        },
        {
          id: 'f4q2',
          prompt: 'Why ask what they already tried?',
          options: [
            { id: 'a', text: 'To mock them.' },
            { id: 'b', text: 'To see if they can execute, what failed, and whether you are a duplicate of ChatGPT-for-free.' },
            { id: 'c', text: 'To steal their freelancer.' },
            { id: 'd', text: 'It fills silence.' },
          ],
          correct: 'b',
          explanation: 'History of attempts is the real brief.',
        },
      ],
    },
  ],
  exam: {
    id: 'exam-clients',
    title: 'Module 4 exam — Finding clients',
    minutes: 16,
    passPercent: 70,
    questions: [
      {
        id: 'fe1',
        prompt: 'You meet a founder who wants “something with AI” and has never spent on marketing. Likely?',
        options: [
          { id: 'a', text: 'Enterprise rollout in 30 days.' },
          { id: 'b', text: 'Education / curiosity. Do not write a heavy proposal until there is a budget line.' },
          { id: 'c', text: 'Guaranteed €10k/month.' },
          { id: 'd', text: 'They are legally required to hire you.' },
        ],
        correct: 'b',
        explanation: 'No history of spend is a yellow flag for paid ops.',
      },
      {
        id: 'fe2',
        prompt: 'Best first public proof piece:',
        options: [
          { id: 'a', text: 'A stolen competitor catalogue.' },
          { id: 'b', text: 'A teardown of public ads + a rewritten caption series for a fictional or permissioned brand.' },
          { id: 'c', text: 'A photo of your setup with neon lights.' },
          { id: 'd', text: 'Anonymous screenshots of a client admin you should not have shared.' },
        ],
        correct: 'b',
        explanation: 'Show taste and process on allowed material.',
      },
      {
        id: 'fe3',
        prompt: 'An agency asks you to white-label. First filter?',
        options: [
          { id: 'a', text: 'Who is the end client, who pays you, who owns the work, and can you see real briefs?' },
          { id: 'b', text: 'Always yes, volume is king.' },
          { id: 'c', text: 'Only if they pay in exposure.' },
          { id: 'd', text: 'Only if you hide that AI exists.' },
        ],
        correct: 'a',
        explanation: 'White-label can be great. Undefined ownership is how you work for free.',
      },
      {
        id: 'fe4',
        prompt: 'Your ICP is “fashion.” You list Zara, H&M, and a neighbour’s Etsy. Problem?',
        options: [
          { id: 'a', text: 'Nothing. Fashion is fashion.' },
          { id: 'b', text: 'Those are different buying processes. Pick a size and a decision-maker you can actually reach.' },
          { id: 'c', text: 'Etsy is illegal in Belgium.' },
          { id: 'd', text: 'Zara will definitely take your LinkedIn InMail.' },
        ],
        correct: 'b',
        explanation: 'ICP is reachability plus similar problems, not a Pinterest board.',
      },
      {
        id: 'fe5',
        prompt: 'You sent 20 researched notes, 2 replies, 0 meetings. Next?',
        options: [
          { id: 'a', text: 'Scrape 20.000 emails.' },
          { id: 'b', text: 'Read the 18 silences: wrong ICP, weak specificity, weak ask — then iterate 20 more.' },
          { id: 'c', text: 'Quit the industry.' },
          { id: 'd', text: 'Buy a fake case study.' },
        ],
        correct: 'b',
        explanation: '20 is a sample. Diagnose. Do not escalate volume of the same miss.',
      },
      {
        id: 'fe6',
        prompt: 'A group admin says “no ads.” You:',
        options: [
          { id: 'a', text: 'Post anyway at 2am.' },
          { id: 'b', text: 'Respect it. Contribute useful research. DM only where allowed.' },
          { id: 'c', text: ' scrape all members.' },
          { id: 'd', text: 'Argue in the comments about capitalism.' },
        ],
        correct: 'b',
        explanation: 'Villages remember. Your reputation is the channel.',
      },
      {
        id: 'fe7',
        prompt: 'The offer includes “unlimited revisions.” Risk?',
        options: [
          { id: 'a', text: 'None; generosity converts.' },
          { id: 'b', text: 'You sold an unbounded timesink. Cap rounds, define “done.”' },
          { id: 'c', text: 'Clients never use revisions.' },
          { id: 'd', text: 'It is required by EU law.' },
        ],
        correct: 'b',
        explanation: 'Undefined scope is how first projects go negative.',
      },
      {
        id: 'fe8',
        prompt: 'Best use of your scraping skill in sales?',
        options: [
          { id: 'a', text: 'Brag about bypassing captchas.' },
          { id: 'b', text: 'Quietly assemble a clean public-ad sample so the first call is specific — and tell them the method was public + allowed.' },
          { id: 'c', text: 'Show a dashboard of harvested emails.' },
          { id: 'd', text: 'Promise you can “get anyone’s customer list.”' },
        ],
        correct: 'b',
        explanation: 'Competence, not menace. Allowed data only.',
      },
    ],
  },
}
