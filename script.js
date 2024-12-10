document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const charCountContainer = document.getElementById('char-count-container');
    const charCount = document.getElementById('char-count');
    const wordCountContainer = document.getElementById('word-count-container');
    const wordCount = document.getElementById('word-count');
    const sentenceCountContainer = document.getElementById('sentence-count-container');
    const sentenceCount = document.getElementById('sentence-count');
    const paragraphCountContainer = document.getElementById('paragraph-count-container');
    const paragraphCount = document.getElementById('paragraph-count');
    const wordDensity = document.getElementById('word-density');
    const wordList = document.getElementById('word-list');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const settingsIcon = document.getElementById('settings-icon');
    const settingsPanel = document.getElementById('settings-panel');
    const doneButton = document.getElementById('done-button');
    const checkboxes = {
        charCount: document.getElementById('toggle-characters'),
        wordCount: document.getElementById('toggle-words'),
        sentenceCount: document.getElementById('toggle-sentences'),
        paragraphCount: document.getElementById('toggle-paragraphs'),
        wordDensity: document.getElementById('toggle-word-density')
    };
    let isDarkMode = localStorage.getItem('darkMode') === 'true';

    // Load initial content
    textInput.value = localStorage.getItem('content') || '';

    // Load initial dark mode
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }

    // Load initial settings from local storage
    Object.keys(checkboxes).forEach(key => {
        checkboxes[key].checked = localStorage.getItem(`show${key.charAt(0).toUpperCase() + key.slice(1)}`) === 'true';
    });

    // Function to update counts and visibility
    const updateCounts = () => {
        const text = textInput.value;
        // Improved regex to handle multiple languages
        const words = text.match(/[\p{L}\p{M}]+/gu) || []; // Matches Unicode letters and marks
        const sentences = text.match(/[^.!?।]*[.!?।]/g) || []; // Updated regex to include Hindi punctuation
        const paragraphs = text.split(/\n+/).filter(p => p.trim() !== '');

        // Update visibility and content based on checkboxes
        charCountContainer.style.display = checkboxes.charCount.checked ? 'block' : 'none';
        charCount.textContent = text.length;
        
        wordCountContainer.style.display = checkboxes.wordCount.checked ? 'block' : 'none';
        wordCount.textContent = words.length;
        
        sentenceCountContainer.style.display = checkboxes.sentenceCount.checked ? 'block' : 'none';
        sentenceCount.textContent = sentences.length;
        
        paragraphCountContainer.style.display = checkboxes.paragraphCount.checked ? 'block' : 'none';
        paragraphCount.textContent = paragraphs.length;

        // Update word density
        if (checkboxes.wordDensity.checked) {
            wordDensity.style.display = 'block';
            const wordFrequency = {};
            words.forEach(word => {
                word = word.toLowerCase();
                wordFrequency[word] = (wordFrequency[word] || 0) + 1;
            });
            wordList.innerHTML = '';
            Object.keys(wordFrequency).sort((a, b) => wordFrequency[b] - wordFrequency[a]).forEach(word => {
                const li = document.createElement('li');
                li.textContent = `${word}: ${wordFrequency[word]}`;
                wordList.appendChild(li);
            });
        } else {
            wordDensity.style.display = 'none';
            wordList.innerHTML = ''; // Clear the word density list when hidden
        }

        // Save content to local storage
        localStorage.setItem('content', text);
    };

    // Save settings to local storage when a checkbox is changed
    Object.keys(checkboxes).forEach(key => {
        checkboxes[key].addEventListener('change', () => {
            localStorage.setItem(`show${key.charAt(0).toUpperCase() + key.slice(1)}`, checkboxes[key].checked);
            updateCounts();
        });
    });

    // Add event listeners
    textInput.addEventListener('input', updateCounts);

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        isDarkMode = !isDarkMode;
        localStorage.setItem('darkMode', isDarkMode);
    });

    settingsIcon.addEventListener('click', (event) => {
        event.stopPropagation(); // Stop the event from propagating
        settingsPanel.style.display = (settingsPanel.style.display === 'block') ? 'none' : 'block';
    });    

    doneButton.addEventListener('click', () => {
        settingsPanel.style.display = 'none';
    });

    // Hide settings panel when clicking outside
    document.addEventListener('click', (event) => {
        if (!settingsPanel.contains(event.target) && !settingsIcon.contains(event.target) && settingsPanel.style.display === 'block') {
            settingsPanel.style.display = 'none';
        }
    });

    // Prevent the click event from bubbling up to document when clicking inside settings panel
    settingsPanel.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    // Initial count update
    updateCounts();
});
