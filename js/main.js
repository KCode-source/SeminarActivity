/**
 * Composition root - wires concrete implementations and boots the app.
 */
(function (global) {
    'use strict';

    var Guestbook = global.Guestbook || {};
    var createLocalStorageAdapter = Guestbook.createLocalStorageAdapter;
    var initGuestbookApp = Guestbook.initGuestbookApp;

    function runWhenDOMReady(fn) {
        if (document.readyState === 'loading') {
            window.addEventListener('DOMContentLoaded', fn);
        } else {
            fn();
        }
    }

    runWhenDOMReady(function () {
        var list = document.getElementById('guest-list');
        var nameInput = document.getElementById('nameInput');
        var learnInput = document.getElementById('learnInput');
        var submitBtn = document.getElementById('submitBtn');

        if (!list || !nameInput || !learnInput) return;

        var storage = createLocalStorageAdapter();
        initGuestbookApp({
            storage: storage,
            listContainer: list,
            notifier: function (message) {
                alert(message);
            },
            getFormElements: function () {
                return {
                    nameInput: nameInput,
                    learnInput: learnInput,
                    submitButton: submitBtn,
                };
            },
        });
    });
})(typeof window !== 'undefined' ? window : this);
