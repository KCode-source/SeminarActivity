/**
 * Guestbook app - High-level orchestration only (Dependency Inversion).
 * Depends on Guestbook.validateEntry, Guestbook.renderEntry, Guestbook.renderEntries.
 * Single Responsibility: coordinate the "add entry" and "load entries" use cases.
 */
(function (global) {
    'use strict';

    var Guestbook = global.Guestbook || {};
    var validateEntry = Guestbook.validateEntry;
    var renderEntry = Guestbook.renderEntry;
    var renderEntries = Guestbook.renderEntries;

    /**
     * Initializes the guestbook app with injected dependencies.
     * @param {{ storage: { getEntries: function(), saveEntries: function(Array) }, listContainer: HTMLElement, notifier: function(string), getFormElements: function() }} deps
     */
    function initGuestbookApp(deps) {
        var storage = deps.storage;
        var listContainer = deps.listContainer;
        var notifier = deps.notifier;
        var getFormElements = deps.getFormElements;

        function loadExistingEntries() {
            var entries = storage.getEntries();
            renderEntries(listContainer, entries);
        }

        function addEntry() {
            var form = getFormElements();
            var name = form.nameInput.value.trim();
            var learn = form.learnInput.value.trim();

            var result = validateEntry({ name: name, learn: learn });
            if (!result.valid) {
                notifier(result.message || 'Please fill in both fields!');
                return;
            }

            var entry = { name: name, learn: learn };
            renderEntry(listContainer, entry);
            storage.saveEntries(storage.getEntries().concat(entry));

            form.nameInput.value = '';
            form.learnInput.value = '';
        }

        function bindSubmit() {
            var submitButton = getFormElements().submitButton;
            if (submitButton) {
                submitButton.addEventListener('click', addEntry);
            }
        }

        loadExistingEntries();
        bindSubmit();
    }

    Guestbook.initGuestbookApp = initGuestbookApp;
    global.Guestbook = Guestbook;
})(typeof window !== 'undefined' ? window : this);
