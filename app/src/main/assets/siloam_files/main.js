jQuery(document).ready(function(jQuery) {
	jQuery('img.imagecheck').each(function(){
		var src = jQuery(this).attr('data-src');
		if(src){
			var arr = src.split('/');
		    var exist = IMG_URL;
		    if (typeof arr[5] != "undefined") {
			    exist += arr[5];
			}
			if (typeof arr[8] != "undefined") {
			    exist += '/'+arr[8];
			}
		    jQuery(this).attr('src',exist).load(function() {
		    	jQuery(this).attr('data-src',exist);
		    	return;
		    }).bind('error', function() {
		   		jQuery(this).attr('src',src).attr('data-src',exist);
		   		return;
		    });
		}
	});
	jQuery('.sub-panel h4 a').click(function(){
		var collapse = jQuery(this).attr('class');
		jQuery('.sub-panel h4 a').addClass('collapsed');
		jQuery('.acco_sub').removeClass('in');
		jQuery('.acco_sub').attr('style','');
		if(collapse=='collapsed'){
			var id = jQuery(this).attr('href');
			jQuery(this).removeClass('collapsed');
			jQuery(id).addClass('in');
		}else{
			var id = jQuery(this).attr('href');
			jQuery(id).attr('style','display:none;');
		}
	});
	jQuery("#content,.container-fluid,.header-wrapper").click(function(){
		jQuery('.emergency, .find_doctor, .find_location').removeClass('show');
	});
	jQuery('a.nav-toggle').click(function() {
		if(jQuery('body').hasClass('nav-open')){
			jQuery('body').removeClass('nav-open');
			return;
		}
		jQuery('body').addClass('nav-open');
	  	jQuery('.search-icon').removeClass('active');
	  	jQuery('.top_search').addClass('hide');
		// jQuery('header').after('<div class="overlay-close"></div>');
	});
	jQuery('.overlay-close').click(function() {
		jQuery('body').removeClass('nav-open');
	});
	jQuery('.custom_select').selectpicker({
		      style: 'btn-light',
		      size: 4
		  });
	jQuery('.custom_select_dark').selectpicker({
		      style: 'btn-dark',
		      size: 4
		  });

	jQuery('.emergency').click(function(event) {
		jQuery('.find_location, .find_doctor').removeClass('show');
		jQuery(this).toggleClass('show');
		event.stopPropagation();
		
	});
	jQuery('#find_toggle').click(function(event) {
			jQuery('.find_location, .emergency').removeClass('show');
		  	jQuery(this).parent().toggleClass('show');
		  	event.stopPropagation();
		  	
		  	// jQuery('body').toggleClass('selector');
	});
	jQuery('#find_location_toggle').click(function(event) {
			jQuery('.find_doctor, .emergency').removeClass('show');
		  	jQuery(this).parent().toggleClass('show');
		  	event.stopPropagation();
		  	// jQuery('body').toggleClass('selector');
	});
	jQuery('#techno').carousel({
		interval:6000,
     	pause: "hover"
	});
	/*jQuery('#excellence').carousel({
		interval:false
	});*/
	jQuery('#home-slide').carousel({
		interval:15000,
      	pause: "hover"
	});
	
	$('.sr').bxSlider({
	  infiniteLoop: false,
	  auto: true,
	  pause: 3000,
	  autoHover: true,
	});
	
	$('.bxslider').bxSlider({
		nextSelector: '.bx-next',
		prevSelector: '.bx-prev',
		prevText: '<a class="left carousel-control" href="#excellence" role="button" data-slide="prev"><i class="fa fa-chevron-left"></i></a>',
		nextText: '<a class="right carousel-control" href="#excellence" role="button" data-slide="next"><i class="fa fa-chevron-right"></i></a>',
		slideWidth: 200,
	    minSlides: 2,
	    maxSlides: 4,
	    moveSlides: 1,
	    slideMargin: 10,
	    infiniteLoop: false,
  		hideControlOnEnd: true, 
	    pager: false
	});
	
	
		$('.instagram-bx').bxSlider({
		nextSelector: '.bx-next-instagram',
		prevSelector: '.bx-prev-instagram',
		prevText: '<a class="left carousel-control" href="#instagram" role="button" data-slide="prev"><i class="fa fa-chevron-left"></i></a>',
		nextText: '<a class="right carousel-control" href="#instagram" role="button" data-slide="next"><i class="fa fa-chevron-right"></i></a>',
		slideWidth: 410,
	    minSlides: 2,
	    maxSlides: 4,
	    moveSlides: 1,
	    slideMargin: 20,
	    infiniteLoop: false,
  		hideControlOnEnd: true, 
	    pager: false,
		  auto: true,
		  pause: 3000,
		  autoHover: true,
	});


	
	$('.facility-bx').bxSlider({
		nextSelector: '.bx-next-facility',
		prevSelector: '.bx-prev-facility',
		prevText: '<a class="left carousel-control" href="#facility" role="button" data-slide="prev"><i class="fa fa-chevron-left"></i></a>',
		nextText: '<a class="right carousel-control" href="#facility" role="button" data-slide="next"><i class="fa fa-chevron-right"></i></a>',
		// slideWidth: 200,
	    // minSlides: 1,
	    // maxSlides: 1,
	    // moveSlides: 1,
	    // slideMargin: 10,
	    // infiniteLoop: false,
	    pager: false
	});
	
	$('.excellence-bx').bxSlider({
		nextSelector: '.bx-next-excellence',
		prevSelector: '.bx-prev-excellence',
		prevText: '<a class="left carousel-control" href="#excellence" role="button" data-slide="prev"><i class="fa fa-chevron-left"></i></a>',
		nextText: '<a class="right carousel-control" href="#excellence" role="button" data-slide="next"><i class="fa fa-chevron-right"></i></a>',
		// slideWidth: 200,
	    minSlides: 1,
	    maxSlides: 1,
	    moveSlides: 1,
	    // slideMargin: 10,
	    infiniteLoop: true,
	    pager: false
	});

	
	$('.explore-bx').bxSlider({
		nextSelector: '.bx-next-explore',
		prevSelector: '.bx-prev-explore',
		prevText: '<a class="left carousel-control" href="#explore" role="button" data-slide="prev"><i class="fa fa-chevron-left"></i></a>',
		nextText: '<a class="right carousel-control" href="#explore" role="button" data-slide="next"><i class="fa fa-chevron-right"></i></a>',
		// slideWidth: 200,
	    minSlides: 1,
	    maxSlides: 1,
	    moveSlides: 1,
	    // slideMargin: 10,
	    infiniteLoop: true,
	    pager: false
	});
	
	$('.whats-bx').bxSlider({
		nextSelector: '.bx-next-whats',
		prevSelector: '.bx-prev-whats',
		prevText: '<a class="left carousel-control" href="#whats" role="button" data-slide="prev"><i class="fa fa-chevron-left"></i></a>',
		nextText: '<a class="right carousel-control" href="#whats" role="button" data-slide="next"><i class="fa fa-chevron-right"></i></a>',
		// slideWidth: 200,
	    minSlides: 1,
	    maxSlides: 1,
	    moveSlides: 1,
	    // slideMargin: 10,
	    infiniteLoop: true,
	    pager: false
	});

	jQuery('.map-pin ul li').mouseover(function() {
		jQuery('.map-pin ul li a .title').removeClass('show');
		jQuery(this).find('.title').addClass('show');
		jQuery(this).mouseleave(function() {
			jQuery('.map-pin ul li a .title').removeClass('show');
		});
	});
	// if (window.location.hash) {
		// $(".collapse").collapse('hide');
    	// $(window.location.hash).collapse('show');
    	// history.pushState('', document.title, window.location.pathname);
	// }
	
	$("#accordion").on("shown.bs.collapse", function () {
	    var myEl = $(this).find('.panel-default .collapse.in');
	
	    $('html, body').animate({
	        scrollTop: $(myEl).offset().top-190
	    }, 500);
	});
	
	$(".sub-panel a").click(function () {
	    var myEl = $(this).attr('data-id');
	    $('.acco_sub').removeClass('in')
	    $('#'+myEl).attr('class','acco_sub collapse in');
	    
	    
	    $('html, body').animate({
	        scrollTop: $('#'+myEl).offset().top-120
	    }, 500);
	    
	});
	
	$('.homesub li a').click(function(){
		var myEl = $( $.attr(this, 'href') ).offset().top;
	
	    $('html, body').animate({
	        scrollTop: myEl-60
	    }, 1000);
	});
	
	if ( window.location.pathname == '/' && location.hash!==''){
	    var str= location.hash; 
	    $('html,body').animate({scrollTop:$(str).offset().top-60}, 1000);
	}
    
    jQuery('.search-icon').click(function(){
    	if (jQuery(this).hasClass("active")) {
		  jQuery(this).removeClass('active');
		  jQuery('.top_search').addClass('hide');
		}else{
		  jQuery('.search-icon').addClass('active');
		  jQuery('.top_search').removeClass('hide');
		}
    });
	
	if (typeof onPageLoad != 'undefined')
	{
		onPageLoad();
	}
});

jQuery(window).scroll(function() {
	var scrollTop = jQuery(document).scrollTop();
	// var navPos =   jQuery('#top-cart').offset().top
	// var sidebarTop = jQuery('.left-sidebar').offset().top
	
	// var contentTop = jQuery('.content').offset().top
	// var defineFix = scrollTop-contentTop
	if (scrollTop > 10) {
    		jQuery('header').addClass('scrolled');
    	
    	}
   	else {
   			jQuery('header').removeClass('scrolled');
   	}

   	// if(defineFix >= -90) {
   	// 	jQuery('.left-sidebar').css({
   	// 		top:defineFix+90
   	// 	});
   	// } else if(defineFix < -90) {
   	// 	top:0
   	// }

   	jQuery('.emergency, .find_doctor, .find_location').removeClass('show');
   	// console.log(defineFix)
});

