// When the user scrolls the page, execute myFunction 
window.onscroll = myFunction;

// Get the navbar
let navbar = document.querySelector('.navbar-sticky');

// Get the offset position of the navbar
let sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
	if (window.pageYOffset >= sticky) {
		navbar.classList.add('stick');
	} else {
		navbar.classList.remove('stick');
	}
}

let navbarToggle = document.querySelector('.navbar-toggle');
let navbarCollapse = document.querySelector('.navbar-collapse');
navbarToggle.onclick = function(){
	if(navbarCollapse.classList.contains('show')){
		navbarCollapse.classList.remove('show');
	} else {
		navbarCollapse.classList.add('show');
	}
}

// Click-to-load embeds. The third-party iframe is only created after a click.
document.querySelectorAll('.embed-facade').forEach(function (facade) {
	facade.addEventListener('click', function (e) {
		e.preventDefault();
		let iframe = document.createElement('iframe');
		iframe.src = facade.dataset.src;
		iframe.width = facade.dataset.width;
		iframe.height = facade.dataset.height;
		iframe.setAttribute('allowfullscreen', '');
		iframe.setAttribute('loading', 'lazy');
		iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
		if (facade.dataset.allow) {
			iframe.setAttribute('allow', facade.dataset.allow);
		}
		facade.replaceWith(iframe);
	});
});
