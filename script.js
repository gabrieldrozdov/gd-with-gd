// Generative art header
const colors = ['pink', 'green', 'blue', 'yellow', 'purple', 'red'];
let colorIndex = 0;
function titleBubble() {
	let newBubble = document.createElement('div');
	newBubble.classList.add('home-title-bubble');
	newBubble.style.backgroundColor = `var(--${colors[colorIndex]})`;
	newBubble.style.left = Math.round(Math.random()*100) + "%";
	newBubble.style.top = Math.round(Math.random()*100) + "%";
	newBubble.style.width = Math.round(Math.random()*10+5) + "vw";
	newBubble.style.zIndex = Math.round(Math.random()*2);
	const homeTitle = document.querySelector('.home-title');
	homeTitle.appendChild(newBubble);
	setTimeout(() => {
		newBubble.style.opacity = 1;
	}, 50)
	setTimeout(() => {
		newBubble.style.opacity = 0;
		setTimeout(() => {
			newBubble.remove();
		}, 1000)
	}, Math.random()*5000+2500)
	colorIndex++;
	if (colorIndex >= colors.length) {
		colorIndex = 0;
	}
}
setInterval(titleBubble, 250);

// Favicon loop
let faviconNumber = 2;
function changeFavicon() {
	const link = document.querySelector("link[rel='icon']");
	link.href = `/assets/meta/favicon${faviconNumber}.png`;

	faviconNumber++;
	if (faviconNumber > 6) {
		faviconNumber = 1;
	}
}
setInterval(changeFavicon, 1000);

// URL title loop
function initializeTitle() {
	const title = document.querySelector("title");
	title.innerText = "GD with GD with GD with ";

	function changeTitle() {
		const title = document.querySelector("title");
		if (title.innerText[0] == " ") {
			title.innerText = title.innerText.substring(2, title.innerText.length) + " " + title.innerText[1];
		} else {
			title.innerText = title.innerText.substring(1, title.innerText.length) + title.innerText[0];
		}
	}
	setInterval(changeTitle, 1000);
}
initializeTitle();

// Helloooooo animation
let helloDirection = true;
function helloLoop() {
	const hello = document.querySelector('#home-intro-hello');
	if (helloDirection) {
		hello.innerText = hello.innerText.substring(0, hello.innerText.length - 1);
	} else {
		hello.innerText += "o";
	}
	
	if (hello.innerText.length == 0 || hello.innerText.length >= 12) {
		helloDirection = !helloDirection;
	}
}
setInterval(helloLoop, 150);

// Desc title animation
function initializeIntroTitle() {
	const colors = ['pink', 'green', 'blue', 'yellow', 'purple', 'red'];
	const homeIntroTitle = document.querySelector('#home-intro-title');
	let titleTemp = '';
	for (let letter of homeIntroTitle.innerText) {
		if (letter != " ") {
			titleTemp += `<span class="title-letter" data-colorindex="${colorIndex}" style="color: var(--${colors[colorIndex]});">${letter}</span>`;
			colorIndex++;
			if (colorIndex == colors.length) {
				colorIndex = 0;
			}
		} else {
			titleTemp += '<span>&nbsp;</span>';
		}
	}
	homeIntroTitle.innerHTML = titleTemp;

	function titleLoop() {
		for (let span of homeIntroTitle.querySelectorAll('.title-letter')) {
			let colorIndex = parseInt(span.dataset.colorindex);
			span.style.color = `var(--${colors[colorIndex]})`;
			colorIndex++;
			if (colorIndex == colors.length) {
				colorIndex = 0;
			}
			span.dataset.colorindex = colorIndex;
		}
	}
	titleLoop();
	setInterval(titleLoop, 500);
}
initializeIntroTitle();

// Project thumbnails
for (let homeProject of document.querySelectorAll('.home-project')) {
	const homeProjectThumbnails = document.querySelector('.home-project-thumbnails');
	let homeProjectThumbnailsIframe;
	homeProject.addEventListener('mouseenter', () => {
		homeProjectThumbnails.dataset.active = 1;
		homeProjectThumbnailsIframe = document.createElement('iframe');
		homeProjectThumbnailsIframe.src = homeProject.href;
		homeProjectThumbnailsIframe.dataset.active = 0;
		homeProjectThumbnails.appendChild(homeProjectThumbnailsIframe);
		setTimeout(() => {
			homeProjectThumbnailsIframe.dataset.active = 1;
		}, 200)
	})
	homeProject.addEventListener('mouseleave', () => {
		homeProjectThumbnails.dataset.active = 0;
		homeProjectThumbnailsIframe.dataset.active = 0;
		setTimeout(() => {
			homeProjectThumbnailsIframe.remove();
		}, 200)
	})
}

// Helper function to shuffle array
function shuffle(array) {
	let currentIndex = array.length, randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex > 0) {

		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
	}

	return array;
}

// Project colors
function setProjectColors() {
	let colors = ["red", "blue", "pink", "yellow", "purple", "green"];
	let colorOrder = shuffle(colors);
	let colorIndex1 = 0;
	for (let homeProject of document.querySelectorAll('.home-project')) {
		// Pick two colors to use for project color palette
		const remainingColors = colors.filter((_, index) => index !== colorIndex1);
		const colorIndex2 = Math.floor(Math.random()*remainingColors.length);
		const color1 = colors[colorIndex1];
		const color2 = remainingColors[colorIndex2];

		homeProject.style.setProperty('--primary', `var(--${color1})`);
		homeProject.style.setProperty('--secondary', `var(--${color2})`);

		colorIndex1++;
		if (colorIndex1 >= colorOrder.length) {
			colorIndex1 = 0;
		}
	}
}
setProjectColors();