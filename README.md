# Paryatech — local marketing website

A responsive static website using the approved Waabi-inspired direction: Zagma headings, NeueHaas utility text, and `#111111`, `#E5E8E3`, `#115553`, `#FFFFFF`. Later references add specific interactions while retaining that system.

## Run locally

```sh
node scripts/assemble.mjs
python3 -m http.server 4179 --bind 127.0.0.1 --directory dist
```

Open `http://localhost:4179/`. No package installation is required. The assembly step uses Node; serving the generated pages only needs a static HTTP server. `start-local.command` also starts the local server.

## Pages

- `/`: approved landing page, workflow conveyor, connected feature illustration, new pricing section, video FAQ, and 15-sticker physics footer.
- `/blogs/`: 14 original articles, category filters, search, and a complete reading page for every story.
- `/pricing/`: quarterly ₹20,000 for 3 months, half-yearly ₹30,000 for 6 months, and yearly ₹50,000 for 12 months. Rolling digits follow period selection. Prices are totals for each period.
- `/book-a-demo/`: agency details and a real scheduling handoff to Paryatech’s existing Cal.com calendar. Incoming `?plan=quarterly`, `half-yearly`, or `yearly` context is displayed and carried through.
- `/careers/`: team principles, interactive film CTA, and an email introduction by area of interest. No vacancies or employment terms have been invented.

The five menu destinations are Home, Features, Pricing, Blogs, and Connect. Features leads to the landing-page section; Connect and demo CTAs lead to `/book-a-demo/`. Careers is available from the shared footer.

## Source and assembly

- `src/index.template.html`: landing page source and insertion markers.
- `src/partials/`: shared header, announcement, brand transition, and media credits dialog.
- `src/pages/`: new page and article content. Blog routes, card details and article metadata are listed in `blogs-manifest.json`; assembly generates the journal cards and counts from this list.
- `scripts/assemble.mjs`: assembles the landing page and 18 additional documents into `dist/`. It normalizes shared assets to root-relative paths and converts demo buttons to ordinary links, so these destinations also work without JavaScript.
- `dist/site.css` / `site.js`: shared navigation, current states, reveals, feature/credit dialogs, and the brand aperture page transition. The supplied PNG is both the static favicon and the animated in-page mark. Cross-page navigation plays the transition; same-page anchors remain ordinary scrolling. Reduced motion skips the transition.
- `dist/script.js`: landing hero film and scroll choreography.
- `dist/workflow-v2.html/css/js`: scroll-linked Capture/Create/Confirm conveyor.
- `dist/build-v3.html/css/js`: connected-input/particle feature illustration.
- `dist/faq-v2.html/css/js`: written answers and row-bound Pexels clips.
- `dist/pricing-section.html`, `pricing.css/js`: shared rolling-price component and pricing page styles.
- `dist/blogs.css/js`, `demo.css/js`, `careers.css/js`: page-specific behavior.
- `dist/footer-v2.html/css/js`: shared links and 15 location stickers. Gravity, collisions, cursor stirring, drag/fling, fixed-count pouring, touch placement, keyboard movement, reset, idle sleep, offscreen pause, and reduced motion are retained.
- `dist/styles.css`, `sections.css/js`: approved visual foundations and existing lower sections.
- `dist/assets/`: local fonts, original generated landmark artwork, Paryatech product previews, and credited Pexels media.

Edit source fragments, then rerun assembly. `dist/sections.html` is a historical fragment; the landing template is the current source for its non-modular sections. Generated HTML in `dist/` is served directly. Local hosting metadata and deployment credentials are excluded from Git.

## Booking and content behavior

The demo form validates details and uses a native GET submission to `https://cal.com/paryatech-hq/demo`. It carries documented name/email and metadata parameters. A booking is confirmed only on that calendar. There is no simulated lead submission, payment checkout, or invented success message. Native form submission still works with JavaScript disabled.

Blog articles are original editorial guides, not fabricated company news. Product announcements can be added when approved. Careers opens a real email draft to `hq@paryatech.in`; the visitor chooses whether to send it. No external submissions were made during QA.

The 15 stickers keep their previous rendered dimensions. Move the cursor to stir, drag and release to throw, or hold empty desktop space to pour the same collection. On touch, tap a sticker before dragging or tap a new position. Arrow keys move a selected sticker, Shift increases the step, Enter/Space toggles selection, and Escape restores it. Reset restores all 15.

## Reference studies and verification

`docs/references/` contains `design.md` and `elementonedesign.md` through `elementeightdesign.md`. The newest studies cover Lusion Projects, Lusion’s page transition, Swap’s demo page, Cluely’s pricing motion, and Heyclicky’s careers interaction.

Page and interaction evidence is in `../output/paryatech-pages-v5/`, `../output/lusion-pages/`, `../output/demo-page/`, and `../output/pricing-careers/`. The 14-story expansion and pricing digit fix are verified in `../output/paryatech-journal-v6/`. Earlier reference and sticker physics evidence remains in the other workspace `output/` directories. Pexels attribution is maintained in `dist/media-sources.json` and the shared film credits dialog.

## GitHub and Vercel

Repository: https://github.com/rishicharan11/Paryatech

`vercel.json` builds this exact static site with `node scripts/assemble.mjs` and serves `dist/`. All videos, images, fonts and scripts are included locally. Trailing-slash routes support direct links and browser refreshes for all 19 pages.

After linking this checkout to the `paryatech` Vercel project, deploy with:

```sh
npx vercel deploy --prod
```

The connected GitHub repository deploys updates from `main`. Share the production URL from Vercel. Social metadata uses `SITE_URL` when set, otherwise Vercel’s production URL during hosted builds and `http://localhost:4179` locally. No runtime secrets or paid backend services are needed to serve the site.
