// Click-to-load YouTube facade. Each .yt link becomes a real button; pressing
// it swaps in the privacy-enhanced player and moves focus to it.
(function () {
  document.querySelectorAll("a.yt[data-yt]").forEach(function (link) {
    var id = link.getAttribute("data-yt");
    var title = link.getAttribute("data-title") || "High Gear";

    var button = document.createElement("button");
    button.type = "button";
    button.className = link.className;
    button.setAttribute("style", link.getAttribute("style") || "");
    button.innerHTML = link.innerHTML;
    link.replaceWith(button);

    button.addEventListener("click", function () {
      var iframe = document.createElement("iframe");
      // autoplay=1 only starts the video the visitor just asked to play.
      iframe.src =
        "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id) + "?autoplay=1&rel=0";
      iframe.title = "High Gear performs " + title + " — YouTube video";
      iframe.loading = "lazy";
      iframe.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      button.replaceWith(iframe);
      iframe.focus();
    });
  });
})();
