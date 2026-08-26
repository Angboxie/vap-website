# VAP website redesign

Static rebuild of valueadvisory.co. Eleventy, no framework.
Built during a UX placement; VAP has no developer, so keep
dependencies minimal and content editable as markdown.

## Colour
Client requires the existing turquoise. Palette is single-hue,
all derived from the logo colour. Tokens in src/styles/tokens.css.
- --brand-50 (#DEF4F7) is the page canvas
- --brand-500 is buttons, links, rules, chart fills only
- Headings are --ink (#323232), never turquoise
  (turquoise on brand-50 is ~2.5:1 and fails WCAG)

## Content rules
- All copy comes from the live site. Never invent stats,
  client names, project names or numbers.
- The only figure on the current site is "over 15 years".
- Contact details and nav live in src/_data/site.json.

## Known content issues (raised with client)
- "Our Approach" and "Our Values" duplicate the same opening copy
- Team page has 5 photos, no names, roles or bios
- Homepage shows 3 focus areas; What We Do has 4
  (Digital Decision Support Tools) — unresolved
- Case studies (Gawler River, Greenline, Deakin Burwood) are
  buried mid-scroll with no URLs. Giving them their own pages
  is the highest-value change.

## Conventions
- Sentence case in nav and headings, not ALL CAPS
- aria-current for active nav state, not a filled block
- Mobile nav required (current site has none)