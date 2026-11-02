import type { Course } from './types'
import { module1 } from './m1-research'
import { module2 } from './m2-data'
import { module3 } from './m3-code'
import { module4 } from './m4-clients'
import { module5 } from './m5-close'

export const course: Course = {
  title: 'AI Operator',
  subtitle: 'Van nul naar betaalde klant — alles wat je echt nodig hebt',
  intro: 'Vijf modules. Examens. Praktijkopdrachten. Geen filler. Je leert scrapen, bouwen, analyseren, klanten vinden en deals sluiten — voor NL/BE-bedrijven die AI nog niet snappen maar er wel voor willen betalen.',
  modules: [module1, module2, module3, module4, module5],
  finalExam: {
    id: 'final',
    title: 'Eindexamen',
    minutes: 30,
    passPercent: 75,
    questions: [
      {
        id: 'fe1',
        prompt: 'Wat is de juiste volgorde voor een nieuw klanttraject?',
        options: [
          { id: 'a', text: 'Offerte → diagnose → rapport → pitch' },
          { id: 'b', text: 'Diagnose → rapport → pitch → offerte' },
          { id: 'c', text: 'Pitch → diagnose → offerte → levering' },
          { id: 'd', text: 'Rapport → pitch → diagnose → offerte' },
        ],
        correct: 'b',
        explanation: 'Bewijs eerst dat het probleem bestaat (diagnose), dan toon je het (rapport), dan vraag je geld (pitch + offerte).',
      },
      {
        id: 'fe2',
        prompt: 'Een klant wil "100 ads gegenereerd vanmiddag" zonder briefing. Wat doe je?',
        options: [
          { id: 'a', text: 'Je doet het voor €50.' },
          { id: 'b', text: 'Je legt uit dat volume zonder grond is wat ze al probeerden; je biedt eerst de diagnose aan.' },
          { id: 'c', text: 'Je fine-tunet op hun Drive-map.' },
          { id: 'd', text: 'Je zegt ja en gebruikt stockfoto\'s.' },
        ],
        correct: 'b',
        explanation: 'Je verkoopt een proces dat spend rationeel maakt, geen losstaand volume.',
      },
      {
        id: 'fe3',
        prompt: 'Welke bron staat het hoogst in de bewijshiërarchie?',
        options: [
          { id: 'a', text: 'Een LLM-antwoord' },
          { id: 'b', text: 'Een LinkedIn-post van een guru' },
          { id: 'c', text: 'Hun eigen Shopify-analytics' },
          { id: 'd', text: 'Een blog van een marketingbureau' },
        ],
        correct: 'c',
        explanation: 'First-hand data — de eigen analytics van de klant — staat altijd bovenaan.',
      },
      {
        id: 'fe4',
        prompt: 'Wat is het doel van een Python-agent in een klantproject?',
        options: [
          { id: 'a', text: 'AI indrukwekkend laten klinken.' },
          { id: 'b', text: 'Een herhaalbare taak automatiseren zodat jouw tijd vrijkomt voor waarde-toevoeging.' },
          { id: 'c', text: 'De klant afhankelijk maken van jou.' },
          { id: 'd', text: 'Altijd verbetering boven samenwerking kiezen.' },
        ],
        correct: 'b',
        explanation: 'Automatisering maakt tijd vrij voor strategie. Afhankelijkheid is een anti-patroon.',
      },
      {
        id: 'fe5',
        prompt: 'Je pilot heeft na 14 dagen geen resultaat. Wat doe je?',
        options: [
          { id: 'a', text: 'Doorgaan tot de klant klaagt.' },
          { id: 'b', text: 'De geplande stop-datum respecteren en een beslissing nemen: stop of pivot.' },
          { id: 'c', text: 'Meer budget vragen.' },
          { id: 'd', text: 'Het achter de schermen aanpassen zonder te melden.' },
        ],
        correct: 'b',
        explanation: 'Een geplande stopdatum voorkomt zombie-projecten. Gestructureerde beslissingen zijn professioneel.',
      },
    ],
  },
}
