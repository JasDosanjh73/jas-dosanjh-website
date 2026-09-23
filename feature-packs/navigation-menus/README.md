# Navigation menus pack

Adds a menu-button based primary navigation pattern to the boilerplate header.

## Included

- `src/_data/navigation_menu.json`
- `src/_includes/partials/navigation-menu.html`
- `src/css/navigation-menus.css`

## Variants

Set `variant` in `src/_data/navigation_menu.json` to one of:

- `"overlay-small"` for a compact overlay panel
- `"overlay-large"` for a wider full-width overlay
- `"slide"` for a right-side slide-in panel

The pack reuses `src/_data/navigation.json` for the primary links.
Secondary links, featured links, and the menu call to action live in `src/_data/navigation_menu.json`.
