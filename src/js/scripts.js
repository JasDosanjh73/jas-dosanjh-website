(() => {
const menus = document.querySelectorAll("[data-navigation-menu]");

if (menus.length === 0) {
return;
}

menus.forEach((menu) => {
const closeButton = menu.querySelector("[data-navigation-menu-close]");
const dialog = menu.querySelector("[data-navigation-menu-dialog]");
const firstLink = menu.querySelector("[data-navigation-menu-first-link]");
const toggle = menu.querySelector("[data-navigation-menu-toggle]");

if (!closeButton || !dialog || !toggle) {
return;
}

function setExpanded(isExpanded) {
toggle.setAttribute("aria-expanded", String(isExpanded));
}

function focusToggle() {
window.requestAnimationFrame(() => {
toggle.focus();
});
}

function openMenu() {
if (dialog.open) {
return;
}

if (typeof dialog.showModal === "function") {
dialog.showModal();
} else {
dialog.setAttribute("open", "");
}

setExpanded(true);
window.requestAnimationFrame(() => {
(firstLink || closeButton).focus();
});
}

function closeMenu() {
if (!dialog.open) {
return;
}

if (typeof dialog.close === "function") {
dialog.close();
} else {
dialog.removeAttribute("open");
}

setExpanded(false);
focusToggle();
}

toggle.addEventListener("click", () => {
if (dialog.open) {
closeMenu();
return;
}

openMenu();
});

closeButton.addEventListener("click", closeMenu);

dialog.addEventListener("cancel", () => {
setExpanded(false);
focusToggle();
});

dialog.addEventListener("close", () => {
setExpanded(false);
});

dialog.addEventListener("click", (event) => {
const { bottom, left, right, top } = dialog.getBoundingClientRect();
const clickedBackdrop = event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom;

if (!clickedBackdrop) {
return;
}

closeMenu();
});
});
})();

(() => {
const books = document.querySelector("#books");
const dialog = document.querySelector("#books-dialog");

if (!books || !dialog || typeof dialog.showModal !== "function") {
return;
}

const closeButton = dialog.querySelector('.btn[data-variant="c"]');
const content = dialog.querySelector(".books-dialog-content");
const body = dialog.querySelector(".books-dialog-body");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let opener;
let transition;

function positionDialog() {
const bounds = books.getBoundingClientRect();
dialog.style.top = `${bounds.top}px`;
dialog.style.left = `${bounds.left}px`;
dialog.style.width = `${bounds.width}px`;
dialog.style.height = `${bounds.height}px`;
}

function changeView(update) {
transition?.skipTransition();

if (!document.startViewTransition || reducedMotion.matches) {
update();
return;
}

document.documentElement.setAttribute("data-books-transition", "");
const current = document.startViewTransition(update);
transition = current;
current.finished.catch(() => {}).finally(() => {
if (transition === current) {
document.documentElement.removeAttribute("data-books-transition");
transition = null;
}
});
}

books.addEventListener("click", (event) => {
const link = event.target.closest("[data-book-open]");

if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
return;
}

const template = link.closest(".item-book").querySelector("[data-book-details]");

if (!template) {
return;
}

event.preventDefault();
opener = link;
changeView(() => {
content.replaceChildren(template.content.cloneNode(true));
dialog.dataset.book = template.dataset.bookDetails;
positionDialog();
dialog.showModal();
body.scrollTop = 0;
closeButton.focus({ preventScroll: true });
});
});

function closeDialog() {
if (!dialog.open) {
return;
}

changeView(() => {
dialog.close();
opener?.focus({ preventScroll: true });
});
}

closeButton.addEventListener("click", closeDialog);
dialog.addEventListener("cancel", (event) => {
event.preventDefault();
closeDialog();
});

function updatePosition() {
if (dialog.open) {
positionDialog();
}
}

window.addEventListener("resize", updatePosition);
window.addEventListener("scroll", updatePosition, { passive: true });
new ResizeObserver(updatePosition).observe(books);
})();

(() => {
const banner = document.querySelector(".books-banner");

if (!banner) {
return;
}

const scroller = banner.querySelector(".books-banner-scroll");
const controls = banner.querySelector(".books-banner-controls");
const backward = controls.querySelector('[data-direction="backward"]');
const forward = controls.querySelector('[data-direction="forward"]');

function updateBannerControls() {
const maxScroll = scroller.scrollWidth - scroller.clientWidth;
controls.hidden = maxScroll <= 1;
backward.disabled = scroller.scrollLeft <= 1;
forward.disabled = scroller.scrollLeft >= maxScroll - 1;
}

controls.addEventListener("click", (event) => {
const button = event.target.closest(".books-banner-button");

if (!button) {
return;
}

const direction = button.dataset.direction === "forward" ? 1 : -1;
scroller.scrollBy({ left: direction * scroller.clientWidth * 0.5 });
});

scroller.addEventListener("scroll", updateBannerControls, { passive: true });
const scrollObserver = new ResizeObserver(updateBannerControls);
scrollObserver.observe(scroller);
scrollObserver.observe(scroller.querySelector("ul"));
scroller.querySelectorAll("img").forEach((image) => {
image.addEventListener("load", updateBannerControls);
});
updateBannerControls();

function positionBannerDialog(dialog) {
const bounds = banner.getBoundingClientRect();
dialog.style.top = `${bounds.top}px`;
dialog.style.left = `${bounds.left}px`;
dialog.style.width = `${bounds.width}px`;
dialog.style.height = `${bounds.height}px`;
}

function updateBannerDialog() {
const dialog = banner.querySelector(".books-banner-dialog[open]");

if (dialog) {
positionBannerDialog(dialog);
}
}

window.addEventListener("resize", updateBannerDialog);
window.addEventListener("scroll", updateBannerDialog, { passive: true });
new ResizeObserver(updateBannerDialog).observe(banner);

banner.addEventListener("click", (event) => {
const link = event.target.closest("[data-books-banner-open]");

if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
return;
}

const dialog = document.getElementById(link.dataset.booksBannerOpen);

if (!dialog || typeof dialog.showModal !== "function") {
return;
}

event.preventDefault();
positionBannerDialog(dialog);
dialog.showModal();
dialog.scrollTop = 0;
dialog.addEventListener("close", () => link.focus({ preventScroll: true }), { once: true });
});
})();
