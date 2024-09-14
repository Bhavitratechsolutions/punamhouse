var swiper = new Swiper(".product-view-swiper", {
  slidesPerView: 4,
  spaceBetween: 30,
  freeMode: true,
  loop: true,
  // centeredSlides: true,
  // centerInsufficientSlides: true,
  breakpoints: {
    375: {
      slidesPerView: 3,
      spaceBetween: 10
    },
    769: {
      slidesPerView: 4,
      spaceBetween: 8
    },
  },  
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

SectionSlider();
function SectionSlider() {
  const sectionSlider = document.querySelectorAll('.swiper-container');
  const swiperButtonPrev = document.querySelectorAll('.swiper-button-prev');
  const swiperButtonNext = document.querySelectorAll('.swiper-button-next');
  if (!sectionSlider.length) return;

  for (let i = 0; i < sectionSlider.length; i++) {
    const el = sectionSlider[i];
    const swiper = sectionSlider[i].querySelector('.mySwiper');

    let prevNavElement = el.querySelector('.swiper-button-prev');
    let nextNavElement = el.querySelector('.swiper-button-next');

    // if (el.getAttribute('data-nav-prev'))
    //   prevNavElement = '.'+el.getAttribute('data-nav-prev')
    // if (el.getAttribute('data-nav-next'))
    //   nextNavElement = '.'+el.getAttribute('data-nav-next')
    
    let gap = 0;
    let loop = false;
    let centered = false;
    let pagination = false;
    let scrollbar = false;

    if (el.getAttribute('data-gap'))    gap = el.getAttribute('data-gap');
    if (el.hasAttribute('data-loop'))   loop = true;
    if (el.hasAttribute('data-center')) centered = true;

    if (el.hasAttribute('data-pagination')) {
      let paginationElement = el.querySelector('.js-pagination')

      if (el.getAttribute('data-pagination'))
        paginationElement = document.querySelector(`.${el.getAttribute('data-pagination')}`)

      pagination = {
        el: paginationElement,
        bulletClass: 'pagination__item',
        bulletActiveClass: 'is-active',
        bulletElement: 'div',
        clickable: true
      }
    }

    if (el.hasAttribute('data-scrollbar')) {
      scrollbar = {
        el: '.js-scrollbar',
        draggable: false,
      }
    }
   
    const colsArray = el.getAttribute('data-slider-cols').split(' ');

    let cols_base = 1;
    let cols_xl = 1;
    let cols_lg = 1;
    let cols_md = 1;
    let cols_sm = 1;

    colsArray.forEach(el => {
      if (el.includes('base')) cols_base = el.slice(-1);
      if (el.includes('xl')) cols_xl = el.slice(-1);
      if (el.includes('lg')) cols_lg = el.slice(-1);
      if (el.includes('md')) cols_md = el.slice(-1);
      if (el.includes('sm')) cols_sm = el.slice(-1);
    });

    new Swiper(swiper, {
      speed: 600,
      // autoHeight: true,
      spaceBetween: parseInt(gap),
      centeredSlides: centered,
      // parallax: true,
      watchSlidesVisibility: true,
      loop: loop,
      // loopAdditionalSlides: 1,
      preloadImages: false,
      lazy: true,
      
      scrollbar: scrollbar,
      pagination: pagination,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },

      slidesPerView: parseInt(cols_base),
      breakpoints: {
        1199: { slidesPerView: parseInt(cols_xl) },
        991: { slidesPerView: parseInt(cols_lg) },
        767:  { slidesPerView: parseInt(cols_md) },
        574:  { slidesPerView: parseInt(cols_sm) },
      },

      // lazy: {
      //   loadPrevNext: true,
      // },
      navigation: {
        prevEl: prevNavElement,
        nextEl: nextNavElement,
      },
    });
  }
}

// GSAP: turn off console warnings
gsap.config({
	nullTargetWarn: false
});
parallaxIt()
function parallaxIt() {
  const target = document.querySelectorAll('.js-mouse-move-container')

  target.forEach(container => {
    const $this = container
    const targets = container.querySelectorAll('.js-mouse-move')
    
    targets.forEach(el => {
      const movement = el.getAttribute('data-move')

      document.addEventListener('mousemove', (e) => {
        const relX = e.pageX - $this.offsetLeft
        const relY = e.pageY - $this.offsetTop
      
        gsap.to(el, {
          x: (relX - $this.offsetWidth / 2) / $this.offsetWidth * movement,
          y: (relY - $this.offsetHeight / 2) / $this.offsetHeight * movement,
          duration: 0.2,
        })
      })
    })
  })
}

jQuery(document).ready(function($) {
	
	$.fn.responsiveMenu = function( options ) {
        // Default options
        var settings = $.extend({
			breakpoint: 300
        }, options );

		var menu_content = $('.menu-content');
		var menu_element = $('.menu li');
					
		$.each($('.menu li'), function (index, value) {
			if ($(this).children('ul').length > 0 || $(this).children('div').length > 0) {
				$(this).children('a').append($('<span class="arrow"></span>'));
			}
		});
		
		// add to-left class tu parent ul
		if( $('.menu li').hasClass('to-left') ){ $('.menu li.to-left').parent('ul').addClass("to-left-ul"); }
		  		
		  		
		// hamburger btn
		$('#nav-icon').on('click', function(e) {
		    e.preventDefault();
		    e.stopPropagation();
		
		    if ( menu_content.hasClass( "open" ) ) {
				menu_content.removeClass('open');
				menu_content.addClass('close');
			}else{
				menu_content.addClass('open');
				menu_content.removeClass('close')
			}
		
		    $(document).one('click', function closeMenu (e){
			    
			    var $browserWidth = window.innerWidth || document.documentElement.clientWidth;
			    if ($browserWidth < settings.breakpoint ) {
		        if(menu_content.has(e.target).length === 0){
		            menu_content.removeClass('open');
		            menu_content.addClass('close');
		            $('#nav-icon').removeClass('is-active');
		        } else {
		            $(document).one('click', closeMenu);
		        }
		        }
		    });
		});
	
	
		// init responsive
		menuStuff();
	
		$(window).resize(function () {
			menuStuff();
		});
		
		$('#nav-icon').click(function(e){
			e.preventDefault();
			$(this).toggleClass('is-active');
		});
	
	
		function menuStuff() {
		
			var $browserWidth = window.innerWidth || document.documentElement.clientWidth;
	
			var menu_content = $('.menu-content');
			var menu_element = $('.menu li');
			var arrow = $('.menu__item span.arrow');
			var submenu_element = $('.menu__sub-menu');
	
			var hamburger = $('#nav-icon');
	
			// desktop size
			if ( $browserWidth > settings.breakpoint ) {
				
				$('.menu .menu__item .menu__link').removeClass('active-parent');
				
				menu_content.removeClass('open').removeClass('close');
				arrow.removeClass('open');
				hamburger.removeClass('is-active');
				
				submenu_element.removeClass('open');
				submenu_element.removeClass('open').hide();

				//unbind arrow hover event
				arrow.unbind();
				
				menu_element.unbind().hover(function (e) {
					e.preventDefault();
	
					if( $(this).children('ul').hasClass( "menu__sub-menu" ) || $(this).children('div').hasClass( "menu__sub-menu" ) ){ 
						var element = $(this);
						var level = '.menu__sub-menu';
						xlScreen(element, level); 
					}
				});
	
			// mobile size
			} else {
				
				//unbind li click event
				menu_element.unbind();
	   
				arrow.unbind().click(function (e) {
	       
					e.preventDefault();
	
					if( $(this).closest('li').children('ul').hasClass( "menu__sub-menu" ) ){ 
						var level = '.menu__sub-menu'; 
						var element = $(this);
						xsScreen(element, level);
					
					}
				});
			}
	
			function xsScreen(element, level) {
				
				if( element.closest('li').children(level).hasClass('open') ){
				 	
	       		 	element.closest('li').children(level).slideUp(250).removeClass("open");
	       		 	element.parent('a').removeClass("active-parent");
	       		 	element.removeClass("open");
	       		 	
		  		}else{
	
			  		element.closest('li').children(level).slideDown(250).addClass('open');
			  		element.parent('a').addClass("active-parent");
			  		element.addClass("open");
		  		}
			}
	
			function xlScreen(element, level) {
		
				if( element.children(level).hasClass('open') ){
				 	
	       		 	element.children(level).removeClass("open");
	       		 	element.children('a').removeClass("active-parent");
	       		 	
		  		}else{
	
			  		element.children(level).show(1).addClass('open');
			  		element.children('a').addClass("active-parent");
		  		}
			}
		}
	}

});
