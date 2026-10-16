# Element three — Lusion About reference and footer interaction

Research date: 15 October 2026. Reference: [Lusion — About](https://lusion.co/about/). Target: the existing local Paryatech footer and its travel stickers. This document supplements `design.md`, `elementonedesign.md`, and `elementtwodesign.md`; it does not replace the approved Paryatech design system.

## Evidence and confidence

Three evidence types are deliberately separated:

- **Recorded:** the supplied `Screen Recording 2026-10-15 at 9.20.20 PM.mov`, 4.16 seconds, 2880 × 1800, approximately 54.72 frames/second. Sixteen frames at 0.25-second intervals were extracted to [the contact sheet](output/lusion-reference/recording-contact-sheet.jpg). This is the best visual evidence of the requested animation.
- **Source verified:** public HTML, delivered CSS, and the browser JavaScript bundle fetched from the reference on the research date. These identify real section structure, tokens, responsive rules, and simulation mechanics. Local research copies live under `output/lusion-reference/`; they are inspection evidence, not code to transplant into Paryatech.
- **Adaptation:** engineering and UX decisions for a much smaller pool of 25 illustrated location stickers. These are intentionally labeled below rather than presented as Lusion measurements.

The collaborative browser opened the correct About page, but two snapshot attempts failed with the same error: `Preview automation snapshot timed out after 15000ms.` Local Chrome successfully read the live DOM and computed geometry; its screenshots remained on the site's loading overlay during the bounded test. Therefore files named `live-*.png` in the evidence directory are **loading-state diagnostics**, not successful visual captures of the footer. The supplied recording establishes the visual behavior. No claim of live drag/release testing is based on those screenshots.

## Website context and visual direction

Lusion presents a multidisciplinary creative production studio. The About page introduces the team, demonstrates the studio's digital craft, presents clients and recognition, describes capabilities, and ends with a strong contact invitation. Interactive visuals function as demonstrations of the service itself. The visitor is invited to explore and play before making contact.

The design combines a tightly controlled editorial interface with a large reactive visual layer. A persistent logo and compact pill controls remain legible while the visual scene changes behind them. The typography is mostly clean grotesk, with occasional monospaced labels and indexes. Large display text, broad negative space, small cross marks, numerical indexes, line work, and restrained utility labels create a precise technical character.

### Source tokens and layout

These describe Lusion, **not new Paryatech tokens**:

| Foundation | Verified reference value or rule |
| --- | --- |
| Primary type | Aeonik regular, medium, and regular italic, locally served WOFF2/WOFF |
| Utility type | IBM Plex Mono regular/medium and LusionMono |
| Main colors | Black `#000000`, white `#ffffff`, off-white `#f0f1fa`, blue `#1a2ffb` |
| Other declared accents | Green `#c1ff00`, red `#ff4c41`, purple `#8832f7`, dark blue `#071bdf`, gray-blue `#2b2e3a` |
| Main grid | Twelve columns; `2vw` gap on larger screens, `4vw` at 812px and below |
| Desktop page inset | `max(5vw, 40px)`; very wide screens use `max(6vw, 60px)` |
| Compact page inset | 25px at 812px and below; 15px at 400px and below |
| Declared global radius | 20px desktop; compact rules resolve to 10px at 812px and below |
| Main CTA display | `10vw` font size; `6.7vw` in aspect ratios wider than 21:9; `19.5vw` below 560px |
| Closing interactive section | A 350-viewport-height scroll range containing a viewport-height scene |

The recorded blue may differ slightly from the declared blue because of video encoding and rendering. The source token is the reliable specification.

## Element inventory

The inventory below covers the live About page's main structures, not every hidden WebGL mesh or every character wrapper.

| Area | Elements and content role | Interaction or motion evidence |
| --- | --- | --- |
| Loading layer | Full-screen preloader, large numeric progress digits, central bar | Visible in local Chrome diagnostics; distinct from page content |
| Persistent header | Lusion logo; sound control; contact pill; menu pill; optional project-back control | Fixed positioning; theme-dependent text color; compact controls retain contrast |
| Expanded navigation | Main destinations, contact treatment, newsletter form, Labs destination | Separate menu layer with duplicated text wrappers for animated labels |
| Studio introduction | Large title arranged across lines, supporting description, cross markers, scroll cue | Source has split text and scroll-managed scene elements |
| Team explorer | Numeric index, member name and role, progress/dot indicators, directional/compass motifs, descriptive text, swipe hint | Interactive face presentation; shader-driven point geometry; mobile swipe instruction |
| Clients | Small editorial heading, explanatory line, repeated logo rows | Repeated assets form continuous row/carousel structure; exact velocity not measured |
| Recognition | Awards, articles, and speaking entries in a structured information block | Strong numerical and list hierarchy; source does not justify inventing a specific hover behavior |
| Expertise | Large section heading, introduction, four capability categories with detail lists | Card-based category presentation; retain the distinction between semantic HTML and visual effects |
| Closing CTA scene | Small eyebrow, two-line contact link, two cross marks, underlines, bottom continue-scroll pill | This is the blue particle-pool scene shown in the supplied recording |
| Interactive visual layer | Small crosses, squares, circles, and triangles; all four are white in the recording | Live fluid simulation with gravity, pressure, cursor displacement, and particle rotation |
| Conventional footer | Address, social links, two email groups, newsletter input, copyright, Labs link, return-up control | Separate white information section after the blue scene |
| Next-page navigation | Small subtitle, destination title, progress indicator, arrow/cross decoration | Continued-scroll navigation follows the contact/footer sequence |
| Video overlay | Video surface, close, play, mute, and progress controls | Separate modal media UI; unrelated to the particle-pool mechanics |
| Global interface layers | Scroll indicator, transition overlay, input blocker, custom visual cursor assets | Maintain visual continuity across page transitions |

Important distinction: the reference animation is technically the **closing CTA / end section**, immediately before the conventional footer. Calling it the “footer animation” is natural from the visitor's perspective, but implementing it should not replace necessary contact links with an opaque canvas.

## The recorded animation flow

The field is a **pool**, not a row of anchored cards and not a timed sequence of expanding CSS rings.

| Recording time | Directly visible behavior |
| --- | --- |
| 0.00–1.50s | A dense lower band of small white shapes rests beneath the large central contact text. Its surface is slightly uneven and gently active. The pointer is mostly above the pool. |
| Approximately 1.75–2.25s | A sweep through the lower field cuts a concave trough. A crest rises on the neighboring side; the pool moves as connected material rather than as isolated hover targets. |
| Approximately 2.50–3.25s | Continued cursor movement pushes a larger wave across the field and up the right side. A round cleared area follows the pointer, with particles displaced around its boundary. |
| Approximately 3.50–4.00s | The cursor turns back toward the lower left. The existing crest keeps moving while another local trough forms. The path leaves a changing wake rather than an immediate snap-back. |

The recording ends while the field is still active. It does **not** contain a clean, long pointer-release-and-settle interval. Continued gravity and settling are source-supported behavior rather than a measured settle duration from this clip.

Shapes rotate as they move. The normal particle outlines remain distinct, but their collective arrangement acts like a fluid free surface. The large CTA text stays readable over the field, and the bottom continue-scroll pill remains a clear interface object.

## Source-verified simulation mechanics

The delivered bundle exposes `FlipSim` and `FlipAnimation` classes. These establish why the motion feels materially different from simple independent repulsion:

1. Particles receive downward gravity and are integrated over time.
2. Neighbor particles are separated to avoid excessive overlap. The source uses a minimum separation based on three times the simulation particle radius and four separation iterations.
3. Particle velocities are transferred to a spatial grid. Density is computed and a pressure solver projects the grid toward incompressibility.
4. Grid velocities transfer back to particles. Although named “Flip”, the configured `FLIP_RATIO` is `0`, meaning the observed configuration uses the PIC end of the PIC/FLIP blend.
5. The visible output positions are smoothed between frames. Motion-derived orientation is integrated with angular damping, giving the small shapes a rolling/tumbling character.

Verified configuration in the inspected bundle:

| Parameter | Reference configuration | Meaning |
| --- | --- | --- |
| Pressure iterations | 60 | A comparatively coherent fluid field rather than independent ballistic dots |
| Particle separation passes | 4 | Local crowding resolves across neighbors |
| Over-relaxation | 1 | Pressure solver configuration |
| Simulation time step | Capped at `1/60` second | Prevents a slow frame from producing one huge unstable physics jump |
| Rest-particle collision radius | `0.2 × grid spacing` | Simulation radius is separate from the displayed shape size |
| Gravity | Downward; viewport-width dependent | Display geometry is normalized to a tank width of 2 units |
| Desktop mouse influence | Speed-scaled radius, visually about 30–150 CSS pixels | Slow motion has a small footprint; fast motion moves a broad region |
| Cursor collision impulse | Particle velocity set from twice the cursor's velocity | Fast sweeps launch a visible wake |
| Side, ceiling, and floor behavior | Position clamping and cancellation of normal velocity | Shapes stay inside the tank rather than disappearing offscreen during ordinary hover |
| CTA button | Registered as a rectangular solid collider in the shape mode | The field flows around a real UI obstruction |

### Pointer flow

**Desktop hover:** a circular cursor collider displaces particles to its perimeter. The radius grows with pointer speed. Particles inherit the sweep direction, so movement continues after the cursor has passed. Pressure and neighbor separation distribute movement farther into the pool.

**Desktop press:** the reference switches modes. The cursor collider is moved out of the tank, inactive particles can be emitted along the segment from the previous to current pointer position, and the floor is temporarily opened so particles can drain. The source emission rate is 2,000 particles per second, bounded by a preallocated particle count. This supports a pour/flush gesture; it is not the same as dragging a single existing sticker.

**Desktop release:** the ordinary solid floor and pointer-collider behavior return. Gravity, grid pressure, and separation continue. The simulation does not teleport every particle back to a saved slot.

**Touch:** pointer influence is active only while pressed, with a reduced radius (nominally 52.5 CSS pixels before particle-radius addition). This is source-verified; the supplied clip is desktop, so the actual touch feel was not directly observed.

## Other closing-scene motion

The reference has several independent animations alongside the fluid:

- The scene is held within a long scroll segment. The foreground wrapper is translated to maintain viewport continuity; the closing content gradually scales from 1 to 0.9 while exiting.
- Text is split into lines, words, and characters. Desktop entrance translates characters from below with staggered timing. The exact look depends on the site's custom easing rather than a generic CSS `ease` curve.
- A randomly chosen character in each CTA word periodically rolls upward through a clipped duplicate. The source interval is two seconds, with a one-second roll duration.
- CTA hover grows underline decorations in stages; two small cross marks scale and rotate through the entrance.
- The particle simulation is active only when the end scene is active and visible. It is reset/reinitialized when the relevant scene or viewport changes.

These details explain the complete reference, but the current Paryatech request focuses on the **sticker field's interaction**. Do not import the reference's electric blue background, Aeonik font, contact wording, or character-roll text effect into the approved Paryatech footer.

## Paryatech adaptation contract

The accepted Paryatech page retains Zagma display type, NeueHaas utility type, and `#111111`, `#E5E8E3`, `#115553`, and white. Keep the borderless white footer, real navigation/contact links, and the current sticker dimensions. The seven current landmarks expand to **25 recognizable location stickers**.

The adaptation should preserve this perceptual sequence:

> A settled pool → cursor enters → nearby stickers part → momentum travels into neighbors → stickers tumble and rebound → gravity restores a loose pool after the gesture.

The field should not be tethered to 25 hidden home coordinates during ordinary play. A fast sweep should have a larger influence than a slow one. Neighbor collisions should transmit movement. On pointer exit, stickers should continue under inertia and settle; they should not freeze at arbitrary elevations or spring back to the original layout.

Twenty-five large illustrated bodies are a very different density from hundreds or thousands of tiny shapes. An original lightweight body simulation can reproduce the flow and responsiveness while retaining usable, individually selectable stickers. It should be described as an adaptation of the Lusion flow, not mathematically identical PIC-fluid output. The reference's emitter/flush mode can be interpreted as a replenished pour gesture while keeping the catalog count at 25; it must never create an unbounded number of DOM nodes.

For Paryatech, explicit sticker dragging, release velocity, keyboard movement, and reset are useful enhancements to the reference. Preserve their predictability. Provide a touch gesture that stirs without trapping normal document scrolling. A visible pause/reduced-motion path should suppress continuous physics while keeping sticker labels, links, and keyboard actions available.

### Acceptance checks

- Exactly 25 meaningful location labels and images exist; images are recognizable at the retained size.
- Initial layout suggests a lower pool rather than a rigid evenly spaced grid.
- Hover/sweep has immediate local response, a wake, and neighboring-body motion.
- The pointer's previous/current positions are used so fast sweeps cannot tunnel through the field.
- Releasing a dragged sticker gives a bounded inertial throw; all stickers remain recoverable within the playfield.
- Motion continues after the pointer leaves, then damps rather than running hot forever.
- Reset recomposes the whole set; resizing and revisiting the footer do not lose locations.
- Touch, keyboard focus, drag cancellation, reduced motion, and normal page scrolling work.
- Navigation links remain accessible above the playfield; physics cannot steal clicks outside its bounds.
- Offscreen/hidden-tab simulation pauses or sleeps; no unbounded loops, emitters, or increasing node counts.

## Evidence index

- [Recording contact sheet](output/lusion-reference/recording-contact-sheet.jpg): sixteen directly observed frames.
- [Recording at 0s](output/lusion-reference/recording-0.jpg), [2s](output/lusion-reference/recording-2.jpg), and [4s](output/lusion-reference/recording-4.jpg): larger key frames.
- `output/lusion-reference/about.html`: public semantic structure snapshot.
- `output/lusion-reference/source-urls.json`: exact delivered CSS/JavaScript URLs used for source inspection.
- `output/lusion-reference/source-2.css`: source tokens and responsive layout rules.
- `output/lusion-reference/live-geometry.json`: 1440 × 1000 live computed DOM geometry; the end range measured 3500px and its inner scene 1000px.
- `output/lusion-reference/FlipAnimation-inspected.txt`, `FlipSim-inspected.txt`, and `EndSection-inspected.txt`: isolated research extracts supporting the parameter notes. These are not application modules and should not be shipped as Paryatech implementation.

The supplied video remains the visual source of truth for matching the requested feel. The public source confirms the mechanics; the adaptation must be validated on Paryatech's own 25-sticker field.


## Implemented local revision

The local Paryatech footer now contains 25 unique illustrated destinations: the existing seven and 18 new transparent location artworks. `footer-v2.html`, `.css`, and `.js` implement the pool; `scripts/assemble.mjs` places its fragment into the served page. Current sticker widths and heights are retained exactly at all seven tested viewport widths. Only the playfield grows to accommodate the additional bodies.

The original rigid-body controller uses gravity, elliptical cutout contacts, momentum transfer, cursor stirring, drag/fling and fixed-count desktop pouring. It intentionally recreates the reference’s interaction flow with 25 illustrations rather than copying Lusion’s PIC fluid solver. Reduced motion, keyboard selection/movement, touch drag and tap-to-place, reset, idle sleep, offscreen pause and a no-JavaScript collection are included.

[Integrated checks](output/paryatech-v4/verification.json) cover all 25 distinct images, unchanged dimensions at 320/390/650/768/1024/1440/1920px, moving waves and continued momentum, constant-count pouring, keyboard controls, actual touch dragging, reset, existing demo/credits actions, reduced motion and offscreen pause. No page exceptions or failed asset responses were recorded. [Preservation checks](output/paryatech-v4/preservation-check.json) confirm the main page sections, core scripts/styles, other motion components and existing seven image files are unchanged. New artwork originals, prompts, alpha/dimension/hash checks and manifests are in [output/location-stickers](output/location-stickers/).

An integrated [interaction capture](output/paryatech-v4/footer-interaction.webm) shows cursor waves, pouring and reset on the local page.


### Collection reduction

The current footer contains 15 stickers following the request to remove 10. The seven original wonders and eight additional landmarks remain. Sticker sizing and physics are unchanged; the controller derives its body count from the remaining HTML elements. Earlier 25-sticker measurements and evidence above describe the original revision.
