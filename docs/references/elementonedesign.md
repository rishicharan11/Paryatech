# Outcrowd — element one reference study

Reference: [outcrowd.io](https://www.outcrowd.io/)
Inspected: 15 October 2026
Purpose: understand Outcrowd’s page structure and motion, then adapt the startup-stage conveyor and awards hover to the **approved Paryatech landing page**. The existing [design.md](design.md) remains the source of the overall design direction.

## Scope and evidence

The homepage was inspected live at **1440 × 900**, with a **390 × 844** mobile comparison. Analysis combines settled browser captures, computed element geometry, downloaded public HTML/CSS, inline JavaScript, and the live Webflow IX2 interaction data. This is a reusable-element inventory of the homepage and its linked page families, rather than a copy of every case study or article.

Evidence labels used below:

- **Observed** — checked in the rendered page or an interaction.
- **Measured** — read from computed styles or DOM dimensions.
- **Source** — present in the site’s published code or active Webflow interaction data.
- **Adaptation** — a deliberate Paryatech implementation choice.

T3 navigation/evaluation initially worked. Screenshot automation then failed with `Preview automation snapshot timed out after 15000ms.` and `Preview automation client server-browser disconnected during snapshot.` Inspection continued in a separate local Chrome instance through Playwright. No unrelated browser tabs were changed.

Saved evidence is in [output/outcrowd-reference](output/outcrowd-reference/):

- [Desktop opening](output/outcrowd-reference/01-home-desktop.png).
- [Startup conveyor — early](output/outcrowd-reference/02-stages-0.png), [first active](output/outcrowd-reference/02-stages-2.png), [second approach](output/outcrowd-reference/02-stages-4.png), [third](output/outcrowd-reference/02-stages-6.png).
- [Awards idle](output/outcrowd-reference/03-awards-idle.png) and [awards hover](output/outcrowd-reference/04-awards-hover.png).
- [Mobile stages](output/outcrowd-reference/05-stages-mobile.png).
- [Exact startup animation data](output/outcrowd-reference/stages-motion-source.json), [computed geometry](output/outcrowd-reference/geometry-stage-2.json), [published CSS](output/outcrowd-reference/site.css), [published homepage HTML](output/outcrowd-reference/home.html).

Some reference captures include Outcrowd’s cookie panel. The underlying component dimensions and transformations were measured independently. Screenshots represent particular scroll states; a full-page capture alone would hide the behavior of the pinned section.

## Website context

Outcrowd positions itself as a design and development partner for startup founders, especially SaaS companies. Its page connects brand identity, usable products and implementation with a founder’s commercial priorities. The primary conversion is a conversation or project enquiry, supported by external case studies, client recognition, reviews and editorial content.

The page’s narrative moves from positioning to evidence, then offers the visitor several ways to assess the agency: their startup’s stage, a service, a relevant project, client opinion and awards. The final question section addresses engagement concerns before another contact invitation.

**Adaptation:** Paryatech already has a different product story: an integrated workspace for Indian travel agencies. Preserve that story and the established typography. Borrow Outcrowd’s interaction mechanisms; its claims, client results, awards, illustrations and brand colors do not belong in Paryatech.

## Visual system and composition

| Element | Reference evidence | Paryatech treatment |
| --- | --- | --- |
| Canvas | Predominantly near-black, with a lighter opening and selected pale surfaces | Existing white canvas, mist surfaces and teal accents |
| Source neutrals | `#080808`, `#191919`, `#171717`, `#404040`, `#737373`, `#9c9c9c`, `#e6e6e6`, `#fafafa` | Existing `--ink: #111111`, `--mist: #E5E8E3`, `--white: #ffffff` |
| Accent | Bright orange contact controls; violet also appears in the published token set | Existing `--teal: #115553` |
| Typography | Custom ITC Avant Garde book/medium and condensed faces; compact geometric forms | Existing Zagma for expressive headings and prose, NeueHaas for controls and small labels |
| Heading scale | Source hero `4.44rem`; main section headings approximately `4.44rem`; startup heading `4.44444rem`; final CTA `7.78rem` | Preserve existing responsive Paryatech scale rather than copying these values |
| Body scale | Source common body `.b1` is `1.3889rem / 140%` | Existing editorial serif body and sans utility hierarchy |
| Container | Public CSS includes `max-width: 90rem`; local components also use narrower bounds | Existing `.container`: `min(1234px, 85.6944%)` |
| Cards | Soft corners, large imagery, sparse surrounding chrome | Keep existing 12–16px radius vocabulary and real product previews |
| Hierarchy | Broad contrast changes, negative space, strong graphic silhouettes | Preserve the approved landing page rhythm |

Outcrowd uses responsive `rem`/viewport relationships, so source values are not universal pixel specifications. At 1440px inspection, body `1rem` resolved to **14.4px**. The conveyor’s source radius and card dimensions should therefore be read alongside the saved computed measurements.

## Homepage element inventory

| Area | Elements and function | Interaction and motion |
| --- | --- | --- |
| Preloader | Startup loading layer and session flag | Source suppresses repeat presentation for internal navigation |
| Floating navigation | Logo, navigation links, call booking and contact action | Compresses while scrolling down and expands while scrolling up; treatment changes with section color |
| Navigation items | Repeated front/hover text layers | Source styles include 3D text rollover; circular pointer-centered fills are used by several button families |
| Opening | Oversized positioning, supporting visual compositions and laptop/showreel | Desktop showreel grows toward full width with scroll |
| Intro statement | Centered multi-line statement | Character-level scroll reveal through SplitType/GSAP in source |
| Evidence cards | Four result/credibility cards with large figures and animation art | Lottie assets and gradient edge masks; the values are Outcrowd-specific |
| Startup-stage heading | Title and short supporting paragraph | Additional moving heading layer introduces the pinned sequence |
| Startup-stage story | Three long-form step descriptions and rotating product cards | Scroll-controlled circular conveyor, documented precisely below |
| Services introduction | Section title and a short framing paragraph | Scroll entrance and clear reset after the tall stage sequence |
| Service cards | Six distinct service categories, descriptions and visual compositions | Unequal card heights; pointer-position CSS variables drive local hover effects |
| Enterprise recognition | Heading and a row of brand marks | Credibility break between services and work |
| Work introduction | Large editorial statement | Character reveal in published scripts |
| Selected work | Project title, descriptive text, preview media and outbound case-study control | Mixed visual compositions; external project links |
| Reviews heading | Statement, review count and Clutch identity | Heading collapses/reorganizes into a larger mark according to scroll direction on desktop |
| Review slider | Client identity, job role, rating, quote, external review link | Swiper drag/touch/keyboard support; source autoplay is disabled |
| Awards | Aligned award rows with project, category and date | Center-growing hover background and floating certificate card |
| News | Three article previews and a more-news action | Editorial cards linking to the blog |
| Questions | Question triggers and explanatory responses | Disclosure pattern; this differs from the awards interaction requested for Paryatech |
| Final invitation | Oversized heading, short supporting copy, contact and call booking | High contrast conversion area |
| Footer | Grouped case/service/company links, email, location and legal line | Hover text, pointer fills and magnetic social-link movement in source |
| Utilities | Cookie consent, scheduling overlay, contact/chat integrations | External widgets; unrelated to the requested Paryatech component behavior |

Linked destination families are Cases, Services, Blog, About and Contact, alongside external project sites, review platforms and call scheduling. This study does not establish the detailed design of every linked page.

## Startup stages: verified behavior

The reference is **not a timed carousel or a set of click-to-open tabs**. It is a tall scroll interval with a fixed viewport composition. The text and image cards travel continuously while the document scrolls normally.

### Layout

**Source:** `.height-cases` is **400vh** on the inspected desktop rules, with a **350vh** override at another desktop/tablet size. `.cases-sticky-wrap` uses **height: 100vh**, **position: sticky**, **top: 0**. The two primary sides occupy half of the viewport. The left contains a vertically spaced text strip with top/bottom gradients; the right clips an oversized rotating carrier against a slightly lighter dark background.

**Source:** `.rotate-ellipse-2` is a **150rem** circle, with a **150vw** override. It carries five card slots. The first and fifth are invisible spacing cards; the middle three are the actual project images. Each card is **29%** of the circle width and has an aspect ratio of **4.78 / 2.7**. The center card is unrotated locally. Its neighbors carry local rotations of **+14°** and **−14°**, with percentage translations. This is why adjacent cards enter at an angle and become level when centered.

**Measured at 1440 × 900:** the sticky interval is 900px high inside a 3600px track; the central real card is about **626 × 354px** before combined rotation. Its moving bounding box becomes larger while tilted. Screenshot comparisons show the inactive gray card bodies above/below the active face.

### Timeline from active Webflow data

The live IX2 store identifies event `e-318`, action list `a-165`, title `cases-new 3`. This is `SCROLLING_IN_VIEW`, active on `main` and `medium` breakpoints, with **smoothing: 50**. Keyframe percentages below belong to Webflow’s entering/exiting element progress, not simply the sticky interval’s normalized progress.

| Progress keyframe | Carrier/text change |
| --- | --- |
| 8–19 | Carrier held at −31° |
| 19 | Text strip at translateY(25%) |
| 22 | Moving heading wrapper at translateY(0%) |
| 30 → 35 | First image face opacity 0 → 1 |
| 38 | Carrier −14°, translateY(8%) |
| 39 | Moving heading wrapper translateY(−112%) |
| 46 → 54 | First face fades away |
| 50 → 58 | Second face opacity 0 → 1 |
| 60 | Carrier 0°, translateY(3%) |
| 63 → 71 | Second face fades away |
| 67 → 77 | Third face opacity 0 → 1 |
| 80 | Carrier +14°, translateY(−2%); text strip translateY(−79%) |
| 89 → 94 | Exit changes the right background and fades the text/gradient layer |

Action entries contain **duration: 500ms**, but these are continuous scroll actions. Reading them as a series of 500ms autoplay steps would be incorrect. Source opacity changes affect the image faces independently of the visible card silhouettes.

### Paryatech adaptation

The implementation retains the exact existing heading, supporting paragraph and three Capture/Create/Confirm descriptions. It uses a **400svh** track and **100svh** sticky viewport, with real existing Paryatech screenshots inside travel-photo cards. `svh` stabilizes the track against mobile browser chrome changes, though the effect itself is desktop/tablet only.

The new controller calculates a shared polar path with **14°** spacing. A card’s position follows `x = R(1 − cos θ)` and `y = center + R sin θ`; its rotation is `−θ`. The radius derives from the rendered card height and viewport, so neighboring cards retain a suitable gap across widths. Text moves vertically in synchrony. Adjacent card faces fade independently, leaving mist silhouettes as the reference does.

Paryatech uses white text space, a mist visual panel and teal controls. Short readable holds occur at the three centers. Buttons let a visitor jump directly to a step; left/right/Home/End work from the controls. There is **no timed advancement, scroll interception or added dependency**.

On phones and with reduced motion, the same three articles become sequential image/text sections. They remain readable without JavaScript. Real existing product images are labeled as previews with illustrative data; no new product claims or statistics were invented.

## Awards: verified hover and FAQ adaptation

**Source:** rows are a four-column grid with **height: 7.25rem**, padding **2.4375rem 2.6875rem** and **.875rem** corner radius. The certificate is absolutely positioned inside each row: **width: 8.125rem**, **top: −2.1rem**, **right: 15.6875rem**, radius **.76rem**, `z-index: 2`.

At desktop hover, the background’s height grows from **0% to 100%** around the row’s vertical center over **.5s ease**. The certificate changes from **opacity: 0 / scale(.7)** to **opacity: 1 / scale(1)** over **.6s ease**. Primary text turns white; supporting text becomes `#737373` over **.5s ease**. The image has a stable row-relative position. It is **not a pointer-following card**.

On mobile the source certificate becomes persistently visible on the right, **6.25rem** wide, vertically centered with translateY(−50%). Hover is not the sole way to receive the content.

There is also a source mouseenter click sound. This incidental audio is not necessary for the requested Paryatech interaction and should not be copied.

**Adaptation:** preserve Paryatech’s real FAQ questions and answers. Use aligned question rows, reveal the answer on hover/focus and offer explicit click/touch disclosure. The hovering visual is a travel video preview rather than a certificate. Keep its card stable relative to the active row, use the established teal/mist/white system, and provide a normal touch layout. Stock clips serve as illustrative placeholders for future explanation videos; do not present them as actual Paryatech support recordings.

## Other motion details worth preserving as knowledge

- **Source:** the desktop showreel starts at 48% width, or 60% above 1921px. Between scroll fractions .20 and .33 of the hero section, it grows to 100% and loses its rounded corners.
- **Source:** several buttons position a small circular fill at the pointer, then scale it on hover. The fill and text color reverse on exit.
- **Source:** navigation widths and link scaling use approximately **.7s ease**. Scroll down reduces the link set; upward scrolling restores it.
- **Source:** Lenis is initialized with `lerp: .09`, `wheelMultiplier: .7`, smooth wheel enabled and smooth touch disabled. These settings are part of Outcrowd, not a requirement to add a smooth-scroll library to Paryatech.
- **Source:** testimonial Swiper uses **2100ms** speed, touch/keyboard input, loop, no autoplay, and approximately **2.25** visible slides on desktop.
- **Source:** text reveals use character opacity and scroll scrubbing. This is separate from the stage carrier geometry.

The useful common principle is spatial continuity: a surface visibly travels, expands or reorganizes in response to a clear trigger. Paryatech should use that principle selectively while retaining its calmer editorial character.

## Responsive and accessibility requirements

Public CSS includes the familiar Webflow breakpoints **991px**, **767px**, **479px**, plus larger desktop refinements at **1280px**, **1440px** and **1920px**. Startup text/card desktop containers are hidden at phone widths, and the mobile card list is displayed instead. The mobile sequence should not retain a multi-viewport blank scroll track.

Paryatech’s implementation follows these checks:

- Keep keyboard navigation, visible focus states and at least 44px button targets.
- Use text and explicit disclosure state alongside color/hover.
- Present all content in a natural sequence for reduced motion and missing JavaScript.
- Use passive scroll input plus a scheduled animation frame; update transforms/opacity rather than forcing document layout on every scroll.
- Keep decorative landscape images empty-alt and give real product previews meaningful alt text.
- Keep the underlying scroll natural, with no wheel capture or forced scroll lock.

The UI/UX skill search for `scroll motion reduced motion` returned the Reduced Motion, Motion Sensitivity and Excessive Motion guidelines. Those verified recommendations informed the sequential reduced-motion layout and limited moving surfaces. They did not replace the user-approved typography or palette.

## Implementation handoff and verification

Owned fragment files:

- [workflow-v2.html](paryatech-waabi/dist/workflow-v2.html)
- [workflow-v2.css](paryatech-waabi/dist/workflow-v2.css)
- [workflow-v2.js](paryatech-waabi/dist/workflow-v2.js)

Integration replaces the original `#workflow` section, loads the stylesheet after the existing global styles, and loads the new script with `defer`. The old workflow timer/tab controller must be removed because it expects the previous selectors. New component classes use the `stage-` prefix.

The isolated fragment was verified at 1440 × 900 and 390 × 844, through multiple scroll positions, direct stage selection, arrow-key selection, and a dynamic change to reduced motion. No page errors or horizontal overflow were reported. All three heading fonts resolved to the existing **Zagma** family. See [verification results](output/outcrowd-reference/implementation-verification.json), [desktop Capture](output/outcrowd-reference/implementation-workflow-0.png), [desktop Create](output/outcrowd-reference/implementation-workflow-2.png), and [phone layout](output/outcrowd-reference/implementation-workflow-mobile.png). Final integrated-page verification also passed after assembly with the FAQ and footer changes. See [integrated verification](output/paryatech-revisions/verification.json): 320, 390, 768, 1024 and 1440px widths; all three scroll positions; FAQ hover/tap/pause; mouse and actual touch sticker dragging; keyboard restore/reset; demo and credit dialogs; and reduced-motion layouts. No JavaScript exceptions or failed asset responses were recorded.
