// Narrow-screen menu toggle. Without JS the full menu is always shown (see
// site.css), so this only adds the button behaviour on top.
(function () {
  var button = document.querySelector(".menu-toggle");
  var nav = document.getElementById("site-nav");
  if (!button || !nav) return;

  var label = button.querySelector(".menu-toggle__label");
  var wide = window.matchMedia("(min-width: 64em)");

  function setOpen(open) {
    button.setAttribute("aria-expanded", String(open));
    label.textContent = open ? "Close" : "Menu";
    nav.classList.toggle("is-open", open);
  }

  button.hidden = false;
  setOpen(false);

  button.addEventListener("click", function () {
    setOpen(button.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape" || button.getAttribute("aria-expanded") !== "true") return;
    setOpen(false);
    button.focus();
  });

  // Reset when the window widens past the breakpoint.
  wide.addEventListener("change", function (event) {
    if (event.matches) setOpen(false);
  });

  // Keep the footer year current even if the site isn't rebuilt in January.
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
