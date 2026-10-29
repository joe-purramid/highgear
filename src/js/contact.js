// Contact form: client-side validation and fetch submission to Formspree.
// Without JS the form posts normally and the browser's own validation applies.
(function () {
  var form = document.getElementById("contact-form");
  if (!form || !window.fetch || !window.FormData) return;

  var alertBox = document.getElementById("form-alert");
  var success = document.getElementById("form-success");
  var successTitle = document.getElementById("success-title");
  var again = document.getElementById("send-another");
  var submit = form.querySelector('button[type="submit"]');
  var submitLabel = submit.textContent;
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var fields = [
    { name: "name", test: notBlank },
    { name: "email", test: function (v) { return EMAIL.test(v.trim()); } },
    { name: "subject", test: notBlank },
    { name: "message", test: notBlank },
  ].map(function (f) {
    f.input = form.elements[f.name];
    f.error = document.getElementById("err-" + f.name);
    return f;
  });

  function notBlank(v) {
    return v.trim() !== "";
  }

  function setInvalid(field, invalid) {
    field.error.hidden = !invalid;
    if (invalid) {
      field.input.setAttribute("aria-invalid", "true");
      field.input.setAttribute("aria-describedby", field.error.id);
    } else {
      field.input.removeAttribute("aria-invalid");
      field.input.removeAttribute("aria-describedby");
    }
  }

  function showAlert(text) {
    alertBox.textContent = text;
    alertBox.hidden = false;
    alertBox.focus();
  }

  function clearAlert() {
    alertBox.hidden = true;
    alertBox.textContent = "";
  }

  function setBusy(busy) {
    if (busy) {
      submit.setAttribute("aria-disabled", "true");
      submit.textContent = "Sending…";
    } else {
      submit.removeAttribute("aria-disabled");
      submit.textContent = submitLabel;
    }
  }

  function resetTurnstile() {
    if (window.turnstile && form.querySelector(".cf-turnstile")) {
      try {
        window.turnstile.reset(form.querySelector(".cf-turnstile"));
      } catch (e) {
        /* widget not rendered yet */
      }
    }
  }

  // We validate ourselves so the messages match the design.
  form.noValidate = true;

  // Once a field has been flagged, clear its error as soon as it's fixed.
  fields.forEach(function (f) {
    f.input.addEventListener("input", function () {
      if (f.input.getAttribute("aria-invalid") === "true" && f.test(f.input.value)) {
        setInvalid(f, false);
      }
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (submit.getAttribute("aria-disabled") === "true") return;

    var bad = fields.filter(function (f) {
      var invalid = !f.test(f.input.value);
      setInvalid(f, invalid);
      return invalid;
    });

    if (bad.length) {
      showAlert(
        "Please fix the " + bad.length + " highlighted field" + (bad.length === 1 ? "" : "s") + " below."
      );
      return;
    }

    clearAlert();
    setBusy(true);

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    })
      .then(function (response) {
        return response.json().then(
          function (data) { return { ok: response.ok, data: data }; },
          function () { return { ok: response.ok, data: {} }; }
        );
      })
      .then(function (result) {
        setBusy(false);
        if (result.ok) {
          form.reset();
          form.hidden = true;
          success.hidden = false;
          successTitle.focus();
          return;
        }
        var detail =
          result.data && result.data.errors && result.data.errors.length
            ? " (" + result.data.errors.map(function (e) { return String(e.message).replace(/\.$/, ""); }).join("; ") + ")"
            : "";
        resetTurnstile();
        showAlert("Sorry, your message couldn't be sent" + detail + ". Your message is still here; please try again.");
      })
      .catch(function () {
        setBusy(false);
        resetTurnstile();
        showAlert(
          "Sorry, your message couldn't be sent. Check your internet connection and try again; your message is still here."
        );
      });
  });

  again.addEventListener("click", function () {
    success.hidden = true;
    form.hidden = false;
    fields.forEach(function (f) { setInvalid(f, false); });
    clearAlert();
    resetTurnstile();
    fields[0].input.focus();
  });
})();
