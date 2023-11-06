// // Import vendor jQuery plugin example
// import '~/app/js/wow.js'



document.addEventListener('DOMContentLoaded', () => {
	mobMenuToggle ()
	toggleJoinItems ()
	stickyHeader ()
	customSelect()
	valuesSlider()
	teamSlider()
	toggleFaqItems('.faqs__item-question')
	toggleFaqItems('.faq__item-question')
	toggleFaqCategories('.faq__category', '.faq__item')
	formValidation ()
	switchFormSteps ()
	toggleContent ('.account-content', '.account-content__edit-btn')
	toggleContent ('.account-sidebar', '.account-sidebar-toggle')
	let wow = new WOW({
		boxClass: 'wow',
		animateClass: 'animated',
		offset :0,
		mobile: true,
		live: true}).init()
	smoothScroll() 
	testimonialsSlider()
	toggleRecruitment ()
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

function autoScrollFaqCategories (activeElement) {
	if (document.documentElement.clientWidth > 991) {
		return
	}
		const menu =  document.querySelector(".faq__categories-inner")
		const menuWrapper = document.querySelector(".faq__categories")
		const menuWidth = menu.getBoundingClientRect().width
		const menuOffsetLeft = menu.getBoundingClientRect().left
		const menuWrapperOffsetLeft = menuWrapper.getBoundingClientRect().left
		const nextActiveElement = activeElement.nextElementSibling
		const previousActiveElement = activeElement.previousElementSibling

		if (nextActiveElement) {
			const nextActiveElementOffsetRight = nextActiveElement.getBoundingClientRect().right - menuOffsetLeft
			if (nextActiveElementOffsetRight > menuWidth) {
				const menuOffset = menuWidth - nextActiveElementOffsetRight
				menu.style.transform = `translateX(${menuOffset}px)`;
			}
		} 
		if (previousActiveElement) {
			const previousActiveElementOffsetLeft = previousActiveElement.getBoundingClientRect().left - menuOffsetLeft;
			if ((previousActiveElementOffsetLeft - menuWrapperOffsetLeft) < 0) {
				const menuOffset = Math.min(-previousActiveElementOffsetLeft, 0);
				menu.style.transform = `translateX(${menuOffset}px)`;
			}
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
			autoScrollFaqCategories(activeCategory)
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
			let selected = e.currentTarget.querySelector('.selected')
			let input = selected.querySelector('input')
			e.currentTarget.classList.toggle('open')
			if (e.target.classList.contains('option') && e.target.dataset.option) {
				if (input) {
					input.value = e.target.dataset.option

					// проверка валидации селекта с вводом цифр зип код
					validateInput(input)
				}
			}
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
			dynamicBullets: true,
			dynamicMainBullets: 1,
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

function switchFormSteps () {
	let formSteps = document.querySelectorAll('.form__step')
	if (!formSteps.length) return
	let activeFormStep = document.querySelector('.form__step.active')
	changeProgressbar(+activeFormStep.dataset.step)
	for (let i = 0; i < formSteps.length; i++) {
		let btnNextStep = formSteps[i].querySelector('.form__btn')
		if (btnNextStep.type === 'button') {
			btnNextStep.addEventListener('click', function () {
				let formStepInputs = formSteps[i].querySelectorAll('input[required]')
				for (let k = 0; k < formStepInputs.length; k++) {
					validateInput(formStepInputs[k])
				}
				checkFormStepError(formSteps[i], nextFormStep)
			})
		}
		// btnNextStep.type === "button" && btnNextStep.addEventListener('click', function () {
		// 	let formStepInputs = formSteps[i].querySelectorAll('input[required]')
		// 	for (let k = 0; k < formStepInputs.length; k++) {
		// 		validateInput(formStepInputs[k])
		// 	}
		// 	checkFormStepError(formSteps[i], nextFormStep)
		// })
	}
}


function checkFormStepError (currentFormStep, nextFormStepCallback) {
	let hasErrors = currentFormStep.querySelector('.error')
	if (!hasErrors) {
		nextFormStepCallback()
	}
}

function nextFormStep () {
	let activeFormStep = document.querySelector('.form__step.active')
	activeFormStep.classList.remove('active')
	activeFormStep.nextElementSibling.classList.add('active')

	changeProgressbar(+activeFormStep.nextElementSibling.dataset.step)
}

function changeProgressbar (currentStep) {
	let bars = document.querySelectorAll('.form__progress')
	setTimeout(function (){
		bars[currentStep - 1].children[0].style.width = `${(currentStep / (bars.length)) * 100}%`
	}, 100)
}

function formValidation (callbackSubmitFunc) {
	let form = document.querySelector('.js-form-validation')
	if (!form) return
	form.addEventListener('keyup', function (e) {
		validateInput(e.target)
	})
	
	form.addEventListener('submit', function (e) {
		e.preventDefault()
		let formInputs = e.currentTarget.querySelectorAll('input[required]')
		for (let k = 0; k < formInputs.length; k++) {
			validateInput(formInputs[k])
		}
		checkFormStepError(e.target, function () {
			// колбэк функци после успешной валидации
			// if (callbackSubmitFunc) {
			// 	callbackSubmitFunc()
			// }
			e.target.submit()
			console.log('form success submit')
		})
	})

}

function validateInput(input) {
	const regexPatterns = {
		firstname: /^[а-яА-Яa-zA-Z\s]+$/,
		lastname: /^[а-яА-Яa-zA-Z\s]+$/,
		email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
		phonenumber: /^\+?[0-9]+$/,
		zipcode: /^[0-9]{5}\-[0-9]{5}$/,
		birthday: /^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/,
		todaydate: /^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/
	};
	let currentInput = input.form[input.name]

	let validateResult = false
	if (currentInput.length) {
		validateResult = [...currentInput].find(checkbox=>{
			return checkbox.checked
		})
	} else if (currentInput.type === "checkbox" || currentInput.type === "radio") {
		validateResult = currentInput.checked
	} else if (regexPatterns[currentInput.name]) {
		validateResult = regexPatterns[currentInput.name].test(currentInput.value);
	} else {
		validateResult = !!currentInput.value.length
	}
	setInputValidationResult(currentInput, validateResult)
	return validateResult;
  }

  function setInputValidationResult (input, result) {
	if (result) {
		if (input.length) {
			input[0].parentElement.parentElement.classList.remove('error')
		} else if (input.type === "checkbox" || input.type === "radio") {
			input.parentElement.parentElement.classList.remove('error')
		} else {
			input.classList.remove('error')
		}
		
	} else {
		if (input.length) {
			input[0].parentElement.parentElement.classList.add('error')
		} else if (input.type === "checkbox" || input.type === "radio") {
			input.parentElement.parentElement.classList.add('error')
		} else {
			input.classList.add('error')
		}
		
	}
  }

  function toggleContent (block, target) {
	let container = document.querySelector(block)
	
	let btn = document.querySelector(target)
	if (!container || !btn) return

	btn.addEventListener('click', function (e) {
		e.currentTarget.classList.toggle('active')
		container.classList.toggle('active')
	})
  }


function smoothScroll() {
	let linkNav = document.querySelectorAll('[href^="#"]')
	let headerHeight = document.querySelector('.header').getBoundingClientRect().height
	let V = 0.2;
	for (let i = 0; i < linkNav.length; i++) {
		linkNav[i].addEventListener('click', function (e) { //по клику на ссылку
			e.preventDefault(); //отменяем стандартное поведение
			let w = window.pageYOffset // производим прокрутка прокрутка
			let hash = this.href.replace(/[^#]*(.*)/, '$1');
			let tar = document.querySelector(hash) // к id элемента, к которому нужно перейти
			let t = tar.getBoundingClientRect().top - headerHeight
			let start = null;

			requestAnimationFrame(step); // подробнее про функцию анимации [developer.mozilla.org]
			function step(time) {
				if (start === null) {
					start = time;
				}
				var progress = time - start,
					r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
				window.scrollTo(0, r);
				if (r != w + t) {
					requestAnimationFrame(step)
				} else {
					location.hash = hash // URL с хэшем
				}
			}
			if (t > 1 || t < -1) {
				requestAnimationFrame(step)
			}
		});
	}
}


function testimonialsSlider() {
	let swiper = new Swiper(".testimonials-slider", {
		slidesPerView: 1,
		spaceBetween: 24,
		navigation: {
			nextEl: ".testimonials-button-next",
			prevEl: ".testimonials-button-prev",
		},
		pagination: {
			el: ".testimonials-pagination",
		  },
		breakpoints: {
			1199: {
				slidesPerView: 3
			},
			991: {
				slidesPerView: 2
			},
			575: {
				slidesPerView: 1
			},
		}
	});
}

function toggleRecruitment () {
	let buttons = document.querySelectorAll('.recruitment__btn')
	let items = document.querySelectorAll('.recruitment__item')
	let activeItem
	for(let i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', function (e) {
			for(let k = 0; k < items.length; k++) {
				if (buttons[k].classList.contains('active')) {
					buttons[k].classList.remove('active')
				}
				if (items[k].classList.contains('active')) {
					items[k].classList.remove('active')
				}
				if (e.currentTarget.dataset.category === items[k].dataset.category) {
					activeItem = items[k]
				}
			}

			e.currentTarget.classList.add('active')
			activeItem.classList.add('active')

		})
	}
}