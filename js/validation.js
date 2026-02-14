/**
 * Validation module - Single Responsibility: validate guestbook entry input.
 * No DOM or storage; pure validation logic.
 */
(function (global) {
    'use strict';

    var Guestbook = global.Guestbook || {};

    /**
     * Validates guestbook entry fields.
     * @param {{ name: string, learn: string }} input - Raw name and learn values
     * @returns {{ valid: boolean, message?: string }}
     */
    function validateEntry(input) {
        var name = (input.name || '').trim();
        var learn = (input.learn || '').trim();

        if (name === '' || learn === '') {
            return { valid: false, message: 'Please fill in both fields!' };
        }
        return { valid: true };
    }

    Guestbook.validateEntry = validateEntry;
    global.Guestbook = Guestbook;
})(typeof window !== 'undefined' ? window : this);
