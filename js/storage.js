/**
 * Storage module - Single Responsibility: persist and retrieve entries.
 * Dependency Inversion: high-level code depends on the storage interface (getEntries, saveEntries).
 */
(function (global) {
    'use strict';

    var Guestbook = global.Guestbook || {};
    var STORAGE_KEY = 'guestbook_entries';

    /**
     * Creates a storage adapter that uses localStorage.
     * @returns {{ getEntries: function(), saveEntries: function(Array) }}
     */
    function createLocalStorageAdapter() {
        return {
            getEntries: function () {
                var raw = localStorage.getItem(STORAGE_KEY);
                if (!raw) return [];
                try {
                    return JSON.parse(raw);
                } catch (e) {
                    return [];
                }
            },
            saveEntries: function (entries) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
            },
        };
    }

    Guestbook.createLocalStorageAdapter = createLocalStorageAdapter;
    global.Guestbook = Guestbook;
})(typeof window !== 'undefined' ? window : this);
