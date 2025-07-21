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
		newBubble.style.left = Math.round(Math.random()*100) + "%";
		newBubble.style.top = Math.round(Math.random()*100) + "%";
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
setInterval(titleBubble, 400);

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
// initializeTitle();

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
		if (window.innerWidth > 700) {
			homeProjectThumbnails.dataset.active = 1;
			homeProjectThumbnailsIframe = document.createElement('iframe');
			homeProjectThumbnailsIframe.src = homeProject.href;
			homeProjectThumbnailsIframe.dataset.active = 0;
			homeProjectThumbnails.appendChild(homeProjectThumbnailsIframe);
			setTimeout(() => {
				homeProjectThumbnailsIframe.dataset.active = 1;
			}, 50)
		}
	})
	homeProject.addEventListener('mouseleave', () => {
		if (window.innerWidth > 700) {
			homeProjectThumbnails.dataset.active = 0;
			homeProjectThumbnailsIframe.dataset.active = 0;
			setTimeout(() => {
				homeProjectThumbnailsIframe.remove();
			}, 50)
		}
	})
}

// Footer links
for (let homeProject of document.querySelectorAll('.home-footer-link')) {
	const homeProjectThumbnails = document.querySelector('.home-project-thumbnails');
	let homeProjectThumbnailsIframe;
	homeProject.addEventListener('mouseenter', () => {
		if (window.innerWidth > 700) {
			homeProjectThumbnails.dataset.active = 1;
			homeProjectThumbnailsIframe = document.createElement('iframe');
			homeProjectThumbnailsIframe.src = homeProject.href;
			homeProjectThumbnailsIframe.dataset.active = 0;
			homeProjectThumbnails.appendChild(homeProjectThumbnailsIframe);
			setTimeout(() => {
				homeProjectThumbnailsIframe.dataset.active = 1;
			}, 50)
		}
	})
	homeProject.addEventListener('mouseleave', () => {
		if (window.innerWidth > 700) {
			homeProjectThumbnails.dataset.active = 0;
			homeProjectThumbnailsIframe.dataset.active = 0;
			setTimeout(() => {
				homeProjectThumbnailsIframe.remove();
			}, 50)
		}
	})
}

// Project colors
function setProjectColors() {
	let colors = ["pink", "green", "blue", "yellow", "purple", "red"];
	let colorIndex = 0;
	for (let homeProject of document.querySelectorAll('.home-project')) {
		const color = colors[colorIndex];
		colorIndex++;
		if (colorIndex >= colors.length) {
			colorIndex = 0;
		}
		homeProject.style.setProperty('--primary', `var(--${color})`);
	}
}
setProjectColors();

// Scroll to projects
let homeIntroLink = document.querySelector('.home-intro-link');
homeIntroLink.addEventListener('click', (e) => {
	e.preventDefault();
	const targetElement = document.querySelector('#projects');
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
})