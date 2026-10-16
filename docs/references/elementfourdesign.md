# Element four — Lusion Projects → Paryatech journal

Reference: [Lusion Projects](https://lusion.co/projects/). Inspected 16 October 2026 using the live page, its publicly served HTML/CSS/JavaScript, and the supplied 8.05-second recording. This file documents the reference and its adaptation; the established Paryatech design remains the source of truth for brand assets.

## What this page communicates

The reference is a creative studio’s project index. Its hierarchy gives the work most of the page: a very large title, a small project count, a directional arrow and a two-column gallery. Category descriptions and names sit beneath images. The studio’s contact, menu and further-page prompts form a secondary layer around the gallery. These are portfolio projects, not editorial stories or software features.

The Paryatech adaptation uses the same spacious index rhythm for **Blogs & news**. Its content is original guidance for travel agencies. Fourteen complete stories make the cards useful immediately. There are no invented company announcements, publication dates, customer results or attributed authors. A short note explains that product announcements will be added when published.

## Element inventory

| Reference element | Observed treatment | Paryatech adaptation |
|---|---|---|
| Global header | Small studio wordmark left; compact sound, contact and menu controls right | Existing floating Paryatech navigation, supplied by the shared shell |
| Page title | Very large uppercase type, approximately 17vw in the stylesheet | Large Zagma “Blogs & news” with the same dominant presence |
| Count | Small elevated count at the title’s upper right; live count was 19 | Honest `14` story count |
| Directional cue | Thin diagonal arrow alongside the title | Large diagonal link to the story index |
| Gallery | Twelve-column grid; each card spans six columns | Two equal columns, then one column on small screens |
| Media | Broad rounded thumbnails, about 0.65 image height per unit width | Local, already credited Pexels destination/team images; ratio 1.54 |
| Card details | Small uppercase discipline list, then larger title | Small topic/read-time line and category, followed by a serif story title |
| Card navigation | Entire project card links to its detail route | Entire story card links to a complete readable article |
| Ending | Oversized contact invitation and continuation into the footer | Editorial demo invitation, then the common Paryatech footer |

Reference stylesheet measurements include 15px media corners, a title top margin around 20vh and a spacious gap before later rows. At a 1440px viewport, the inspected heading wrapper began around x70/y250. The first two thumbnails began around y620. These measurements explain the composition rather than serving as universal fixed coordinates.

## Motion study

### Heading entrance

On desktop the reference splits the heading into characters. Each character starts below its clipping line and rotates into place. The observed source maps a 100% vertical displacement and 30° rotation to zero, offsetting neighbouring characters by roughly 1/20 second. The count enters after the title begins. The adjacent arrow uses an elastic scale entrance. Mobile uses the unsplit title and a stable arrow.

The journal keeps a restrained version: individual title characters enter from below with a small rotation, 35ms apart, over 950ms using the existing site easing. The visible heading still has one accessible name, rather than exposing each animated character as a separate item. Reduced motion leaves the normal heading in place.

### Card arrival and scroll

Reference cards are DOM-linked WebGL surfaces, not ordinary animated `<img>` elements. A card’s image and matching depth map feed the rendering material. Its arrival interpolates the image reveal over about 1.5 seconds; position and rotation settle over about two seconds. The source also passes eased scroll strength into a small ripple term, capped around 0.15.

The 16 October team feedback and two supplied comparison recordings show why a one-time reveal was insufficient. In the desired second recording the two media panels repeatedly swing in from the centre with opposing perspective, then flatten into their reading position as scrolling continues. The reference resets an item’s arrival time when the item leaves its active range. This gives later rows the same motion as the first pair.

The revised Paryatech journal uses continuous media motion rather than a one-shot card animation:

- The document retains native scroll, wheel, touch, keyboard, anchor and browser-history behaviour. No global scroll smoothing or wheel interception is added.
- A single requestAnimationFrame loop eases only the thumbnails, with a frame-rate independent 110ms response. It sleeps after the visible panels settle.
- Each pair opens from the middle: up to 32px horizontal drift, 55px vertical arrival, opposing 3.1° planar rotation and 9° perspective yaw. A rounded inset mask relaxes from 4.2% to the normal card edge.
- Images move inside their masks by at most 22px through the viewport. The 1.16 image overscan keeps the crop filled. Scroll-speed feedback adds a bounded extra nudge and damps smoothly when the scroll stops.
- Metadata, title and description settle in sequence at 0/65/120ms offsets over 750–1050ms. They remain readable after entrance and when focused.
- Mobile keeps the same choreography at a smaller amplitude: 9px lateral, 24px vertical, 1° planar rotation, 2° perspective and 9px inner-image drift.
- Stable card boxes are measured only when layout changes. Only panels near the viewport update; GPU hints are removed from distant panels. Search, category changes, fonts and resizing trigger new measurements.
- Reduced motion removes all media transforms and masks and presents full captions immediately. A changed preference stops the running loop. Without JavaScript the ordinary images, headings and article links remain visible.

These are a DOM/CSS adaptation of the reference flow. No reference renderer, models, depth maps, shader code or branded project imagery are included.

### Hover and focus

The reference responds to pointer position with depth focus, zoom and damped secondary motion. Initial hover thresholds at 0, 0.2 and 0.3 seconds contribute short changes in image direction. The title uses repeated character columns for a rolling reveal and shifts horizontally to admit an arrow. This is a spatial preview response, rather than a timed gallery carousel.

The journal follows that sequence with pointer-relative image tilt, a slow image zoom, a rounded “Read the story” prompt and a title that shifts aside for an arrow. Pointer tilt is limited to a few degrees and eases through the same motion loop, avoiding competing transform transitions. Pointer leave returns the pointer response to rest while preserving the current scroll position. Keyboard focus exposes the same read prompt and title cue. Touch shows the read prompt permanently; the first tap opens the article directly. Reduced motion disables the movement.

### Project opening

The reference can expand a selected gallery surface into a detail-page transition. Its `ProjectItemList` scales the selected image toward the viewport and adds a small pivot. That requires its shared WebGL scene. The Paryatech journal uses the common brand-mark page transition instead, maintaining one consistent transition across Blogs, Pricing, Careers and Book a demo. See [element five](elementfivedesign.md).

## Journal-specific controls

The following are editorial requirements rather than copied Lusion elements:

- All stories, Guides and Product notes filter buttons use `aria-pressed` and retain ordinary button keyboard behaviour.
- Search matches titles, topics and short descriptions. It combines with the selected filter.
- A live result count reports changes without moving focus.
- An empty state has a functional reset button.
- Without JavaScript, all fourteen cards remain available; enhancement controls stay hidden.

Articles include an index link, category/read-time label, title, short introduction, cover image, a small contents list, readable sections and a next-story link. Every demo link targets `/book-a-demo/`.

## Brand and content rules

Keep local Zagma and NeueHaas; use `#111111`, `#E5E8E3`, `#115553` and white. Lusion’s pale lavender, heavy uppercase sans-serif title and original work are reference observations, not new Paryatech brand tokens. Existing local photography retains its Pexels source attribution in the project’s media documentation.

The article content is written for this prototype using Paryatech’s public descriptions of enquiries, shared inboxes, proposals and gradual onboarding. Practical advice is editorial guidance. It does not announce unverified capabilities, releases or customer outcomes.

## Implementation and evidence

- `paryatech-waabi/src/pages/blogs.html`
- `paryatech-waabi/src/pages/article-{pipeline,inbox,proposals,start}.html`
- `paryatech-waabi/src/pages/blogs-manifest.json`
- `paryatech-waabi/dist/blogs.css` and `blogs.js`
- `output/lusion-pages/projects-desktop.png` and `projects-hover.png`
- `output/lusion-pages/recording-1-*.jpg`
- `output/lusion-pages/ProjectsMainSection.txt`, `ProjectItem.txt` and `research-notes.json`

Public source files were saved for inspection, not included as runtime dependencies. Browser inspection used local Chrome after the collaborative browser’s own-tab snapshot failed twice with `Preview automation snapshot timed out after 15000ms.`


## Team feedback verification — 16 October 2026

Inspected the supplied current recording (`317d35c8…`) and desired reference recording (`60573a60…`), both approximately 4.6 seconds, with AVFoundation frame extraction. Live browser inspection confirmed the reference still uses paired media surfaces and a stable DOM grid. The journal update changes only `blogs.css` and `blogs.js`; shared navigation, typography, article content and the common page transition are retained.

Evidence is saved under `output/paryatech-feedback-v8/journal/`: extracted reference frames, desktop/mobile screenshots, a captured scroll recording and `verification.json`. Browser checks cover all fourteen cards, category counts, search, empty/reset states, keyboard focus, dynamic reduced motion, JavaScript-disabled reading and 320/390/768/1440px layouts. The collaborative browser was used first; local screenshots used Chrome after two snapshots returned `Preview automation snapshot timed out after 15000ms.`
