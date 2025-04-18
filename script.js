import { phrases } from './resources.js';

function detectLanguage() {
    const preference = navigator.language;
    if (phrases.hasOwnProperty(preference)) {
        return preference;
    }
    const baseLang = preference.split('-')[0];
    const fallbackKey = Object.keys(phrases).find(key => key.startsWith(baseLang));
    return fallbackKey || "en-US";
}

function detectDarkMode() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 1; // prefers dark mode 
    } else {
        return 0; // has no dark mode  
    }
}
 
function writesText() {
    const placeholder = document.getElementById("loading-text");
    placeholder.innerHTML = "Detecting system language...";

    setTimeout(() => {
        const language = detectLanguage(); 
        if (phrases.hasOwnProperty(language)) {
            phrases[language].forEach((item, index) => {
                setTimeout(() => {
                    placeholder.innerHTML = item;
                }, index * 3000);
            });
        }
    }, 3000);
} 

writesText();
