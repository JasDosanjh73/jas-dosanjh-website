# HTML and CSS style guide

## Purpose

This guide captures preferred markup, naming, accessibility, and copy patterns for HTML and CSS work in this project.

## Naming

- Avoid BEM-style naming conventions.
- Prefer naming that reflects a named parent element.
- Use names that stay readable without long chains or extra punctuation.

Do this:

```html
<div class="banner">
<div class="banner-logo"></div>
</div>
```

Not this:

```html
<div class="banner">
<div class="banner__logo"></div>
</div>
```

## Parent-based patterns

- Form fields should reflect the form they belong to.
- Related items should reflect the collection or section they belong to.

Example:

```html
<form class="contact-form">
<input type="text" name="contact-name" id="contact-name">
<input type="email" name="contact-email" id="contact-email">
</form>
```

Example:

```html
<form class="enquiry-form">
<input type="text" name="enquiry-name" id="enquiry-name">
<input type="email" name="enquiry-email" id="enquiry-email">
</form>
```

Example:

```html
<div class="banner">
<div class="banner-logo"></div>
</div>
```

Example:

```html
<div class="items-posts">
<article class="item-post"></article>
</div>
```

Example:

```html
<div class="items-products">
<article class="item-product"></article>
</div>
```

## Landmarks and roles

- Prefer native HTML elements before adding ARIA roles.
- Use explicit landmark roles only where needed.
- In this project, that usually means `role="banner"` and `role="contentinfo"`.

Example:

```html
<header role="banner">
...
</header>

<footer role="contentinfo">
...
</footer>
```

## Buttons

- Do not add `type="button"` unless a button must avoid submitting a form.
- Do not add button types by habit. Add them only when the button behaviour needs to be explicit.

## Copy

- Use curly quotes in visible copy.
- Use these quotation marks:

```text
“ ”
‘ ’
```

- Do not use curly quotes in class names, IDs, attribute values, or code identifiers.
