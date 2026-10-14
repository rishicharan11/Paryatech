# Paryatech — Waabi-inspired website

A complete responsive marketing site for Paryatech, using the supplied `design.md` as its visual and motion direction.

The requested palette is `#111111`, `#E5E8E3`, `#115553`, and `#FFFFFF`. Typography uses the Zagma and Neue Haas reference faces; brand artwork and product previews come from the workspace. Pexels footage and photography are downloaded locally, with full creator/source credits in `dist/media-sources.json` and the on-page credits dialog.

## Run locally

From this directory:

```sh
python3 -m http.server 4179 --bind 127.0.0.1 --directory dist
```

Open `http://localhost:4179`. No package installation or build step is required.

## Source

- `dist/index.html`: complete page, semantic sections and native dialogs.
- `dist/styles.css`: primary visual system, responsive layouts and motion preferences.
- `dist/script.js`: navigation, scroll transforms, workflow tabs, video controls and dialogs.
- `dist/sections.html`: editable lower-section fragment, already included in `index.html`.
- `dist/sections.css` / `dist/sections.js`: lower-section styling, FAQ and carousel.
- `dist/assets`: local fonts, Pexels media, product previews and Paryatech artwork.
- `.openai/hosting.json`: private Sites project and static deployment directory.

When changing `sections.html`, replace its matching lower-section block in `index.html` before deployment. The served page is `index.html`.

## Verified behavior

Desktop and mobile navigation, Escape close, workflow tabs with keyboard navigation, five-second mobile workflow progression, interactive feature descriptions, demo calendar handoff, horizontal carousel, FAQ accordion, background-film play/pause, responsive layouts at 320–1440px, and reduced-motion readability were checked in Chrome.

The demo action opens Paryatech's verified calendar at `https://cal.com/paryatech-hq/demo`. Login and email use the current site's real destinations. There is no simulated form submission or fabricated customer proof. Product previews use illustrative data; editorial destination examples are labeled as illustrative workflows.

Evidence and research are retained in the workspace's `output/paryatech-waabi/` directory. The existing `www.paryatech.in` website was used as the content source; its hosting and domain are unchanged.
