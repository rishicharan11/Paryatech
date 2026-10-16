# Element two — Giga design and motion reference

Reference: [giga.ai](https://giga.ai/)
Studied: 15 October 2026
Purpose: replace Paryatech’s three feature photo cards with a continuous, interactive product illustration inspired by Giga’s Build / Observe / Improve sequence. The established Paryatech typefaces, colors, tone, and surrounding landing page remain the governing design system.

## Evidence and confidence

This document separates **observed behavior**, **verified implementation details**, and **Paryatech adaptation decisions**. The live page and the supplied recording were both inspected; the recording corroborates the Build fan diagram, particle transformation, row organization, hover labels, and final return to a hub.

The T3 collaborative browser opened the website, but two consecutive screenshots failed with `Preview automation snapshot timed out after 15000ms.` Live visual inspection then used local Chrome at 1440 × 1000 and 390 × 844. Screenshots and source are saved in [output/giga-reference](output/giga-reference/). The original recording contact sheet is at [output/giga-build/recording-contact.jpg](output/giga-build/recording-contact.jpg).

Primary references:

- [Homepage](https://giga.ai/)
- [Live page styling](https://giga.ai/assets/site/home/0195384b43/page.css)
- [Live page interaction source](https://giga.ai/assets/site/home/0195384b43/page.js)
- [Platform destination](https://giga.ai/platform)
- Local source capture: [home-source.html](output/giga-reference/home-source.html), [style-2.css](output/giga-reference/style-2.css), [script-16.js](output/giga-reference/script-16.js), and the isolated [how-source.js](output/giga-reference/how-source.js)
- Measured geometry, font declarations, chapter states, and viewport checks: [live-observations.json](output/giga-reference/live-observations.json)

These URLs are versioned source snapshots, not stable APIs. The local captures preserve the inspected version. No Giga runtime code or proprietary imagery needs to be shipped with Paryatech; implement the interaction as an original component with Paryatech content.

## Website context and communication structure

Giga presents enterprise customer support agents. The page follows a demonstration-led narrative: introduce the system, let visitors try voice or chat, illustrate an agent solving work, explain its feedback loop, support the story with a customer example, and invite a company-specific demonstration. Navigation organizes platform capabilities, use cases, industries, company information, and trust material.

The visual story treats software as an instrument: physical-looking controls introduce a machine, fine lines explain inputs, tiny lights represent activity, and those same lights become measurable outcomes. The continuity matters more than any individual decoration. A visitor sees one system changing state instead of unrelated feature illustrations.

## Page and element inventory

| Element | Construction and visual role | Interaction or motion |
| --- | --- | --- |
| Persistent navigation | Compact brand at left; grouped navigation centrally; sign-in and bright demonstration CTA at right | Glass background changes with the underlying scene; dropdown arrow rotates; a shared highlight and background panel move between menu triggers |
| Navigation dropdowns | Dark translucent panels with small uppercase group labels, explanatory secondary lines, and grouped links | Hover and focus expose destinations; panel position, size, and opacity interpolate between menus |
| Opening scene | Immersive dark background with dimensional hardware-like illustration and layered blueprint details | Staged drawing, illumination, perspective, and reveal lead into a functional demo interface |
| Hero display type | Large sparse headline above short body copy | Appears as part of the larger scene rather than isolated card entrances |
| Voice / chat controls | Tactile key shapes with visible bevel, inset highlight, shadow, indicator lamps, and utility labels | Hover brightens; press reduces shadow and translates the key slightly; active mode changes its lamp |
| Email / demo input | Recessed field plus adjacent action | Visible field and button states; demo is personalized from an entered work email |
| Proof strip | A quieter bridge between immersive scenes | Supports credibility without competing with the product visualization |
| Conversation demonstration | Open shadow-root component `#hc`, message transcript, typed composer, action rows, contextual status | Characters type with irregular pauses and corrections; agent text arrives by words; action rows shimmer while pending and settle when complete |
| Process introduction | Small signal square, eyebrow, technical display heading, restrained description | Establishes the purpose of the following pinned scene |
| Build / Observe / Improve | `#how`, open shadow root, a 650svh scroll region, sticky canvas, contextual text, stage control dock | One continuous scene evolves from input wires to particles to rows to outcome curves and back to input wires |
| Canvas hover label | Small translucent, blurred tooltip placed near selected data | Wire or point selection brightens its group; tooltip gives a meaningful item, category, and outcome |
| Customer story | Editorial copy and image rather than another interface simulation | Image and surrounding frame receive controlled reveal / drawing treatment |
| Closing conversion | Clear heading, supporting copy, work email field and action | Returns attention to a concrete next step after the explanatory sequence |
| Footer | Brand, grouped destination columns, compliance links and legal rows | Subtle status treatment and link/tool-tip feedback; navigation remains ordinary readable content |

The reference does not use the Build scene as a grid of image cards. Its “cards” are conceptual groups inside one canvas. Reproducing only three boxes with hover elevation would miss the requested behavior.

## Visual foundations in the reference

### Typography

Source CSS declares Geist for general interface text, Geist Mono for technical labels and keycaps, Inter variable for display/body roles, and Geist Pixel Line for selected technical display headings. The Build scene itself declares Geist Sans, uses Inter for chapter headings, and Geist Mono for dock labels. These are facts about the reference, not a font replacement recommendation.

At 1440px, the process introduction is approximately 52.63px / 58px in the pixel display face. Chapter titles use a capped 5vw scale, reaching 72px with a 1.03 line height. Chapter descriptions cap around 18px / 1.5. Dock labels are 11px / 13px uppercase mono. Letter spacing is restrained and slightly negative on Inter chapter headings.

### Color and material

The scene is mostly black, white, and low-contrast gray. The principal reference accent is orange `#ef5a00`. Conversation categories introduce restrained salmon, amber, lavender, blue, and cyan. Hairline connections, small emitters, low-opacity glows, and large unoccupied areas create depth without large surfaces.

Controls deliberately suggest physical equipment: charcoal gradients, fine edge highlights, inset dark seams, subtle texture, and layered shadows. The field and controls have different material roles: the canvas is almost surface-free, while the dock is tangible.

### Layout and hierarchy

Content is structured around a 1440px design plane, then scaled and recentered responsively. The process introduction uses a narrower editorial column. The scene spreads across the viewport; the explanatory chapter cover occupies the upper-middle area and leaves room below for the diagram. The control dock stays near the lower center.

Do not inherit the technical visual skin wholesale. Paryatech’s elegant serif typography and flatter controls are already approved. The transferable idea is the clear input → shared system → organized activity relationship.

## Build sequence: exact structure

The live DOM host is `#how`. It contains a declarative shadow-root template; JavaScript attaches an open shadow root where necessary. Inside it are an introduction, a `.loop` section, a sticky `.stage`, a 2D canvas `#scene`, overlaid chapter copy, a category key, a live selection label, and a dock with three stage buttons and a platform link.

At the measured 1440 × 1000 viewport:

- Scroll-region height: 6500px, matching `650svh`.
- Sticky stage: 946px high with a 54px navigation offset.
- Canvas pixel ratio is capped at 2.
- Scene scale is `min(viewportWidth / 1440, stageHeight / 780)`.
- The scene is rendered with Canvas 2D and a custom perspective projection, not a WebGL scene or a CSS card carousel.

Build contains three input sources. Each is a small grid in perspective, and each input emits a thin curved thread toward a shared agent hub.

| Source | Rows | Depth columns | Total threads |
| --- | ---: | ---: | ---: |
| Knowledge | 12 | 4 | 48 |
| Tools | 6 | 2 | 12 |
| Guidance | 9 | 3 | 27 |

Source coordinates begin at x = −1050. Vertical pitch is 9 scene units, depth pitch 130. Curves use smooth interpolation to gather each group and then merge toward the hub. The first/front column carries the inspectable labels; decorative depth columns provide volume. A point is therefore both a meaningful input and part of a larger fan.

### Arrival and flow

Observed: the scene draws in gently, tiny bright pulses travel along the threads, and the hub lights as they arrive. A slight perspective drift keeps the diagram alive while the visitor pauses.

Verified constants:

- Thread arrival delay: 300ms plus source / row / column staggering.
- Wire drawing duration: approximately 1100ms.
- Source staggering: 150ms; row delay 30ms; column delay 55ms.
- Repeating pulse cycle: 6000ms.
- Cascade across source rows: 700ms.
- Pulses meet within each fan around 1500ms, then reach the hub around 2350ms.
- Line weights are roughly 0.45–0.85 scene units before scaling, with brighter front wires.

The motion is purposeful: independent inputs become one coherent system. The three groups must remain legible while moving; a generic random particle background would lose that explanation.

## Continuous scroll choreography

Scrolling advances a target value; a critically damped spring smooths the displayed progress. It is reversible. The scene does not change chapter on a timer.

Source chapter thresholds are normalized progress 0.265 and 0.645. Stage navigation targets are 0.12, 0.49, and 1. A click changes scroll position and plays a 2600ms quintic interpolation through the illustration; wheel or touch input interrupts that interpolation.

| Scroll progress | Visual phase |
| --- | --- |
| 0–0.10 | First chapter cover is readable while the diagram establishes itself |
| 0.10–0.25 | Fan connections and the hub are exposed; pointer inspection is available |
| 0.265–0.37 | Second chapter cover appears and clears as the camera leaves the input view |
| Around 0.37–0.49 | Activity becomes a spread of colored points; the camera centers the field |
| Around 0.46–0.62 | Points settle into grouped, time-ordered rows; category labels become useful |
| 0.645–0.75 | Third chapter cover appears while the organized field changes viewpoint |
| Around 0.79–0.975 | A side-on measurement story separates current and improved trajectories |
| 1 and terminal hold | The conclusion appears; learned inputs travel back to the shared hub and the original fan composition returns |

The mapping from scroll progress to internal scene progress is explicitly non-linear. Source key pairs are `[(0,.04),(.1,.06),(.25,.12),(.36,.24),(.645,.68),(.74,.79),(.88,1),(.91,1),(1,1.14)]`. This creates readable pauses and faster connecting transformations. It is not one uniform animation stretched over the page.

Chapter covers use opacity and small vertical lift. Their initial ranges are 0–0.10, 0.265–0.37, and 0.645–0.75. Later declarations override earlier CSS text-slide experiments; inspecting only the first CSS rules would produce the wrong animation.

## Pointer, selection, and keyboard behavior

The entire illustration has gentle pointer-driven perspective. Near a point or wire, the pointer also creates a localized magnetic attraction. The source attraction radius is 180px, using a quadratic falloff and maximum pull coefficient 0.68. Attraction strength and position ease with springs; it clears when the pointer leaves. Touch movement does not trigger this magnetic behavior.

Hover selection is independent from attraction. It measures distance to both the endpoint and sampled wire segments. The selected group stays bright while other groups dim, and a compact tooltip identifies the actual item. Live verification selected the first knowledge input and exposed its shipping-related label. Right Arrow selected the next labeled front wire. Escape clears selection; blur also clears it.

The canvas is focusable and has an image role, a descriptive accessible label, and an associated instruction paragraph. The tooltip uses `role=status`, `aria-live=polite`, and atomic updates. Stage buttons use `aria-current=step`. Hidden chapter copy has `aria-hidden=true`.

These alternatives are integral to the component. Essential product information must not exist only in pixels or only under a mouse cursor.

## Responsive and reduced-motion behavior

Observed at 390 × 844: the sticky stage occupies 390 × 790 below the same 54px header. Document scroll width equals viewport width. The source keeps the continuous scene on mobile but changes camera stretch, vertical origin, label placement, gradients, and dock layout.

Below 640px:

- Chapter title becomes 46px; description is 17px with constrained line length.
- Source geometry stretches vertically so the three fans remain distinguishable.
- The dock stacks its exploration link below the three stage controls.
- The dock respects the safe-area inset.
- Canvas touch action allows page panning. A touch release can inspect a point.
- Hover perspective and magnetic attraction are disabled for touch pointers.

With `prefers-reduced-motion: reduce`, live inspection confirms discrete chapter states instead of continuous camera travel. Internal snapshots are `.04`, `.6`, and `1.14`; idle motion, spring attraction, and parallax stop. CSS transitions are disabled and chapter descriptions remain directly readable. This is a deliberate alternative interaction, not merely a faster animation.

The UI/UX skill search for “scroll animation reduced motion” specifically supports a readable final or discrete state, without forced parallax. For Paryatech, a smaller static/tap-driven scene or ordinary stacked content is also a valid implementation when a compact viewport cannot support the full diagram.

## Paryatech adaptation specification

### Preserve the approved system

Use the existing **Zagma serif** for feature/chapter display type and **NeueHaas** for descriptions, controls, and labels. Keep `#111111`, `#E5E8E3`, `#115553`, and `#ffffff`. Do not introduce Giga’s orange accent, pixel type, mono utility typography, multicolor category palette, enterprise claims, customer names, or simulated performance metrics.

The requested replacement is the current trio of photo cards beneath the feature introduction: shared conversation, agency branding, and follow-up automation. Preserve the separate Capture / Create / Confirm workflow unless explicitly changed by the user. These are different sections with different narrative jobs.

### Content-to-motion mapping

| Existing Paryatech benefit | Continuous illustration equivalent | Accessible detail destination |
| --- | --- | --- |
| Shared conversation / unified inbox | WhatsApp, email, and website inputs flow into a single agency workspace | Existing inbox feature detail |
| Agency brand at every touchpoint | Activity gathers into clear traveler / trip records and branded communication | Existing proposal or branding feature detail |
| Follow-up already handled | Organized items follow scheduled paths, then return as clear next steps for the team | Existing automation feature detail |

Keep feature descriptions visible in HTML. Use the diagram to explain their relationship. Do not claim numerical time savings, conversion improvements, or AI autonomy that the current Paryatech website does not substantiate.

### Interaction requirements

1. A single visual stage replaces the three photo panels; the surrounding introduction remains in its current design language.
2. Show three recognizable input families and a shared Paryatech hub. Animate thin curved paths and small travelling points, with generous negative space.
3. As the visitor scrolls, transform the same entities into the next chapter rather than swapping three unrelated pictures.
4. Give visitors direct stage controls. Preserve existing feature-detail button actions and demo destinations.
5. Allow pointer perspective and meaningful labels; keep the amplitude restrained enough for a travel operations product.
6. Make stage controls keyboard accessible and expose state changes through readable copy and appropriate ARIA.
7. Keep touch scrolling natural. A tap may select an item or stage; dragging across the visual must not trap vertical page scrolling.
8. Honor reduced motion and suspend canvas work when the section is offscreen or the document is hidden.
9. A no-JavaScript or failed-canvas state must leave all three benefit descriptions and destinations available.

### Implementation boundaries

Recreate the motion grammar with original, maintainable local code. Do not embed Giga’s page, copy its live script, reuse its logos, or pull its production assets at runtime. Use existing Paryatech media only where it serves content; the line-and-point scene does not need a new stock video or heavy 3D dependency.

Use measured timing as direction, not as an obligation to impose a 650svh section on this page. The adaptation should balance readable pauses with the existing landing-page length. Keep source facts and adapted values clearly distinguished in implementation notes.

## Evidence index

- [Opening scene](output/giga-reference/home-desktop.png)
- [Build title cover](output/giga-reference/build-cover.png)
- [Build fan scene](output/giga-reference/build-fans.png)
- [Build pointer inspection](output/giga-reference/build-hover.png)
- [Build keyboard inspection](output/giga-reference/build-keyboard.png)
- [Particle transition](output/giga-reference/scatter.png)
- [Observe field](output/giga-reference/observe.png)
- [Organized rows](output/giga-reference/organize.png)
- [Improvement view](output/giga-reference/improve.png)
- [Return / resolution](output/giga-reference/resolve.png)
- [Mobile Build composition](output/giga-reference/build-mobile.png)
- [Reduced-motion chapter](output/giga-reference/build-reduced-motion.png)

## Acceptance checks

The feature replacement should show the same conceptual entities flowing through all three chapters, respond to scroll reversibly, support direct selection, and retain meaningful content without hover. Check 320px, 390px, tablet, and desktop widths; short landscape screens; keyboard-only use; touch scrolling; reduced motion; offscreen pausing; and existing feature-detail / demo actions. Confirm that removing the old photo cards creates no duplicate section headings, stale observers, broken anchors, or horizontal overflow.


## Implemented Paryatech revision

The local replacement is in `paryatech-waabi/dist/build-v3.html`, `.css`, and `.js`, assembled through `src/index.template.html` and `scripts/assemble.mjs`. Its original Canvas 2D illustration uses a 550svh desktop interval, Connect / Create / Automate controls, local Paryatech product preview cards, and existing feature-detail dialogs. Below 768px, a compact 760px illustration uses direct chapter selection. Reduced motion and disabled JavaScript expose the three articles and previews as readable stacked content. Canvas rendering stops offscreen and while the document is hidden.

[Integrated verification](output/paryatech-v3/verification.json) passed at 320, 390, 768, 1024 and 1440px, including chapter controls, real feature dialogs, touch sticker dragging, spring return, navigation, reduced motion and no-JavaScript content. No page exceptions or failed asset responses were recorded. [Short-screen verification](output/giga-build/short-qa.json) also covers 1440×600, 768×600 and 1024×768.

The same revision removes Home text and the progress strip from the compact header, removes the footer outline, halves the landmark sticker dimensions, and adds bounded spring proximity ripples while retaining dragging, touch scrolling, keyboard movement and reset. [Section preservation check](output/paryatech-v3/unchanged-sections.json) confirms the other main sections were retained.
