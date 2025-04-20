import { phrases } from './resources.js';
import { typeLine, terminalLine, initTerminalInput, replaceWithInputLine } from './terminal.js';

function detectLanguage() {
    // Detect the language and creates a fallback setting in case no equivalent is found
    const preference = navigator.language;
    if (phrases.hasOwnProperty(preference)) {
        return preference;
    }
    const baseLang = preference.split('-')[0];
    const fallbackKey = Object.keys(phrases).find(key => key.startsWith(baseLang));
    return fallbackKey || "en-US"; // falls back to en-US if lang not found
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
        const sequence = phrases[language] || phrases["en-US"];
	
	// this if makes sure the language is detected on presets(resources.js) and displays the phrases 
        if (phrases.hasOwnProperty(language)) {
            phrases[language].forEach((item, index) => {
                setTimeout(() => {
                    placeholder.innerHTML = item;
		    // this if changes the dark theme to light theme if the user has preference for light mode
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
		    // this if sets up the 'main-content' div on html doc which is the actual content of the website 
                    if (index == sequence.length - 1) {
                        setTimeout(() => {
			    // this if/else sets up the correct theme for the main-content div
			    if (detectDarkMode() == 0) {
			        document.getElementById("loader").style.display = "none";
				document.getElementById("main-content-light").style.display = "block";
				typeLine(terminalLine, "terminal-light-line", 40, (lineDiv) => {
				    replaceWithInputLine(lineDiv, "terminal-light-line");
				});
			    } else {
			        document.getElementById("loader").style.display = "none";
				document.getElementById("main-content-dark").style.display = "block";
			    }
                            document.title = "dcoelho0";
                        }, 3000);
                    }
                }, index * 3000);
            });
        }
    }, 3000);
} 

loadConfigs();

