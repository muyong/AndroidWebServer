jQuery(document).ready(function(jQuery) {
	jQuery('#hospitals .menus a').click(function() {
		jQuery('#hospitals .content').find('.show').removeClass('show').addClass('hide');
		jQuery('.'+jQuery(this).attr('class-content')).removeClass('hide').addClass('show');
	  });
	jQuery('#statics .menus a').click(function() {
		jQuery('#statics .content').find('.show').removeClass('show').addClass('hide');
		jQuery('.'+jQuery(this).attr('class-content')).removeClass('hide').addClass('show');
	  });
	jQuery('.select-checkup').change(function() {
		var url = $(this).val();
		window.location.replace(url);
	  });
	jQuery('.ourHospitalChose').change(function() {
		var val = $(".ourHospitalChose option:selected").val();
		
		if(val=='city'){
			$('div.specialties').hide();
			$('div.city').show();
		}else{
			$('div.specialties').show();
			$('div.city').hide();
		}
	  });
	jQuery('.contact-change').change(function(){
		$.ajax({
		  type: "GET",
		  url: $(this).attr('data-url'),
		  data: 'slug='+$(this).val(),
		  dataType: "json",
		  success: function(html){
		  	$('.contact-address').html(html.contact_address);
		  	$('.contact-call').html(html.contact_call);
		  }
		});
	});
	
	jQuery('.ourHospitalMap').change(function(){
		$.ajax({
		  type: "POST",
		  url: $(this).attr('data-url'),
		  data: 'city='+$(this).val(),
		  dataType: "json",
		  success: function(result){
		  	$.each(result, function(i, item) {
			    var title = item.post_title;
			});
		  }
		});
	});
	
});

$(document).on('click','.fb_share ',function(){
	var url = 'https://www.facebook.com/sharer.php?app_id=1463455230611496&sdk=joey&u=';
	url += $(this).attr('href')+'?v=1';
	var myWindow = window.open(url, "fb", "width=700, height=400,titlebar=no");
	return false;
});
$(document).on('click','.tw_share',function(){
	var url = 'https://twitter.com/share?text=';
	url += $(this).attr('data-text');
	url += '&'+$(this).attr('href');
	var myWindow = window.open(url, "twitter", "width=700, height=400,titlebar=no");
	return false;
});
$(document).on('click','.go_share',function(){
	var url = 'https://plus.google.com/share?url=';
	url += $(this).attr('href');
	var myWindow = window.open(url, "googleplus", "width=700, height=400,titlebar=no");
	return false;
});
function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
};
$( "#subscribe" ).submit(function( event ) {
	event.preventDefault();
	$('#subscribe').hide(); 
  //var emailaddress = $('input['name="email"]').val();
  //if( isValidEmailAddress( emailaddress ) ) { $('#subscribe').hide(); var teks = 'Thank for your subscribe.'; } else { var teks='Invalid Email Addres'; }
  	$.ajax({
	    url: $(this).attr('action'),
	    type: "POST",
	    data: $(this).serialize(),
	    dataType: "json",
	    error: function() {
	    },
	    beforeSend: function(){
	    },          
	    success: function(ret) {
	    }
	});
	
  $('.thank').text('Thank You for Your Subscription.').show(300);
  return false;
});
