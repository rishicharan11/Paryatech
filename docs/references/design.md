# Waabi — website design reference

Reference: [waabi.ai](https://waabi.ai/)
Inspected: 14 October 2026
Purpose: capture the site's visual system, content strategy, reusable elements, responsive layouts and motion so it can guide the next project step.

This is a reference analysis. Future product requirements and implementation choices should be supplied in the next step. The previous Acctual reference is preserved in [reference/acctual/design.md](reference/acctual/design.md).

## 1. Scope and evidence

Three parallel agents reviewed motion/source, mobile/tokens and content/secondary pages. The primary agent inspected the desktop homepage and verified interactions. Analysis combines rendered browser states with the site's published HTML, CSS and client JavaScript.

Evidence labels:

- **Observed:** visually checked screenshots or completed browser interactions.
- **Measured:** computed styles, DOM dimensions or browser state.
- **Source:** values or behavior explicitly present in published code.
- **Interpretation:** what the composition/content communicates.
- **Recommendation:** guidance for adapting the reference, rather than an assertion about Waabi.

Desktop was inspected at **1440 × 900**. Phone inspection used **390 × 844**, with additional breakpoint checks. The desktop homepage measured **11, 244px** high and the 390px homepage approximately **9, 416px** high. Content, fonts, viewport height and motion state influence those measurements; they are not fixed page-height requirements.

The T3 collaborative browser navigated but its automation connection repeatedly failed. Visual inspection therefore used separate local Chrome/Playwright browser instances. Saved viewport screenshots are the visual evidence. Full-page captures are supplementary: sticky sections, transforms, lazy imagery and entry animations cannot be faithfully represented by a single long screenshot. The initial geometry JSON also includes transformed offscreen content; use settled screenshots to assess final compositions.

Coverage includes the homepage; the Safety, Research, Company, Careers and Insights page families; a representative editorial article; shared navigation/footer; mobile homepage; and published animation code. The document inventories the reusable site elements, not every historical article, publication or external application form. External contact/job forms were not submitted.

## 2. Website context and content strategy

**Interpretation:** Waabi presents an AI company whose technology operates in the physical world, with autonomous trucking as the concrete proof. The current story extends the same underlying AI model toward robotaxis, varied environments and multiple vehicle form factors.

Its audiences include commercial logistics/OEM partners, customers, researchers, engineers considering employment, investors and press . This is a credibility and relationship-building site. Its actions lead visitors to a contact form, technical articles, research papers, company information and jobs. The homepage does not use a self-service signup or pricing funnel.

The narrative progresses from an emotional, concrete opening to a technical claim, practical benefits, technology explanation, safety evidence, partner endorsement, recent progress and recruiting. Each stage answers a different question:

| Narrative stage | Visitor question | Design response |
| --- | --- | --- |
| Cinematic opening | What does this company actually do? | Large footage of trucks working in real settings, paired with a short headline. |
| Physical AI introduction | What makes its approach distinctive? | Centered explanation surrounded by people, vehicles, simulation and operations imagery. |
| Benefits | Can the approach work beyond a demo? | Three selectable arguments for safety, scale and practicality with corresponding media. |
| Technology | How does it work? | An immersive photo followed by three distinct technology entry points. |
| Safety | Why should I trust it? | Operational photo, focused explanation and a dedicated safety page. |
| Partners | Who else believes in it? | Specific attributed statements, logos and partner imagery. |
| Insights | Is the company making progress? | Dated editorial/news cards with technical evidence and commercial developments. |
| Recruiting | How can I contribute? | Human/operations photo composition and a careers action. |
| Footer | How do I stay connected? | Direct contact, social links, full navigation and a strong final brand impression. |

Tone is ambitious, direct and research-oriented. It combines technical language with clear human outcomes. Brand claims about safety, generalization and commercial capability are captured as marketing context, not independently verified performance facts.

## 3. Visual direction

**Observed:** cinematic and editorial. Huge book-weight serif headings contrast with clean utility labels, compact navigation and realistic media. The light sections create breathing room between immersive sections. Hot pink is concentrated in actions, selected states and motion indicators.

The defining ingredients are:

- Full-viewport real-world video and photography, often darkened behind white text.
- Distinctive serif typography at unusually large sizes, tightly tracked with compact line spacing.
- White and warm gray surfaces, near-black content, and one saturated pink accent.
- Centered floating navigation that stays small until it opens.
- Rounded image/video clipping with approximately 12px corners; pill actions and circular arrows.
- Asymmetrical media compositions: scattered small squares, layered benefit cards, an overlapping partner quote and stepped recruiting photos.
- Small typography for metadata and utility controls, with strong contrast between headline scale and interface scale .
- Scroll continuity between sections: the opening video becomes an element of the next composition.
- Minimal decorative UI chrome. Depth comes from imagery, overlap and movement rather than widespread drop shadows.

**Interpretation:** the typography gives the AI company a confident editorial character, while operational images make its abstract technology tangible. The visual language is warmer and more human than a generic dark AI dashboard.

## 4. Homepage anatomy

The sequence below describes the rendered order. The navigation and announcement remain fixed above the content.

| Order | Section / elements | Layout and content purpose | Verified behavior |
| --- | --- | --- | --- |
| 0 | Announcement strip | White full-width strip, small contact prompt, underlined external action with diagonal arrow, close control on right. | Dismissible. Source includes a marquee when its text overflows. |
| 1 | Floating navigation | White compact rounded panel: SVG wordmark, current page label, two-bar Menu control and pink reading-progress line. | Desktop hover opens an image-based menu; button also opens it. |
| 2 | Cinematic hero | Full-bleed muted looping truck video; oversized white two-line headline low on the left; tiny pink down-arrow near lower right; additional positioning copy appears during scrolling. | Sticky footage shrinks/crops into a square as the visitor scrolls. |
| 3 | Physical AI introduction | White 150vh field with centered explanatory copy; scattered square photos/videos of trucks, people and simulation arranged in columns around it. | Different media columns move at different speeds; copy reveals progressively. |
| 4 | Benefits | Desktop two-column composition: square media on left; introductory heading/body followed by three selectable benefit labels on right. | Sticky media; click changes benefit, description and stacked media. Mobile uses a timed carousel . |
| 5 | Technology introduction | Near-full-width rounded truck photograph with very large white serif title and pink action. | Background parallax; action leads to Insights. |
| 6 | Three technology cards | Three tall rounded media cards for simulation, mixed-reality testing and the driving system. Small pre-label, serif title and round arrow anchored at bottom. | Entire card links to a relevant technical article; media zooms on hover. |
| 7 | Safety feature | Full-width operational road photograph with a darker overlay; left-aligned white heading/body and pink action. | Parallax image; action leads to Safety. |
| 8 | Partners | Large heading and description above a broad truck/partner photo. Near-black rounded quote panel overlaps the right edge. | Four tabs swap photo, attributed quote, logo and action; desktop also cycles automatically. |
| 9 | Insights carousel | Warm-gray section with large heading, explanatory text, pink archive action, round Previous/Next controls, horizontally clipped article cards. | Native horizontal snapping plus drag/arrow navigation; hover changes media/title/tags. |
| 10 | Recruiting feature | White section with an oversized serif heading, pink careers action and four overlapping photos progressing from operations to people. | Image entrance/overlap reinforces the company-building story. |
| 11 | Footer | Pink tunnel animation; white contact block on left, navigation near center, round social controls on right, large white wordmark low on right and small legal text low on left. | Scroll entrance and desktop pointer-reactive canvas over the looped video. |
| Overlay | Consent panel | Compact white panel fixed near lower-left on desktop, with explanatory copy and three consent choices. | Visible on a fresh browser session. It was dismissed for unobstructed reference captures. |

### 4.1 Announcement and navigation

**Measured / source:** the announcement is 42px high. On desktop, the collapsed navigation is about **338 × 55px**, horizontally centered. Its normal top offset is 34px; the visible announcement adds 42px, placing it about 76px below the viewport top . The clean screenshot shows a white fill, thin neutral border and approximately 12px radius.

The header is a small persistent control, not a horizontal row of all site links. The open desktop popover sits beneath it, at approximately the same width. Each of six site routes is paired with a small rounded thumbnail and a large serif or sans label. Active-route text is pink. A second navigation layer can expose sections within the current page; whole-page reading progress becomes a vertical indicator in that state.

**Observed:** hovering the desktop header opens the menu; moving the pointer away closes it. Menu can be opened with keyboard focus plus Enter. In the tested state, Escape left it open; do not assume an Escape close interaction is already implemented. A two-bar icon collapses into a single horizontal mark rather than rotating into an X.

The contact action links to a hosted HubSpot form. Its role is commercial contact. The close banner control has an accessible label. Banner dismissal moves the navigation upward by the removed 42px.

### 4.2 Hero and its handoff

The headline is **“Built to think. Born to haul.”**, split across two lines on desktop and four on the inspected phone. This is the clearest statement of the site: intellectual capability plus physical execution. At 1440px it measures **150px**, with **127.5px line-height** and **−7.2px tracking**. It begins around **x=103px**, low in the viewport. It is intentionally much larger than the navigation or action controls.

The footage shows vehicles and facilities in real operation. A 35%-black overlay supplies readability. The desktop and phone versions use different video files and crops. Background footage is a normal time-based video; scrolling transforms its container rather than scrubbing video time.

The hero's outer section is **250vh** tall with a **−75vh** bottom margin. This provides travel time for the sticky video and overlaps the following collage. Scroll gradually removes the initial composition, reveals secondary positioning copy, then scales and clips the same video into a small rounded square . This is the site's primary continuity gesture: the next section visibly inherits a piece of the opening.

The arrow is only **24px** visually and appears after an initial delay. Clicking it scrolls to approximately **1.65 × viewport height**. It fades out early as the visitor scrolls.

### 4.3 Introduction collage

The introductory copy describes the platform's ability to generalize across environments and vehicle types. Surrounding tiles combine people, truck operations, facilities, driving scenes and simulation. There are four surrounding media columns and a central tile; the spacing is deliberately irregular.

At desktop width, the repeating square tile is approximately **133px** at 1440px; its width follows **9.236vw**. Rounded clipping is shared across photos and videos. The center has a soft white blurred field so text remains readable when tiles approach it.

Scroll changes the relative speeds of the outer and inner columns. This is a scattered parallax composition, not a uniformly aligned image grid or an endlessly scrolling logo marquee. On phone, horizontal clipping reduces how much of the outer composition is visible, while the central text remains the anchor.

### 4.4 Benefits

The introduction transitions into a practical three-state explanation: **Safe**, **Scalable**, **Practical**. Desktop presents a square visual on the left and labels/descriptions on the right. Inactive labels are gray; the selected label is near-black and its description opens below it. The other labels move smoothly to make room.

**Observed:** selecting Scalable changed the visual to a side-view truck scene with pink visual emphasis; selecting Practical changed it to an overhead depot/route scene. Safe uses an overhead intersection/truck simulation. Older media cards remain visibly offset behind the selected card, making selection feel cumulative.

**Important behavior distinction:** desktop selection is **click-driven**. Scrolling drives the introduction, sticky composition and media entrance, but does not automatically choose the next benefit. Mobile replaces the long sticky presentation with a square carousel that advances every **5 seconds** while sufficiently visible and provides previous/next controls.

The desktop section is **200vh**, with a sticky media area lasting one viewport. Card transitions last **1 second** with exponential-out easing. The composition has fewer controls than a conventional accordion and is anchored by the visual.

### 4.5 Technology and safety

The technology introduction uses a rounded image panel almost as wide as the viewport, with **24px outer gutters**. It is about one viewport tall on desktop. Its headline is a fluid **9vw**, measured as **129.6px** at 1440px, with compact 0.9 line-height . The pink action leads to the general Insights library, not a separate top-level Technology route.

Below it, the three technology cards are **448px wide** at the desktop capture, with **24px gaps**. Each is about **620px high** and has 12px rounded clipping. A dark overlay makes the bottom labels readable. Cards use actual videos: driving/simulation, test-course scenes and dark point-cloud imagery with a pink vehicle. Their serif titles measure **40px / 44px**. The round arrow sits near the lower-right edge.

The safety section changes back to a fully immersive, edge-to-edge photo. The truck shares a real road with other vehicles; the photo supports the safety narrative instead of serving as an abstract background. A narrow left text column, approximately **525px** wide at 1440px, contains an **80px / 72px** heading, supporting text and pink action. The section is at least one viewport high.

### 4.6 Partner proof

Four named partner tabs sit at the top of a near-black panel: Volvo, Uber, Uber Freight and NVIDIA. Active text is white with a pink underline; inactive labels are lower-opacity gray. The quote is serif, followed by a smaller attribution and role. A partner logo sits in a round progress ring near the bottom; a pink article/detail action sits to its right when supplied for that partner.

**Observed:** selecting Uber changed the quote and attribution to its CEO and replaced the corresponding visual. The quote card overlaps the right side of a wider photograph, creating a strong asymmetrical composition. It is not a row of identical testimonial cards.

**Source:** on desktop, the visible slider auto-advances after a **10-second** circular progress animation. Mobile omits that desktop autoplay branch. No hover-pause behavior was verified.

### 4.7 Insights

The editorial cards include a large rounded image, one or more small category pills, a date, serif title and a thin lower divider. Cards are **450px** wide with **24px gaps** on desktop. The track extends beyond the visible viewport to show continuation. The first three cards in the inspected version relate to commercial operations and route generalization; their dates confirm the site is actively communicating current progress.

**Observed:** Next moves the track horizontally; the following screenshot is retained. **Source:** arrow navigation scrolls by one card width plus the computed gap. Native scroll snapping and drag support are also present. There is no evidence of an automatic endless news ticker.

Hover enlarges thumbnail media to **1.1×**, turns the title pink and changes category pills to pink text with a translucent pink background. This is one coordinated card response rather than separate unrelated effects.

### 4.8 Recruiting and footer

The recruiting section returns to white. A huge serif title and compact pink careers action precede overlapping rounded photographs. The composition broadens from trucks and operations to team members and the founder. Cards increase in scale and shift vertically rather than sitting in four equal columns.

The footer is a visual destination. Its loop creates a pink light tunnel with a dark center, while the white wordmark dominates the bottom-right. Contact information remains on the left; the site navigation and social links fill the upper middle/right. It has more visual weight than a conventional utility footer and reinforces the brand at the end of a long page.

## 5. Design tokens and typography

The exact values below come from the site's CSS and computed browser styles. They are reference values, not a new design system selected for the user's product.

### 5.1 Palette

| Token / purpose | Exact reference value | Use |
| --- | --- | --- |
| Light background | `#ffffff` | Main sections and floating navigation. |
| Foreground / dark | `#191818` | Main text and partner panel. |
| Secondary dark | `#232222` | Supporting dark surfaces. |
| Warm gray / cream | `#e8e6e3` | Editorial archive and softer section surfaces. |
| Very pale tint | `#f9f6f8` | Secondary light treatment. |
| Brand pink | `#ff2c6b` | Primary actions, hover, selected tab/rule, progress and tunnel media. |
| Light pink | `#ffbfd2` | Supporting accent tint. |
| Inactive opacity | `25%` on partner labels; approximately `46%` on benefit labels | Selection hierarchy using the inherited text color. |
| Media overlay | Black at `35%` for opening hero; other panels use gradients or per-state overlays | Legibility and media focus. |

### 5.2 Font families

- **F37 Zagma Serif Book** (`Zagma`): primary editorial/display voice, with a published Book Italic face. Headings use weight 400. Zagma also appears in narrative/benefit body text, quotes and some links; it is not restricted to headlines.
- **Neue Haas Grotesk Text RoundDots 65 Medium** (`NeueHaas`): utility/interface voice for navigation, action labels, metadata, tags, dates and selected supporting text. The published face declares weight 400 even though the file name identifies Medium; CSS uses weights according to component classes.
- The wordmark is a dedicated graphic, not a text rendering of either font.

Use the exact families as reference identifiers. Font assets are identified for inspection; their presence on the public site is not a license for a new project. A future adaptation should use properly licensed assets or explicitly chosen substitutes.

### 5.3 Key measured type styles

| Role | Desktop reference at 1440px | Phone reference at 390px |
| --- | --- | --- |
| Hero headline | Zagma 150px, line-height 127.5px, tracking −7.2px, weight 400 | Zagma 72px, line-height 61.2px, tracking −2.88px |
| Large immersive/recruiting title | Fluid 9vw →129.6px, line-height 116.64px, tracking ≈−5.2px | Zagma 55px /49.5px, tracking −2.2px |
| Major section title | Zagma 80px /72px, tracking −3.2px | Zagma 34px /30.6px, tracking −1.02px |
| Benefits introductory heading | Zagma 60px /54px, tracking −1.8px | Zagma 28px /25.2px, tracking −.84px |
| Technology card title | Zagma 40px /44px, tracking −1.2px | Zagma 24px /30px, tracking −.72px |
| Article title | Zagma 24px /30px, tracking −.72px | Zagma 18px /19.8px, tracking −.54px |
| Base narrative/benefit body | Zagma 16px /22.4px, tracking −.32px; section-specific overrides | Zagma 16px /22.4px, tracking −.32px |
| Insights supporting copy | NeueHaas; section-specific sizing | NeueHaas 14px /22.4px, tracking +.28px |
| Navigation page label | Compact NeueHaas interface text | Same family with phone layout |
| Announcement label | NeueHaas 12px /16.8px, tracking .24px | 11px /15.4px, tracking .22px |

The site mixes serif and sans at multiple levels. Preserve roles rather than applying one family indiscriminately to all body copy. The tight display line-height creates its characteristic headline silhouettes; generic default line-height would materially change the reference.

### 5.4 Layout, spacing and shape

**Source:** root font-size is **10px** and the Tailwind spacing base is **0.1rem**, so many numeric utility values represent pixel-like sizes. Breakpoint rem units in media queries must not be interpreted using that author-set 10px root: the effective reference breakpoints follow standard browser media-query units.

| System element | Reference |
| --- | --- |
| Main content width below 768px | `calc(100vw - 80px)`; 40px left/right gutters, 310px at 390px. |
| Main width from 768px | `min(1234px, 85.6944vw)`; 1234px width and 103px gutters at 1440px. |
| Immersive/card-grid outer gutters | Usually 24px, distinct from the narrower main text container. |
| Main vertical section padding | 60px by default; 120px from 1024px. |
| Rounded-unit token | 12px. |
| Standard media card gaps | 24px desktop; editorial carousel 28px mobile. |
| Primary actions | Pink pill; 48px desktop measured height, white compact label; widths fit content. |
| Round arrows | 50px desktop; 32px mobile in shared source variants; thin inherited-color border at 15% opacity . |
| Floating header | Desktop 338×55px; mobile width viewport − 24px. |
| Recurring collage tile | Desktop 9.236vw; 133px on mobile. |

## 6. Animation and interaction system

### 6.1 Foundation

**Source:** the site uses **Next.js/Turbopack**, **Motion/Framer Motion** and **Lenis**. Sticky sections use CSS sticky positioning. No GSAP/ScrollTrigger or Lottie identifiers were found in the captured homepage assets. This identifies the inspected implementation; a future adaptation is free to use a different stack.

Lenis is configured with **lerp 0.2**, smooth mouse-wheel scrolling and `syncTouch:false`. Most time-based transitions use **400ms** and `cubic-bezier(.19,1,.22,1)`. Scroll-linked effects use relative progress rather than fixed durations.

| Motion recipe | Published mechanics | Where it matters |
| --- | --- | --- |
| Heading word reveal | Opacity 0→1 and x 20px→0, 400ms, 70ms word stagger; once | Hero and major section headings. |
| Paragraph word reveal | Usually opacity .1→1, 100ms linear per word, 70ms stagger | Explanatory narrative and controlled hero copy. |
| Shared entrance | Child index i starts at y 200×(i+1)px; spring stiffness 80, damping 20; once at 20% visibility | Article/media/group entrance. |
| Image parallax | y−12%→+12% over viewport traversal | Technology, safety and partner media. |
| Pill/round control feedback | Hover 1.05×; press .95× | Primary actions and arrow controls. |
| Article media hover | Scale 1→1.1, 500ms exponential-out; title/tags also recolor | News/editorial cards. |
| Technology media hover | Scale to 1.2, 500ms exponential-out | Three tall exploration cards. |
| Navigation reveal | Opacity 0→1, scale 1.1→1, blur 10px→0; 150ms delay; 400ms default | Expanded image menu. |
| Technology-card entrance | Bottom-clipped card→full card, 600ms, cubic-in-out, 150ms item stagger; once at 30% visibility | Homepage ThreeUp explicitly selects `clip-path-in` in server-rendered page data. |

### 6.2 Hero timeline

1. The first viewport presents ordinary looping footage and a once-revealed headline. The down-arrow fades in after 1s.
2. Early scroll fades the arrow out over hero progress0→.1. Secondary positioning copy fades in over.1→.2, with its word reveal enabled after.15. Its absence from the first screenshot is intentional.
3. A separate track beginning at 100vh and lasting 50vh maps the large video toward the small tile geometry. Scale and clip-path animate together; the dark overlay disappears toward the end.
4. On desktop, headline lines have opposing lateral drift in the latter portion of their local range.
5. The square lands into the following collage, continuing the same asset rather than swapping to an unrelated section.

### 6.3 Scroll versus state versus time

| Section | Scroll controls | User/time controls |
| --- | --- | --- |
| Hero | Sticky travel, video crop/scale, overlay/copy fades, desktop headline drift | Video playback runs independently of scroll. |
| Collage | Outer columns+600→−600px; desktop central copy−200→+200px | Word entrances are once-triggered. |
| Desktop benefits | Intro-to-stack handoff, sticky layout and exit transforms | Click selects benefit; active card1s transition. |
| Mobile benefits | Visibility starts progress when 50% visible | 5s cycle; Previous/Next reset/change selection. |
| Partners | Parallax and in-view trigger | Tab click; desktop10s progress ring auto-cycle. |
| Insights | Scroll/drag inside horizontal track | Previous/Next scroll one card; hover zoom/recolor. |
| Footer | y−200→0px; content fades during last 25% of entry | Looping tunnel video and desktop pointer-reactive canvas. |

The footer canvas is a specific source-confirmed effect:250 layered shapes, per-frame pointer smoothing. It begins rendering in view after pointer movement in the mouse-tracking variant; the video supplies its moving background/fallback. It should not be misdescribed as a custom cursor.

### 6.4 Playback, preferences and fallback evidence

Ambient media uses muted/autoplay/loop/playsInline. The homepage's direct video source branch includes server-rendered URLs; do not assume every offscreen video is deferred at the network level or paused out of view. The shared controlled player is a separate component with its own playback/seek behavior.

The stylesheet declares `--motion:0` under reduced-motion and gates native route-transition styles. The homepage's scroll transforms, smooth-scrolling wrapper, ambient video and canvas were not found to consistently consume that preference. **Recommendation:** an adaptation should provide a readable final state with optional parallax, autoplay and long sticky effects disabled under reduced-motion.

The source includes no-JavaScript opacity overrides, but they do not reset all transforms or parent opacity . A future implementation should preserve readable content when motion code fails. Source also authors native View Transition effects: the outgoing page dims/scales, and the incoming page expands from a centered rounded clip. Inline `--duration:0.4` is multiplied by two and then by 1s, giving an authored **800ms** transition. Runtime activation and cross-browser behavior were not verified; this is a source value rather than measured route timing.

## 7. Responsive behavior

The responsive system changes interaction as well as scale . Primary modes include 640px for navigation, 768px for mobile/desktop storytelling and partner/benefit behavior, and 1024px for wider card layouts and large vertical spacing.

Measurements at 320, 390, 768, 1024 and 1025px found no document-wide horizontal overflow. Mobile inspection used a resized desktop Chrome engine, not a physical phone. Device-specific playback/performance and touch gestures remain untested.

| Element | Desktop | Phone |
| --- | --- | --- |
| Announcement | Small centered text/action, 42px strip | 11px label; close remains available; overflow can become marquee. |
| Header | Centered 338px rounded popover | 366px wide at 390px, top 66px with announcement; open menu becomes a full-width screen-sized panel. |
| Hero | Desktop footage; 150px heading at 1440 | Dedicated phone footage; 72px heading at 390. |
| Collage | Surrounding multi-column media and translating central copy | Narrow clipped composition; central copy translation disabled below 768. |
| Benefits | 200vh sticky split composition with clicked labels | Stacked intro plus square 5s carousel, progress and arrow controls. |
| Technology cards | Three tall cards across | Stacked when the large-screen card layout no longer fits. |
| Safety | Broad photo with narrow left text column | Smaller text and portrait-oriented crop with vertical content flow. |
| Partners | Wide image with right overlapping quote panel and 10s auto-cycle | Stacked image/panel; manual tabs, without desktop autoplay branch. |
| Insights | 450px cards, 24px gap, 50px arrows | Viewport−80px cards, 28px gap, 32px arrows; horizontal continuation retained. |
| Recruiting | Stepped overlapping large photos | Different narrow-screen composition; see phone captures. |
| Footer | Multi-column layout, large wordmark and pointer canvas | Stacked utility/contact layout and video-led treatment. |

Use the actual page family rules instead of reducing all dimensions by one multiplier. On mobile, 40px main gutters remain a strong visual choice and visibly constrain text. Source breakpoints and actual measurements are cataloged in the supporting token/responsive evidence.

The open phone navigation has a 101px white header row below the 42px announcement, then a thin divider and six image/label rows. Labels start within 40px gutters. At320px a targeted rule reduces navigation gaps and the current-route label, while the main text still has 40px side gutters. The phone benefits image is 310×310px at 390px; technology cards use wider 342px panels with 24px side insets. Partner photography/panel align closer to the edge at 12px insets, with inset text inside the dark panel.

## 8. Wider site and navigation

The global site map has six main destinations. There is no dedicated top-level Technology page in the inspected navigation.

| Route | Page role | Reusable visual/interaction elements |
| --- | --- | --- |
| [Home](https://waabi.ai/) | Brand narrative and gateway | Cinematic hero; transforming media; benefit selector; partner proof; article carousel . |
| [Safety](https://waabi.ai/safety) | Explain safety strategy and validation | Large numerical proof rows; principles; technology modules; sequential scroll story; expanding photo cards. |
| [Research](https://waabi.ai/research) | Demonstrate research depth and expose publications | Dark theme; featured publication carousel; filters; ruled publication list with external links. |
| [Company](https://waabi.ai/company) | Founder, team, backing and organizational context | Large media; leadership/founder story; investor logo tiles; news/events; locations. |
| [Careers](https://waabi.ai/careers) | Recruitment and working culture | People/office photos; nine-state employee testimonial slider; numbered values; external jobs. |
| [Insights](https://waabi.ai/insights) | Editorial, technical and news archive | Category navigation/filtering; featured and grid article cards; article-detail template. |
| Editorial detail | Longer evidence and explanation | Category/date/title; large media; constrained reading column; embedded content; related articles. |
| Research detail | Scientific publication comprehension | Dark reading frame; authors/venue/year; abstract, method, diagrams, results and paper/poster/video links. |
| [Press](https://waabi.ai/press) | External editorial coverage | White four-column logo/card archive, load-more control, related recent content. |
| [Privacy](https://waabi.ai/privacy-policy) | Legal information | Text-focused page with shared site chrome. |

### 8.1 Safety family

The page grounds its argument in road-safety stakes, then describes three principles, three technical tools and a sequence of validation/practice steps. Its proof metrics appear as huge right-aligned values on thin ruled rows. Cream sections introduce a story with a pink vertical line, endpoint indicator and 01/3-style progress count, pairing left narrative with a rounded portrait image. Another composition expands one large photographic panel beside narrower collapsed panels.

This family extends the homepage's safety promise into a more structured evidence journey. The diagrams/process treatments explain; they are not decorative substitutes for the real-world photographs.

### 8.2 Research family

Research uses the site's near-black theme with light text, maintaining the serif/sans hierarchy and pink accents. A featured horizontal group surfaces a small number of publications, followed by a denser ruled list. Filtering and publication metadata help specialist visitors navigate without making the homepage itself technical and dense.

Six outlined category pills link to `/research/tag/<slug>` routes. Filtered pages use a simpler large category heading, back link, publication rows and load-more control. Rows include title, authors, venue/year, tags and a round external/detail arrow. Source URLs distinguish this category navigation from the query-based Insights filters.

### 8.3 Company and careers families

Company develops the founder/team story, then shows institutional backing with dark rounded investor/logo tiles on a pale surface. News, events and locations expand its organizational credibility. Careers shifts the photographic emphasis toward people, offices and collaboration. It combines a nine-state employee testimonial slider, eight numbered values and opportunities hosted through Lever.

The two families share a visual system while changing the content emphasis: Company answers who stands behind the business; Careers answers why someone would join it.

Company also uses an upcoming-events strip and a near-black North American map with pink location markers. Careers values appear as a horizontal sequence of eight small numbered circles, large labels and short descriptions, with four columns visible in the inspected desktop layout. The employee slider was exercised: its fraction advanced from 1/9 to 2/9 and the identity/quote changed.

### 8.4 Insights and article family

Insights organizes the site's ongoing communication across company news, technology, research, perspective and related editorial categories. Card typography, category/date metadata and rounded thumbnails match the homepage carousel . Articles use a focused reading layout and can contain substantial media, technical explanation and external references.

The archive begins with five full-screen featured editorial photographs and per-article scroll controls. Below it, the article index filters through `/insights?tag=technology`, `?tag=companynews` and `?tag=research`. An external-coverage carousel leads to the separate Press archive; its cards show publication logos and metadata. A large simulation-media story supplies another prominent feature before the footer.

Insights article detail uses a white surface; research publication detail uses near-black. Both have a broad title area, divider, left author/resource rail and offset reading column, beginning around x=315px in the 1440px detail capture. Articles expose copy-link and social-share controls; longer technical pieces can include section anchors. Publication detail adds paper/poster/video resources and scientific sections.

The technology-card destinations are specific editorial URLs, rather than generic feature pages:

- [Simulation realism article](https://waabi.ai/insights/simulator-realism-the-new-safety-standard-for-the-av-industry).
- [Mixed-reality testing article](https://waabi.ai/insights/mixed-reality-testing-pushes-the-boundaries-of-av-safety).
- [Driving system article](https://waabi.ai/insights/introducing-the-waabi-driver#waabi-driver).

## 9. Reusable element inventory

The table is a component-level extraction for the next stage. It describes responsibilities without selecting a future code framework.

| Component | Contents / variants | Important state or behavior |
| --- | --- | --- |
| Announcement | Prompt, inline external link, diagonal arrow, close control | Visible/dismissed; overflow marquee; header offset sync. |
| Floating header | SVG logo, route label, Menu control, progress line | Closed/site menu/page-section menu; hover and button paths. |
| Image navigation item | Thumbnail, label, route | Current route pink; others neutral. |
| Section-navigation item | Local label, anchor, active/progress marker | Active/inactive opacity; scroll target. |
| Animated heading | Serif words/lines, optional custom wrapping | Once entrance, optional externally controlled activation. |
| Animated paragraph | Word spans, emphasis | Sequential opacity with retained readable layout. |
| Primary action | Pink capsule, white short label | Hover/press scale; internal/external link destinations. |
| Circular arrow | Arrow SVG, inherited border, optional fill | Previous/Next/link/down variants; hover/press . |
| Ambient media | Image or video, responsive source, overlay | Muted inline loop; clipping; optional parallax. |
| Transforming hero | Sticky viewport media, title, copy, arrow, handoff track | Scroll crop/scale; initial versus intermediate copy. |
| Collage | Multiple square media columns, centered copy | Different scroll speeds; overflow clipping. |
| Benefit selector | Three labels, expanded description, media stack | Click-driven desktop; timed mobile carousel . |
| Technology card | Tall media, pre-label, serif title, arrow | Linked card; hover zoom; source entry variants. |
| Full-bleed feature | Photo, dark gradient, narrow content and CTA | Technology/safety-style variants and parallax. |
| Partner slider | Photo, tabs, quote, author/role, logo, optional CTA | Selection, desktop auto progress, image/text transitions. |
| Article card | Image, category pill(s), date, title, lower rule | Hover recolor/zoom; archive/grid/carousel variants. |
| Horizontal carousel | Native scroller, snap points, arrows, draggable track | Card-sized advancement; next-card preview; hidden scrollbar. |
| Category/filter controls | Labels/chips and selected state | Research/archive discovery; distinct route/query patterns documented above. |
| Publication row | Title, authors/venue/year, external destinations | Dense reading/navigation, thin dividers. |
| Numeric proof row | Large number, explanatory label, horizontal rule | Safety proof hierarchy. |
| Numbered narrative | Progress/sequence, heading/copy, associated visual | Safety stages and careers values. |
| Investor/logo tile | Logo on dark rounded rectangle | Company backing; repeated strip/grid. |
| Employee quote slider | Employee image, quote, identity, count, arrows | Nine testimonials in Careers. |
| Location panel | Dark map, pink markers, location labels | Company geographic presence. |
| Events strip | Date, name, city and external destination | Company upcoming-event information. |
| Press card | Publication mark, article title, publication/date | External-coverage carousel and archive. |
| Resource/share controls | Paper/poster/video links; copy link and social marks | Research/article-detail support. |
| Recruiting composition | Title/action, overlapping work/team photos | Large versus narrow-screen layouts. |
| Footer | Animated field, contact, route list, social buttons, logo, legal | Entry fade; desktop pointer response; video fallback. |
| Consent panel | Explanation, Reject/Accept/Customize choices | Fresh-session overlay and preferences path. |
| Editorial template | Metadata, title, lead media, reading column, body media, related content | Longer-form technical/company communication. |

## 10. Media and implementation considerations for the next step

Media is structurally important: operational trucking footage, cinematic close-ups, simulation/point-cloud scenes, real people, partner photography and the tunnel animation each support a specific part of the story. Generic stock photos would reproduce dimensions but miss the reference's evidence-driven tone.

The source serves images through Next image URLs with responsive sizes and **DatoCMS**-hosted media (`datocms-assets.com/163962/...`). Large video URLs use `static.ext.waabi.ai`. The extracted asset manifest records identifiers/URLs; large video binaries were not downloaded. SVGs provide wordmarks, arrows, menu bars, social marks and partner graphics.

| Media role | Published identifier |
| --- | --- |
| Desktop opening | `WAABI_27s_2K_antinomy_export_250823.mp4` |
| Phone opening | `Hero_27Sec_responsive.mp4` |
| Benefits | `scene_1_v2_HD_FINAL.mp4`, `Scalable.mp4`, `scene_3_v5_HD_FINAL-small.mp4` |
| Technology exploration | `intersection-trimmed.mp4`, `Crash_variant_1.mp4`, `Copy_of_Copy_of_Full_Video_-_Solution_Ready_Blog-VEED__1_.mp4` |
| Footer | `Waabi_System_LightTunnel_1.mp4` |
| Technology main image | `1756426717-waabi_road1_00928.jpg` |
| Truck/safety imagery | `1761183902-waabi_road2_05483.png`, `1761185044-waabi_road2_05683.jpg`, `1761262941-fya_one-1.jpg` |

The consent overlay is supplied by c15t and uses a system-sans font distinct from the brand typography. Its mobile panel nearly fills the bottom width and obscures part of the initial headline. Reference captures include both the fresh-session and dismissed states.

**Recommendation:** when adapting the design, preserve the hierarchy, media-to-copy relationship, section rhythm and interaction distinctions before deciding which individual visual effects to retain. Build static readable sections first, then add measured motion. Reserve media dimensions, keep heavy motion out of the critical reading path and use responsive sources. Supply the user's own brand assets and content instead of treating Waabi's copy, photographs or fonts as a ready-to-publish asset pack.

For a close structural adaptation, the highest-priority characteristics are the compact floating navigation, large serif headline silhouettes, cinematic opening-to-collage handoff, selective pink accent, credible operational imagery, benefits changing through explicit selection, and alternating immersive/white/cream surfaces. Secondary details include the image-menu thumbnails, progress indicators, overlapping quote panel, consistent card hover and final animated footer.

## 11. Evidence index

Supporting files are retained in [output/waabi-reference](output/waabi-reference). Source-based claims are traceable through the motion notes and preserved published bundles.

### Visual states

- [Clean desktop opening](output/waabi-reference/screenshots/desktop-hero-clean.png).
- [Desktop navigation opened by hover](output/waabi-reference/screenshots/desktop-menu-hover.png).
- [Hero shrinking into collage](output/waabi-reference/screenshots/desktop-y1200.png).
- [Collage lower composition](output/waabi-reference/screenshots/desktop-y2250.png).
- [Benefits — Safe](output/waabi-reference/screenshots/benefit-safe.png), [Scalable](output/waabi-reference/screenshots/benefit-scalable.png), [Practical](output/waabi-reference/screenshots/benefit-practical.png).
- [Technology introduction](output/waabi-reference/screenshots/desktop-y5000.png) and [technology cards](output/waabi-reference/screenshots/desktop-y5700.png).
- [Safety photograph/content](output/waabi-reference/screenshots/desktop-y6400.png).
- [Partner composition](output/waabi-reference/screenshots/clean-y7500.png) and [Uber selected](output/waabi-reference/screenshots/partner-uber.png).
- [Editorial cards](output/waabi-reference/screenshots/desktop-y8800.png) and [Next interaction](output/waabi-reference/screenshots/insights-next.png).
- [Recruiting photo composition](output/waabi-reference/screenshots/clean-y10000.png).
- [Footer settled state](output/waabi-reference/screenshots/clean-y10344.png).
- [Phone opening](output/waabi-reference/mobile-390-clean-hero.png) and [phone navigation](output/waabi-reference/mobile-390-menu.png).
- [Phone benefits](output/waabi-reference/mobile-clean-scroll-3200.png), [stacked technology/safety](output/waabi-reference/mobile-clean-scroll-5200.png), [partners](output/waabi-reference/mobile-clean-scroll-6700.png), [Insights](output/waabi-reference/mobile-clean-scroll-7600.png).
- [Secondary page captures](output/waabi-reference/content-pages).
- [Compact visual overview](output/waabi-reference/reference-overview.html).
- [Safety progression](output/waabi-reference/content-pages/safety-section-2.png), [Research opening](output/waabi-reference/content-pages/research-desktop.png), [Company image composition](output/waabi-reference/content-pages/company-section-2.png), [Careers testimonial Next](output/waabi-reference/content-pages/careers-voices-next.png).
- [Article detail](output/waabi-reference/content-pages/article-desktop.png), [research publication detail](output/waabi-reference/content-pages/publication-desktop.png), [Press archive](output/waabi-reference/content-pages/press-desktop.png).

Some early desktop screenshots retain the fresh-session consent panel. The clean opening, menu, benefit, partner and footer states were captured after Reject All for an unobstructed view.

### Measurements and source

- [Desktop computed styles and geometry](output/waabi-reference/desktop-observations.json).
- [Desktop scroll state example](output/waabi-reference/desktop-state-y8800.json).
- [Menu, partner and carousel interaction evidence](output/waabi-reference/interactions.json).
- [Benefit/keyboard-menu interaction evidence](output/waabi-reference/benefit-interactions.json).
- [Desktop token measurements](output/waabi-reference/tokens-desktop-metrics.json).
- [Phone token measurements](output/waabi-reference/mobile-390-metrics.json).
- [Asset manifest](output/waabi-reference/tokens-final-assets.json).
- [Published homepage HTML](output/waabi-reference/homepage.html) and [sitemap](output/waabi-reference/sitemap.xml).
- [Detailed animation notes](output/waabi-reference/motion-notes.md) and [preserved motion/source assets](output/waabi-reference/motion-source).
- [Responsive notes](output/waabi-reference/responsive-notes.md).
- [Content/page-family notes](output/waabi-reference/content-notes.md).

The main reference is the observed live site on the inspection date. Exact CSS values and authored timings are separated from interpretation and future implementation recommendations throughout this document.
