# Lokale voortgang

De actieve voortgang staat in `.lio/progress.json`, relatief aan de pakketmap. Het bestand wordt bij de eerste les aangemaakt. Er is geen server, account of extra runtime voor nodig. Codex kan het bestand met zijn gewone bestandsfuncties bijwerken.

## Formaat

```json
{
  "schema_version": 1,
  "course": "187n-codex-hermes",
  "course_version": "1.0.0",
  "revision": 1,
  "active_lesson": "0.1",
  "return_to": null,
  "lessons": {
    "0.1": {
      "status": "in_progress",
      "step": 1,
      "run_id": "20260922-153000-a1b2",
      "outputs": [],
      "next_action": "Kies jouw eigen product of dienst",
      "checked": [],
      "updated_at": "2026-09-22T15:30:00+08:00"
    }
  }
}
```

Gebruik `not_started`, `in_progress`, `blocked` of `completed`. `step` is de volgende uit te voeren stap, 1 tot het aantal stappen in de lesindex. Bij voltooiing blijft hij op de laatste stap. `checked` bevat korte feitelijke controles, nooit verzonnen tests. `outputs` bevat bestaande paden relatief aan de pakketmap. Een bewust gekozen extern projectpad wordt alleen na keuze van de student gebruikt en apart in `next_action` vermeld; claim daarop geen automatische portable update.

## Bijwerken

1. Lees bestaande JSON vlak voor schrijven. Behoud alle andere lessen en onbekende velden. De sleutel is de bestaande lescode, niet het videonummer.
2. Maak bij eerste gebruik `.lio/` en een unieke run-ID. Hervatten hergebruikt de run-ID. Schrijf geen secrets of volledige chattranscripten.
3. Bewaar de vorige geldige JSON als `.lio/progress.previous.json`. Schrijf de nieuwe inhoud naar een tijdelijk bestand in dezelfde map en vervang daarna `progress.json`. Verhoog `revision` met één.
4. Bij twee gelijktijdige cursusgesprekken: vergelijk de laatst gelezen revision vóór vervanging. Is die veranderd, lees opnieuw en voeg alleen de eigen leswijziging samen. Spreek af in welk gesprek de actieve les verdergaat; overschrijf geen nieuwere sessie.
5. Werk de bestaande tabel `werkkaarten/mijn-voortgang.md` bij met lescode, run, echt outputpad, controle, status en volgende actie. De JSON bepaalt het hervatpunt; de tabel is leesbaar voor de student.
6. Een afgeronde les blijft afgerond bij alleen teruglezen. Voor opnieuw uitvoeren maak je een nieuwe run en bewaar je de oude outputverwijzingen onder `previous_runs`.

## Bestaand werk en herstel

Ontbreekt JSON maar bevat `werkkaarten/mijn-voortgang.md` eerdere regels, lees die eerst. Neem bestaande outputpaden over nadat je ze hebt gecontroleerd. Een oude status is geen nieuw bewijs; start onduidelijke regels als `in_progress`. Een lege tabel betekent een nieuwe student.

Is JSON beschadigd, overschrijf die niet. Bewaar het beschadigde bestand onder een unieke herstelnaam. Gebruik de geldige vorige versie of reconstrueer het hervatpunt uit de tabel en bestaande output. Meld kort wat wel en niet kon worden hersteld. Hervatten herhaalt geen externe actie automatisch.

Als een student een eerdere les nodig heeft, zet `return_to` op de aangevraagde lescode. Na het maken/controleren van die input bied je de terugkeer aan. Een overgeslagen les wordt nooit automatisch `completed`.

## Optionele lokale helper

Als Python 3.9 of nieuwer al beschikbaar is, kan de coach `interactief/tools/course.py` gebruiken voor exacte lesroutering en atomische opslag met een revisiecontrole. Installeer Python niet alleen voor voortgang. Zonder Python gelden dezelfde regels met de gewone bestandsfuncties.

Vanuit de pakketmap: `python3 interactief/tools/course.py lesson N28`, `python3 interactief/tools/course.py resume` of `python3 interactief/tools/course.py status`. Op Windows gebruik je het werkelijk beschikbare Python-commando. Voor opslaan: `save N28 --step 2 --revision 0 --next-action "Bekijk de geselecteerde creatives"`. Lees eerst de huidige revision; het voorbeeldgetal is geen vaste waarde. Voltooiing vraagt bestaande `--output`-paden en feitelijke `--checked`-controles. De helper controleert bestaan en paden; de coach beoordeelt de inhoud.

De helper importeert oude Markdown-voortgang niet automatisch en werkt de leesbare tabel niet zelf bij: doe die twee stappen volgens het contract hierboven. `resume` is alleen lezen; het start geen uitvoering en verandert een afgeronde les niet. De coach biedt daarna de volgende les aan.
