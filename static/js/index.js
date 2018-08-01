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