import type { CourseModule } from './types'

export const module5: CourseModule = {
  id: 'close',
  number: '05',
  title: 'Make it rational to invest',
  tagline: 'They do not buy your hunger. They buy a smaller, reversible risk.',
  why: 'Closing is not theatre. It is reducing uncertainty until writing the invoice is the sane move.',
  lessons: [
    {
      id: 'k1',
      title: 'Discovery that does not pitch',
      minutes: 24,
      summary: 'If you talk 70% of the time, you are auditioning, not diagnosing.',
      video: {
        title: 'The Mom Test — Rob Fitzpatrick (Mind the Product)',
        youtubeId: 'qAjsAqEDUwE',
        minutes: 28,
        why: 'Compliments lie. Past behaviour and money already spent are the signal. Watch for how he kills bad questions.',
      },
      body: [
        { type: 'p', text: 'The Mom Test idea: people will say they like your idea to be nice. They will not as easily lie about last Tuesday. Ask what they did, what they paid, what broke, who complained. Do not ask “would you use an AI content operator?” — that question is a compliment trap.' },
        { type: 'h', text: 'Good vs bad questions' },
        { type: 'ul', items: [
          'Bad: “Is content important to you?” (everyone says yes)',
          'Good: “How many pieces went out last month, and who made them?”',
          'Bad: “Would you pay €2.000 for this?”',
          'Good: “What did the last freelancer invoice, and were you happy?”',
          'Bad: “Do you want more sales?”',
          'Good: “Which SKU is overstocked, and what did you try?”',
        ] },
        { type: 'p', text: 'Take notes they can see. Repeat the problem in their words, including Dutch/Flemish phrases they used. That becomes the proposal headline. If you switch to English marketing-speak, you already lost the room.' },
        { type: 'task', title: 'Do this now', text: 'Write 8 discovery questions that only ask about the past (what happened, what they paid, what they shipped). Zero questions that start with “would you.”' },
      ],
      checkpoint: [
        {
          id: 'k1q1',
          prompt: '“Would your team use this every week?” is a weak question because:',
          options: [
            { id: 'a', text: 'It is too short.' },
            { id: 'b', text: 'It invites a polite hypothetical instead of evidence of current behaviour.' },
            { id: 'c', text: 'Teams do not use software weekly.' },
            { id: 'd', text: 'GDPR forbids hypotheticals.' },
          ],
          correct: 'b',
          explanation: 'Hypotheticals are compliments. Past calendars are evidence.',
        },
        {
          id: 'k1q2',
          prompt: 'They say “we need to be more premium.” You next:',
          options: [
            { id: 'a', text: 'Open Midjourney immediately.' },
            { id: 'b', text: 'Ask what they mean in operational terms: price, photography, returns, reviews, who they lose to.' },
            { id: 'c', text: 'Agree and send a gold-foil logo.' },
            { id: 'd', text: 'End the call; premium clients are impossible.' },
          ],
          correct: 'b',
          explanation: 'Vague adjectives are not a brief. Translate to behaviour and numbers.',
        },
      ],
    },
    {
      id: 'k2',
      title: 'Risk reversal: pilots, proof, and kill-switches',
      minutes: 22,
      summary: 'A first invoice is a bet. Make the bet small, dated, and easy to stop.',
      video: {
        title: 'Y Combinator — How to Convince Investors (for the shape of a pitch)',
        youtubeId: 'UNBb9THN4yI',
        minutes: 44,
        why: 'Clients are not VCs, but the same spine: traction, why you, why now, what the money does. Translate “investors” to “the owner’s cash.”',
      },
      body: [
        { type: 'p', text: 'Owners stall because of fear: you might be flaky, AI might be generic, legal might yell, they might look stupid in front of their partner. You do not argue with fear. You shrink it.' },
        { type: 'h', text: 'How to shrink it' },
        { type: 'ul', items: [
          'Time box: 2 weeks, not “we’ll see.”',
          'Concrete artifacts: memo, captions, tracker — listed in the email.',
          'Kill-switch: after the pilot, either monthly or goodbye, no drama.',
          'Access list: they know exactly what they must give you.',
          'Show a sample of your process on public data before they pay a retainer.',
          'Name the legal brakes (no grey scraping, no PII vacuum). That increases trust in the EU.',
        ] },
        { type: 'callout', kind: 'nlbe', title: 'BTW and seriousness', text: 'Send a proper quote (offerte) with KvK, BTW if you have it, payment terms (e.g. 50% to start). Informal DMs feel cheap. A one-page PDF feels like a company. You can be a one-person company. You should not look like a hobby.' },
        { type: 'task', title: 'Do this now', text: 'Write a 10-line pilot: start date, end date, deliverables, your price, their inputs, what “not continuing” looks like. This is the product you sell until you have case studies.' },
      ],
      checkpoint: [
        {
          id: 'k2q1',
          prompt: 'Which reduces risk more for a first-time buyer?',
          options: [
            { id: 'a', text: '“Trust me, I live in Cursor.”' },
            { id: 'b', text: 'A 2-week paid pilot with named files and a stop date.' },
            { id: 'c', text: 'A 12-month contract with a penalty clause on day one.' },
            { id: 'd', text: 'Working free until they are amazed.' },
          ],
          correct: 'b',
          explanation: 'Bounded, paid, reversible. Free work often gets no attention either.',
        },
        {
          id: 'k2q2',
          prompt: 'Why mention what you will not do (e.g. no login scraping)?',
          options: [
            { id: 'a', text: 'To sound boring.' },
            { id: 'b', text: 'It shows judgement. Legal-minded owners relax.' },
            { id: 'c', text: 'ToS require a haiku.' },
            { id: 'd', text: 'So they hire someone shadier.' },
          ],
          correct: 'b',
          explanation: 'Boundaries are a sales asset in this market.',
        },
      ],
    },
    {
      id: 'k3',
      title: 'Proposals that get a yes or a no',
      minutes: 24,
      summary: 'One page beats twelve. Restate their words. Ask for a date.',
      video: {
        title: 'How great leaders inspire action — use sparingly as craft, not as religion',
        youtubeId: 'qp0HIF3SfI4',
        minutes: 18,
        why: 'Re-watch 5 minutes if needed: the client’s “why” is their shop, not your personal brand. Then write the offerte.',
      },
      body: [
        { type: 'p', text: 'A proposal is a mirror plus a price. Section 1 is their situation in their language. Section 2 is the pilot. Section 3 is money and dates. Section 4 is assumptions (access, number of revision rounds). If you need a theory-of-everything appendix, you are hiding.' },
        { type: 'h', text: 'Pricing without shaking' },
        { type: 'ul', items: [
          'Price the package, not your hours, once you know the work is bounded.',
          'If you are new, still do not go so low you resent the work. Resentment leaks into quality.',
          'Give one recommended option, not a paradox-of-choice menu of seven.',
          'Optional: a smaller “memo only” and a full “memo + 8 assets.” Two is enough.',
        ] },
        { type: 'code', lang: 'text', code: `Offerte — 10-daagse content diagnose
Voor: [Shop], beslisser: [Name]
Situatie: [hun woorden]
Levering: 2-pagina memo + 8 NL captions + bronnenlijst
Jullie geven: GA/Shopify read, 45-min call, merkgids
Prijs: €1.500 excl. BTW, 50% start, 50% bij levering
Start: [datum]  Einde: [datum]
Daarna: stoppen of maandelijkse ops tegen [bedrag]` },
        { type: 'task', title: 'Do this now', text: 'Fill that offerte template for a fictional but realistic Ghent or Haarlem shop. Read it aloud. Cut 30% of the adjectives.' },
      ],
      checkpoint: [
        {
          id: 'k3q1',
          prompt: 'The first paragraph of the offerte should be:',
          options: [
            { id: 'a', text: 'Your life story with AI.' },
            { id: 'b', text: 'Their situation, in their words.' },
            { id: 'c', text: 'A list of 40 tools you know.' },
            { id: 'd', text: 'A confidentiality novel.' },
          ],
          correct: 'b',
          explanation: 'They look for themselves. If they do not see it, they stall.',
        },
        {
          id: 'k3q2',
          prompt: 'Two options vs seven options:',
          options: [
            { id: 'a', text: 'Seven looks more professional.' },
            { id: 'b', text: 'Two (recommended + smaller) helps them decide; seven delays the email.' },
            { id: 'c', text: 'You must match McKinsey’s template.' },
            { id: 'd', text: 'Options are illegal in B2B.' },
          ],
          correct: 'b',
          explanation: 'Decision effort is part of the product.',
        },
      ],
    },
    {
      id: 'k4',
      title: 'Follow-up, silence, and the long game',
      minutes: 18,
      summary: 'Most yeses live in the second or third touch. Most nos are silent.',
      video: {
        title: 'How to Get Users and Grow — Alex Schultz (YC)',
        youtubeId: 'cW768CZv6c4',
        minutes: 52,
        why: 'Optional length. Steal the idea of retention and loops — then apply it to your own pipeline of conversations, not to dark growth hacks.',
      },
      body: [
        { type: 'p', text: 'After you send the offerte, you do not wait in the void. You already agreed a decision date on the call. If you did not, that was the mistake. Follow up on that date with one new useful thing (a public ad you noticed, a line of copy), not “just bumping this.”' },
        { type: 'h', text: 'A simple cadence' },
        { type: 'ol', items: [
          'Call: agree “I send today, you reply by Thursday.”',
          'Thursday: short email, one extra observation, ask for yes / no / what is blocking.',
          'One week later: same. Then you move them to a 6-week check-in unless they ask to continue.',
          'Never guilt. Never surprise invoices. Never work ahead of a signature “to show commitment.”',
        ] },
        { type: 'callout', kind: 'info', title: 'A no is a gift', text: 'A clear no frees the week. A maybe that lasts two months is the expensive outcome. You can even say: “Als het geen ja is deze maand, is het een nee — helemaal prima.” Adults like adults.' },
        { type: 'p', text: 'After a paid pilot, ask for one intro and a 4-line quote you can publish. That is how the village compounds. Do the work so they are not lying in the quote.' },
        { type: 'task', title: 'Do this now', text: 'Write a 5-line follow-up email that includes one new observation and a binary ask (yes / no this month). Save it as a snippet.' },
      ],
      checkpoint: [
        {
          id: 'k4q1',
          prompt: 'They go silent after the offerte. Best next email?',
          options: [
            { id: 'a', text: '“I have been trying to reach you!!!”' },
            { id: 'b', text: 'One new specific observation + “is this a yes, a no, or blocked by X this month?”' },
            { id: 'c', text: 'Start the work unpaid.' },
            { id: 'd', text: 'Publicly shame them.' },
          ],
          correct: 'b',
          explanation: 'Useful + binary. Neediness is not a strategy.',
        },
        {
          id: 'k4q2',
          prompt: 'You agreed no decision date on the call. What broke?',
          options: [
            { id: 'a', text: 'SMTP.' },
            { id: 'b', text: 'You left the next step vague, so silence is the default.' },
            { id: 'c', text: 'The EU calendar.' },
            { id: 'd', text: 'AI replaced sales.' },
          ],
          correct: 'b',
          explanation: 'Calendar the decision while you still have them.',
        },
      ],
    },
  ],
  exam: {
    id: 'exam-close',
    title: 'Module 5 exam — Getting investment',
    minutes: 16,
    passPercent: 70,
    questions: [
      {
        id: 'ke1',
        prompt: 'They say “we would definitely use this.” Strongest interpretation?',
        options: [
          { id: 'a', text: 'Signed retainer.' },
          { id: 'b', text: 'Polite hypothetical until you see budget, past spend, and a date.' },
          { id: 'c', text: 'You should hire staff.' },
          { id: 'd', text: 'They are legally bound.' },
        ],
        correct: 'b',
        explanation: 'Mom Test: compliments are not contracts.',
      },
      {
        id: 'ke2',
        prompt: 'A partner is nervous about AI legal issues. You should:',
        options: [
          { id: 'a', text: 'Laugh it off.' },
          { id: 'b', text: 'Put allowed data sources, no-PII rule, and human approval in the offerte.' },
          { id: 'c', text: 'Hide that models are involved.' },
          { id: 'd', text: 'Scrape more to prove power.' },
        ],
        correct: 'b',
        explanation: 'Name the brakes. That is how EU buyers unclench.',
      },
      {
        id: 'ke3',
        prompt: '50% upfront on a 10-day pilot is:',
        options: [
          { id: 'a', text: 'Rude in all cultures.' },
          { id: 'b', text: 'Normal risk sharing; you both have skin in the game.' },
          { id: 'c', text: 'Illegal without a notary.' },
          { id: 'd', text: 'Only for construction.' },
        ],
        correct: 'b',
        explanation: 'You are not a bank. They are not a charity.',
      },
      {
        id: 'ke4',
        prompt: 'The proposal is 18 pages of framework diagrams. Likely effect?',
        options: [
          { id: 'a', text: 'Instant yes.' },
          { id: 'b', text: 'They cannot find the ask. Delay.' },
          { id: 'c', text: 'Higher SEO.' },
          { id: 'd', text: 'GDPR compliance.' },
        ],
        correct: 'b',
        explanation: 'Length hides the decision.',
      },
      {
        id: 'ke5',
        prompt: 'Best proof before a case study exists?',
        options: [
          { id: 'a', text: 'Fake logos.' },
          { id: 'b', text: 'A live teardown of their public site/ads in the call, plus a tiny paid pilot.' },
          { id: 'c', text: 'A certificate from this course only.' },
          { id: 'd', text: 'A testimonial from your parent.' },
        ],
        correct: 'b',
        explanation: 'Competence in the room beats borrowed status.',
      },
      {
        id: 'ke6',
        prompt: 'They ask to “start and figure out budget later.” You:',
        options: [
          { id: 'a', text: 'Start tonight.' },
          { id: 'b', text: 'Decline to start production without a written price and scope.' },
          { id: 'c', text: 'Max out a credit card for their ads.' },
          { id: 'd', text: 'Give them admin on your personal Gmail.' },
        ],
        correct: 'b',
        explanation: 'Unpriced work is how operators go broke.',
      },
      {
        id: 'ke7',
        prompt: 'You notice their real problem is photography, not captions. Ethically and commercially you:',
        options: [
          { id: 'a', text: 'Sell captions anyway; you have a hammer.' },
          { id: 'b', text: 'Say so, offer a smaller research memo or a photographer intro. That is how they later invest in you.' },
          { id: 'c', text: 'Ghost them.' },
          { id: 'd', text: 'Lie that captions fix lighting.' },
        ],
        correct: 'b',
        explanation: 'Diagnosis over quota. Trust compounds.',
      },
      {
        id: 'ke8',
        prompt: 'After a good pilot, the highest-leverage ask is:',
        options: [
          { id: 'a', text: 'A 4-line quote + one intro to a similar owner.' },
          { id: 'b', text: 'Their customer email database “for research.”' },
          { id: 'c', text: 'Equity.' },
          { id: 'd', text: 'A TikTok duet about hustle.' },
        ],
        correct: 'a',
        explanation: 'Village economics. Proof + distribution.',
      },
      {
        id: 'ke9',
        prompt: 'Why put a stop date on the pilot?',
        options: [
          { id: 'a', text: 'To be pessimistic.' },
          { id: 'b', text: 'So “maybe later” cannot eat the calendar; continue or end is a scheduled decision.' },
          { id: 'c', text: 'EU projects must be 14 days.' },
          { id: 'd', text: 'Models expire.' },
        ],
        correct: 'b',
        explanation: 'Scheduled decisions prevent zombie projects.',
      },
      {
        id: 'ke10',
        prompt: 'They want you to “just generate 100 ads with AI this afternoon” with no brief. Closest to a good reply?',
        options: [
          { id: 'a', text: 'Do it for €50.' },
          { id: 'b', text: 'Explain you will not ship ungrounded volume; offer the diagnostic that produces a brief, then ads.' },
          { id: 'c', text: 'Fine-tune on their unlabelled Drive folder.' },
          { id: 'd', text: 'Say yes and use stock photos of other brands.' },
        ],
        correct: 'b',
        explanation: 'You are selling a process that makes spend rational. Volume without a brief is what they already tried.',
      },
    ],
  },
}
