/* شاليهنا — صفحة الصيانة */
(function () {
  "use strict";

  /* أرقام التواصل — عدّل هنا فقط لو تغيّرت الأرقام */
  var PHONES = ["94718888", "94728888", "94738888"];

  var COUNTRY_CODE = "965";

  var ICON_PHONE =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92z"/>' +
    "</svg>";

  var ICON_WHATSAPP =
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
    '<path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.09-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.74 2.65 4.21 3.72.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z"/>' +
    "</svg>";

  /* الرقم كما يظهر: 9471 8888 */
  function formatNumber(digits) {
    return digits.slice(0, 4) + " " + digits.slice(4);
  }

  function buildContactCards() {
    var grid = document.getElementById("contact-grid");
    if (!grid) return;

    PHONES.forEach(function (digits) {
      var intl = COUNTRY_CODE + digits;

      var card = document.createElement("div");
      card.className = "contact-card";
      card.innerHTML =
        '<p class="contact-number" dir="ltr">' + formatNumber(digits) + "</p>" +
        '<div class="contact-actions">' +
        '<a class="btn btn-call" href="tel:+' + intl + '">' + ICON_PHONE + "اتصال</a>" +
        '<a class="btn btn-wa" href="https://wa.me/' + intl + '" target="_blank" rel="noreferrer">' +
        ICON_WHATSAPP + "واتساب</a>" +
        "</div>";

      grid.appendChild(card);
    });
  }

  /* ظهور تدريجي للأقسام عند التمرير */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  function setYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  document.addEventListener("DOMContentLoaded", function () {
    buildContactCards();
    initReveal();
    setYear();
  });
})();
