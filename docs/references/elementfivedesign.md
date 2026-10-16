# Element five — Lusion page transition → Paryatech mark

References: [Lusion](https://lusion.co/) and navigation between [About](https://lusion.co/about) and [Projects](https://lusion.co/projects/). Studied 16 October 2026, including the supplied 6.183-second page-switch recording, live HTML and the publicly served application bundle.

## What is actually animated

The reference’s page-switch animation is a **full-page canvas overlay using the Lusion mark as a moving aperture**. It is visually related to the browser favicon, which explains the user’s description. The inspected browser favicon itself uses static PNG/ICO links; there is no favicon replacement loop in the downloaded JavaScript. For Paryatech, the user-supplied teal mark should become the on-page transition shape while remaining recognisable as the same brand icon.

The reference has three separate systems that should not be confused:

1. An initial percentage preloader, used while the application starts.
2. A generic full-page mark transition for ordinary route changes.
3. A selected-project image expansion, used for some project-index/detail navigation.

This implementation direction concerns the second system. A numeric fake loading percentage is unnecessary for a static local site.

## Visual sequence

A route change begins while the outgoing page is still visible. A very large, rotated mark-shaped aperture contracts through a dark surround. Near the midpoint the page becomes fully covered and the mark resolves to a compact centred shape. The destination is prepared under that cover. The same shape then grows and rotates in the opposite sense, opening the new page until the overlay clears the viewport. It is a continuous spatial passage through the mark rather than a simple opacity crossfade.

The supplied recording shows the About page and menu, then Projects beneath a large diagonal aperture. Its final sampled frame is covered black. The clip ends before a full destination reveal, so the remaining phase is confirmed from the live transition code rather than inferred from the recording alone.

## Exact source mechanics

The live `TransitionOverlay` uses a 2D canvas at viewport size plus two CSS pixels. Device pixel ratio is applied to its backing resolution. Its compact drawing unit is:

```text
unit = floor(min(42, viewportWidth / 30))
active = min(1 - contentShowRatio, contentHideRatio)
f = expoInOut(1 - active)
scale = (1 + f * viewportDiagonal / unit) * unit
```

The canvas first fills black. The drawing origin moves to the viewport centre. Rotation is `-f` radians while the outgoing page hides and `+f` radians while the destination appears. A further translation proportional to the viewport diagonal gives the mark its sweeping, off-centre passage. The reference L is assembled from bars, one rotating through a quarter turn. XOR compositing produces the transparent aperture into the page below, with a white contribution near the compact centre.

These are source observations, not a recommendation to replace Paryatech’s existing mark with an L. Paryatech should use its own supplied mark as a mask/aperture while retaining the contract–cover–expand flow.

## Timing and route lifecycle

The base page class sets both show and hide durations to **one second**. Content is swapped only after the outgoing page has finished hiding and required assets are ready. The destination’s own entrance then begins. A warm navigation therefore has a two-part flow, approximately one second each way, rather than one arbitrary timer that might expose incomplete content.

For a cold route, the source may insert a pixelated loading word. It builds from rectangular parts over approximately 0.8 seconds, has a minimum settling period around one third of a second, then disappears over approximately 0.8 seconds once tasks finish. This text is optional and does not run on every warmed navigation.

A pending-route slot prevents overlapping route transitions. The source updates the document title, restores the top of the destination, resizes the new page, and reports completion before accepting the next queued route. Back/forward navigation is handled by its route manager.

## Paryatech adaptation contract

Use the existing palette and supplied teal mark. The overlay needs to be above the floating navigation and page content, with a covered midpoint that hides the actual document switch. Every normal local route should share it: Home, Features, Pricing, Blogs, Connect/Book a demo and Careers. A same-page anchor should scroll normally. External links, downloads, mail links and modified clicks should keep their standard browser behaviour.

The animation may use the provided image as a CSS/SVG/canvas mask; it does not require a replica of the reference’s WebGL scene. Keep the original icon’s proportions, avoid stretching its stroke and do not recolour the rest of the page to Lusion’s black/white brand system.

The shared shell is responsible for these behaviours:

- Real page URLs remain usable with direct navigation and without JavaScript.
- The overlay cannot leave a failed destination behind an endless loading screen.
- The browser title and keyboard focus identify the destination after navigation.
- Back and forward work predictably.
- Reduced motion uses an immediate or brief opacity change, avoiding the large rotating zoom.
- The loading shape is decorative. A concise accessible status can announce navigation without reading the animation’s pieces.

The global integration is owned by the shared Paryatech shell, rather than by an individual Blogs or Pricing script. That keeps navigation consistent and avoids multiple listeners competing for the same click.

## Inspection evidence

The source bundle and extracted classes are in `output/lusion-pages/`:

- `TransitionOverlay.txt` — drawing and scale/rotation calculations.
- `PageManager.txt` — hide, prepare, swap and reveal sequencing.
- `recording-0-0.jpg` through `recording-0-11.jpg` — sampled supplied recording.
- `research-notes.json` — concise measured findings.
- `home.html`, `projects.html` and the downloaded public source files.

The source is retained as inspection evidence only. Lusion’s runtime code, mark, loading typography and project assets are not copied into the Paryatech site.


## Implemented Paryatech behavior

The shared `site.js` controller recreates the two-part, one-second logo-aperture transition between the local static documents. The user-supplied PNG is the browser favicon and the compact centered symbol. Matching existing Paryatech SVG geometry supplies a crisp expanding canvas aperture at large scales. A mist cover and teal mark retain the approved palette. Same-page anchors, modified clicks, external destinations and native forms retain their ordinary behavior; reduced motion skips the overlay. Back/forward restoration clears the overlay. The supplied icon is not stretched into a generic spinning loader.

Integrated checks are recorded in [output/paryatech-pages-v5/verification.json](output/paryatech-pages-v5/verification.json), including selected-plan navigation, feature-dialog demo links, browser history, reduced motion, nine route responses and responsive checks.
