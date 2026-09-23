# Timeline feature pack

Provides a `/timeline/` page, Markdown entries in `src/timeline/`, a reusable `partials/timeline.html` include, and `src/css/timeline.css`.
The layout adapts Lockrose’s career timeline: horizontal scrolling on small screens and an alternating vertical timeline at `64em` and above.
It uses the boilerplate’s colour tokens and a CSS centre line, with no image or JavaScript dependency. Child classes use the boilerplate’s parent-based naming convention.
Scroll areas support keyboard focus, content can grow without a fixed item height, and reduced-motion preferences disable scroll snapping.

## Installation

```bash
npm run add:timeline
```

The pack is disabled by default. Installing it enables `features.timeline`, copies the starter files, adds main and footer navigation links through the manifest, and merges the page and timeline collection into the CMS.
Remove it with `npm run remove:timeline`.

## Content

Each Markdown file in `src/timeline/` includes:

```yaml
---
title: "First chapter"
order: 10
visible: true
careerTimeline:
  - period: ""
    title: ""
    image: "placeholder-avatar-1.webp"
    imageAlt: ""
    summary: |
      Add a description here. Markdown is supported.
---
```

The top-level `title` identifies the file in the CMS; the nested `title` is displayed in the timeline.
Only files with the top-level Boolean `visible: true` contribute milestones to the shared timeline collection. Files with `visible: false` or a missing visibility field are hidden. The CMS defaults this field to `true`.
Use one milestone per file, or put several related milestones in the same `careerTimeline` array.
The `timelineItems` collection sorts files by ascending `order` (default `0`), then filename, and combines their arrays in the order written.
Periods are display text, so date ranges and labels such as “present” are supported without date parsing.
Entries are data-only and do not generate individual pages.
Images are optional. Use a filename relative to `src/images/`, a root-relative path such as `/images/timeline/milestone.webp`, or a full HTTP(S) URL. Local paths use `site.assetPath`.
Images link to their original files and display at a maximum width of `180px`. On desktop, figures alternate between logical start and end alignment.
Use `imageAlt` for an image description, or an empty string for a decorative image. When omitted, it defaults to the milestone title. The CMS includes both image fields.

## Reusing the partial

```njk
{% include "partials/timeline.html" %}
```

By default, the partial renders `collections.timelineItems` beneath a “Career timeline” heading.
Set `timelineHeading` to change that heading. A page’s own `careerTimeline` array takes precedence, so the same include can render a member’s career history using Lockrose’s frontmatter structure.
The partial only renders entries with Boolean `visible: true`. Collection entries inherit this value from their Markdown file; entries in a page’s own `careerTimeline` array must each include `visible: true`.
An explicitly empty array suppresses the timeline. The partial renders nothing when the feature is disabled or no visible entries are available.

The partial contains an `h2` heading and `h3` period headings; include it beneath the page’s `h1`.
