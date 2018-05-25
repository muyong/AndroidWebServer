(function(){
	if(typeof $==='undefined')
		return;
	
	/*var change_the_doctorlist = function(hospital_id, specialis_id) {
		$('form.find-doctor select[name=doctors]').html('<option value="">Type Doctor Name</option>').selectpicker('refresh');
		$.post('/index.php/doctors/request_option/doctor.html', {hospital_id:hospital_id, specialis_id:specialis_id}, function(result){
			$('form.find-doctor select[name=doctors]').append(result).selectpicker('refresh');
		});
	}
	
	$('form.find-doctor select[name=hospital]').change(function(){
		var hospital_id	= $(this).val(),
			specialis_id= $('form.find-doctor select[name=specialties]').val();
		change_the_doctorlist(hospital_id, specialis_id);
	});
	
	$('form.find-doctor select[name=specialties]').change(function(){
		var hospital_id	= $('form.find-doctor select[name=hospital]').val(),
			specialis_id= $(this).val();
		change_the_doctorlist(hospital_id, specialis_id);
	});*/
	
	var substringMatcher = function(strs) {
		return function findMatches(q, cb) {
			var matches, substringRegex;
			matches = [];
			substrRegex = new RegExp(q, 'i');
			$.each(strs, function(i, str) {
				if (substrRegex.test(str)) {
					matches.push(str);
				}
			});
			cb(matches);
		};
	};
	
	var get_the_url = function() {
		var q = '/index.php/doctors/request_option/doctor.html?key=%QUERY';
		q += '&hospital_id='+encodeURIComponent($('form.find-doctor select[name=hospital]').val());
		q += '&specialis_id='+encodeURIComponent($('form.find-doctor select[name=specialties]').val());
		return q;
	},the_source = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.whitespace,
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		remote: {
			url: get_the_url(),
			wildcard: '%QUERY'
		}
	});
	
	$('form.find-doctor input[name=doctors], input.typeahead').typeahead({
		hint: true,
		highlight: true,
		minLength: 1
	},
	{
		name: 'states',
		source: the_source
	});
	
	$('form#find-doctor').submit(function(){
		var specialties	= $(this).find('select[name=specialties]').val(),
			doctor		= $(this).find('input[name=doctor]').val(),
			hospital	= '',
			el_hospital	= $(this).find('input[name=hospital]');
		
		el_hospital.each(function(){
			if (!$(this).is(':checked'))
			{
				return;
			}
			
			if (parseInt($(this).val())<1)
			{
				return;
			}
			
			hospital+= (hospital.length>0 ? ',' : '')+$(this).val();
		});
		
		var query	= '';
		
		if (specialties.length>0)
		{
			query+= (query.length>0 ? '&' : '?')+'specialties='+specialties;
		}
		
		if (hospital.length>0)
		{
			query+= (query.length>0 ? '&' : '?')+'hospital='+hospital;
		}
		
		if (doctor.length>0)
		{
			query+= (query.length>0 ? '&' : '?')+'doctor='+doctor;
		}
		
		window.location.href = query;
		
		return false;
	});
	$('#all-hospital').change(function(){
		if ($(this).is(':checked'))
		{
			$(this).closest('form').find('input[name=hospital]').attr({checked:'checked'});
			return;
		}
		
		$(this).closest('form').find('input[name=hospital]').removeAttr('checked');
	});
}());
$(document).ready(function(){
	$('.clear-all').click(function(){
		$(this).closest('form').find('input[name=hospital]').removeAttr('checked');
		$("#find-doctor")[0].reset();
	});
});
