// Expand / collapse the case studies.
(function () {
  function setOpen(panelId, open) {
    var panel = document.getElementById(panelId);
    if (!panel) return;
    panel.hidden = !open;
    document.querySelectorAll('[data-toggle][aria-controls="' + panelId + '"]').forEach(function (btn) {
      if (btn.hasAttribute('aria-expanded')) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.querySelectorAll('[data-when]').forEach(function (label) {
        label.hidden = label.getAttribute('data-when') !== (open ? 'open' : 'closed');
      });
    });
  }

  document.querySelectorAll('[data-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('aria-controls');
      var panel = document.getElementById(id);
      var open = panel.hidden;
      setOpen(id, open);
      // Collapsing from the bottom of a long case study: bring its summary back into view.
      if (!open && btn.hasAttribute('data-collapse')) {
        var article = btn.closest('article');
        if (article) article.scrollIntoView({ block: 'start' });
        var main = article && article.querySelector('[data-toggle][aria-expanded]');
        if (main) main.focus({ preventScroll: true });
      }
    });
  });

  // A link straight to a case study (e.g. /#industrial) opens it.
  function openFromHash() {
    var id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
    var article = document.getElementById(id);
    if (!article || article.tagName !== 'ARTICLE') return;
    var btn = article.querySelector('[data-toggle][aria-expanded]');
    if (btn) setOpen(btn.getAttribute('aria-controls'), true);
  }
  openFromHash();
  window.addEventListener('hashchange', openFromHash);
})();
