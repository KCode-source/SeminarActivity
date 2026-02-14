/**
 * Renderer module - Single Responsibility: render guestbook entries to the DOM.
 * Depends on a container element (injected); does not depend on document.getElementById.
 */
(function (global) {
    'use strict';

    var Guestbook = global.Guestbook || {};

    function escapeHtml(text) {
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Renders a single entry into the given list container.
     * @param {HTMLElement} listElement
     * @param {{ name: string, learn: string }} entry
     */
    function renderEntry(listElement, entry) {
        var li = document.createElement('li');
        li.className = 'guest-entry';
        li.innerHTML =
            '<div class="guest-info">' +
            '<strong>' + escapeHtml(entry.name) + '</strong>' +
            '<span>Learned: ' + escapeHtml(entry.learn) + '</span>' +
            '</div>';
        listElement.appendChild(li);
    }

    /**
     * Renders multiple entries into the list container.
     * @param {HTMLElement} listElement
     * @param {Array<{ name: string, learn: string }>} entries
     */
    function renderEntries(listElement, entries) {
        entries.forEach(function (entry) {
            renderEntry(listElement, entry);
        });
    }

    Guestbook.renderEntry = renderEntry;
    Guestbook.renderEntries = renderEntries;
    global.Guestbook = Guestbook;
})(typeof window !== 'undefined' ? window : this);
