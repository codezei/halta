// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'

document.addEventListener('DOMContentLoaded', () => {
	mobMenuToggle ()
	// Custom JS
	toggleJoinItems ()
	// faq ()
	
	stickyHeader ()
	customSelect()
	valuesSlider()
	teamSlider()

	toggleFaqItems('.faqs__item-question')
	toggleFaqItems('.faq__item-question')
	toggleFaqCategories('.faq__category', '.faq__item')
})


function toggleJoinItems () {
	let itemsLinks = document.querySelectorAll('.join__item-btn')
	let activeItem = document.querySelector('.join__item.active')
	if (!itemsLinks.length) return
	for(let i = 0; i < itemsLinks.length; i++) {
		itemsLinks[i].addEventListener('click', function (e) {
			e.preventDefault();
			if (e.currentTarget.parentElement === activeItem) {
				location.href = e.currentTarget.href
			} else {
				activeItem.classList.remove('active')
				activeItem = e.currentTarget.parentElement
				activeItem.classList.add('active')
			}
		})
	}
}

function toggleFaqItems (faqItemsQuestion) {
	let questions = document.querySelectorAll(faqItemsQuestion)
	if (!questions.length) return
	let activeQuestion 

	for(let i = 0; i < questions.length; i++) {
		questions[i].addEventListener('click', function (e) {
			if (activeQuestion) {
				activeQuestion.classList.remove('active')
			}
			activeQuestion = e.currentTarget.parentElement
			activeQuestion.classList.add('active')
		})
	}

}
function toggleFaqCategories (faqCategories, faqItems) {
	let categories = document.querySelectorAll(faqCategories)
	if (!categories.length) return
	let items = document.querySelectorAll(faqItems)
	let activeCategory = categories[0]
	activeCategory.classList.add('active')
	for(let k = 0; k < categories.length; k++) {
		categories[k].addEventListener('click', function (e) {
			if (activeCategory) {
				activeCategory.classList.remove('active')
			}
			activeCategory = e.currentTarget
			activeCategory.classList.add('active')
			filterItems(items, activeCategory)
		})
	}

	function filterItems (filteringItems, flteringActiveCategory) {
		for(let c = 0; c < filteringItems.length; c++) {
			if (flteringActiveCategory.dataset.category === filteringItems[c].dataset.category) {
				filteringItems[c].style.display = ''
		   }  else if (flteringActiveCategory.dataset.category === 'all') {
				filteringItems[c].style.display = ''
		   } else {
				filteringItems[c].style.display = 'none'
		   }

	   }
	}
}

// function faq () {
// 	let faqItems = document.querySelectorAll('.faq__item')
// 	if (!faqItems.length) return
// 	let faqQuestions = document.querySelectorAll('.faq__item-question')
// 	let faqCategories = document.querySelectorAll('.faq__category')
// 	let activeCategory = faqCategories[0]
// 	let activeQuestion = faqItems[0]
// 	let filteringFaqQuestions = []

// 	activeCategory.classList.add('active')
// 	activeQuestion.classList.add('active')


// 	for(let i = 0; i < faqQuestions.length; i++) {
// 		faqQuestions[i].addEventListener('click', function (e) {
// 			activeQuestion.classList.remove('active')
// 			activeQuestion = e.currentTarget.parentElement
// 			activeQuestion.classList.add('active')
// 		})
// 	}


// 	for(let k = 0; k < faqCategories.length; k++) {
// 		faqCategories[k].addEventListener('click', function (e) {
// 			activeCategory.classList.remove('active')
// 			activeCategory = e.currentTarget
// 			activeCategory.classList.add('active')
// 			filteringFaqQuestions = []

// 			for(let c = 0; c < faqItems.length; c++) {
// 				 if (activeCategory.dataset.category === faqItems[c].dataset.category) {
// 					faqItems[c].style.display = ''
// 					filteringFaqQuestions.push(faqItems[c])
// 					activeQuestion.classList.remove('active')
// 					activeQuestion = filteringFaqQuestions[0]
// 					activeQuestion.classList.add('active')
// 				}  else if (activeCategory.dataset.category === 'all') {
// 					faqItems[c].style.display = ''
// 					activeQuestion.classList.remove('active')
// 					activeQuestion = faqItems[0]
// 					activeQuestion.classList.add('active')
// 				} else {
// 					faqItems[c].style.display = 'none'
// 				}

// 			}
// 		})
// 	}

// }

// мобильное меню
function mobMenuToggle () {

	let btn = document.querySelector('.header__navigation-btn-menu')
	let menu = document.querySelector('.header__navigation')
	let header = document.querySelector('.header')
	btn.addEventListener('click', function (e) {
		btn.classList.toggle('active')
		menu.classList.toggle('active')
		header.classList.toggle('active')
	})
}

function stickyHeader () {
	let header = document.querySelector('.header')

	if (document.body.getBoundingClientRect().top < 0) {
		header.classList.add('sticky')
	} else {
		header.classList.remove('sticky')
	}
	
	document.addEventListener('scroll', function () {
		if (document.body.getBoundingClientRect().top < 0) {
			header.classList.add('sticky')
		} else {
			header.classList.remove('sticky')
		}
		
	})
}


function customSelect() {
	let select = document.querySelectorAll('.select')
	if (!select.length) return
	for(let i = 0; i < select.length; i++) {
		select[i].addEventListener('click', function (e) {
			e.currentTarget.classList.toggle('open')
		})
	}

}

function valuesSlider() {
	let swiper = new Swiper(".values-slider", {
		slidesPerView: 1,
		spaceBetween: 40,
		navigation: {
			nextEl: ".values-button-next",
			prevEl: ".values-button-prev",
		},
		pagination: {
			el: ".values-pagination",
			clickable: true,
			renderBullet: function (index, className) {
				let preValue = ''	
				if ( index < 9) {
					preValue = '0'
				} else {
					preValue = ''
				}

			  return '<div class="' + className + '">' + preValue + (index + 1) + "</div>";
			},
		  },


		// breakpoints: {
		// 	992: {
		// 		slidesPerView: 1,
		// 	},
		// }
	});
}

function teamSlider() {
	let swiper = new Swiper(".team-slider", {
		slidesPerView: 1,
		spaceBetween: 32,
		navigation: {
			nextEl: ".team-button-next",
			prevEl: ".team-button-prev",
		},
		// breakpoints: {
		// 	991: {
		// 		slidesPerView: 2,
		// 		spaceBetweenSlides: 0
		// 	},
		// }
	});
}