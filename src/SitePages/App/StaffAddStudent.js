
function pageContentLoad(sender, args) {

  $select('school').set_value(Shp.Page.GetParameterFromUrl('School'));
  SetSchool();

}

function CloseModal() {
	window.parent.Shp.Dialog.EditFormDialog.hide();
}



function SetSchool() {

	var schoolDistrict = $select('school').get_value();
	if(schoolDistrict === '') {
		$select('smallthendistict').set_options([{ text: '...', value: '' }]);
		return;
	}	


	Shp.Dialog.WaittingDialog.show('Getting school list');
	var camlQuery = '<View><Query><Where><Eq><FieldRef Name="School_x0020_District" LookupId="TRUE" /><Value Type="Lookup">' + schoolDistrict + '</Value></Eq></Where></Query></View>';

	$SPData.GetListItems('Schools', camlQuery).then(function(items) {
		var schools = [];
		schools.push({ text: '...', value: '' });
		for(var i = 0; i < items.get_count(); i++) {
			var school = items.itemAt(i);
			schools.push({ text: school.get_item('Title'), value: school.get_item('Title') });
		}
		$select('smallthendistict').set_options(schools);
		Shp.Dialog.WaittingDialog.hide();

	}, function(err) {
		Shp.Dialog.WaittingDialog.hide();
		Shp.Dialog.ErrorDialog.show('Cannot get schools', err);
	});
}


function SaveStudent() {

	var errors = 0;
	var controls_to_validate = ['school', 'smallthendistict', 'firstName', 'lastName', 'state', 'city', 'zip', 'streetAddress'];
	for(var i = 0; i < controls_to_validate.length; i++) {
		var control_to_validate = controls_to_validate[i];
		if($select(control_to_validate).check_validity() === false) {
			jq('#' + control_to_validate).addClass('is-invalid');
			errors++;
		}
		else {
			jq('#' + control_to_validate).removeClass('is-invalid');
		}
	}
	
	if(errors > 0) {
		return;
	}
	
	
	Shp.Dialog.WaittingDialog.show('Saving data');
	var caml =  '<View>' +
	'<Query>' +
	'<Where>' +
	'<And>' +
	'<Eq><FieldRef Name="St_x0020_L_x0020_Name" /><Value Type="Text">' + jq('#lastName').val().trim() + '</Value></Eq>' +
    '<Eq><FieldRef Name="St_x0020_F_x0020_Name" /><Value Type="Text">' + jq('#firstName').val().trim()  + '</Value></Eq>' +
	'</And>' +
	'</Where>' +
	'</Query>' +
	'</View>';
	
	$SPData.GetListItems('CurrentStudentInfo', caml).then(function(items) {
		
		if(items.get_count() > 0) {
			Shp.Dialog.WaittingDialog.hide();
			Shp.Dialog.ErrorDialog.show('Duplicate entry', 'A student with the same first name and last name is already registered');
			return;
		}
				
		_SaveStudent();
		
	}, function(err) {
		Shp.Dialog.WaittingDialog.hide();
		Shp.Dialog.ErrorDialog.show('Cannot check for duplicates', err);
	});	
	
}


function _SaveStudent() {

	var student = {
		'School_x0020_District': $select('school').get_value(),
		'School': $select('smallthendistict').get_value(),
		'St_x0020_F_x0020_Name': $select('firstName').get_value(),
		'St_x0020_L_x0020_Name': $select('lastName').get_value(),
		'State': $select('state').get_value(),
		'City': $select('city').get_value(),
		'Street_x0020_Address': $select('streetAddress').get_value(),
		'Parent_x0020_Name': $select('parentName').get_value(),
		'E_x002d_Mail': $select('email').get_value(),
		'H_x0020_Phone': $select('hphone').get_value(),
		'W_x0020_Phone': $select('wphone').get_value(),
		'C_x0020_Phone_x0020_1': $select('cphone1').get_value(),
		'C_x0020_Phone_x0020_2': $select('cphone2').get_value(),
		'Zip_x0020_Code': $select('zip').get_value()
	};	


	$SPData.AddItem('CurrentStudentInfo', student).then(function(item) {
		window.parent.top.location.href = _spPageContextInfo.webAbsoluteUrl + '/SitePages/App/Students.aspx?School=' + 
		escapeProperly($select('school').get_value());
	}, function(err) {
		Shp.Dialog.WaittingDialog.hide();
		Shp.Dialog.ErrorDialog.show('Cannot save data', err);
	});

}











