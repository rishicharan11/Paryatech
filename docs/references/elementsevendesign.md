# Element seven — Cluely pricing reference

Reference: [Cluely pricing](https://cluely.com/pricing). Inspected 16 October 2026, desktop 1440 × 1000 and mobile 390 × 844. This is a reference study and an implementation contract for Paryatech, rather than a new visual identity.

## What the page is doing

Cluely presents a low-friction entry to its meeting assistant, then lets the visitor compare subscriptions. Its sequence moves from an oversized centered headline and a short explanation into platform and billing controls, subscription cards, a feature comparison table, another conversion moment, and a broad link footer. The page makes a state change in billing feel continuous: prices do not abruptly replace one string with another.

The product-specific claims and dollar amounts on Cluely belong to Cluely. They are not copied into Paryatech. In particular, its free tier, discounts, unlimited usage claims, platform download actions, and undetectability features have no bearing on Paryatech’s subscription terms.

## Element inventory

| Area | Elements and purpose | Observed behavior |
| --- | --- | --- |
| Navigation | Brand link, product navigation, download action, compact menu | Shared site navigation and responsive disclosure |
| Hero | Large centered title, small illustration embedded in title, supporting paragraph | Restrained entrance and generous whitespace keep attention on the controls below |
| Platform selector | Desktop/Mobile segmented control | Moving rounded selection highlight; source uses a spring with stiffness 500 and damping 35 |
| Billing selector | Monthly and annual labels plus a compact switch | One shared billing state feeds plan cards and comparison prices |
| Plan cards | Tier name, description, large amount, billing suffix, CTA, feature list | Featured plan has a quiet tinted panel/border rather than a loud badge wall |
| Price | Currency prefix, digits, separators, period suffix | Independent numeric glyphs roll vertically inside clipped masks |
| Comparison | Row labels and aligned plan columns | Plan headings remain sticky while scanning feature rows on larger displays |
| Closing conversion | Short proposition, download or contact path | A clear next step follows the comparison |
| Footer | Product, resource, comparison and support link groups | Small utility typography; no competing hero treatment |

## Price motion: verified implementation details

The captured pricing source contains a React number component wrapping `G.Ay`, imported from module `16604`. The rendered DOM exposes four `number-flow-react` elements, covering both the plan cards and the comparison headers. The source passes numeric `value`, locale, currency formatting options, `prefix`, `suffix`, and an `animated` property. It styles the `number`, `left`, and `suffix` parts independently. These are verified observations in the local source, not an inference from a screenshot.

This explains why the digits feel connected across a billing switch: the amount is maintained as a number, formatted into positional glyphs, and animated inside a number mask. It is not a text crossfade, a count-up from zero, or a looping carousel. Group separators, currency and period typography remain visually anchored while the changed numeric positions travel.

Cluely’s pricing wrapper does **not** specify an explicit number transform duration in the captured page module; the number component supplies its own defaults. A separately captured discount label uses a 0.2-second entrance/exit with x from -10 to 0, opacity 0 to 1, and blur 2px to 0. Avoid presenting those discount timings as the price component’s timings.

## State choreography

1. The visitor chooses a billing period.
2. The shared billing state updates the selected control and computes plan amounts.
3. Numeric slots roll toward the newly formatted value, with the old value remaining visible during the transition.
4. Currency and period labels maintain hierarchy and baseline.
5. Plan CTAs continue to represent the selected choice.
6. Repeated changes transition from the current state without queuing stale animations.

On mobile, the controls remain touch operable and the pricing area favors vertical reading. Larger comparison content is handled separately from the primary purchase decision.

## Paryatech adaptation

Paryatech keeps Zagma for expressive headings, NeueHaas for labels and amounts, and the approved palette: `#111111`, `#E5E8E3`, `#115553`, and `#ffffff`. The amount is large, the hierarchy is calm, and one broad teal panel combines the selected period with a concise description of the connected travel workspace.

There are three actual choices supplied by the owner:

| Subscription | Total price | Duration |
| --- | --- | --- |
| Quarterly | ₹20,000 | 3 months |
| Half-yearly | ₹30,000 | 6 months |
| Yearly | ₹50,000 | 12 months |

The price is always described as a **total for the selected period**. The interface does not infer monthly pricing, savings percentages, taxes, seat counts, a free trial, a refund guarantee, or different feature entitlements. The visible overview repeats all three exact totals so visitors can compare them without needing to operate an animation.

A three-position rounded selector replaces Cluely’s two-period switch. Its background track moves over 550ms with `cubic-bezier(.22,1,.36,1)`. The number is formatted with `en-IN`; numeric slots clip vertically. Changed digits animate over 680ms plus a small positional delay of 30ms per slot. Increasing amounts roll up, decreasing amounts roll down. Commas and unchanged digits stay still. These values are Paryatech’s implementation choices, inspired by the verified reference behavior; they are not claimed as Cluely’s original timing constants.

Each widget owns its state. The dedicated pricing page and landing page may both use the same controller without sharing accidental global state. Clicking a period, using left/right arrows, or pressing Home/End updates the same state. The selected CTA links to `/book-a-demo/?plan=quarterly`, `/book-a-demo/?plan=half-yearly`, or `/book-a-demo/?plan=yearly`.

## Accessibility and failure behavior

- Every amount has one polite screen-reader announcement containing period, currency, total, and duration. Decorative rolling digits are hidden from accessibility APIs.
- Controls are real buttons with `aria-pressed`, visible focus, 44px-plus hit areas, and direct tap support.
- Reduced-motion preference removes rolling and track interpolation while preserving the final value.
- New selections cancel stale animations. No interval or continuous numeric loop is used.
- The static HTML begins with Quarterly and contains the three-price overview on the full page, so the commercial information survives script failure.
- The CTA books a conversation. No payment submission or purchase confirmation is simulated.

## Implementation and evidence

- Pricing page main fragment: `paryatech-waabi/src/pages/pricing.html`
- Landing pricing fragment: `paryatech-waabi/dist/pricing-section.html`
- Shared styling/controller: `paryatech-waabi/dist/pricing.css` and `pricing.js`
- Captured reference source: `output/pricing-careers/cluely-source.html`, `cluely-pricing.js`, `cluely-rendered.html`
- Reference captures: `cluely-desktop.png`, `cluely-amount-transition.png`, `cluely-annual.png`, `cluely-mobile.png` in `output/pricing-careers/`
- Local implementation captures and behavior results: `pricing-implementation-{320,390,768,1440}.png` and `implementation-qa.json` in that same folder

Source and reference captures are for analysis. Paryatech ships its own code, approved fonts, content, and colors.
