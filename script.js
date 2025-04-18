phrases = {
    "en-US": [
        "Detecting dark mode preference...",
        "Loading database...",
        "Setting up interface...",
        "Finishing it up..."
    ]
}

function detectLanguage() {
    preference = navigator.language;
    return preference;
}

function detectDarkMode() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 1; // prefers dark mode 
    } else {
        return 0; // has no dark mode  
    }
}
 
function writesText() {
    placeholder = document.getElementById("loading-text");
    placeholder.innerHTML = "Detecting system language...";

    setTimeout(() => {
        language = detectLanguage(); 
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
