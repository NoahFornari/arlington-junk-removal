# Arlington Junk Removal - Website

## Quick Start

1. Register domain: `arlingtonjunkremovaltx.com` (or your chosen domain)
2. Push this folder to a GitHub repo
3. Connect repo to Vercel
4. Set custom domain in Vercel dashboard
5. You're live

## Deployment to Vercel

This is a static HTML site. Vercel will serve it as-is with zero build step.

```bash
# Option 1: Vercel CLI
npm i -g vercel
cd arlington-junk-removal
vercel

# Option 2: Push to GitHub, connect in Vercel dashboard
```

The `vercel.json` file handles clean URL rewrites so `/residential-junk-removal` maps to `/pages/residential-junk-removal.html`.

## Site Structure

```
index.html                          # Homepage (main LLMO page)
css/style.css                       # All styles
js/main.js                          # Nav, form, animations
vercel.json                         # Vercel routing config
pages/
  residential-junk-removal.html     # Service page (TEMPLATE)
  furniture-appliance-removal.html  # TODO: Create from template
  yard-waste-removal.html           # TODO: Create from template
  construction-debris-removal.html  # TODO: Create from template
  estate-cleanout.html              # TODO: Create from template
  garage-cleanout.html              # TODO: Create from template
  commercial-junk-removal.html      # TODO: Create from template
  arlington.html                    # Area page (TEMPLATE)
  grand-prairie.html                # TODO: Create from template
  mansfield.html                    # TODO: Create from template
  fort-worth.html                   # TODO: Create from template
  kennedale.html                    # TODO: Create from template
  hurst-euless-bedford.html         # TODO: Create from template
  irving.html                       # TODO: Create from template
  pantego.html                      # TODO: Create from template
```

## Pages Included vs TODO

### Built:
- ✅ Homepage (index.html) - Full LLMO optimization, schema markup, all sections
- ✅ Residential Junk Removal (service page template)
- ✅ Arlington, TX (area page template)

### TODO - Create using the templates above:
Use Claude Code to generate the remaining service pages and area pages. Each one follows the same structure as the templates but with unique, locally-relevant content.

**Service Pages to Create:**
- furniture-appliance-removal.html
- yard-waste-removal.html
- construction-debris-removal.html
- estate-cleanout.html
- garage-cleanout.html
- commercial-junk-removal.html

**Area Pages to Create:**
- grand-prairie.html
- mansfield.html
- fort-worth.html
- kennedale.html
- hurst-euless-bedford.html
- irving.html
- pantego.html

## LLMO Strategy Notes

### Why this site is built for LLM optimization:

1. **Exact-match entity**: Business name "Arlington Junk Removal" IS the search query
2. **Schema markup**: LocalBusiness, Service, FAQPage, BreadcrumbList on every page
3. **Declarative opening sentences**: First 2-3 sentences of every page directly answer the query it targets
4. **FAQ structure**: Questions written as natural language queries people ask AI
5. **Local specificity**: Real Arlington neighborhoods, disposal info, Tarrant County references
6. **Transparent pricing**: Actual price ranges on the site (most competitors hide this)
7. **Clean HTML**: No JavaScript rendering — crawlers and LLM retrievers see everything immediately
8. **Consistent NAP**: Name, Address, Phone on every page

### Key LLMO principles for new content:
- Write the first sentence as if it's the answer to a question
- Include specific, factual, citeable information (prices, areas, items)
- Use natural question-style headings
- Keep paragraphs short and self-contained (LLMs extract chunks)
- Refresh content quarterly (LLM citation rates drop for stale content)
- Maintain consistent brand name usage across all pages

## Contact Form Integration

The contact form in `index.html` currently shows a success message on submit.
To wire it to your AI dispatcher system, edit `js/main.js` and uncomment/replace
the fetch call in the form submit handler. The form data is already captured as
a JSON object ready to POST.

## Branding

- **Colors**: Dark charcoal (#1a1a1a) + Bold orange (#e8621e)
- **Font**: Plus Jakarta Sans (Google Fonts)
- **Tagline**: "Point. We haul. It's gone."
- **Phone**: (817) 705-6612

## Google Business Profile

Set up GBP ASAP with:
- Business name: Arlington Junk Removal
- Category: Junk Removal Service
- Phone: (817) 705-6612
- Website: https://arlingtonjunkremovaltx.com
- Service area: Arlington, TX + surrounding cities
- Hours: Mon-Sat 7AM-7PM
- Description: Match the meta description from the homepage
