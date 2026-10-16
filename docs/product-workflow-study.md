# Product workflow study — Paryatech

Inspected 16 October 2026. Source: https://customer-module.vercel.app/#dashboard. This study informs `/workflows/` and the homepage Capture → Create → Confirm example.

## Evidence and scope

Opened the running application in Chrome, read the public HTML and JavaScript, navigated all fifteen sidebar destinations without saving records, and opened customer/query details. No customer records were created or changed; no communication was sent. Read-only screenshots and observations are saved outside the build in `output/paryatech-feedback-v8/workflows/`.

T3 browser opened the application but snapshots failed twice: “Preview automation client server-browser disconnected during snapshot.” and “Preview automation snapshot timed out after 15000ms.” Used local Chrome after those errors. The web text reader cannot access this client-rendered application.

## Observed working product surfaces

- **Home:** normal/advanced display; live enquiry, inbox, booking and task summary tiles. Advanced tables show risk, payment, query ownership, tasks, follow-ups and notes.
- **Customers:** All/B2C/B2B/Sub-Agent/Other categories; import and document vault; customer profile, primary traveller/contact, preferences, source, referral tree. Profile tabs: Overview, Travellers, Documents, Pipeline, Finance, Tasks, Communication. Customer creation collects category/group, contact, preferences and notes.
- **Queries:** six types—Trip, Flight, Accommodation, Visa, Cruise, Transport. List/kanban switching; status, priority, owner, pending-on and tier filters. Status path: Unassigned, New, Quoting, Negotiation, Won, Lost. Trip-query form includes customer, party size, rooms, assignment, priority, follow-up, value and notes.
- **Query detail:** Overview, Proposals, Travellers, Documents, Tasks and Communication. Current position exposes expected value, pending-on, follow-up, priority and owner. Build proposal and editable status controls are visible.
- **Service proposal builder:** public implementation includes vendor/service directories, rate cards, supplier relationships, availability, quote references/validity, selected service options and a Share in Communication action. It requires a current supplier quote before sharing some service options.
- **Notes:** contextual note drawer with All/Pinned/Mine; notes can relate to profile, traveller, document, query, booking or payment. Query notes preserve requirements.
- **Tasks:** personal/team/overdue/completed/follow-up views; related entities, assignment, priority and due date. Creation has status choices Backlog/Open/In Progress/Blocked/Done/Cancelled.
- **Inbox/Communication:** customer and query communication surfaces, received/sent email threads, compose-email form and templates. No message was sent during research.
- **Add booking:** customer profile dialog includes customer/title/type/currency, travel dates, traveller count, selling price/tax, initial service line or operational note, service type and estimated cost.
- **Reports:** period/comparison/date controls and business summaries. The source explicitly labels imported Packages/Booking/Vendor/Finance module records as local samples, not a live cross-application connection.
- **Settings:** organization, domains, brand kit, tiers, proposal/template/voucher/booking-document/document-type controls, communications channels, travel news, AI usage and sessions/preferences.

## Limits that affect public copy

Several sidebar hash destinations—Bookings, Vendors, All finances, Packages, Destination, News, Automations and Team—currently resolve to Customers in this specific shared prototype. Their labels and imported report samples demonstrate intended module context, not proof of functioning end-to-end routes here. Do not represent imported sample figures as live business data.

Settings → Channels says email and WhatsApp are **not connected**. It asks the workspace administrator to connect a mail service/WhatsApp before live sending. The marketing example explains this prerequisite and shows a sample communications timeline; it does not claim that the inspected prototype currently sends live WhatsApp messages. Acceptance is a recorded customer decision, not an invented automatic click-to-pay conversion.

## Continuous example contract

One family and one trip appear throughout the homepage and standalone workflow:

- Customer: **Mehta family**. Primary contact: **Rohan Mehta**.
- Destination: **Coorg**. Dates: **12–15 December 2026**, **4 days / 3 nights**.
- **6 travellers**, **3 rooms**. Query reference `PT-COORG-001`; booking reference `BK-COORG-001`. Both are illustrative references, not exported records.
- Hotel: 3 rooms × 3 nights × ₹4,000 = **₹36,000**.
- Transfers **₹12,000**; experiences **₹6,000**.
- Supplier cost **₹54,000** + agency service **₹6,000** = proposal/accepted booking **₹60,000 total** / **₹10,000 per person**.
- Preferences: rooms close together, relaxed mornings, vegetarian meals.

Eight stages: customer → trip query → notes/tasks → supplier rates → priced proposal → recorded acceptance/query won → confirmed booking/service handover → connected communication and follow-up.

Every displayed name, rate, message and reference is marked illustrative. Amounts are sample workflow arithmetic, not a bookable offer or live supplier quote. The final Coorg team feedback takes precedence over the earlier Dubai suggestion.

## Interaction and visual direction

Retains Zagma serif headings, NeueHaas utility text and #111111 / #E5E8E3 / #115553 / #ffffff. Generous editorial heading, atmospheric landscape and one journey summary establish context. Eight chronological sections expose every step without clicks or JavaScript. A sticky desktop anchor rail updates the current step using IntersectionObserver; mobile shows a compact two-column step index. Screen illustrations use only the sample family, preventing unrelated customer screenshots from confusing the narrative. Product panels gently enter on desktop; reduced motion shows settled content. Native anchors, one h1, visible focus and a no-JavaScript path remain functional.

UI/UX Pro Max was read and queried for travel SaaS workflow direction. Its generic blue/glass recommendation was rejected in favour of the user's approved typography and palette; relevant guidance retained: readable contrast, generous targets, reduced motion, progressive content and no horizontal overflow.
