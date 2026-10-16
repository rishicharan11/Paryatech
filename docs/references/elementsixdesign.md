# Element six — Swap demo page reference

Reference: [Swap Commerce — Book a Demo](https://www.swap-commerce.com/book-a-demo)
Inspected: **16 October 2026**
Application: the Paryatech `/book-a-demo/` page. This document studies the reference composition and interaction; the implementation retains the approved Paryatech identity.

## Evidence and limits

The live page was inspected in Chrome at 1440 × 1000 and 390 × 844. Rendered screenshots, hydrated HTML, CSS, geometry, and field inventory are saved in [`output/demo-page/`](output/demo-page/). The collaborative browser opened successfully, but snapshot calls failed twice: `Preview automation client server-browser disconnected during snapshot.` and `Preview automation snapshot timed out after 15000ms.` An installed Chrome/Playwright fallback supplied the visual evidence.

- **Observed:** page composition, rendered HubSpot fields, first/last name layout, responsive stacking, customer-mark rail, content blocks, and visible Cal.com booking availability.
- **Source verified:** typography, color tokens, card radius, reveal timing, field attributes, and actual form endpoint.
- **Interpretation:** buyer intent, editorial hierarchy, and reusable conversion principles.
- **Not tested:** submitting Swap’s form, creating a Paryatech booking, sending email, authenticated CRM behavior, or confirmation emails. No booking or lead was created during inspection.

An earlier broader study is preserved at [`reference/swap-commerce/design.md`](reference/swap-commerce/design.md). This file focuses on the exact requested demo route.

## Context and purpose

Swap sells an operating platform for ecommerce businesses, including cross-border operations, returns, tax, shipping, and AI storefronts. This page turns that broad platform story into a sales conversation. The copy names business concerns before presenting the form, helping the visitor decide whether a demo is relevant. A short list describes the walkthrough’s value and sets an approximately 30-minute expectation.

The page targets a business buyer rather than a self-service shopper. It deliberately asks for contact details and current commerce setup. The surrounding customer proof reduces uncertainty about speaking to sales. That proof belongs to Swap and must not become invented Paryatech proof.

For Paryatech, the corresponding buyer is an agency owner or travel team considering a connected workspace for enquiries, conversations, itineraries, proposals, bookings, and follow-ups. The equivalent promise is a useful, personal walkthrough of the visitor’s own agency workflow.

## Page and element inventory

| Region | Reference elements | Role and behavior |
|---|---|---|
| Global header | Swap wordmark; Services, Industries, Resources; Customer Stories; Sign in; green Book a Demo pill | Persistent navigation and a recognizable conversion destination. Below the desktop breakpoint the menus collapse into a mobile menu. |
| Conversion hero | Pale green full-width background; two desktop columns; large serif “Book a Demo” H1 at upper left | Immediately identifies the task without competing imagery or an additional hero action. |
| Introductory text | Compact outcome-led paragraph beneath H1 | Connects the demo to expansion, post-purchase, and AI commerce concerns. |
| Benefit block | Small sans-serif heading and four green checkmarked lines | Makes the conversation’s scope concrete and easy to scan. |
| Proof below the benefits | Three software award badges | Swap-specific reassurance; these are not generic decorations. |
| Lead card | Rounded dark green block on the right, sans-serif heading, outlined pill fields | A visually distinct area for taking action. The card starts lower than the headline and roughly aligns with the introduction. |
| Form controls | First name, last name, work email, phone/country, current commerce platform, referral source | First/last name share a desktop row; longer questions occupy full width. Labels become small captions when a field has a value. Native select affordances remain recognizable. |
| Consent/help copy | Small muted text above the form action | Explains handling of the visitor’s information and links to the reference privacy page. |
| Submit | Full-width white pill | Highest contrast control inside the dark card. |
| Customer proof rail | Centered serif “Powering 1,000+ Global Businesses”; horizontal customer logos | Reassurance after the conversion section. The logos repeat in the live DOM. |
| Product/story section | Oversized serif product title and media | Continues educating visitors who are not ready to submit. |
| Testimonial carousel | Large centered serif quotation; small person/role; arrows; Read More pill | Additional social proof, separate from the lead capture. |
| Editorial cards | Large serif section title; article imagery; category chips; read times; sans-serif titles; read-more actions | Supports consideration and lets visitors explore further. Content records can change. |
| Newsletter and footer | Email input plus multi-column sitemap, company, legal and social groups | Broader navigation. Mobile footer groups become disclosures. |
| Cookie consent | Fixed lower-left consent card with choice actions | Environment/session dependent. It is not part of the demo interaction itself. |

## Composition, type, and spacing

At the inspected 1440-pixel desktop viewport, the main container has approximately **80-pixel side margins**. The H1 begins around **y = 165 pixels** and measures **80 / 76 pixels** in the reference’s `secondaryFont` serif. The benefits subheading is **24 / 28.8 pixels** in `mainFont` sans-serif. The lead card fills the right half of the 12-column grid and uses a **24-pixel radius** from `--radius-card`.

The reference distinguishes three type levels: expressive serif display text; practical sans-serif explanatory text; and small form labels/help copy. There is ample space between the introduction and benefits. Checkmarks are thin strokes with modest spacing rather than large illustrated icons. The form has tighter vertical rhythm, keeping the action close to the related fields.

Source palette includes a luminous action green `#a3fda7`, pale green hero, dark green `#2d3637`, black and white. Pill radii are approximately 100 pixels for controls and 200 pixels for buttons. These are reference facts, not replacement tokens for Paryatech.

On mobile, the hero becomes a single column: heading, description, benefits/proof, then form. The form occupies the available width and field content receives roughly 24-pixel insets. The reference avoids a horizontal miniature of the desktop page. Text reflows naturally; dense footer groups become collapsible.

## Motion and interaction study

### Entry and scroll reveals

The live CSS applies a shared `.scroll-entrance` treatment to direct children:

- Initial opacity `0` and `translate3d(0, 50px, 0)`.
- Final opacity `1` and transform `none` when `data-in-view="true"`.
- Duration **650 milliseconds**.
- Easing **cubic-bezier(.44, .24, .16, 1)**.
- Base stagger delay is five percent of the duration, approximately **32.5 milliseconds**, multiplied by child index and any explicit delay value.

This is restrained editorial entrance motion. The demo card does not depend on a rotating card stack, scroll-scrubbed scene, or decorative particle system. Its function is to invite completion of the form.

### Fields and action

Inputs have a thin translucent outline, transparent dark surface, white text, and rounded ends. Filling/focusing fields changes label presentation and control emphasis. The select retains a small chevron. The white submit pill is visually stable and changes appearance under interaction; color and surface transitions across the reference use roughly **300 milliseconds**.

The actual reference form hydrates client-side through HubSpot. Its POST action points to HubSpot’s EU form service. This was inspected without submission. A server-only/text crawl initially shows a loading placeholder; the rendered browser verified the complete form. Do not confuse the placeholder with the finished interface.

### Secondary movement

The live page includes a customer logo rail, a testimonial slider with previous/next controls, and a responsive article carousel. These support the long page rather than the demo task itself. Carousel content and visible count depend on viewport size. No unsupported claim about Swap’s submission success or server-side validation is made here.

## Paryatech implementation

The deliverable lives in:

- [`paryatech-waabi/src/pages/book-a-demo.html`](paryatech-waabi/src/pages/book-a-demo.html): a main-content fragment for the shared site shell.
- [`paryatech-waabi/dist/demo.css`](paryatech-waabi/dist/demo.css): scoped page styling.
- [`paryatech-waabi/dist/demo.js`](paryatech-waabi/dist/demo.js): validation, selected-plan context, and entry motion.

The composition carries across the reference’s useful structure: pale surrounding surface, outcome-led copy and checkmarked benefits on the left, a contrasting dark form card on the right, and a white full-width action. It uses **Zagma** display text, **NeueHaas** utilities/body controls, **#111111**, **#E5E8E3**, **#115553**, and **#ffffff**. The Paryatech card has a 16-pixel radius to match the existing direction. Mobile uses a full-width stacked composition with comfortable touch controls.

The copy describes an actual travel-agency walkthrough. Four benefits cover enquiry visibility, branded itineraries, connected team operations, and choosing a starting point. A 30-minute meeting note corresponds to the verified live Paryatech scheduling page. The lower section explains the three practical steps: choosing a time, seeing the workspace, and discussing the agency’s starting point. It replaces unsupported customer proof with useful expectations.

Entry motion uses the reference’s 650-millisecond easing with a shorter 35-pixel rise and an 80-millisecond offset for the form card. Reduced motion renders the final layout with no animation. All content is visible if JavaScript is unavailable.

## Actual booking behavior

The page uses the existing real destination [Paryatech HQ’s Cal.com demo](https://cal.com/paryatech-hq/demo). On inspection the booking page identifies **ParyatechOS Demo**, a **30-minute** meeting, **Google Meet**, and a timezone selector showing **Asia/Kolkata**, with available time slots. Availability is live and can change.

The Paryatech form asks for full name, work email, and agency name, plus an optional area of interest. A successful local validation continues to the real Cal.com calendar using an ordinary GET navigation. It does **not** display a fabricated lead-capture success or booking confirmation. The visitor chooses a time and confirms the actual booking with Cal.com. A visible direct-calendar link works as a fallback and the plain HTML form also works without JavaScript.

Name/email prefill and metadata are supported by [Cal.com’s official embed prefill guide](https://cal.com/help/embedding/prefill-booking-form-embed) and [official embed documentation](https://cal.com/embed). Name and email use their default field names; agency, interest, and selected plan use `metadata[...]`. Metadata is booking context rather than an invented custom form field. It is not represented as visible calendar content. End-to-end persistence was not claimed because no booking was created.

Links arriving with `?plan=quarterly`, `?plan=half-yearly`, or `?plan=yearly` display the corresponding **₹20,000**, **₹30,000**, or **₹50,000** plan context and carry it forward as metadata. Unrecognized parameters are ignored. Values are matched against a fixed allowlist and written with `textContent`.

Validation gives each invalid field a connected inline error, creates a linked summary at the top of the form, and moves focus to that summary after a failed attempt. It does not move focus during ordinary typing. There is no API key, hidden form service, custom lead backend, or claim that merely entering details completes a booking.

## Verification

The page fragment was checked at widths **320, 390, 768, 1024, and 1440 pixels**. No horizontal page overflow or uncaught script errors occurred. Screenshots and the machine-readable check are saved as `paryatech-390.png`, `paryatech-1440.png`, and `qa.json` in the evidence directory. Empty-submit validation focused the summary and identified all three required fields. A valid test navigation was intercepted before leaving the page and contained the expected encoded name/email/agency parameters. Reduced-motion mode produced a zero-duration transition. No test booking or external form submission was made.
