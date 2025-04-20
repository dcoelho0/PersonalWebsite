const terminalLine = `
    <span class="user">unknown</span><span class="host">@dcoelho0:</span><span class="dir">~</span><span class="user-type">$</span>
`;

export function typeLine(lineHTML, targetId, delay=100, callback) {
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
	    if (callback) callback(lineDiv);
	}
    }

    typeChar();
}

export function initTerminalInput(targetId) {
    const container = document.getElementById(targetId);
    addInputLine();
 
    function addInputLine() {
        const lineDiv = document.createElement("div");
	lineDiv.classList.add('terminal-line');
	
	lineDiv.innerHTML = `<span class="user">unknown</span><span class="host">@dcoelho0:</span><span class="dir">~</span><span class="user-type">$</span><input type="text" class="terminal-input" autofocus />`;

	container.appendChild(lineDiv);
	container.scrollTop = container.scrollHeight;
	
	const input = lineDiv.querySelector('input');
	input.focus();

	input.addEventListener('keydown', (e) => {
	    if (e.key === "Enter") {
	        const value = input.value;
		const output = document.createElement("span");
		output.textContent = value;
		output.classList.add('terminal-output');

		input.parentNode.replaceChild(output, input);

		addInputLine();
	    }
	});
    }
}

export function replaceWithInputLine(lineDiv, targetId) {
    const inputLine = document.createElement("div");
    inputLine.classList.add("terminal-line");
    inputLine.innerHTML = `<span class="user">unknown</span><span class="host">@dcoelho0:</span><span class="dir">~</span><span class="user-type">$</span><input type="text" class="terminal-input" autofocus />`;
    
    lineDiv.replaceWith(inputLine);
    const container = document.getElementById(targetId);

    const input = inputLine.querySelector('input');
    input.focus();

    input.addEventListener('keydown', (e) => {
        if (e.key == "Enter") {
	    const value = input.value;
	    const output = document.createElement("span");
	    output.classList.add("terminal-output");
	    output.textContent = value;

	    input.replaceWith(output);

	    addInputLine(targetId);
	}
    });
}

export function addInputLine(targetId) {
    const container = document.getElementById(targetId);
    const lineDiv = document.createElement("div");
    lineDiv.classList.add("terminal-line");

    lineDiv.innerHTML = `<span class="user">unknown</span><span class="host">@dcoelho0:</span><span class="dir">~</span><span class="user-type">$</span><input type="text" class="terminal-input" autofocus />`;
    
    container.appendChild(lineDiv);
    
    const input = lineDiv.querySelector("input");
    input.focus();

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
	    const value = input.value;
	    const output = document.createElement("span");
	
	    output.classList.add("terminal-output");
	    output.textContent = value;
	
	    input.replaceWith(output);
	    
	    addInputLine(targetId);
	}
    });

    container.scrollTop = container.scrollHeight;
}

export { terminalLine };
