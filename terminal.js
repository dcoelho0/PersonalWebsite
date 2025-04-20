const terminalLine = `
    <span class="user">unknown</span><span class="host">@dcoelho0:</span><span class="dir">~</span><span class="user-type">$<span>
`;

export function typeLine(lineHTML, targetId, delay=100) {
    const container = document.getElementById(targetId);
    const lineDiv = document.createElement("div");

    lineDiv.classList.add("terminal-line");
    container.appendChild(lineDiv);

    const temp = document.createElement("div");
    temp.innerHTML = lineHTML;

    const fullText = temp.textContent;

    let charIndex = 0;
    const typingSpan = document.createElement("span");
    typingSpan.classList.add("typing-line");
    lineDiv.appendChild(typingSpan);

    function typeChar() {
        if (charIndex <= fullText.length) {
	    typingSpan.textContent = fullText.substring(0, charIndex);
	    charIndex++;
	    setTimeout(typeChar, delay);
	} else {
	    typingSpan.classList.remove("typing-line");
	}
    }

    typeChar();
}

export { terminalLine };
