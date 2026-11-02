import type { CourseModule } from './types'

export const module3: CourseModule = {
  id: 'code',
  number: '03',
  title: 'Code you can actually explain',
  tagline: 'If you cannot trace it, you do not own it.',
  why: 'AI will write most of the lines. You still ship the behaviour. This module is how you stay the engineer in the loop.',
  lessons: [
    {
      id: 'c1',
      title: 'Programs as input, state, output',
      minutes: 24,
      summary: 'Every bug is a story about data that was not what you thought.',
      video: {
        title: 'Harvard CS50 — Lecture 0 (Scratch / computational thinking)',
        youtubeId: '3lpk6U5vQuQ',
        minutes: 90,
        why: 'Skip around if you already code. Watch the parts on inputs, conditions, and loops. You want the vocabulary, not the homework.',
      },
      body: [
        { type: 'p', text: 'You already write software. The failure mode with AI is skipping the picture of the machine: what goes in, what is remembered, what comes out, what can fail. If you cannot draw that on paper, the generated code is a blob you hope works.' },
        { type: 'h', text: 'Four questions before you accept a patch' },
        { type: 'ol', items: [
          'What is the input? Types, empty cases, hostile cases.',
          'What state exists? Memory, files, DB, in-memory arrays (this course’s cousin app stored agents in RAM — they vanish on restart).',
          'What is the output? Status codes, UI, side effects.',
          'What is the failure? Timeouts, 429, missing key, malformed JSON.',
        ] },
        { type: 'callout', kind: 'info', title: 'Example', text: 'POST /api/agents/run is not “the AI button.” It is: JSON body → check agent name → check API key → call Anthropic → parse text → maybe push contentStore → return JSON. If you cannot say that out loud, you cannot debug it when hook/body/cta never appear.' },
        { type: 'code', lang: 'ts', code: `function total(lines: { amount: number }[]): number {
  return lines.reduce((sum, line) => sum + line.amount, 0)
}
// Input: array of lines. Output: number. Failure: non-numbers, missing amount.
// Empty array → 0. That is a decision, not a default of the universe.` },
        { type: 'task', title: 'Do this now', text: 'Pick a function you wrote in the last month. Write input / state / output / failure on a sticky note. Then add one test or one console.log that would have caught the last bug.' },
      ],
      checkpoint: [
        {
          id: 'c1q1',
          prompt: 'An in-memory array of “approved scripts” empties after a server restart. That is:',
          options: [
            { id: 'a', text: 'A cosmic ray.' },
            { id: 'b', text: 'State that was never persisted. Expected if you did not use a database or file.' },
            { id: 'c', text: 'Proof JavaScript is broken.' },
            { id: 'd', text: 'A GDPR feature.' },
          ],
          correct: 'b',
          explanation: 'You have to know where state lives. RAM is not a product database.',
        },
        {
          id: 'c1q2',
          prompt: 'Before merging AI-generated fetch code, you must know:',
          options: [
            { id: 'a', text: 'The author’s favourite colour.' },
            { id: 'b', text: 'What happens on non-200, timeouts, and invalid JSON.' },
            { id: 'c', text: 'How to disable TypeScript.' },
            { id: 'd', text: 'How many tokens the prompt used, only.' },
          ],
          correct: 'b',
          explanation: 'Happy path is cheap. Failure path is the job.',
        },
      ],
    },
    {
      id: 'c2',
      title: 'Read code like a detective',
      minutes: 22,
      summary: 'Name, types, call graph, then the clever bit. Never from the clever bit down.',
      video: {
        title: 'Fireship — JavaScript in 100 Seconds',
        youtubeId: 'DHjqpvDnNGE',
        minutes: 3,
        why: 'A compressed map of the language. Use it as a table of contents, then go read real files.',
      },
      body: [
        { type: 'p', text: 'When you open an unfamiliar repo (or a 400-line file the model just spat out), do not start at line 1 hoping enlightenment arrives. Hunt in this order: entry point, routes/UI events, data types, then the function that mutates money or messages.' },
        { type: 'h', text: 'A 15-minute read protocol' },
        { type: 'ol', items: [
          'Find main / index / App. Where does the process start?',
          'List user-visible actions (buttons, routes, cron).',
          'Find the types. If there are none, infer them and write them down.',
          'Grep the names you care about (approve, fetch, scrape, charge).',
          'Trace one action all the way through. Ignore the rest.',
        ] },
        { type: 'p', text: 'Rubber-duck in comments you will delete: “this runs when Approvals is clicked; it POSTs id; server flips status; React replaces the row.” If you cannot fill that, you are not ready to change it.' },
        { type: 'callout', kind: 'practice', title: 'Use this course', text: 'This app is small on purpose. Trace “Mark lesson complete”: button → markLessonDone → localStorage. That is a complete system. Then trace an exam submit. If you can explain both, you can explain client work.' },
        { type: 'task', title: 'Do this now', text: 'Open src/lib/progress.ts and src/pages (after you have them). Write the data flow for completing a lesson in four arrows. No AI.' },
      ],
      checkpoint: [
        {
          id: 'c2q1',
          prompt: 'Best first file in a typical React + Express app?',
          options: [
            { id: 'a', text: 'A random util named helpers2.' },
            { id: 'b', text: 'Frontend router/entry and the server index that declares routes.' },
            { id: 'c', text: 'node_modules/lodash.' },
            { id: 'd', text: 'The CSS file with the brand colour.' },
          ],
          correct: 'b',
          explanation: 'Entry and routes are the map. Utils are streets.',
        },
        {
          id: 'c2q2',
          prompt: 'You cannot name which function runs when a button is clicked. You should:',
          options: [
            { id: 'a', text: 'Ask the model to “just add the feature” anyway.' },
            { id: 'b', text: 'Trace the handler before editing.' },
            { id: 'c', text: 'Rewrite the app in a new framework.' },
            { id: 'd', text: 'Delete node_modules.' },
          ],
          correct: 'b',
          explanation: 'Untraced edits are how you ship two sources of truth.',
        },
      ],
    },
    {
      id: 'c3',
      title: 'The debug loop',
      minutes: 20,
      summary: 'Reproduce, locate, hypothesise, change one thing, confirm.',
      video: {
        title: '3Blue1Brown — But what is a neural network?',
        youtubeId: 'aircAruvnKk',
        minutes: 19,
        why: 'Not because you will train nets this week. Because “the output is a function of inputs and parameters” is the same humility you need when debugging.',
      },
      body: [
        { type: 'p', text: 'Debugging is research applied to a machine. The same sin shows up: changing three things at once so you never learn. The loop is boring and it is the whole job.' },
        { type: 'ol', items: [
          'Reproduce on purpose. Write the exact click/path/payload.',
          'Locate: log, breakpoint, Network tab, server stdout. Find the first lie.',
          'Hypothesise in one sentence. “contentStore never fills because extractJson fails when the model wraps JSON in fences.”',
          'Change one thing. Re-run.',
          'Keep the test or the log that would catch it next time.',
        ] },
        { type: 'code', lang: 'ts', code: `// The bug: model returns \`\`\`json { "hook": "..." } \`\`\`
// JSON.parse of the whole string throws. You "fixed" it by asking the model to behave.
// Real fix: extract the fenced block, then parse, and still handle failure.
function extractJson(raw: string): unknown {
  const match = raw.match(/\`\`\`json\\s*([\\s\\S]*?)\`\`\`/)
  const jsonStr = match ? match[1] : raw
  return JSON.parse(jsonStr)
}` },
        { type: 'callout', kind: 'warn', title: 'Do not debug by re-prompting forever', text: 'If the model’s JSON is messy, your parser and your tests must survive messy. Hoping the next sample is clean is not an engineering strategy.' },
        { type: 'task', title: 'Do this now', text: 'Take a bug you already fixed. Write the five steps as they actually happened. If you skipped reproduce or changed five files, rewrite how you would do it next time.' },
      ],
      checkpoint: [
        {
          id: 'c3q1',
          prompt: 'The UI shows no generated scripts. Server logs a successful Anthropic call. Next locate step?',
          options: [
            { id: 'a', text: 'Rewrite the React app in Vue.' },
            { id: 'b', text: 'Inspect the model text vs extractJson / contentStore push conditions.' },
            { id: 'c', text: 'Buy a new laptop.' },
            { id: 'd', text: 'Increase max_tokens to 100000 blindly.' },
          ],
          correct: 'b',
          explanation: 'The call worked. The transform into your schema is the suspect.',
        },
        {
          id: 'c3q2',
          prompt: 'Why change one thing at a time?',
          options: [
            { id: 'a', text: 'To go slower for invoicing.' },
            { id: 'b', text: 'So you know which change caused the new behaviour.' },
            { id: 'c', text: 'Git forbids multiple edits.' },
            { id: 'd', text: 'AI tools crash otherwise.' },
          ],
          correct: 'b',
          explanation: 'Science. Multiple knobs hide the cause.',
        },
      ],
    },
    {
      id: 'c4',
      title: 'AI pair programming without losing the plot',
      minutes: 22,
      summary: 'You specify, it drafts, you trace, you own the commit message.',
      video: {
        title: 'Andrej Karpathy — Let’s build GPT (advanced, optional depth)',
        youtubeId: 'kCc8FmEb1nY',
        minutes: 120,
        why: 'Optional. Watch 20 minutes. The point is: generated text is a statistical object. Your tests are the physics.',
      },
      body: [
        { type: 'p', text: 'A useful pairing session looks like a spec: current behaviour, desired behaviour, files you think are involved, constraints (no new dependencies, keep the API). Then you read the diff like a senior reviewing a junior. You never commit unread code. Ever. Not even “it’s just CSS.”' },
        { type: 'h', text: 'Rules that keep you employable' },
        { type: 'ul', items: [
          'You can explain every file in the diff in one sentence.',
          'You ran the path a user would run (click, not only unit tests — but tests too).',
          'Secrets stay out of git. The model loves to hardcode keys; you delete them.',
          'You do not paste customer PII into a random chat tool. Redact.',
          'If the model invents an API that does not exist, you do not “try it in production.”',
        ] },
        { type: 'callout', kind: 'nlbe', title: 'Client trust', text: 'Dutch SMEs will ask “did a robot make this?” The grown-up answer is: “I used tools, I traced the flow, here is how approval works, here is what happens if the model is down.” That is more impressive than pretending you typed every semicolon.' },
        { type: 'task', title: 'Do this now', text: 'Tomorrow, on a small task, write a 6-line spec first. Let AI draft. Review with the four questions from lesson 1. Commit in your words. If you cannot write the commit message without looking at the diff, you did not review it.' },
      ],
      checkpoint: [
        {
          id: 'c4q1',
          prompt: 'The model adds a new npm package you have never heard of. You:',
          options: [
            { id: 'a', text: 'Ship it; popularity will follow.' },
            { id: 'b', text: 'Read what it does, whether you need it, and its maintenance. Prefer stdlib.' },
            { id: 'c', text: 'Add three more packages to be safe.' },
            { id: 'd', text: 'Disable the lockfile.' },
          ],
          correct: 'b',
          explanation: 'Supply chain is your problem. Mystery packages are not a flex.',
        },
        {
          id: 'c4q2',
          prompt: 'A client’s customer emails are in a CSV. You need a regex. You should:',
          options: [
            { id: 'a', text: 'Paste the whole CSV into a public chatbot.' },
            { id: 'b', text: 'Use a synthetic sample or a local model / offline tool. Keep real PII off third-party chats unless a DPA exists.' },
            { id: 'c', text: 'Tweet a screenshot.' },
            { id: 'd', text: 'Put the CSV in a GitHub public gist for “collaboration.”' },
          ],
          correct: 'b',
          explanation: 'PII handling is part of coding with understanding.',
        },
      ],
    },
  ],
  exam: {
    id: 'exam-code',
    title: 'Module 3 exam — Understanding code',
    minutes: 16,
    passPercent: 70,
    questions: [
      {
        id: 'ce1',
        prompt: 'A function returns [] when the API key is missing, and also when the vendor list is empty. Why is that a design smell?',
        options: [
          { id: 'a', text: 'Empty arrays are illegal in JSON.' },
          { id: 'b', text: 'Two different failures share one signal, so the UI cannot tell “config error” from “no data.”' },
          { id: 'c', text: 'TypeScript forbids it.' },
          { id: 'd', text: 'It uses too little RAM.' },
        ],
        correct: 'b',
        explanation: 'Collapse of error and empty is how you debug for an hour.',
      },
      {
        id: 'ce2',
        prompt: 'Best description of a React click that approves content:',
        options: [
          { id: 'a', text: 'Magic state sync.' },
          { id: 'b', text: 'Handler → HTTP POST → server mutates record → JSON back → setState replaces that row.' },
          { id: 'c', text: 'CSS-only change.' },
          { id: 'd', text: 'The GPU trains a model.' },
        ],
        correct: 'b',
        explanation: 'If you can say the pipeline, you can test each hop.',
      },
      {
        id: 'ce3',
        prompt: 'You accept a 200-line AI diff you did not read because tests passed. Risk?',
        options: [
          { id: 'a', text: 'None. Tests are omniscient.' },
          { id: 'b', text: 'Tests can miss secrets, extra network calls, or behaviour you never specified.' },
          { id: 'c', text: 'Git will refuse the commit later.' },
          { id: 'd', text: 'Only CSS can hide bugs.' },
        ],
        correct: 'b',
        explanation: 'Tests check what you thought to ask. Review catches the rest.',
      },
      {
        id: 'ce4',
        prompt: 'localStorage progress resetting in incognito means:',
        options: [
          { id: 'a', text: 'Your course logic is necessarily wrong.' },
          { id: 'b', text: 'You chose a store that is origin- and profile-scoped. Expected.' },
          { id: 'c', text: 'React Router is broken.' },
          { id: 'd', text: 'You must use Web3.' },
        ],
        correct: 'b',
        explanation: 'Know the store. Do not panic at documented behaviour.',
      },
      {
        id: 'ce5',
        prompt: 'JSON.parse throws on model output. First hypothesis to test:',
        options: [
          { id: 'a', text: 'The sunspot cycle.' },
          { id: 'b', text: 'The string is not pure JSON (prose, fences, trailing commas).' },
          { id: 'c', text: 'Windows cannot parse JSON.' },
          { id: 'd', text: 'You need Kubernetes.' },
        ],
        correct: 'b',
        explanation: 'Look at the actual string. Then parse defensively.',
      },
      {
        id: 'ce6',
        prompt: 'A good commit message after an AI-assisted change:',
        options: [
          { id: 'a', text: '“fixes”' },
          { id: 'b', text: '“Prevent content approve from 404ing when id is missing; return 404 JSON.”' },
          { id: 'c', text: '“cursor did this”' },
          { id: 'd', text: '“asdf”' },
        ],
        correct: 'b',
        explanation: 'If you can name the user-visible why, you understood the diff.',
      },
      {
        id: 'ce7',
        prompt: 'Why log the HTTP status before parsing the body?',
        options: [
          { id: 'a', text: 'Fashion.' },
          { id: 'b', text: 'An error HTML page will crash JSON.parse and hide the real 500/401.' },
          { id: 'c', text: 'Status codes are deprecated.' },
          { id: 'd', text: 'Browsers forbid it.' },
        ],
        correct: 'b',
        explanation: 'Locate the first lie: status, then shape.',
      },
      {
        id: 'ce8',
        prompt: 'You do not understand a regex the model wrote. You should:',
        options: [
          { id: 'a', text: 'Ship it; regex is supposed to be unreadable.' },
          { id: 'b', text: 'Expand it into tests (match / no-match examples) or rewrite it until you can explain each group.' },
          { id: 'c', text: 'Double it.' },
          { id: 'd', text: 'Put it in a comment in Latin.' },
        ],
        correct: 'b',
        explanation: 'Unexplained regex is a landmine. Tests are the spec.',
      },
    ],
  },
}
