var currentAttempt = {};


function pageContentLoad(sender, args) {
	Shp.Dialog.WaittingDialog.show('Getting the data');
	
	$SPData.GetListItems('Student Subjects-Grades', '<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' + Shp.Page.GetParameterFromUrl('courseId') + '</Value></Eq></Where></Query></View>').then(function(items) {
		var item = items.itemAt(0);
		PopulateForm(item);
		Shp.Dialog.WaittingDialog.hide();
	}, function(err) {
		Shp.Dialog.WaittingDialog.hide();
		Shp.Dialog.ErrorDialog.show('Cannot get the data', err);
	});
}


function CloseModal() {
	window.parent.Shp.Dialog.EditFormDialog.hide()
}


function PopulateForm(item) {

	currentAttempt = item;

	// Attempt 1
	jq('#attemptDate1').val(item.get_item('Attempt_x0020__x0023_1_x0020_Dat') === null ? '' : item.get_item('Attempt_x0020__x0023_1_x0020_Dat').format('yyyy-MM-dd'));
	jq('#attemptChannel1').val(item.get_item('Attempt_x0020__x0023_1_x0020_Cha'));
	jq('#attemptStatus1').val(item.get_item('Attempt_x0020__x0023_1_x0020_Sta'));

	// Attempt 2
	jq('#attemptDate2').val(item.get_item('Attempt_x0020__x0023_2_x0020_Dat') === null ? '' : item.get_item('Attempt_x0020__x0023_2_x0020_Dat').format('yyyy-MM-dd'));
	jq('#attemptChannel2').val(item.get_item('Attempt_x0020__x0023_2_x0020_Cha'));
	jq('#attemptStatus2').val(item.get_item('Attempt_x0020__x0023_2_x0020_Sta'));

	// Attempt 3
	jq('#attemptDate3').val(item.get_item('Attempt_x0020__x0023_3_x0020_Dat') === null ? '' : item.get_item('Attempt_x0020__x0023_3_x0020_Dat').format('yyyy-MM-dd'));
	jq('#attemptChannel3').val(item.get_item('Attempt_x0020__x0023_3_x0020_Cha'));
	jq('#attemptStatus3').val(item.get_item('Attempt_x0020__x0023_3_x0020_Sta'));

	// Attempt 4
	jq('#attemptDate4').val(item.get_item('Attempt_x0020__x0023_4_x0020_Dat') === null ? '' : item.get_item('Attempt_x0020__x0023_4_x0020_Dat').format('yyyy-MM-dd'));
	jq('#attemptChannel4').val(item.get_item('Attempt_x0020__x0023_4_x0020_Cha'));
	jq('#attemptStatus4').val(item.get_item('Attempt_x0020__x0023_4_x0020_Sta'));

	// Attempt 5
	jq('#attemptDate5').val(item.get_item('Attempt_x0020__x0023_5_x0020_Dat') === null ? '' : item.get_item('Attempt_x0020__x0023_5_x0020_Dat').format('yyyy-MM-dd'));
	jq('#attemptChannel5').val(item.get_item('Attempt_x0020__x0023_5_x0020_Cha'));
	jq('#attemptStatus5').val(item.get_item('Attempt_x0020__x0023_5_x0020_Sta'));
		
}


function SaveAttempts() {

	var controls_to_validate = [];

	
	if(jq('#attemptDate1').val().trim() !== '' || jq('#attemptChannel1').val().trim() !== '' || jq('#attemptStatus1').val() !== '') {
		controls_to_validate.push('attemptDate1');
		controls_to_validate.push('attemptChannel1');
		controls_to_validate.push('attemptStatus1');

	}
	
	if(jq('#attemptDate2').val().trim() !== '' || jq('#attemptChannel2').val().trim() !== '' || jq('#attemptStatus2').val() !== '') {
		controls_to_validate.push('attemptDate2');
		controls_to_validate.push('attemptChannel2');
		controls_to_validate.push('attemptStatus2');
	}

	
	if(jq('#attemptDate3').val().trim() !== '' || jq('#attemptChannel3').val().trim() !== '' || jq('#attemptStatus3').val() !== '') {
		controls_to_validate.push('attemptDate3');
		controls_to_validate.push('attemptChannel3');
		controls_to_validate.push('attemptStatus3');
	}
	
	if(jq('#attemptDate4').val().trim() !== '' || jq('#attemptChannel4').val().trim() !== '' || jq('#attemptStatus4').val() !== '') {
		controls_to_validate.push('attemptDate4');
		controls_to_validate.push('attemptChannel4');
		controls_to_validate.push('attemptStatus4');
	}
	
	if(jq('#attemptDate5').val().trim() !== '' || jq('#attemptChannel5').val().trim() !== '' || jq('#attemptStatus5').val() !== '') {
		controls_to_validate.push('attemptDate5');
		controls_to_validate.push('attemptChannel5');
		controls_to_validate.push('attemptStatus5');
	}
	
	
	var errors = 0;
	for(var k = 0; k < controls_to_validate.length; k++) {
		if($select(controls_to_validate[k]).check_validity() === false) {
			jq('#' + controls_to_validate[k]).addClass('is-invalid');
			errors++;
		}
		else {
			jq('#' + controls_to_validate[k]).removeClass('is-invalid');
		}
	}
	
	if(errors > 0) {
		return;
	}


	Shp.Dialog.WaittingDialog.show('Saving the data');

	
	var attempt = {};	
	attempt['ID'] = Shp.Page.GetParameterFromUrl('courseId');
	
	attempt['Attempt_x0020__x0023_1_x0020_Dat'] = $select('attemptDate1').get_date('yyyy-MM-dd');
	attempt['Attempt_x0020__x0023_1_x0020_Cha'] = $select('attemptChannel1').get_value();
	attempt['Attempt_x0020__x0023_1_x0020_Sta'] = $select('attemptStatus1').get_value();
	
	attempt['Attempt_x0020__x0023_2_x0020_Dat'] = $select('attemptDate2').get_date('yyyy-MM-dd');
	attempt['Attempt_x0020__x0023_2_x0020_Cha'] = $select('attemptChannel2').get_value();
	attempt['Attempt_x0020__x0023_2_x0020_Sta'] = $select('attemptStatus2').get_value();
	
	attempt['Attempt_x0020__x0023_3_x0020_Dat'] = $select('attemptDate3').get_date('yyyy-MM-dd');
	attempt['Attempt_x0020__x0023_3_x0020_Cha'] = $select('attemptChannel3').get_value();
	attempt['Attempt_x0020__x0023_3_x0020_Sta'] = $select('attemptStatus3').get_value();

	attempt['Attempt_x0020__x0023_4_x0020_Dat'] = $select('attemptDate4').get_date('yyyy-MM-dd');
	attempt['Attempt_x0020__x0023_4_x0020_Cha'] = $select('attemptChannel4').get_value();
	attempt['Attempt_x0020__x0023_4_x0020_Sta'] = $select('attemptStatus4').get_value();
	
	attempt['Attempt_x0020__x0023_5_x0020_Dat'] = $select('attemptDate5').get_date('yyyy-MM-dd');
	attempt['Attempt_x0020__x0023_5_x0020_Cha'] = $select('attemptChannel5').get_value();
	attempt['Attempt_x0020__x0023_5_x0020_Sta'] = $select('attemptStatus5').get_value();
	
	if($select('attemptStatus1').get_value() === 'Reached' ||
	$select('attemptStatus2').get_value() === 'Reached' ||
	$select('attemptStatus3').get_value() === 'Reached' ||
	$select('attemptStatus4').get_value() === 'Reached' ||
	$select('attemptStatus5').get_value() === 'Reached') {
		attempt['Subject_x0020_Reached'] === true;
	}
	else {
		attempt['Subject_x0020_Reached'] === false;
	}
	
	
	
	
	$SPData.UpdateItem('Student Subjects-Grades', attempt).then(function() {
		window.parent.top.location.href = window.parent.location.href;
	}, function(err) {
		Shp.Dialog.WaittingDialog.hide();
		Shp.Dialog.ErrorDialog.show('Error saving data', err);
	});
	
}
