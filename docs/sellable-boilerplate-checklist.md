# Sellable boilerplate checklist

This checklist turns “could I sell this?” into a concrete productisation plan for this repository.

## 1. Define the offer

- Decide whether you are selling a starter, a bundle, or a service-led package.
- Keep the first commercial version simple:
  a core boilerplate
  all current feature packs
  documentation
  a short support window
- Write down what the buyer gets on day one and what is not included.

## 2. Choose a licensing model

- Decide whether this remains open source, source-available, or fully commercial.
- Replace the current placeholder licence approach with the licence you actually want to enforce.
- Be explicit about:
  how many projects a buyer may use it for
  whether client work is allowed
  whether redistribution is forbidden
  whether updates are included

## 3. Harden the product

- Confirm the base install works from a clean clone.
- Confirm every `add:*` and `remove:*` script works as expected.
- Run `npm run check:boilerplate` and `npm run check:css` before every tagged release.
- Create one or more release presets so buyers can start with a sensible combination of packs.
- Remove or replace anything that still feels like internal scaffolding rather than product surface.

## 4. Tighten the CMS story

- Decide whether the supported editorial route is still Netlify CMS, Decap CMS, or a different option.
- Make the repo, admin UI, and documentation use the same naming throughout.
- Document the exact setup steps for Identity, Git Gateway, and branch workflow.
- Test the CMS flow from a buyer’s point of view, not just a developer’s point of view.

## 5. Package the buyer experience

- Add a proper “start here” guide for first install, first edit, and first deploy.
- Add screenshots or a demo site for the base boilerplate and key feature-pack combinations.
- Provide a changelog so buyers can see what changed between versions.
- Add a support policy covering response time, bug fixes, and update expectations.

## 6. Add launch operations

- Tag releases consistently.
- Version the product intentionally rather than treating the repo like a rolling starter.
- Prepare a release archive or download flow.
- Decide how you will handle refunds, support requests, and upgrade questions before the first sale.

## First files to update

These are the files I would change first before trying to sell the boilerplate.

### `README.md`

- Reposition it from a developer-oriented starter README to a buyer-facing product guide.
- Add:
  who it is for
  what is included
  supported stack versions
  support boundaries
  update policy

### `package.json`

- Rename and describe the product consistently.
- Replace the current licence field with the licence strategy you actually want.
- Start treating the version number as a product release number.

### `src/admin.njk`

- The admin entry still loads Netlify-hosted CMS assets and presents an older “Netlify CMS” story.
- This file should match whatever editorial product you decide to support and document.

### `src/admin/config.yml`

- This is part of the product surface, not just internal plumbing.
- Review:
  branch assumptions
  editorial workflow defaults
  collection naming
  missing page references
- `src/terms.md` is referenced here but is not currently present in `src/`.

### `src/docs.md`

- This page currently mirrors the README and repeats the same CMS wording.
- If you are selling the boilerplate, this public documentation page should match the commercial positioning.

### `src/_includes/partials/head.html`

- Review third-party dependencies used by default, including hosted fonts and admin redirect logic.
- Commercial buyers will expect you to justify each external dependency and document it.

### `src/_data/site.js`

- Replace personal defaults and empty placeholder values with product-safe defaults.
- Review author fields, contact details, and naming consistency before shipping paid downloads.

### `.eleventy.js`

- Treat this as the core product configuration.
- Document which features are guaranteed stable and which ones are optional.

### `features.json` and `feature-packs/*`

- Define the supported packs clearly.
- Decide whether all packs ship together or whether some become higher-priced editions.
- Make sure each pack has a clear value proposition and a documented setup path.

## Suggested release order

1. Fix licensing, naming, and the CMS narrative.
2. Add a changelog and a buyer-focused start guide.
3. Test a clean install plus every feature-pack flow.
4. Create one polished demo configuration.
5. Tag a `1.0.0` commercial release only after the buyer journey feels boringly reliable.

## Practical first version

If you wanted the safest first commercial offer, I would sell:

- the base boilerplate
- all current feature packs
- one polished demo
- documentation
- 30 days of email support

That is enough to learn what buyers actually value before creating tiers, add-ons, or bespoke services.
