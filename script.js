const colors = ['pink', 'green', 'blue', 'yellow', 'purple', 'red'];

const title = document.querySelector('#title');
let titleTemp = '';
let colorIndex = 0;
for (let letter of title.innerText) {
	if (letter != " ") {
		titleTemp += `<span class="title-letter" data-colorindex="${colorIndex}" style="color:var(--${colors[colorIndex]});">${letter}</span>`;
		colorIndex++;
		if (colorIndex == colors.length) {
			colorIndex = 0;
		}
	} else {
		titleTemp += '<span>&nbsp;</span>';
	}
}
title.innerHTML = titleTemp;

setInterval(titleLoop, 500);
function titleLoop() {
	for (let span of title.querySelectorAll('.title-letter')) {
		let colorIndex = parseInt(span.dataset.colorindex);
		span.style.color = `var(--${colors[colorIndex]})`;
		colorIndex++;
		if (colorIndex == colors.length) {
			colorIndex = 0;
		}
		span.dataset.colorindex = colorIndex;
	}
}