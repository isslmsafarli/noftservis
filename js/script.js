(function(){
	// Store navigation heights to avoid recalculation
	let navHeights = { p1: 0, p2: 0 };
	
	function applyOffsets(){
		var p1 = document.querySelector('.nav-p1-bg');
		var p2 = document.querySelector('.nav-p2-bg');
		var main = document.querySelector('main');
		if(!p1 || !p2 || !main) return;

		// Only recalculate if heights have changed
		var p1Height = p1.offsetHeight;
		var p2Inner = document.querySelector('.nav-p2');
		var p2Height = p2Inner ? p2Inner.offsetHeight : p2.offsetHeight;
		
		// Check if heights actually changed
		if (navHeights.p1 !== p1Height || navHeights.p2 !== p2Height) {
			navHeights.p1 = p1Height;
			navHeights.p2 = p2Height;
			
			p2.style.top = p1Height + 'px';
			main.style.marginTop = (p1Height + p2Height) + 'px';
		}
	}

	// Apply offsets once on DOM ready
	document.addEventListener('DOMContentLoaded', applyOffsets);
	window.addEventListener('resize', applyOffsets);
	
	// Smooth scroll restoration for better page transitions
	if ('scrollRestoration' in history) {
		history.scrollRestoration = 'auto';
	}

	// Init Swiper after load so it can size with correct offsets
	window.addEventListener('load', function(){
		if(window.Swiper){
			new Swiper('.hero-swiper', {
				loop: true,
				speed: 700,
				autoplay: {
					delay: 3000,
					disableOnInteraction: false
				},
				pagination: {
					el: '.hero-swiper .swiper-pagination',
					clickable: true
				},
				navigation: {
					nextEl: '.hero-swiper .swiper-button-next',
					prevEl: '.hero-swiper .swiper-button-prev'
				},
				grabCursor: true
			});
		}
	});

	// Hamburger Menu Functionality
	window.addEventListener('load', function(){
		const hamburgerMenu = document.getElementById('hamburger-menu');
		const mobileMenu = document.getElementById('mobile-menu');
		const mobileMenuClose = document.getElementById('mobile-menu-close');
		
		if(hamburgerMenu && mobileMenu){
			hamburgerMenu.addEventListener('click', function(){
				hamburgerMenu.classList.toggle('active');
				mobileMenu.classList.toggle('active');
			});
			
			// Close menu when clicking close button
			if(mobileMenuClose){
				mobileMenuClose.addEventListener('click', function(){
					hamburgerMenu.classList.remove('active');
					mobileMenu.classList.remove('active');
				});
			}
			
			// Close menu when clicking on a link
			const mobileMenuLinks = mobileMenu.querySelectorAll('a');
			mobileMenuLinks.forEach(link => {
				link.addEventListener('click', function(){
					hamburgerMenu.classList.remove('active');
					mobileMenu.classList.remove('active');
				});
			});
			
			// Close menu when clicking outside
			document.addEventListener('click', function(event){
				if(!hamburgerMenu.contains(event.target) && !mobileMenu.contains(event.target)){
					hamburgerMenu.classList.remove('active');
					mobileMenu.classList.remove('active');
				}
			});
		}
	});
})();


