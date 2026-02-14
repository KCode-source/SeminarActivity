// Select elements
const list = document.getElementById('guest-list');
const nameInput = document.getElementById('nameInput');
const learnInput = document.getElementById('learnInput');
const submitBtn = document.getElementById('submitBtn');

// Load data on startup
window.onload = function() {
    const savedData = localStorage.getItem('guestbook_entries');
    if (savedData) {
        const entries = JSON.parse(savedData);
        entries.forEach(entry => renderEntry(entry.name, entry.learn));
    }
};

// Add event listener to button if it exists
if (submitBtn) {
    submitBtn.addEventListener('click', addEntry);
}

function addEntry() {
    const name = nameInput.value.trim();
    const learn = learnInput.value.trim();

    if (name === '' || learn === '') {
        alert("Please fill in both fields!");
        return;
    }

    // 1. UI Logic
    renderEntry(name, learn);

    // 2. Data Persistence Logic
    saveToStorage(name, learn);

    // 3. Cleanup Logic
    nameInput.value = '';
    learnInput.value = '';
}

function renderEntry(name, learn) {
    const li = document.createElement('li');
    li.className = 'guest-entry';
    li.innerHTML = `
        <div class="guest-info">
            <strong>${name}</strong>
            <span>Learned: ${learn}</span>
        </div>
    `;
    list.appendChild(li);
}

function saveToStorage(name, learn) {
    let entries = [];
    const savedData = localStorage.getItem('guestbook_entries');
    if (savedData) {
        entries = JSON.parse(savedData);
    }
    entries.push({ name: name, learn: learn });
    localStorage.setItem('guestbook_entries', JSON.stringify(entries));
}
