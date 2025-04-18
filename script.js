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
 
function loadConfigs() {
    const placeholder = document.getElementById("loading-text");
    placeholder.innerHTML = "Detecting system language...";

    setTimeout(() => {
        const language = detectLanguage(); 
        if (phrases.hasOwnProperty(language)) {
            phrases[language].forEach((item, index) => {
                setTimeout(() => {
                    placeholder.innerHTML = item;
                    if (index == 0 && detectDarkMode() == 0) {
                        setTimeout(() => {
                            document.body.style.backgroundColor = "#F8F8FF";
                            const bar = document.querySelector(".loading-bar");
                            const progress = document.querySelector(".progress");
                            const messages = document.getElementById("loading-text");
                            bar.style.borderColor = "#111";
                            bar.style.backgroundColor = "rgba(0, 0, 0, 0.05)";
                            progress.style.backgroundColor = "#333";
                            messages.style.color = "#111";
                        }, 1200);
                    }
                }, index * 3000);
            });
        }
    }, 3000);
} 

loadConfigs();
