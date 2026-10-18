document.addEventListener('DOMContentLoaded', () => {
    /* ---------- element refs ---------- */
    const textInput = document.getElementById('text-input');
    const analyticsPanel = document.getElementById('analytics');

    const charCountContainer = document.getElementById('char-count-container');
    const charCount = document.getElementById('char-count');
    const wordCountContainer = document.getElementById('word-count-container');
    const wordCount = document.getElementById('word-count');
    const sentenceCountContainer = document.getElementById('sentence-count-container');
    const sentenceCount = document.getElementById('sentence-count');
    const paragraphCountContainer = document.getElementById('paragraph-count-container');
    const paragraphCount = document.getElementById('paragraph-count');

    const statsSecondary = document.getElementById('stats-secondary');
    const noSpaceCount = document.getElementById('no-space-count');
    const readingTimeEl = document.getElementById('reading-time');
    const speakingTimeEl = document.getElementById('speaking-time');
    const avgWordLengthEl = document.getElementById('avg-word-length');
    const longestWordEl = document.getElementById('longest-word');
    const uniqueWordCountEl = document.getElementById('unique-word-count');
    const readingLevelEl = document.getElementById('reading-level');

    const wordDensity = document.getElementById('word-density');
    const wordList = document.getElementById('word-list');
    const wordDensityEmpty = document.getElementById('word-density-empty');
    const uniqueWordBadge = document.getElementById('unique-word-badge');

    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const focusModeToggle = document.getElementById('focus-mode-toggle');
    const settingsIcon = document.getElementById('settings-icon');
    const settingsPanel = document.getElementById('settings-panel');
    const doneButton = document.getElementById('done-button');
    const themePicker = document.getElementById('theme-picker');
    const resetSettingsBtn = document.getElementById('reset-settings');
    const scrim = document.getElementById('scrim');

    const fontSizeSlider = document.getElementById('font-size-slider');
    const fontSizeValue = document.getElementById('font-size-value');
    const lineHeightToggle = document.getElementById('toggle-line-height');
    const editorFontDropdown = document.getElementById('editor-font-dropdown');
    const editorFontDropdownLabel = document.getElementById('editor-font-dropdown-label');
    const editorFontDropdownMenu = document.getElementById('editor-font-dropdown-menu');

    const documentTitleInput = document.getElementById('document-title');
    const undoBtn = document.getElementById('undo-btn');
    const redoBtn = document.getElementById('redo-btn');

    const caseDropdown = document.getElementById('case-dropdown');
    const caseDropdownMenu = document.getElementById('case-dropdown-menu');

    const findReplaceBtn = document.getElementById('find-replace-btn');
    const findReplaceBar = document.getElementById('find-replace-bar');
    const findReplaceClose = document.getElementById('find-replace-close');
    const findInput = document.getElementById('find-input');
    const replaceInput = document.getElementById('replace-input');
    const matchCountEl = document.getElementById('match-count');
    const replaceOneBtn = document.getElementById('replace-one-btn');
    const replaceAllBtn = document.getElementById('replace-all-btn');

    const saveBtn = document.getElementById('save-btn');
    const copyBtn = document.getElementById('copy-btn');
    const uploadBtn = document.getElementById('upload-btn');
    const fileInput = document.getElementById('file-input');
    const clearBtn = document.getElementById('clear-btn');

    const exportDropdown = document.getElementById('export-dropdown');
    const exportDropdownMenu = document.getElementById('export-dropdown-menu');

    const limitDropdown = document.getElementById('limit-dropdown');
    const limitDropdownLabel = document.getElementById('limit-dropdown-label');
    const limitDropdownMenu = document.getElementById('limit-dropdown-menu');
    const customGoalsList = document.getElementById('custom-goals-list');
    const customGoalsDivider = document.getElementById('custom-goals-divider');
    const customGoalNameInput = document.getElementById('custom-goal-name');
    const customGoalLimitInput = document.getElementById('custom-goal-limit');
    const customGoalAddBtn = document.getElementById('custom-goal-add');
    const limitRingWrap = document.getElementById('limit-ring-wrap');
    const limitFill = document.getElementById('limit-fill');
    const limitRemaining = document.getElementById('limit-remaining');
    const lastSaved = document.getElementById('last-saved');
    const lastSavedLabel = document.getElementById('last-saved-label');

    const saveStatusModal = document.getElementById('save-status-modal');
    const saveStatusClose = document.getElementById('save-status-close');
    const saveStatusRow = document.getElementById('save-status-row');
    const saveStatusIcon = document.getElementById('save-status-icon');
    const saveStatusTitle = document.getElementById('save-status-title');
    const saveStatusDesc = document.getElementById('save-status-desc');
    const saveStatusSaveNow = document.getElementById('save-status-save-now');
    const driveStatusText = document.getElementById('drive-status-text');
    const connectDriveBtn = document.getElementById('connect-drive-btn');
    const disconnectDriveBtn = document.getElementById('disconnect-drive-btn');
    const driveFolderRow = document.getElementById('drive-folder-row');
    const driveFolderInput = document.getElementById('drive-folder-input');

    const toastContainer = document.getElementById('toast-container');
    const contextMenu = document.getElementById('context-menu');

    const commandPaletteBtn = document.getElementById('command-palette-btn');
    const commandPalette = document.getElementById('command-palette');
    const commandPaletteInput = document.getElementById('command-palette-input');
    const commandPaletteList = document.getElementById('command-palette-list');

    const documentsBtn = document.getElementById('documents-btn');
    const documentsPanel = document.getElementById('documents-panel');
    const documentsClose = document.getElementById('documents-close');
    const newDocumentBtn = document.getElementById('new-document-btn');
    const saveAsInput = document.getElementById('save-as-input');
    const saveAsBtn = document.getElementById('save-as-btn');
    const documentsList = document.getElementById('documents-list');
    const documentsEmpty = document.getElementById('documents-empty');

    const checkboxes = {
        charCount: document.getElementById('toggle-characters'),
        wordCount: document.getElementById('toggle-words'),
        sentenceCount: document.getElementById('toggle-sentences'),
        paragraphCount: document.getElementById('toggle-paragraphs'),
        secondary: document.getElementById('toggle-secondary'),
        wordDensity: document.getElementById('toggle-word-density')
    };

    const autosaveToggle = document.getElementById('toggle-autosave');

    const containers = {
        charCount: charCountContainer,
        wordCount: wordCountContainer,
        sentenceCount: sentenceCountContainer,
        paragraphCount: paragraphCountContainer,
        secondary: statsSecondary,
        wordDensity: wordDensity
    };

    /* ---------- toasts ---------- */
    const TOAST_ICONS = {
        success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg>',
        error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M6 6l12 12M18 6 6 18"/></svg>',
        info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M12 8v.01M12 11v5"/></svg>'
    };

    function showToast(type, message, duration = 2800) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        const icon = document.createElement('span');
        icon.className = 'toast-icon';
        icon.innerHTML = TOAST_ICONS[type] || TOAST_ICONS.info;
        const text = document.createElement('span');
        text.textContent = message;
        toast.append(icon, text);
        toastContainer.appendChild(toast);
        const timer = setTimeout(() => dismissToast(toast), duration);
        toast.addEventListener('click', () => { clearTimeout(timer); dismissToast(toast); });
    }

    function dismissToast(toast) {
        if (!toast.isConnected) return;
        toast.classList.add('leaving');
        toast.addEventListener('animationend', () => toast.remove(), { once: true });
    }

    /* ---------- rich text editor core helpers ---------- */
    try { document.execCommand('defaultParagraphSeparator', false, 'p'); } catch { /* unsupported in some browsers; harmless */ }

    function updateEmptyState() {
        const empty = textInput.innerHTML === '' || textInput.innerHTML === '<br>';
        textInput.classList.toggle('is-empty', empty);
    }

    /* ---------- resume where you left off (scroll + cursor position) ---------- */
    function persistScroll(el, key) {
        localStorage.setItem(key, el.scrollTop);
    }

    function restoreScroll(el, key) {
        const saved = Number(localStorage.getItem(key));
        if (saved) el.scrollTop = saved;
    }

    // Character offset of the cursor, measured as plain text from the very
    // start of the editor — robust to the DOM being torn down and rebuilt
    // (e.g. on reload) since it doesn't depend on specific node references.
    function getCursorOffset() {
        const selection = window.getSelection();
        if (!selection.rangeCount) return null;
        const focusNode = selection.focusNode;
        if (!focusNode || !textInput.contains(focusNode)) return null;
        const range = document.createRange();
        range.setStart(textInput, 0);
        range.setEnd(focusNode, selection.focusOffset);
        return range.toString().length;
    }

    function setCursorOffset(offset) {
        if (offset == null) return false;
        const walker = document.createTreeWalker(textInput, NodeFilter.SHOW_TEXT);
        let node;
        let remaining = offset;
        while ((node = walker.nextNode())) {
            if (remaining <= node.nodeValue.length) {
                const range = document.createRange();
                range.setStart(node, remaining);
                range.collapse(true);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                return true;
            }
            remaining -= node.nodeValue.length;
        }
        return false;
    }

    let cursorSaveTimer;
    function scheduleCursorSave() {
        clearTimeout(cursorSaveTimer);
        cursorSaveTimer = setTimeout(() => {
            const offset = getCursorOffset();
            if (offset != null) localStorage.setItem('cursorOffset', offset);
        }, 300);
    }

    // innerText reflects visual line/block breaks the way a textarea's .value
    // used to (textContent does not); fall back to textContent in the rare
    // case innerText isn't available (e.g. the element has no layout yet).
    function getPlainText(el) {
        return el.innerText !== undefined && el.innerText !== null ? el.innerText : el.textContent;
    }

    function htmlToPlainText(html) {
        const el = document.createElement('div');
        el.innerHTML = html;
        return el.textContent || '';
    }

    function plainTextToEditableHtml(value) {
        if (!value) return '';
        if (/<[a-z][\s\S]*>/i.test(value)) return value;
        return value.split(/\n{2,}/)
            .map(para => `<p>${escapeHtml(para).replace(/\n/g, '<br>')}</p>`)
            .join('');
    }

    const SANITIZE_ALLOWED_TAGS = new Set(['B', 'STRONG', 'I', 'EM', 'S', 'STRIKE', 'CODE', 'H1', 'H2', 'H3', 'BLOCKQUOTE', 'UL', 'OL', 'LI', 'A', 'P', 'BR', 'DIV']);

    function sanitizeHtml(html) {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const walk = (node) => {
            [...node.childNodes].forEach(child => {
                if (child.nodeType === Node.ELEMENT_NODE) {
                    walk(child);
                    if (!SANITIZE_ALLOWED_TAGS.has(child.tagName)) {
                        while (child.firstChild) child.parentNode.insertBefore(child.firstChild, child);
                        child.remove();
                    } else {
                        [...child.attributes].forEach(attr => {
                            if (!(child.tagName === 'A' && attr.name === 'href')) child.removeAttribute(attr.name);
                        });
                        if (child.tagName === 'A') {
                            const href = child.getAttribute('href') || '';
                            if (!/^https?:|^mailto:|^#/i.test(href)) child.removeAttribute('href');
                        }
                    }
                } else if (child.nodeType !== Node.TEXT_NODE) {
                    child.remove();
                }
            });
        };
        walk(doc.body);
        return doc.body.innerHTML;
    }

    /* ---------- ripple effect on interactive buttons ---------- */
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.tool-btn, .icon-btn, .fr-btn, .theme-option, .reset-btn, .new-doc-btn');
        if (!btn || btn.disabled) return;
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 550);
    });

    /* ---------- animated counters ---------- */
    function animateCount(el, newVal) {
        newVal = Math.round(newVal);
        const oldVal = Number(el.dataset.raw || 0);
        el.dataset.raw = newVal;
        if (oldVal === newVal) return;
        const token = (el._animToken = (el._animToken || 0) + 1);
        const duration = 240;
        const start = performance.now();
        const step = (now) => {
            if (el._animToken !== token) return;
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(oldVal + (newVal - oldVal) * eased).toLocaleString();
            if (t < 1) requestAnimationFrame(step);
            else bump(el);
        };
        requestAnimationFrame(step);
    }

    function setText(el, text) {
        if (el.textContent === text) return;
        el.textContent = text;
        bump(el);
    }

    function bump(el) {
        el.classList.remove('bump');
        void el.offsetWidth;
        el.classList.add('bump');
    }

    /* ---------- text analysis helpers ---------- */
    function countSyllables(word) {
        const clean = word.toLowerCase().replace(/[^a-z]/g, '');
        if (!clean) return Math.max(1, Math.round(word.length / 3));
        if (clean.length <= 3) return 1;
        const reduced = clean.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '');
        const matches = reduced.match(/[aeiouy]{1,2}/g);
        return matches ? matches.length : 1;
    }

    function fleschKincaidGrade(words, sentences) {
        if (words.length === 0 || sentences.length === 0) return null;
        const syllables = words.reduce((sum, w) => sum + countSyllables(w), 0);
        const grade = 0.39 * (words.length / sentences.length) + 11.8 * (syllables / words.length) - 15.59;
        return Math.max(0, grade);
    }

    function gradeLabel(grade) {
        const g = grade.toFixed(1);
        if (grade <= 5) return `Grade ${g} · Very easy`;
        if (grade <= 8) return `Grade ${g} · Easy`;
        if (grade <= 10) return `Grade ${g} · Standard`;
        if (grade <= 13) return `Grade ${g} · Advanced`;
        return `Grade ${g} · Expert`;
    }

    function formatDuration(totalSeconds) {
        if (!totalSeconds || totalSeconds <= 0) return '0 sec';
        if (totalSeconds < 60) return `${Math.max(1, Math.round(totalSeconds))} sec`;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.round(totalSeconds % 60);
        return seconds > 0 ? `${minutes} min ${seconds} sec` : `${minutes} min`;
    }

    /* ---------- saving (autosave toggle + manual save) ---------- */
    let autosaveEnabled = localStorage.getItem('autosave') === null ? true : localStorage.getItem('autosave') === 'true';
    let lastSavedContent = localStorage.getItem('content') || '';

    function updateSaveIndicator() {
        const unsaved = !autosaveEnabled && textInput.innerHTML !== lastSavedContent;
        lastSaved.classList.toggle('unsaved', unsaved);
        lastSavedLabel.textContent = unsaved ? 'Not saved' : 'Saved locally';
        saveBtn.classList.toggle('hidden', autosaveEnabled);
        saveBtn.classList.toggle('attn', unsaved);
        saveBtn.classList.toggle('attn-pulse', unsaved);

        saveStatusRow.classList.toggle('unsaved', unsaved);
        saveStatusIcon.innerHTML = unsaved
            ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4M12 17h.01M10.3 3.9 2.6 17a1.8 1.8 0 0 0 1.5 2.7h15.8a1.8 1.8 0 0 0 1.5-2.7L13.7 3.9a1.8 1.8 0 0 0-3.4 0Z"/></svg>'
            : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>';
        if (unsaved) {
            saveStatusTitle.textContent = 'Not saved';
            saveStatusDesc.textContent = 'Autosave is off and you have changes that only exist in this editor right now.';
        } else if (autosaveEnabled) {
            saveStatusTitle.textContent = 'Saved locally';
            saveStatusDesc.textContent = 'Autosave is on. Every change is written to this browser as you type.';
        } else {
            saveStatusTitle.textContent = 'Saved locally';
            saveStatusDesc.textContent = 'Autosave is off, but everything you\'ve typed so far has been saved.';
        }
        saveStatusSaveNow.classList.toggle('hidden', !unsaved);
    }

    function manualSave() {
        localStorage.setItem('content', textInput.innerHTML);
        lastSavedContent = textInput.innerHTML;
        flashSaved();
        updateSaveIndicator();
        showToast('success', 'Saved');
    }

    saveBtn.addEventListener('click', manualSave);

    autosaveToggle.addEventListener('change', () => {
        autosaveEnabled = autosaveToggle.checked;
        localStorage.setItem('autosave', autosaveEnabled);
        if (autosaveEnabled) manualSave();
        else updateSaveIndicator();
        scheduleSettingsSync();
    });

    window.addEventListener('beforeunload', (e) => {
        persistScroll(textInput, 'editorScrollTop');
        persistScroll(analyticsPanel, 'analyticsScrollTop');
        const offset = getCursorOffset();
        if (offset != null) localStorage.setItem('cursorOffset', offset);

        if (!autosaveEnabled && textInput.innerHTML !== lastSavedContent) {
            e.preventDefault();
            e.returnValue = '';
        }
    });

    lastSaved.addEventListener('click', () => {
        updateSaveIndicator();
        openModal(saveStatusModal);
    });
    saveStatusClose.addEventListener('click', closeActivePanel);
    saveStatusSaveNow.addEventListener('click', manualSave);

    /* ---------- core update ---------- */
    let currentLimit = Number(localStorage.getItem('charLimit')) || 0;
    let lastMetrics = {};

    const updateCounts = () => {
        updateEmptyState();
        const text = getPlainText(textInput);
        const words = text.match(/[\p{L}\p{M}]+/gu) || [];
        const sentences = text.match(/[^.!?।]*[.!?।]/g) || [];
        const paragraphs = text.split(/\n+/).filter(p => p.trim() !== '');

        containers.charCount.classList.toggle('hidden', !checkboxes.charCount.checked);
        animateCount(charCount, text.length);

        containers.wordCount.classList.toggle('hidden', !checkboxes.wordCount.checked);
        animateCount(wordCount, words.length);

        containers.sentenceCount.classList.toggle('hidden', !checkboxes.sentenceCount.checked);
        animateCount(sentenceCount, sentences.length);

        containers.paragraphCount.classList.toggle('hidden', !checkboxes.paragraphCount.checked);
        animateCount(paragraphCount, paragraphs.length);

        containers.secondary.classList.toggle('hidden', !checkboxes.secondary.checked);

        const noSpace = text.replace(/\s/g, '').length;
        const totalLetters = words.reduce((sum, w) => sum + w.length, 0);
        const avgLen = words.length ? (totalLetters / words.length) : 0;
        const longest = words.reduce((max, w) => (w.length > max.length ? w : max), '');
        const unique = new Set(words.map(w => w.toLowerCase())).size;
        const grade = fleschKincaidGrade(words, sentences);
        const readingTime = formatDuration((words.length / 200) * 60);
        const speakingTime = formatDuration((words.length / 130) * 60);
        const readingLevel = grade === null ? '-' : gradeLabel(grade);

        if (checkboxes.secondary.checked) {
            animateCount(noSpaceCount, noSpace);
            animateCount(uniqueWordCountEl, unique);
            setText(avgWordLengthEl, words.length ? avgLen.toFixed(1) : '0');
            setText(longestWordEl, longest || '-');
            setText(readingTimeEl, readingTime);
            setText(speakingTimeEl, speakingTime);
            setText(readingLevelEl, readingLevel);
        }

        lastMetrics = {
            charCount: text.length,
            noSpace,
            wordCount: words.length,
            sentenceCount: sentences.length,
            paragraphCount: paragraphs.length,
            uniqueWords: unique,
            longestWord: longest,
            avgWordLength: words.length ? avgLen.toFixed(1) : '0',
            readingTime,
            speakingTime,
            readingLevel
        };

        renderWordDensity(words);
        updateLimitRing(text.length);

        if (autosaveEnabled) {
            localStorage.setItem('content', textInput.innerHTML);
            lastSavedContent = textInput.innerHTML;
            flashSaved();
        }
        updateSaveIndicator();
    };

    let savedFlashTimer;
    function flashSaved() {
        lastSaved.style.opacity = '0.45';
        clearTimeout(savedFlashTimer);
        savedFlashTimer = setTimeout(() => { lastSaved.style.opacity = '1'; }, 260);
    }

    function renderWordDensity(words) {
        if (!checkboxes.wordDensity.checked) {
            wordDensity.classList.add('hidden');
            return;
        }
        wordDensity.classList.remove('hidden');

        const freq = {};
        words.forEach(w => {
            const lw = w.toLowerCase();
            freq[lw] = (freq[lw] || 0) + 1;
        });
        const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
        uniqueWordBadge.textContent = `${sorted.length} unique`;

        wordList.innerHTML = '';
        wordDensityEmpty.classList.toggle('hidden', sorted.length !== 0);
        if (sorted.length === 0) return;

        const top = sorted.slice(0, 12);
        const maxFreq = top[0][1];
        const totalWords = words.length;
        top.forEach(([word, count], i) => {
            const li = document.createElement('li');
            li.style.animationDelay = `${i * 25}ms`;

            const rank = document.createElement('span');
            rank.className = 'word-rank';
            rank.textContent = `#${i + 1}`;

            const info = document.createElement('div');
            info.className = 'word-info';
            const name = document.createElement('span');
            name.className = 'word-name';
            name.textContent = word;
            const track = document.createElement('div');
            track.className = 'word-bar-track';
            const fill = document.createElement('div');
            fill.className = 'word-bar-fill';
            track.appendChild(fill);
            info.append(name, track);

            const pct = totalWords ? ((count / totalWords) * 100).toFixed(1) : '0.0';
            const countEl = document.createElement('span');
            countEl.className = 'word-count';
            countEl.textContent = `${count} · ${pct}%`;

            li.append(rank, info, countEl);
            wordList.appendChild(li);
            requestAnimationFrame(() => { fill.style.width = `${(count / maxFreq) * 100}%`; });
        });
    }

    function updateLimitRing(len) {
        if (!currentLimit) {
            limitRingWrap.classList.add('hidden');
            return;
        }
        limitRingWrap.classList.remove('hidden');
        const remaining = currentLimit - len;
        const pct = Math.min(len / currentLimit, 1);
        limitFill.style.width = `${pct * 100}%`;
        // The capsule auto-widens via CSS (width: fit-content) to fit however
        // many digits the value needs, so no manual sizing is needed here.
        limitRemaining.textContent = remaining;

        limitRingWrap.classList.toggle('warn', remaining >= 0 && remaining <= currentLimit * 0.1);
        limitRingWrap.classList.toggle('over', remaining < 0);
    }

    /* ---------- undo / redo history ---------- */
    let history = [textInput.innerHTML];
    let historyIndex = 0;
    let historyTimer;

    function snapshotHistory(value) {
        if (history[historyIndex] === value) return;
        history = history.slice(0, historyIndex + 1);
        history.push(value);
        historyIndex = history.length - 1;
        if (history.length > 100) { history.shift(); historyIndex--; }
        updateUndoRedoButtons();
    }

    function undo() {
        if (historyIndex <= 0) return;
        historyIndex--;
        textInput.innerHTML = history[historyIndex];
        updateCounts();
        updateUndoRedoButtons();
    }

    function redo() {
        if (historyIndex >= history.length - 1) return;
        historyIndex++;
        textInput.innerHTML = history[historyIndex];
        updateCounts();
        updateUndoRedoButtons();
    }

    function updateUndoRedoButtons() {
        undoBtn.disabled = historyIndex <= 0;
        redoBtn.disabled = historyIndex >= history.length - 1;
    }

    undoBtn.addEventListener('click', undo);
    redoBtn.addEventListener('click', redo);

    /* ---------- generic dropdown system (case / export) ---------- */
    function closeDropdown(dropdown) {
        if (!dropdown) return;
        dropdown.classList.remove('open');
        const trigger = dropdown.querySelector('.dropdown-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
    }

    function closeAllDropdowns() {
        document.querySelectorAll('.dropdown.open').forEach(closeDropdown);
    }

    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('.dropdown-trigger');
        if (trigger) {
            e.stopPropagation();
            const dropdown = trigger.closest('.dropdown');
            const willOpen = !dropdown.classList.contains('open');
            closeAllDropdowns();
            closeContextMenu();
            if (willOpen) {
                dropdown.classList.add('open');
                trigger.setAttribute('aria-expanded', 'true');
            }
            return;
        }
        if (!e.target.closest('.dropdown')) closeAllDropdowns();
    });

    /* ---------- case conversion ---------- */
    const SMALL_WORDS = new Set(['a', 'an', 'the', 'and', 'or', 'but', 'of', 'in', 'on', 'to', 'for', 'with', 'at', 'by', 'from', 'as', 'is']);

    function toTitleCase(str) {
        let isFirst = true;
        return str.replace(/\p{L}[\p{L}\p{M}'’-]*/gu, (word) => {
            const lower = word.toLowerCase();
            const result = (!isFirst && SMALL_WORDS.has(lower)) ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
            isFirst = false;
            return result;
        });
    }

    function toCapitalizeWords(str) {
        return str.replace(/\p{L}[\p{L}\p{M}'’-]*/gu, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
    }

    function toSentenceCase(str) {
        return str.toLowerCase().replace(/(^\s*[a-zÀ-ɏ])|([.!?]\s+[a-z])/g, m => m.toUpperCase());
    }

    const CASE_LABELS = { upper: 'UPPERCASE', lower: 'lowercase', title: 'Title Case', sentence: 'Sentence case', capitalize: 'Capitalized Words' };

    function getCaseTransform(type) {
        switch (type) {
            case 'upper': return s => s.toUpperCase();
            case 'lower': return s => s.toLowerCase();
            case 'title': return toTitleCase;
            case 'sentence': return toSentenceCase;
            case 'capitalize': return toCapitalizeWords;
            default: return null;
        }
    }

    // Operates on the text nodes within the current Range (or the whole editor
    // if nothing is selected) rather than a flat string, so surrounding <strong>/
    // <em>/etc. tags are preserved. Every transform above only ever changes the
    // case of existing characters (never inserts/removes any), so the combined
    // selected text can be transformed once and redistributed back across the
    // original node boundaries by length.
    function applyCase(type) {
        const transform = getCaseTransform(type);
        if (!transform) return;
        textInput.focus();

        const selection = window.getSelection();
        let range;
        if (selection.rangeCount && !selection.isCollapsed && textInput.contains(selection.anchorNode)) {
            range = selection.getRangeAt(0);
        } else {
            range = document.createRange();
            range.selectNodeContents(textInput);
        }

        const walker = document.createTreeWalker(range.commonAncestorContainer, NodeFilter.SHOW_TEXT, {
            acceptNode: node => range.intersectsNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
        });
        const nodes = [];
        let node;
        while ((node = walker.nextNode())) nodes.push(node);
        if (!nodes.length) { showToast('info', 'Nothing to convert'); return; }

        const slices = nodes.map((n, i) => {
            let start = 0;
            let end = n.nodeValue.length;
            if (i === 0 && n === range.startContainer) start = range.startOffset;
            if (i === nodes.length - 1 && n === range.endContainer) end = range.endOffset;
            return { node: n, before: n.nodeValue.slice(0, start), middle: n.nodeValue.slice(start, end), after: n.nodeValue.slice(end) };
        });

        const transformed = transform(slices.map(s => s.middle).join(''));
        let offset = 0;
        slices.forEach(s => {
            const chunk = transformed.slice(offset, offset + s.middle.length);
            s.node.nodeValue = s.before + chunk + s.after;
            offset += s.middle.length;
        });

        updateCounts();
        snapshotHistory(textInput.innerHTML);
        showToast('success', `Converted to ${CASE_LABELS[type]}`);
    }

    caseDropdownMenu.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-case]');
        if (!btn) return;
        applyCase(btn.dataset.case);
        closeDropdown(caseDropdown);
    });

    /* ---------- right-click context menu ---------- */
    function execFormat(command, value) {
        textInput.focus();
        document.execCommand(command, false, value);
        updateCounts();
        snapshotHistory(textInput.innerHTML);
    }

    function insertInlineCode() {
        textInput.focus();
        const text = window.getSelection().toString();
        if (!text) { showToast('info', 'Select some text first'); return; }
        document.execCommand('insertHTML', false, `<code>${escapeHtml(text)}</code>`);
        updateCounts();
        snapshotHistory(textInput.innerHTML);
    }

    function insertLink() {
        if (window.getSelection().isCollapsed) {
            showToast('info', 'Select some text first');
            return;
        }
        const url = window.prompt('Enter URL:', 'https://');
        if (!url) return;
        execFormat('createLink', url);
    }

    function clearFormatting() {
        if (window.getSelection().isCollapsed) { showToast('info', 'Select some text first'); return; }
        textInput.focus();
        document.execCommand('removeFormat');
        document.execCommand('formatBlock', false, '<p>');
        updateCounts();
        snapshotHistory(textInput.innerHTML);
        showToast('success', 'Formatting cleared');
    }

    function insertSanitizedHtml(html) {
        document.execCommand('insertHTML', false, sanitizeHtml(html));
        updateCounts();
        snapshotHistory(textInput.innerHTML);
    }

    textInput.addEventListener('paste', (e) => {
        e.preventDefault();
        const html = e.clipboardData.getData('text/html');
        const text = e.clipboardData.getData('text/plain');
        insertSanitizedHtml(html || plainTextToEditableHtml(text));
    });

    function contextCopy() {
        if (window.getSelection().isCollapsed) { showToast('info', 'Nothing selected'); return; }
        textInput.focus();
        const ok = document.execCommand('copy');
        showToast(ok ? 'success' : 'error', ok ? 'Copied' : 'Copy failed');
    }

    function contextCut() {
        if (window.getSelection().isCollapsed) { showToast('info', 'Nothing selected'); return; }
        textInput.focus();
        if (document.execCommand('cut')) {
            updateCounts();
            snapshotHistory(textInput.innerHTML);
            showToast('success', 'Cut');
        } else {
            showToast('error', 'Cut failed');
        }
    }

    async function contextPaste() {
        textInput.focus();
        try {
            const items = await navigator.clipboard.read();
            for (const item of items) {
                if (item.types.includes('text/html')) {
                    insertSanitizedHtml(await (await item.getType('text/html')).text());
                    return;
                }
            }
            const text = await navigator.clipboard.readText();
            insertSanitizedHtml(plainTextToEditableHtml(text));
        } catch {
            showToast('info', 'Press Ctrl+V to paste');
        }
    }

    function contextDelete() {
        if (window.getSelection().isCollapsed) { showToast('info', 'Nothing selected'); return; }
        textInput.focus();
        document.execCommand('delete');
        updateCounts();
        snapshotHistory(textInput.innerHTML);
    }

    function contextSelectAll() {
        textInput.focus();
        document.execCommand('selectAll');
    }

    const CONTEXT_ACTIONS = {
        cut: contextCut,
        copy: contextCopy,
        paste: contextPaste,
        delete: contextDelete,
        'select-all': contextSelectAll,
        bold: () => execFormat('bold'),
        italic: () => execFormat('italic'),
        strike: () => execFormat('strikeThrough'),
        code: insertInlineCode,
        heading: () => execFormat('formatBlock', '<h3>'),
        quote: () => execFormat('formatBlock', '<blockquote>'),
        'bullet-list': () => execFormat('insertUnorderedList'),
        'numbered-list': () => execFormat('insertOrderedList'),
        link: insertLink,
        'clear-format': clearFormatting
    };

    function closeContextMenu() {
        contextMenu.classList.add('hidden');
    }

    function openContextMenu(x, y) {
        closeAllDropdowns();
        closeAllPanelsInstantly();
        const hasSelection = !window.getSelection().isCollapsed;
        contextMenu.querySelectorAll('[data-requires-selection]').forEach(btn => {
            btn.disabled = !hasSelection;
        });
        contextMenu.classList.remove('hidden');
        contextMenu.style.left = '0px';
        contextMenu.style.top = '0px';
        const rect = contextMenu.getBoundingClientRect();
        const left = Math.max(8, Math.min(x, window.innerWidth - rect.width - 8));
        const top = Math.max(8, Math.min(y, window.innerHeight - rect.height - 8));
        contextMenu.style.left = `${left}px`;
        contextMenu.style.top = `${top}px`;
    }

    textInput.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        openContextMenu(e.clientX, e.clientY);
    });

    contextMenu.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-action]');
        if (!btn || btn.disabled) return;
        closeContextMenu();
        const action = CONTEXT_ACTIONS[btn.dataset.action];
        if (action) action();
    });

    document.addEventListener('click', (e) => {
        if (!contextMenu.contains(e.target)) closeContextMenu();
    });
    window.addEventListener('resize', closeContextMenu);

    /* ---------- find & replace ---------- */
    function escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function updateMatchCount() {
        const q = findInput.value;
        if (!q) { matchCountEl.textContent = '0 matches'; return; }
        const matches = getPlainText(textInput).match(new RegExp(escapeRegex(q), 'gi'));
        const n = matches ? matches.length : 0;
        matchCountEl.textContent = `${n} match${n === 1 ? '' : 'es'}`;
    }

    // Replaces within each text node's own content, so surrounding formatting
    // tags are preserved; a match split across a formatting boundary won't be
    // found (same limitation any lightweight contenteditable editor has
    // without a full document model).
    function replaceFirstInEditor(query, replacement) {
        const re = new RegExp(escapeRegex(query), 'i');
        const walker = document.createTreeWalker(textInput, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
            if (re.test(node.nodeValue)) {
                node.nodeValue = node.nodeValue.replace(re, replacement);
                return true;
            }
        }
        return false;
    }

    function replaceAllInEditor(query, replacement) {
        const re = new RegExp(escapeRegex(query), 'gi');
        const walker = document.createTreeWalker(textInput, NodeFilter.SHOW_TEXT);
        let node;
        let total = 0;
        while ((node = walker.nextNode())) {
            const matches = node.nodeValue.match(re);
            if (matches) {
                total += matches.length;
                node.nodeValue = node.nodeValue.replace(re, replacement);
            }
        }
        return total;
    }

    findInput.addEventListener('input', updateMatchCount);

    function showFindReplace() {
        findReplaceBar.classList.remove('hidden');
        findInput.focus();
        updateMatchCount();
    }

    function hideFindReplace() {
        findReplaceBar.classList.add('hidden');
    }

    findReplaceBtn.addEventListener('click', () => {
        findReplaceBar.classList.contains('hidden') ? showFindReplace() : hideFindReplace();
    });
    findReplaceClose.addEventListener('click', hideFindReplace);

    replaceOneBtn.addEventListener('click', () => {
        const q = findInput.value;
        if (!q) return;
        if (!replaceFirstInEditor(q, replaceInput.value)) { showToast('error', 'No matches found'); return; }
        updateCounts();
        snapshotHistory(textInput.innerHTML);
        updateMatchCount();
        showToast('success', 'Replaced 1 occurrence');
    });

    replaceAllBtn.addEventListener('click', () => {
        const q = findInput.value;
        if (!q) return;
        const count = replaceAllInEditor(q, replaceInput.value);
        if (!count) { showToast('error', 'No matches found'); return; }
        updateCounts();
        snapshotHistory(textInput.innerHTML);
        updateMatchCount();
        showToast('success', `Replaced ${count} occurrence${count === 1 ? '' : 's'}`);
    });

    /* ---------- toolbar actions ---------- */
    copyBtn.addEventListener('click', async () => {
        if (!getPlainText(textInput).trim()) { showToast('info', 'Nothing to copy'); return; }
        const range = document.createRange();
        range.selectNodeContents(textInput);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        const ok = document.execCommand('copy');
        selection.removeAllRanges();
        if (ok) { showToast('success', 'Copied to clipboard'); return; }
        try {
            await navigator.clipboard.writeText(getPlainText(textInput));
            showToast('success', 'Copied to clipboard');
        } catch {
            showToast('error', 'Copy failed - try again');
        }
    });

    uploadBtn.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            textInput.innerHTML = plainTextToEditableHtml(reader.result);
            updateCounts();
            snapshotHistory(textInput.innerHTML);
            showToast('success', `Imported "${file.name}"`);
        };
        reader.onerror = () => showToast('error', 'Could not read file');
        reader.readAsText(file);
        fileInput.value = '';
    });

    clearBtn.addEventListener('click', () => {
        if (!getPlainText(textInput).trim()) { showToast('info', 'Already empty'); return; }
        textInput.innerHTML = '';
        updateCounts();
        snapshotHistory(textInput.innerHTML);
        showToast('info', 'Text cleared - use Undo to restore');
    });

    /* ---------- export: download / report / shareable link ---------- */
    function utf8ToBase64(str) {
        const bytes = new TextEncoder().encode(str);
        let binary = '';
        bytes.forEach(b => { binary += String.fromCharCode(b); });
        return btoa(binary);
    }

    function base64ToUtf8(b64) {
        const binary = atob(b64);
        const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
        return new TextDecoder().decode(bytes);
    }

    function buildReport() {
        const m = lastMetrics;
        return [
            'Character Counter Pro - Text Report',
            '-'.repeat(38),
            `Characters: ${m.charCount}`,
            `Characters (no spaces): ${m.noSpace}`,
            `Words: ${m.wordCount}`,
            `Sentences: ${m.sentenceCount}`,
            `Paragraphs: ${m.paragraphCount}`,
            `Unique words: ${m.uniqueWords}`,
            `Longest word: ${m.longestWord || '-'}`,
            `Average word length: ${m.avgWordLength}`,
            `Reading time: ${m.readingTime}`,
            `Speaking time: ${m.speakingTime}`,
            `Readability: ${m.readingLevel}`
        ].join('\n');
    }

    function downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    }

    function escapeHtml(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    // Walks the editor's DOM and serializes it to real Markdown syntax (as
    // opposed to just dumping plain text) so formatting survives the export.
    function htmlToMarkdown(root) {
        function serialize(node) {
            if (node.nodeType === Node.TEXT_NODE) return node.nodeValue;
            if (node.nodeType !== Node.ELEMENT_NODE) return '';
            const inner = () => [...node.childNodes].map(serialize).join('');
            switch (node.tagName) {
                case 'STRONG': case 'B': return `**${inner()}**`;
                case 'EM': case 'I': return `*${inner()}*`;
                case 'S': case 'STRIKE': return `~~${inner()}~~`;
                case 'CODE': return `\`${inner()}\``;
                case 'A': return `[${inner()}](${node.getAttribute('href') || ''})`;
                case 'H1': return `# ${inner()}\n\n`;
                case 'H2': return `## ${inner()}\n\n`;
                case 'H3': return `### ${inner()}\n\n`;
                case 'BLOCKQUOTE':
                    return inner().split('\n').filter(Boolean).map(l => `> ${l}`).join('\n') + '\n\n';
                case 'UL': case 'OL': {
                    const items = [...node.children].filter(c => c.tagName === 'LI')
                        .map((li, i) => `${node.tagName === 'OL' ? `${i + 1}.` : '-'} ${serialize(li).trim()}`)
                        .join('\n');
                    return items + '\n\n';
                }
                case 'LI': return inner();
                case 'BR': return '\n';
                case 'P': case 'DIV': {
                    const text = inner().trim();
                    return text ? text + '\n\n' : '';
                }
                default: return inner();
            }
        }
        return [...root.childNodes].map(serialize).join('').replace(/\n{3,}/g, '\n\n').trim();
    }

    // Flattens the DOM into text runs tagged with bold/italic so the PDF can
    // render actual styled text instead of one flat string.
    function getStyledRuns(root) {
        const runs = [];
        const BREAK_TAGS = new Set(['P', 'DIV', 'LI', 'BLOCKQUOTE', 'H1', 'H2', 'H3']);
        function walk(node, bold, italic) {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.nodeValue.replace(/\s+/g, ' ');
                if (text) runs.push({ text, bold, italic });
                return;
            }
            if (node.nodeType !== Node.ELEMENT_NODE) return;
            const tag = node.tagName;
            if (tag === 'BR') { runs.push({ text: '\n', isBreak: true }); return; }
            const nextBold = bold || tag === 'STRONG' || tag === 'B' || tag === 'H1' || tag === 'H2' || tag === 'H3';
            const nextItalic = italic || tag === 'EM' || tag === 'I';
            [...node.childNodes].forEach(child => walk(child, nextBold, nextItalic));
            if (BREAK_TAGS.has(tag)) runs.push({ text: '\n', isBreak: true });
        }
        [...root.childNodes].forEach(child => walk(child, false, false));
        return runs;
    }

    function exportAsPdf() {
        const jsPDFCtor = window.jspdf && window.jspdf.jsPDF;
        if (!jsPDFCtor) { showToast('error', 'PDF export unavailable - library failed to load'); return; }
        const doc = new jsPDFCtor({ unit: 'pt', format: 'a4' });
        const margin = 48;
        const fontSize = 11;
        const lineHeight = 15;
        const pageHeight = doc.internal.pageSize.getHeight();
        const maxX = doc.internal.pageSize.getWidth() - margin;
        doc.setFontSize(fontSize);

        let x = margin;
        let y = margin;
        function newLine() {
            x = margin;
            y += lineHeight;
            if (y > pageHeight - margin) { doc.addPage(); y = margin; }
        }

        getStyledRuns(textInput).forEach(run => {
            if (run.isBreak) { newLine(); return; }
            const style = run.bold && run.italic ? 'bolditalic' : run.bold ? 'bold' : run.italic ? 'italic' : 'normal';
            doc.setFont('helvetica', style);
            run.text.split(/(\s+)/).filter(Boolean).forEach(word => {
                const width = doc.getStringUnitWidth(word) * fontSize / doc.internal.scaleFactor;
                if (x + width > maxX && word.trim()) newLine();
                doc.text(word, x, y);
                x += width;
            });
        });

        doc.save('character-counter-export.pdf');
    }

    function exportAsDoc() {
        const html = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head><meta charset="utf-8"><title>Character Counter Pro Export</title></head>
<body>${textInput.innerHTML || '<p></p>'}</body></html>`;
        downloadBlob(new Blob(['﻿', html], { type: 'application/msword' }), 'character-counter-export.doc');
    }

    function handleExport(type) {
        if (['txt', 'md', 'pdf', 'doc'].includes(type) && !getPlainText(textInput).trim()) {
            showToast('info', 'Nothing to export');
            return;
        }

        if (type === 'txt') {
            downloadBlob(new Blob([getPlainText(textInput)], { type: 'text/plain' }), 'character-counter-export.txt');
            showToast('success', 'Exported as .txt');
            return;
        }

        if (type === 'md') {
            downloadBlob(new Blob([htmlToMarkdown(textInput)], { type: 'text/markdown' }), 'character-counter-export.md');
            showToast('success', 'Exported as .md');
            return;
        }

        if (type === 'pdf') {
            exportAsPdf();
            showToast('success', 'Exported as .pdf');
            return;
        }

        if (type === 'doc') {
            exportAsDoc();
            showToast('success', 'Exported as .doc');
            return;
        }

        if (type === 'report') {
            if (!getPlainText(textInput).trim()) { showToast('info', 'Nothing to report on'); return; }
            navigator.clipboard.writeText(buildReport())
                .then(() => showToast('success', 'Stats report copied to clipboard'))
                .catch(() => showToast('error', 'Could not copy report'));
            return;
        }

        if (type === 'share') {
            if (!getPlainText(textInput).trim()) { showToast('info', 'Nothing to share'); return; }
            const link = `${location.origin}${location.pathname}#share=${encodeURIComponent(utf8ToBase64(textInput.innerHTML))}`;
            navigator.clipboard.writeText(link)
                .then(() => showToast('success', 'Shareable link copied'))
                .catch(() => showToast('error', 'Could not copy link'));
        }
    }

    exportDropdownMenu.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-export]');
        if (!btn) return;
        handleExport(btn.dataset.export);
        closeDropdown(exportDropdown);
    });

    function selectLimitOption(btn) {
        limitDropdownMenu.querySelectorAll('button[data-limit-id]').forEach(b => b.classList.toggle('selected', b === btn));
        limitDropdownLabel.textContent = btn.textContent;
        currentLimit = Number(btn.dataset.limit) || 0;
        localStorage.setItem('charLimit', currentLimit);
        localStorage.setItem('limitOptionId', btn.dataset.limitId);
        updateLimitRing(getPlainText(textInput).length);
        scheduleSettingsSync();
    }

    /* ---------- custom goals ---------- */
    let customGoals = [];
    try { customGoals = JSON.parse(localStorage.getItem('customGoals') || '[]'); } catch { customGoals = []; }

    function saveCustomGoals() {
        localStorage.setItem('customGoals', JSON.stringify(customGoals));
        scheduleSettingsSync();
    }

    function renderCustomGoals() {
        customGoalsList.innerHTML = '';
        customGoalsDivider.classList.toggle('hidden', customGoals.length === 0);
        customGoals.forEach(goal => {
            const row = document.createElement('div');
            row.className = 'custom-goal-row';

            const btn = document.createElement('button');
            btn.setAttribute('role', 'menuitem');
            btn.dataset.limit = goal.limit;
            btn.dataset.limitId = goal.id;
            btn.textContent = `${goal.name} · ${goal.limit}`;

            const del = document.createElement('button');
            del.className = 'custom-goal-delete';
            del.dataset.deleteGoal = goal.id;
            del.title = 'Remove goal';
            del.setAttribute('aria-label', `Remove ${goal.name}`);
            del.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6 6 18"/></svg>';

            row.append(btn, del);
            customGoalsList.appendChild(row);
        });
    }

    function addCustomGoal() {
        const name = customGoalNameInput.value.trim().slice(0, 30);
        const limit = Math.round(Number(customGoalLimitInput.value));
        if (!name) { showToast('error', 'Give the goal a name'); return; }
        if (!limit || limit < 1) { showToast('error', 'Enter a valid character limit'); return; }
        const goal = { id: `custom-${Date.now().toString(36)}`, name, limit };
        customGoals.push(goal);
        saveCustomGoals();
        renderCustomGoals();
        customGoalNameInput.value = '';
        customGoalLimitInput.value = '';
        const btn = customGoalsList.querySelector(`button[data-limit-id="${goal.id}"]`);
        if (btn) selectLimitOption(btn);
        closeDropdown(limitDropdown);
        showToast('success', `Added goal "${name}"`);
    }

    customGoalAddBtn.addEventListener('click', addCustomGoal);
    [customGoalNameInput, customGoalLimitInput].forEach(input => {
        input.addEventListener('keydown', (e) => { if (e.key === 'Enter') addCustomGoal(); });
        input.addEventListener('click', (e) => e.stopPropagation());
    });

    limitDropdownMenu.addEventListener('click', (e) => {
        const del = e.target.closest('.custom-goal-delete');
        if (del) {
            e.stopPropagation();
            const id = del.dataset.deleteGoal;
            const wasActive = localStorage.getItem('limitOptionId') === id;
            customGoals = customGoals.filter(g => g.id !== id);
            saveCustomGoals();
            renderCustomGoals();
            if (wasActive) {
                const noneBtn = limitDropdownMenu.querySelector('button[data-limit-id="none"]');
                if (noneBtn) selectLimitOption(noneBtn);
            }
            return;
        }
        const btn = e.target.closest('button[data-limit-id]');
        if (!btn) return;
        selectLimitOption(btn);
        closeDropdown(limitDropdown);
    });

    /* ---------- input + autosave ---------- */
    textInput.addEventListener('input', () => {
        updateCounts();
        clearTimeout(historyTimer);
        historyTimer = setTimeout(() => snapshotHistory(textInput.innerHTML), 500);
        scheduleCursorSave();
    });
    textInput.addEventListener('blur', () => snapshotHistory(textInput.innerHTML));
    textInput.addEventListener('keyup', scheduleCursorSave);
    textInput.addEventListener('mouseup', scheduleCursorSave);

    let editorScrollTimer;
    textInput.addEventListener('scroll', () => {
        clearTimeout(editorScrollTimer);
        editorScrollTimer = setTimeout(() => persistScroll(textInput, 'editorScrollTop'), 150);
    });

    let analyticsScrollTimer;
    analyticsPanel.addEventListener('scroll', () => {
        clearTimeout(analyticsScrollTimer);
        analyticsScrollTimer = setTimeout(() => persistScroll(analyticsPanel, 'analyticsScrollTop'), 150);
    });

    /* ---------- settings checkboxes ---------- */
    Object.keys(checkboxes).forEach(key => {
        checkboxes[key].addEventListener('change', () => {
            localStorage.setItem(`show-${key}`, checkboxes[key].checked);
            updateCounts();
            scheduleSettingsSync();
        });
    });

    /* ---------- theme (light / dark / auto) ---------- */
    const THEME_ORDER = ['light', 'dark', 'auto'];
    const systemDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    function migrateThemeMode() {
        const stored = localStorage.getItem('themeMode');
        if (stored) return stored;
        const legacy = localStorage.getItem('darkMode');
        if (legacy === 'true') return 'dark';
        if (legacy === 'false') return 'light';
        return 'auto';
    }

    let themeMode = migrateThemeMode();
    let isDarkMode = false;

    function setTheme(mode) {
        themeMode = mode;
        isDarkMode = mode === 'auto' ? systemDarkQuery.matches : mode === 'dark';
        document.body.classList.toggle('dark-mode', isDarkMode);
        localStorage.setItem('themeMode', mode);
        darkModeToggle.dataset.mode = mode;
        darkModeToggle.title = `Theme: ${mode[0].toUpperCase()}${mode.slice(1)} (click to change)`;
        themePicker.querySelectorAll('.theme-option').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === mode);
        });
        scheduleSettingsSync();
    }

    systemDarkQuery.addEventListener('change', () => {
        if (themeMode === 'auto') setTheme('auto');
    });

    darkModeToggle.addEventListener('click', () => {
        const next = THEME_ORDER[(THEME_ORDER.indexOf(themeMode) + 1) % THEME_ORDER.length];
        setTheme(next);
    });
    themePicker.addEventListener('click', (e) => {
        const btn = e.target.closest('.theme-option');
        if (btn) setTheme(btn.dataset.theme);
    });

    /* ---------- focus mode ---------- */
    const headerEl = document.querySelector('header');
    const headerIconsEl = document.querySelector('.header-icons');
    const storedFocusMode = localStorage.getItem('focusMode') === 'true';
    let isFocusMode = false;
    let focusModeTransitioning = false;
    const FOCUS_RELOCATE_MS = 170;

    function applyFocusModeState(on) {
        isFocusMode = on;
        document.body.classList.toggle('focus-mode', on);
        focusModeToggle.classList.toggle('active', on);
        localStorage.setItem('focusMode', on);
        scheduleSettingsSync();

        if (on) {
            analyticsPanel.insertBefore(headerIconsEl, analyticsPanel.firstChild);
        } else if (headerIconsEl.parentElement !== headerEl) {
            headerEl.appendChild(headerIconsEl);
        }
        requestAnimationFrame(() => headerIconsEl.classList.remove('relocating'));
    }

    // Browsers only grant fullscreen from a call made synchronously inside a
    // trusted user-gesture handler (click/keydown) — calling it from inside a
    // setTimeout, as part of the animated transition below, gets silently
    // rejected because the gesture has already expired by then. So this
    // fires immediately, before any of the deferred relocate/resize work.
    function syncFullscreenToFocusMode(on) {
        if (on) {
            // Some embedding contexts (an iframe/webview without fullscreen
            // permission) silently reject requestFullscreen with no error.
            // Fall back to a CSS pseudo-fullscreen overlay so the canvas
            // still visually fills the entire window either way.
            if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {
                    document.body.classList.add('pseudo-fullscreen');
                });
            } else if (!document.documentElement.requestFullscreen) {
                document.body.classList.add('pseudo-fullscreen');
            }
        } else {
            document.body.classList.remove('pseudo-fullscreen');
            if (document.fullscreenElement && document.exitFullscreen) {
                document.exitFullscreen().catch(() => {});
            }
        }
    }

    // The icon cluster physically relocates between the header and the
    // sidebar, so a plain class toggle would pop it to its new spot
    // mid-layout-shift. Fading it out first, moving it while invisible, then
    // fading it in reads as one deliberate motion instead of an abrupt jump.
    function setFocusMode(on) {
        if (on === isFocusMode || focusModeTransitioning) return;
        syncFullscreenToFocusMode(on);
        focusModeTransitioning = true;
        headerIconsEl.classList.add('relocating');
        setTimeout(() => {
            applyFocusModeState(on);
            focusModeTransitioning = false;
        }, FOCUS_RELOCATE_MS);
    }

    // If the user exits native fullscreen directly (Esc), drop out of focus
    // mode too so the UI doesn't end up stuck between the two states.
    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement && isFocusMode && !focusModeTransitioning) {
            setFocusMode(false);
        }
    });

    focusModeToggle.addEventListener('click', () => setFocusMode(!isFocusMode));

    /* ---------- generic panel system (settings / documents / command palette) ---------- */
    let activePanel = null;

    function closeAllPanelsInstantly() {
        [settingsPanel, documentsPanel, commandPalette, saveStatusModal].forEach(el => {
            el.classList.remove('show');
            el.classList.add('hidden');
            if (el.hasAttribute('aria-hidden')) el.setAttribute('aria-hidden', 'true');
        });
        scrim.classList.remove('show');
        scrim.classList.add('hidden');
        activePanel = null;
    }

    function openPanel(panel, delay) {
        closeAllPanelsInstantly();
        closeAllDropdowns();
        closeContextMenu();
        panel.classList.remove('hidden');
        scrim.classList.remove('hidden');
        requestAnimationFrame(() => {
            panel.classList.add('show');
            scrim.classList.add('show');
        });
        if (panel.hasAttribute('aria-hidden')) panel.setAttribute('aria-hidden', 'false');
        activePanel = { el: panel, delay };
    }

    function closeActivePanel() {
        if (!activePanel) return;
        const { el, delay } = activePanel;
        el.classList.remove('show');
        scrim.classList.remove('show');
        if (el.hasAttribute('aria-hidden')) el.setAttribute('aria-hidden', 'true');
        setTimeout(() => {
            el.classList.add('hidden');
            scrim.classList.add('hidden');
        }, delay);
        activePanel = null;
    }

    const openDrawer = (panel) => openPanel(panel, 420);
    const openModal = (panel) => openPanel(panel, 260);

    settingsIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        settingsPanel.classList.contains('show') ? closeActivePanel() : openDrawer(settingsPanel);
    });
    doneButton.addEventListener('click', closeActivePanel);
    scrim.addEventListener('click', closeActivePanel);

    /* ---------- global keyboard shortcuts ---------- */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeActivePanel();
            closeAllDropdowns();
            closeContextMenu();
            hideFindReplace();
            return;
        }

        const mod = e.ctrlKey || e.metaKey;
        if (!mod) return;
        const key = e.key.toLowerCase();
        const active = document.activeElement;
        const typingElsewhere = active && active !== textInput &&
            ['INPUT', 'SELECT', 'TEXTAREA'].includes(active.tagName);

        // Undo/redo: let a focused side input (find box, save-as box, etc.)
        // keep its own native undo buffer instead of hijacking the document's.
        if (!e.altKey && (key === 'z' || key === 'y')) {
            if (typingElsewhere) return;
            e.preventDefault();
            (key === 'y' || e.shiftKey) ? redo() : undo();
            return;
        }

        if (!e.altKey && key === 'k') { e.preventDefault(); commandPalette.classList.contains('show') ? closeActivePanel() : openCommandPalette(); return; }
        if (!e.altKey && key === 'f') { e.preventDefault(); findReplaceBar.classList.contains('hidden') ? showFindReplace() : hideFindReplace(); return; }
        if (!e.altKey && key === 's') { e.preventDefault(); manualSave(); return; }
        if (!e.altKey && key === ',') { e.preventDefault(); settingsPanel.classList.contains('show') ? closeActivePanel() : openDrawer(settingsPanel); return; }

        if (e.altKey) {
            switch (key) {
                case 'c': e.preventDefault(); copyBtn.click(); break;
                case 'i': e.preventDefault(); uploadBtn.click(); break;
                case 'e': e.preventDefault(); document.getElementById('export-dropdown-btn').click(); break;
                case 'x': e.preventDefault(); clearBtn.click(); break;
                case 'u': e.preventDefault(); document.getElementById('case-dropdown-btn').click(); break;
                case 'd': e.preventDefault(); documentsBtn.click(); break;
                case 'f': e.preventDefault(); focusModeToggle.click(); break;
                case 't': e.preventDefault(); darkModeToggle.click(); break;
            }
        }
    });

    /* ---------- editor appearance ---------- */
    function setFontSize(px) {
        document.documentElement.style.setProperty('--editor-font-size', `${px}px`);
        fontSizeValue.textContent = `${px}px`;
        localStorage.setItem('fontSize', px);
        scheduleSettingsSync();
    }

    fontSizeSlider.addEventListener('input', () => setFontSize(fontSizeSlider.value));

    function setLineHeight(relaxed) {
        document.documentElement.style.setProperty('--editor-line-height', relaxed ? '1.9' : '1.6');
        localStorage.setItem('lineHeightRelaxed', relaxed);
        scheduleSettingsSync();
    }

    lineHeightToggle.addEventListener('change', () => setLineHeight(lineHeightToggle.checked));

    const EDITOR_FONTS = {
        ui: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        serif: "'Lora', Georgia, serif",
        reading: "'Merriweather', Georgia, serif",
        mono: "'JetBrains Mono', 'SFMono-Regular', Consolas, monospace",
        rounded: "'Nunito', -apple-system, sans-serif"
    };

    function setEditorFont(key) {
        document.documentElement.style.setProperty('--editor-font', EDITOR_FONTS[key] || EDITOR_FONTS.ui);
        localStorage.setItem('editorFont', key);
        const btn = editorFontDropdownMenu.querySelector(`button[data-font="${key}"]`);
        if (btn) {
            editorFontDropdownMenu.querySelectorAll('button').forEach(b => b.classList.toggle('selected', b === btn));
            editorFontDropdownLabel.textContent = btn.textContent;
        }
        scheduleSettingsSync();
    }

    editorFontDropdownMenu.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-font]');
        if (!btn) return;
        setEditorFont(btn.dataset.font);
        closeDropdown(editorFontDropdown);
    });

    /* ---------- reset settings ---------- */
    resetSettingsBtn.addEventListener('click', () => {
        Object.keys(checkboxes).forEach(key => {
            checkboxes[key].checked = true;
            localStorage.setItem(`show-${key}`, 'true');
        });
        fontSizeSlider.value = 18;
        setFontSize(18);
        lineHeightToggle.checked = false;
        setLineHeight(false);
        setEditorFont('ui');
        const noneLimitBtn = limitDropdownMenu.querySelector('button[data-limit-id="none"]');
        if (noneLimitBtn) selectLimitOption(noneLimitBtn);
        setTheme('auto');
        setFocusMode(false);
        autosaveToggle.checked = true;
        autosaveEnabled = true;
        localStorage.setItem('autosave', true);
        updateCounts();
        showToast('info', 'Settings reset to defaults');
    });

    /* ---------- local document storage (IndexedDB) ---------- */
    const IDB_NAME = 'character-counter-pro';
    const IDB_VERSION = 1;
    const IDB_STORE = 'documents';

    function openDocDB() {
        return new Promise((resolve, reject) => {
            if (!window.indexedDB) { reject(new Error('IndexedDB unavailable')); return; }
            const req = indexedDB.open(IDB_NAME, IDB_VERSION);
            req.onupgradeneeded = () => {
                const db = req.result;
                if (!db.objectStoreNames.contains(IDB_STORE)) db.createObjectStore(IDB_STORE, { keyPath: 'id' });
            };
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    }

    function idbGetAll() {
        return openDocDB().then(db => new Promise((resolve, reject) => {
            const tx = db.transaction(IDB_STORE, 'readonly');
            const req = tx.objectStore(IDB_STORE).getAll();
            req.onsuccess = () => resolve(req.result || []);
            req.onerror = () => reject(req.error);
        })).catch(() => []);
    }

    function idbPut(doc) {
        return openDocDB().then(db => new Promise((resolve, reject) => {
            const tx = db.transaction(IDB_STORE, 'readwrite');
            tx.objectStore(IDB_STORE).put(doc);
            tx.oncomplete = () => resolve(doc);
            tx.onerror = () => reject(tx.error);
        }));
    }

    function idbDelete(id) {
        return openDocDB().then(db => new Promise((resolve, reject) => {
            const tx = db.transaction(IDB_STORE, 'readwrite');
            tx.objectStore(IDB_STORE).delete(id);
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        }));
    }

    async function migrateLegacyDocuments() {
        const raw = localStorage.getItem('documents');
        if (!raw) return;
        try {
            const docs = JSON.parse(raw);
            if (Array.isArray(docs)) for (const doc of docs) await idbPut(doc);
        } catch { /* ignore malformed legacy data */ }
        localStorage.removeItem('documents');
    }

    /* ---------- Google Drive integration ----------
       To enable: create an OAuth 2.0 Client ID (APIs & Services > Credentials)
       at https://console.cloud.google.com/, enable the Google Drive API on that
       project, add the exact URL this app is served from under "Authorized
       JavaScript origins" (this will NOT work over file:// - it must be served
       via http/https, e.g. http://localhost:8080 for local testing), then paste
       the client ID below. */
    const GOOGLE_CLIENT_ID = '';
    const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.file';
    const DRIVE_FOLDER_NAME = 'Character Counter';

    let driveAccessToken = null;
    let driveFolderId = null;
    let driveTokenClient = null;
    let storageBackend = localStorage.getItem('storageBackend') === 'drive' ? 'drive' : 'local';

    function isDriveConfigured() {
        return !!GOOGLE_CLIENT_ID;
    }

    function isDriveActive() {
        return storageBackend === 'drive' && !!driveAccessToken;
    }

    function loadGoogleIdentityScript() {
        if (window.google && window.google.accounts) return Promise.resolve();
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.onload = resolve;
            script.onerror = () => reject(new Error('Failed to load Google sign-in'));
            document.head.appendChild(script);
        });
    }

    function driveFetch(url, options = {}) {
        return fetch(url, {
            ...options,
            headers: { ...(options.headers || {}), Authorization: `Bearer ${driveAccessToken}` }
        }).then(res => {
            if (!res.ok) throw new Error(`Drive API ${res.status}`);
            return res;
        });
    }

    function getDriveFolderPath() {
        const stored = localStorage.getItem('driveFolderPath');
        return (stored && stored.trim()) ? stored.trim() : DRIVE_FOLDER_NAME;
    }

    function escapeDriveQueryValue(value) {
        return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    }

    async function findOrCreateFolder(name, parentId) {
        const parentClause = `'${parentId || 'root'}' in parents`;
        const q = encodeURIComponent(`name='${escapeDriveQueryValue(name)}' and mimeType='application/vnd.google-apps.folder' and trashed=false and ${parentClause}`);
        const res = await driveFetch(`https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name)`);
        const data = await res.json();
        if (data.files && data.files.length) return data.files[0].id;
        const body = { name, mimeType: 'application/vnd.google-apps.folder' };
        if (parentId) body.parents = [parentId];
        const createRes = await driveFetch('https://www.googleapis.com/drive/v3/files', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const created = await createRes.json();
        return created.id;
    }

    // Walks/creates a "/"-separated path from Drive's root, one segment at a
    // time, so a user can point saves anywhere in their own Drive - not just
    // a single folder name hardcoded by the app.
    async function ensureDriveFolder(path) {
        const segments = (path || DRIVE_FOLDER_NAME).split('/').map(s => s.trim()).filter(Boolean);
        const names = segments.length ? segments : [DRIVE_FOLDER_NAME];
        let parentId = null;
        for (const name of names) {
            parentId = await findOrCreateFolder(name, parentId);
        }
        return parentId;
    }

    /* ---------- settings sync (Drive) ---------- */
    const SETTINGS_FILE_NAME = 'settings.json';

    async function findDriveFileByName(name) {
        const q = encodeURIComponent(`name='${name}' and '${driveFolderId}' in parents and trashed=false`);
        const res = await driveFetch(`https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name)`);
        const data = await res.json();
        return data.files && data.files.length ? data.files[0].id : null;
    }

    function collectSettings() {
        const visibleStats = {};
        Object.keys(checkboxes).forEach(key => { visibleStats[key] = localStorage.getItem(`show-${key}`); });
        return {
            themeMode: localStorage.getItem('themeMode') || 'auto',
            autosave: localStorage.getItem('autosave'),
            fontSize: localStorage.getItem('fontSize'),
            lineHeightRelaxed: localStorage.getItem('lineHeightRelaxed'),
            editorFont: localStorage.getItem('editorFont'),
            charLimit: localStorage.getItem('charLimit'),
            limitOptionId: localStorage.getItem('limitOptionId'),
            focusMode: localStorage.getItem('focusMode'),
            customGoals: localStorage.getItem('customGoals'),
            visibleStats
        };
    }

    function applySettings(settings) {
        if (!settings || typeof settings !== 'object') return;
        if (settings.themeMode) setTheme(settings.themeMode);
        if (settings.autosave != null) {
            autosaveEnabled = settings.autosave === 'true';
            autosaveToggle.checked = autosaveEnabled;
            localStorage.setItem('autosave', autosaveEnabled);
        }
        if (settings.fontSize) {
            fontSizeSlider.value = settings.fontSize;
            setFontSize(settings.fontSize);
        }
        if (settings.lineHeightRelaxed != null) {
            lineHeightToggle.checked = settings.lineHeightRelaxed === 'true';
            setLineHeight(lineHeightToggle.checked);
        }
        if (settings.editorFont) setEditorFont(settings.editorFont);
        if (settings.customGoals) {
            try { customGoals = JSON.parse(settings.customGoals) || []; } catch { customGoals = []; }
            localStorage.setItem('customGoals', JSON.stringify(customGoals));
            renderCustomGoals();
        }
        if (settings.limitOptionId) {
            const btn = limitDropdownMenu.querySelector(`button[data-limit-id="${settings.limitOptionId}"]`);
            if (btn) selectLimitOption(btn);
        }
        if (settings.focusMode != null) setFocusMode(settings.focusMode === 'true');
        if (settings.visibleStats) {
            Object.entries(settings.visibleStats).forEach(([key, val]) => {
                if (val != null && checkboxes[key]) {
                    checkboxes[key].checked = val === 'true';
                    localStorage.setItem(`show-${key}`, val);
                }
            });
            updateCounts();
        }
    }

    async function saveSettingsToDrive() {
        if (!isDriveActive()) return;
        try {
            const fileId = await findDriveFileByName(SETTINGS_FILE_NAME);
            const metadata = fileId ? { name: SETTINGS_FILE_NAME } : { name: SETTINGS_FILE_NAME, parents: [driveFolderId] };
            const boundary = `ccpro-${Math.random().toString(36).slice(2)}`;
            const body = `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n`
                + `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(collectSettings())}\r\n--${boundary}--`;
            const url = fileId
                ? `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=multipart`
                : 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';
            await driveFetch(url, {
                method: fileId ? 'PATCH' : 'POST',
                headers: { 'Content-Type': `multipart/related; boundary=${boundary}` },
                body
            });
        } catch { /* best-effort; local settings remain the source of truth if this fails */ }
    }

    async function loadSettingsFromDrive() {
        const fileId = await findDriveFileByName(SETTINGS_FILE_NAME);
        if (!fileId) { await saveSettingsToDrive(); return; }
        const res = await driveFetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`);
        applySettings(await res.json());
    }

    let settingsSyncTimer;
    function scheduleSettingsSync() {
        if (!isDriveActive()) return;
        clearTimeout(settingsSyncTimer);
        settingsSyncTimer = setTimeout(saveSettingsToDrive, 800);
    }

    async function driveListDocuments() {
        const q = encodeURIComponent(`'${driveFolderId}' in parents and trashed=false`);
        const res = await driveFetch(`https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name,modifiedTime)&orderBy=modifiedTime desc`);
        const data = await res.json();
        return (data.files || []).map(f => ({
            id: f.id,
            name: f.name,
            updatedAt: new Date(f.modifiedTime).getTime(),
            content: null,
            isDrive: true
        }));
    }

    async function driveGetContent(fileId) {
        const res = await driveFetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`);
        // Legacy Drive files saved before the rich-text migration are plain
        // text; plainTextToEditableHtml() is a no-op if this is already HTML.
        return plainTextToEditableHtml(await res.text());
    }

    async function driveSaveDocument(doc) {
        const boundary = `ccpro-${Math.random().toString(36).slice(2)}`;
        const metadata = doc.id ? { name: doc.name } : { name: doc.name, parents: [driveFolderId] };
        const body = `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n`
            + `--${boundary}\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n${doc.content}\r\n--${boundary}--`;
        const url = doc.id
            ? `https://www.googleapis.com/upload/drive/v3/files/${doc.id}?uploadType=multipart`
            : 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';
        const res = await driveFetch(url, {
            method: doc.id ? 'PATCH' : 'POST',
            headers: { 'Content-Type': `multipart/related; boundary=${boundary}` },
            body
        });
        const saved = await res.json();
        return { id: saved.id, name: doc.name, content: doc.content, updatedAt: Date.now(), isDrive: true };
    }

    async function driveRenameDocument(id, name) {
        await driveFetch(`https://www.googleapis.com/drive/v3/files/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });
    }

    async function driveDeleteDocument(fileId) {
        await driveFetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, { method: 'DELETE' });
    }

    function updateDriveUI() {
        const connected = isDriveActive();
        connectDriveBtn.classList.toggle('hidden', connected);
        disconnectDriveBtn.classList.toggle('hidden', !connected);
        driveFolderRow.classList.toggle('hidden', !connected);
        if (connected) driveFolderInput.value = getDriveFolderPath();
        driveStatusText.textContent = connected
            ? `Saved documents are stored in "${getDriveFolderPath()}" in your Google Drive.`
            : "Saved documents are kept in this browser's IndexedDB storage, separate from the draft above - still local to this device until you connect Drive.";
    }

    function disconnectDrive() {
        driveAccessToken = null;
        driveFolderId = null;
        storageBackend = 'local';
        localStorage.setItem('storageBackend', 'local');
        updateDriveUI();
        renderDocuments();
        showToast('info', 'Disconnected from Google Drive');
    }

    async function connectGoogleDrive() {
        if (!isDriveConfigured()) {
            showToast('error', "Google Drive isn't set up yet - add a Client ID in script.js first");
            return;
        }
        try {
            await loadGoogleIdentityScript();
        } catch {
            showToast('error', 'Could not load Google sign-in - check your connection');
            return;
        }
        if (!driveTokenClient) {
            driveTokenClient = window.google.accounts.oauth2.initTokenClient({
                client_id: GOOGLE_CLIENT_ID,
                scope: DRIVE_SCOPE,
                callback: async (resp) => {
                    if (resp.error) { showToast('error', 'Google sign-in was cancelled or failed'); return; }
                    driveAccessToken = resp.access_token;
                    try {
                        driveFolderId = await ensureDriveFolder(getDriveFolderPath());
                        storageBackend = 'drive';
                        localStorage.setItem('storageBackend', 'drive');
                        updateDriveUI();
                        renderDocuments();
                        showToast('success', 'Connected to Google Drive');
                        try { await loadSettingsFromDrive(); } catch { /* local settings stay in effect */ }
                    } catch {
                        showToast('error', 'Connected, but could not set up the Drive folder');
                    }
                }
            });
        }
        driveTokenClient.requestAccessToken();
    }

    connectDriveBtn.addEventListener('click', connectGoogleDrive);
    disconnectDriveBtn.addEventListener('click', disconnectDrive);

    driveFolderInput.addEventListener('change', async () => {
        const path = driveFolderInput.value.trim() || DRIVE_FOLDER_NAME;
        driveFolderInput.value = path;
        localStorage.setItem('driveFolderPath', path);
        if (!isDriveActive()) return;
        driveFolderInput.disabled = true;
        try {
            driveFolderId = await ensureDriveFolder(path);
            updateDriveUI();
            renderDocuments();
            showToast('success', `Now saving to "${path}" in Drive`);
        } catch {
            showToast('error', 'Could not switch to that Drive folder');
        } finally {
            driveFolderInput.disabled = false;
        }
    });

    /* ---------- unified document store ---------- */
    const DocStore = {
        async list() {
            if (isDriveActive()) {
                try { return await driveListDocuments(); }
                catch { showToast('error', 'Could not reach Google Drive'); return []; }
            }
            return idbGetAll();
        },
        async save(doc) {
            if (isDriveActive()) return driveSaveDocument(doc);
            const saved = { ...doc, id: doc.id || Date.now().toString(36) };
            await idbPut(saved);
            return saved;
        },
        async rename(id, name) {
            if (isDriveActive()) { await driveRenameDocument(id, name); return; }
            const docs = await idbGetAll();
            const doc = docs.find(d => d.id === id);
            if (!doc) return;
            doc.name = name;
            doc.updatedAt = Date.now();
            await idbPut(doc);
        },
        async delete(id) {
            if (isDriveActive()) return driveDeleteDocument(id);
            return idbDelete(id);
        }
    };

    /* ---------- documents (multi-document workspace) ---------- */
    let activeDocId = null;
    let documentsCache = [];

    function timeAgo(ts) {
        const mins = Math.floor((Date.now() - ts) / 60000);
        if (mins < 1) return 'just now';
        if (mins < 60) return `${mins}m ago`;
        const hours = Math.floor(mins / 60);
        if (hours < 24) return `${hours}h ago`;
        return `${Math.floor(hours / 24)}d ago`;
    }

    async function renderDocuments() {
        documentsCache = (await DocStore.list()).sort((a, b) => b.updatedAt - a.updatedAt);
        documentsList.innerHTML = '';
        documentsEmpty.classList.toggle('hidden', documentsCache.length !== 0);
        documentsBtn.classList.toggle('attn', documentsCache.length > 0);

        documentsCache.forEach(doc => {
            const li = document.createElement('li');
            li.classList.toggle('active-doc', doc.id === activeDocId);

            const info = document.createElement('div');
            info.className = 'doc-info';
            const name = document.createElement('span');
            name.className = 'doc-name';
            name.textContent = doc.name;
            const wordTotal = doc.content != null ? (htmlToPlainText(doc.content).match(/[\p{L}\p{M}]+/gu) || []).length : null;
            const meta = document.createElement('span');
            meta.className = 'doc-meta';
            meta.textContent = [doc.isDrive ? 'Drive' : null, wordTotal !== null ? `${wordTotal} words` : null, timeAgo(doc.updatedAt)]
                .filter(Boolean).join(' · ');
            info.append(name, meta);
            info.addEventListener('click', () => loadDocument(doc.id));

            const actions = document.createElement('div');
            actions.className = 'doc-actions';

            const renameBtn = document.createElement('button');
            renameBtn.className = 'doc-action-btn';
            renameBtn.title = 'Rename';
            renameBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>';
            renameBtn.addEventListener('click', (e) => { e.stopPropagation(); renameDocument(doc.id, doc.name); });

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'doc-action-btn delete';
            deleteBtn.title = 'Delete';
            deleteBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M9 7V4h6v3M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13"/></svg>';
            deleteBtn.addEventListener('click', (e) => { e.stopPropagation(); deleteDocument(doc.id, doc.name); });

            actions.append(renameBtn, deleteBtn);
            li.append(info, actions);
            documentsList.appendChild(li);
        });
    }

    async function loadDocument(id) {
        const meta = documentsCache.find(d => d.id === id);
        if (!meta) return;
        let content = meta.content;
        if (content === null || content === undefined) {
            try { content = await driveGetContent(id); }
            catch { showToast('error', 'Could not load this document from Drive'); return; }
        } else {
            content = plainTextToEditableHtml(content);
        }
        textInput.innerHTML = content;
        activeDocId = id;
        documentTitleInput.value = meta.name;
        updateCounts();
        snapshotHistory(textInput.innerHTML);
        closeActivePanel();
        showToast('success', `Loaded "${meta.name}"`);
    }

    async function renameDocument(id, currentName) {
        const name = window.prompt('Rename document', currentName);
        if (!name || !name.trim()) return;
        const trimmed = name.trim().slice(0, 60);
        await DocStore.rename(id, trimmed);
        if (id === activeDocId) documentTitleInput.value = trimmed;
        renderDocuments();
        showToast('success', 'Document renamed');
    }

    async function deleteDocument(id, name) {
        if (!window.confirm(`Delete "${name}"? This can't be undone.`)) return;
        await DocStore.delete(id);
        if (activeDocId === id) activeDocId = null;
        renderDocuments();
        showToast('info', 'Document deleted');
    }

    documentsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        renderDocuments();
        if (!saveAsInput.value.trim() && documentTitleInput.value.trim()) {
            saveAsInput.value = documentTitleInput.value.trim();
        }
        documentsPanel.classList.contains('show') ? closeActivePanel() : openDrawer(documentsPanel);
    });
    documentsClose.addEventListener('click', closeActivePanel);

    newDocumentBtn.addEventListener('click', () => {
        textInput.innerHTML = '';
        activeDocId = null;
        documentTitleInput.value = '';
        draftTitle = '';
        localStorage.removeItem('draftTitle');
        updateCounts();
        snapshotHistory(textInput.innerHTML);
        renderDocuments();
        closeActivePanel();
        showToast('info', 'Started a new blank document');
    });

    saveAsBtn.addEventListener('click', async () => {
        const name = saveAsInput.value.trim() || documentTitleInput.value.trim();
        if (!name) { showToast('error', 'Give your document a name first'); return; }
        const saved = await DocStore.save({ name: name.slice(0, 60), content: textInput.innerHTML, updatedAt: Date.now() });
        activeDocId = saved.id;
        documentTitleInput.value = name.slice(0, 60);
        draftTitle = '';
        localStorage.removeItem('draftTitle');
        saveAsInput.value = '';
        renderDocuments();
        showToast('success', `Saved "${name}"`);
    });

    saveAsInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') saveAsBtn.click(); });

    /* ---------- document title (toolbar) ---------- */
    let draftTitle = localStorage.getItem('draftTitle') || '';
    let titleRenameTimer;

    documentTitleInput.addEventListener('input', () => {
        if (activeDocId) {
            clearTimeout(titleRenameTimer);
            titleRenameTimer = setTimeout(async () => {
                const name = documentTitleInput.value.trim();
                if (!name) return;
                await DocStore.rename(activeDocId, name.slice(0, 60));
                renderDocuments();
            }, 500);
        } else {
            draftTitle = documentTitleInput.value;
            localStorage.setItem('draftTitle', draftTitle);
        }
    });

    /* ---------- command palette ---------- */
    let cpFiltered = [];
    let cpActiveIndex = 0;

    const cpCommands = [
        { label: 'Save now', shortcut: 'Ctrl+S', action: manualSave },
        { label: 'Save status & storage', action: () => lastSaved.click() },
        { label: 'Toggle autosave', action: () => autosaveToggle.click() },
        { label: 'Cycle theme (light / dark / auto)', shortcut: 'Ctrl+Alt+T', action: () => darkModeToggle.click() },
        { label: 'Toggle focus mode', shortcut: 'Ctrl+Alt+F', action: () => focusModeToggle.click() },
        { label: 'Open settings', shortcut: 'Ctrl+,', action: () => openDrawer(settingsPanel) },
        { label: 'Open documents', shortcut: 'Ctrl+Alt+D', action: () => { renderDocuments(); openDrawer(documentsPanel); } },
        { label: 'New blank document', action: () => newDocumentBtn.click() },
        { label: 'Copy text to clipboard', shortcut: 'Ctrl+Alt+C', action: () => copyBtn.click() },
        { label: 'Clear all text', shortcut: 'Ctrl+Alt+X', action: () => clearBtn.click() },
        { label: 'Import a text file', shortcut: 'Ctrl+Alt+I', action: () => uploadBtn.click() },
        { label: 'Open export menu', shortcut: 'Ctrl+Alt+E', action: () => document.getElementById('export-dropdown-btn').click() },
        { label: 'Download as .txt', action: () => handleExport('txt') },
        { label: 'Download as .md', action: () => handleExport('md') },
        { label: 'Download as .pdf', action: () => handleExport('pdf') },
        { label: 'Download as .doc (Word)', action: () => handleExport('doc') },
        { label: 'Copy stats report', action: () => handleExport('report') },
        { label: 'Copy shareable link', action: () => handleExport('share') },
        { label: 'Find & Replace', shortcut: 'Ctrl+F', action: showFindReplace },
        { label: 'Undo', shortcut: 'Ctrl+Z', action: undo },
        { label: 'Redo', shortcut: 'Ctrl+Shift+Z', action: redo },
        { label: 'Open case menu', shortcut: 'Ctrl+Alt+U', action: () => document.getElementById('case-dropdown-btn').click() },
        { label: 'Convert to UPPERCASE', action: () => applyCase('upper') },
        { label: 'Convert to lowercase', action: () => applyCase('lower') },
        { label: 'Convert to Title Case', action: () => applyCase('title') },
        { label: 'Convert to Sentence case', action: () => applyCase('sentence') },
        { label: 'Capitalize every word', action: () => applyCase('capitalize') },
        { label: 'Reset settings to defaults', action: () => resetSettingsBtn.click() }
    ];

    function renderCommandList(filter) {
        const q = filter.trim().toLowerCase();
        cpFiltered = cpCommands.filter(c => c.label.toLowerCase().includes(q));
        commandPaletteList.innerHTML = '';

        if (cpFiltered.length === 0) {
            const li = document.createElement('li');
            li.className = 'cp-empty';
            li.textContent = 'No matching commands';
            commandPaletteList.appendChild(li);
            return;
        }

        cpFiltered.forEach((cmd, i) => {
            const li = document.createElement('li');
            li.dataset.index = i;
            if (i === cpActiveIndex) li.classList.add('active');
            const label = document.createElement('span');
            label.textContent = cmd.label;
            li.appendChild(label);
            if (cmd.shortcut) {
                const kbd = document.createElement('span');
                kbd.className = 'cp-shortcut';
                kbd.textContent = cmd.shortcut;
                li.appendChild(kbd);
            }
            li.addEventListener('click', () => runCommand(cmd));
            li.addEventListener('mouseenter', () => setActiveCommandIndex(i));
            commandPaletteList.appendChild(li);
        });
    }

    function setActiveCommandIndex(i) {
        cpActiveIndex = i;
        commandPaletteList.querySelectorAll('li').forEach(li => {
            li.classList.toggle('active', Number(li.dataset.index) === i);
        });
    }

    function moveCommandSelection(delta) {
        if (!cpFiltered.length) return;
        cpActiveIndex = (cpActiveIndex + delta + cpFiltered.length) % cpFiltered.length;
        setActiveCommandIndex(cpActiveIndex);
        const activeLi = commandPaletteList.querySelector('li.active');
        if (activeLi) activeLi.scrollIntoView({ block: 'nearest' });
    }

    function runCommand(cmd) {
        closeActivePanel();
        cmd.action();
    }

    function openCommandPalette() {
        openModal(commandPalette);
        commandPaletteInput.value = '';
        cpActiveIndex = 0;
        renderCommandList('');
        setTimeout(() => commandPaletteInput.focus(), 50);
    }

    commandPaletteBtn.addEventListener('click', openCommandPalette);

    commandPaletteInput.addEventListener('input', () => {
        cpActiveIndex = 0;
        renderCommandList(commandPaletteInput.value);
    });

    commandPaletteInput.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); moveCommandSelection(1); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); moveCommandSelection(-1); }
        else if (e.key === 'Enter') {
            e.preventDefault();
            if (cpFiltered[cpActiveIndex]) runCommand(cpFiltered[cpActiveIndex]);
        }
    });

    /* ---------- init ---------- */
    documentTitleInput.value = draftTitle;
    textInput.innerHTML = plainTextToEditableHtml(localStorage.getItem('content') || '');

    if (location.hash.startsWith('#share=')) {
        try {
            textInput.innerHTML = sanitizeHtml(plainTextToEditableHtml(base64ToUtf8(decodeURIComponent(location.hash.slice(7)))));
            history.replaceState(null, '', location.pathname + location.search);
            showToast('info', 'Loaded shared text');
        } catch {
            showToast('error', 'Could not load shared link');
        }
    }

    setTheme(themeMode);

    Object.keys(checkboxes).forEach(key => {
        const stored = localStorage.getItem(`show-${key}`);
        checkboxes[key].checked = stored === null ? true : stored === 'true';
    });

    autosaveToggle.checked = autosaveEnabled;

    const storedFontSize = Number(localStorage.getItem('fontSize')) || 18;
    fontSizeSlider.value = storedFontSize;
    setFontSize(storedFontSize);

    const storedLineHeight = localStorage.getItem('lineHeightRelaxed') === 'true';
    lineHeightToggle.checked = storedLineHeight;
    setLineHeight(storedLineHeight);

    const storedEditorFont = localStorage.getItem('editorFont') || 'ui';
    setEditorFont(storedEditorFont);

    renderCustomGoals();
    const storedLimitOptionId = localStorage.getItem('limitOptionId') || 'none';
    const storedLimitBtn = limitDropdownMenu.querySelector(`button[data-limit-id="${storedLimitOptionId}"]`)
        || limitDropdownMenu.querySelector('button[data-limit-id="none"]');
    if (storedLimitBtn) {
        limitDropdownMenu.querySelectorAll('button[data-limit-id]').forEach(b => b.classList.toggle('selected', b === storedLimitBtn));
        limitDropdownLabel.textContent = storedLimitBtn.textContent;
        currentLimit = Number(storedLimitBtn.dataset.limit) || 0;
    }

    if (storedFocusMode) setFocusMode(true);

    updateDriveUI();
    migrateLegacyDocuments().then(renderDocuments);

    history = [textInput.innerHTML];
    historyIndex = 0;
    updateUndoRedoButtons();
    lastSavedContent = textInput.innerHTML;

    updateCounts();

    requestAnimationFrame(() => {
        restoreScroll(textInput, 'editorScrollTop');
        restoreScroll(analyticsPanel, 'analyticsScrollTop');
        const savedOffset = localStorage.getItem('cursorOffset');
        if (savedOffset !== null && setCursorOffset(Number(savedOffset))) {
            textInput.focus();
        }
    });
});
