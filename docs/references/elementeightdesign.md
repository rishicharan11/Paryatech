# Element eight — Heyclicky careers reference

Reference: [Heyclicky careers](https://www.heyclicky.com/careers). Inspected 16 October 2026 at desktop 1440 × 1000 and mobile 390 × 844. This document captures the page’s composition, interaction model, and how those ideas are adapted into the established Paryatech direction.

## Context and composition

Heyclicky frames hiring as an invitation from a small product team. It uses the visual language of an older desktop operating system: a top menu bar, status icons and clock, a sparse dot-grid background, window chrome, small illustrated objects, and a folder near the footer. A succinct centered headline and supporting sentence lead into a broad office video. A floating glass button invites the visitor to scroll to open roles. The roles themselves appear inside a desktop-style window with a top title bar, small control dots, a white screen, separated job rows, and a direct contact action.

The page is personal and intentionally compact. It avoids a corporate recruitment dashboard. Its recognizable interaction is the video’s spring-following action button, which makes a simple anchor feel tactile. The jobs remain readable text and ordinary controls beneath the playful treatment.

## Complete element inventory

| Group | Elements | Role |
| --- | --- | --- |
| Top menu bar | Brand, feature/pricing/trust/changelog/careers links, status indicators, clock, download link | Reuses the desktop metaphor and the site’s shared navigation |
| Page header | Small outlined Careers label, centered title, short paragraph | Establishes the invitation with little friction |
| Background | Fine repeating dot grid behind the top content | Gives the large blank areas a faint spatial texture |
| Hero video | Wide muted looping office film, rounded corners, soft shadow | Shows a working environment before listing opportunities |
| Floating CTA | Glass pill with highlight/gloss, full video hit target | Follows the pointer, returns to center, and anchors to the roles section |
| Divider | Fine dotted horizontal rule | Separates invitation from roles |
| Roles window | Desktop title bar, three control dots, centered title, light screen | Makes the opportunity list feel like one focused application window |
| Job row | Title, concise explanation, location/type/compensation metadata, Reach out action | Scannable facts with a direct contact route |
| Role detail | Clicked job opens a detail panel; Escape and scroll locking supported in captured source | Gives more context without navigating away |
| Footer | Product/resources/connect/disclaimer groups, folder decoration, copyright | Keeps navigation and the desktop character consistent |

## Motion extracted from source

The captured styles define reveals as opacity 0, translate Y 22px, and scale .965. An activated reveal group changes to opacity 1, translate 0, scale 1. Opacity runs 0.55 seconds; transform components run 0.7 seconds with `cubic-bezier(.2,.7,.25,1)`. The late reveal classes add 0.12-second and 0.24-second delays. These values were read directly from `heyclicky-0.css`.

The video CTA’s behavior is also explicit in `heyclicky-10.js`:

1. It starts in the center of the video.
2. On pointer entry, it initializes at the video center and enters its following state.
3. On pointer movement, target coordinates are computed relative to the video’s bounding rectangle.
4. Each frame applies velocity as `(velocity + (target - current) * .12) * .62`, then adds velocity to position.
5. On pointer exit, the target becomes the center again. It continues animating until both distance and velocity settle below small thresholds, then stops its frame loop.
6. The follow interaction is gated behind hover capability and `prefers-reduced-motion: no-preference`.

This is a damped spring with inertia, not a CSS-only hover translation and not a cursor locked precisely to the mouse. The settling motion is what makes it feel soft. A glass filter and a gloss overlay add the surface treatment, but the spring supplies the behavior.

The video in the reference uses muted, loop, playsinline, autoplay, metadata preload and a poster. A separate full video link triggers smooth scrolling to the role list. The job detail state locks background scrolling, listens for Escape, and restores the previous overflow state on close.

## Responsive interpretation

The hero has a wide screen ratio on desktop, with rounded edges and a compact floating control. Below the 768px breakpoint, the source reduces hero spacing from 72px to 44px, and changes outer padding to 20px. The roles section likewise uses 20px horizontal gutters. The job rows retain their information hierarchy while tightening gaps. The cursor-follow behavior is intentionally absent on non-hover devices, where the fixed action remains usable.

## Paryatech adaptation

Paryatech retains its current Zagma/NeueHaas typography and the exact approved four-color family. The page uses a generous centered editorial headline, a wide illustrative collaboration film, three product principles, and a focused application window. It does not import the reference’s fonts, blue operating-system gradients, dot grid, unrelated Apple status bar, glass assets, job descriptions, or compensation promises.

The existing Pexels collaboration clip is reused with an explicit “Illustrative footage · Pexels” caption. It is not presented as footage of Paryatech employees or offices. Its play/pause control remains visible. The film plays only while substantially visible, pauses when hidden or offscreen, and stays paused by default for reduced motion. An explicit user play action remains possible.

The film’s “Let’s talk” pill adapts the reference’s spring-following motion. On hover-capable fine pointers it follows positions inside the film, constrained away from the edges; on exit it springs to center. Keyboard focus returns it to center. Touch devices and reduced-motion visitors get the same static centered anchor. The source spring constants `.12` and `.62` are retained in the local independent controller, giving a similar damped feel without requiring the source’s framework or glass filter.

The lower panel uses desktop-window structure already familiar from Paryatech’s product previews: small toolbar dots, a restrained title strip, and a rounded mist-colored body. Its central call to action asks for an introduction. A set of optional interest chips personalizes the email subject for product/design, engineering, travel/operations, or another area. Those chips represent conversation topics, **not advertised vacancies**.

No approved Paryatech role descriptions, salaries, locations, benefits, remote policies, equity ranges, or interview processes were supplied. The page clearly says that specific openings have not been published here yet. It does not manufacture job inventory. The action opens a real `mailto:hq@paryatech.in` with a meaningful subject; it never displays a fake application-submitted state.

## Accessibility and interaction contract

- The page’s main content has a stable ID for the shared skip link.
- Headings retain a meaningful hierarchy, with one page H1.
- Topic chips are real buttons with pressed state, clear focus, and a polite update identifying the chosen topic.
- The contact action remains a normal email link, with the full address visible in supporting copy.
- The decorative film has an adjacent text explanation and an explicit pause/play button.
- Motion stops when not needed; no endless spring loop runs after the CTA settles.
- Mobile uses the same content order and logical tab sequence. Controls meet 44px minimum touch height.
- Script failure leaves the film poster, the application email, and all page content readable.

## Implementation and evidence

- Main fragment: `paryatech-waabi/src/pages/careers.html`
- Styles/controller: `paryatech-waabi/dist/careers.css` and `careers.js`
- Captured source and styles: `output/pricing-careers/heyclicky-source.html`, `heyclicky-rendered.html`, `heyclicky-0.css`, `heyclicky-1.css`, `heyclicky-10.js`
- Reference captures: `heyclicky-desktop.png`, `heyclicky-mobile.png` in `output/pricing-careers/`
- Local screenshots: `careers-implementation-{320,390,768,1440}.png`
- Local behavior results: `output/pricing-careers/implementation-qa.json`

The full-page reference screenshot captures the first entrance before lower reveal groups are activated. The saved rendered HTML and CSS supply the complete roles and footer inventory; blank lower regions in that screenshot are not an intentional empty page layout.
