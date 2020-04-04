
function pageContentLoad(sender, args) {

    Shp.Dialog.WaittingDialog.show('Getting data');

    var getProfileData = $SPData.GetListItems('Tutor List', '<View><Query><Where><Eq><FieldRef Name="Email" /><Value Type="Text">' + _spPageContextInfo.userEmail + '</Value></Eq></Where></Query></View>');
    Promise.all([getProfileData]).then(function (results) {
        var data = results[0];
        if (data.get_count() === 0) {
            Shp.Dialog.WaittingDialog.hide();
            Shp.Dialog.ErrorDialog.show('Unregistered profile', 'You are not registered as tutor');
            return;
        }

        PopulateForm(data.itemAt(0));

    }, function (err) {
       
        Shp.Dialog.ErrorDialog.show('Cannot get profile data', err);
    });
}


function PopulateForm(profile) {

	 $select('profileId').set_value(profile.get_id().toString());
	 $select('lastName').set_value(profile.get_item('T_x0020_L_x0020_Name') === null ? '' : profile.get_item('T_x0020_L_x0020_Name'));
	 $select('firstName').set_value(profile.get_item('T_x0020_F_x0020_Name') === null ? '' : profile.get_item('T_x0020_F_x0020_Name'));
	 $select('tutorId').set_value(profile.get_item('Tutor_x0020_ID') === null ? '' : profile.get_item('Tutor_x0020_ID'));
	 $select('hireDate').set_value(profile.get_item('Hire_x0020_Date') === null ? '' : profile.get_item('Hire_x0020_Date').format('yyyy-MM-dd'));
	 $select('email').set_value(profile.get_item('Email') === null ? '' : profile.get_item('Email'));
	 $select('salary').set_value(profile.get_item('Salary') === null ? '' : profile.get_item('Salary').toString());

		
	 $select('address').set_value(profile.get_item('Address') === null ? '' : profile.get_item('Address'));
	 $select('city').set_value(profile.get_item('City') === null ? '' : profile.get_item('City'));
	 $select('state').set_value(profile.get_item('State') === null ? '' : profile.get_item('State'));
	 $select('zipcode').set_value(profile.get_item('Zip') === null ? '' : profile.get_item('Zip'));
	 $select('contact1').set_value(profile.get_item('Contact_x0020_1') === null ? '' : profile.get_item('Contact_x0020_1'));
	 $select('contact2').set_value(profile.get_item('Contact_x0020_2') === null ? '' : profile.get_item('Contact_x0020_2'));
	 $select('isActive').set_value(Boolean(profile.get_item('Active_x0020__x0028_Y_x002d_N_x0')).toString());
	 $select('certified').set_value(Boolean(profile.get_item('Certified_x0020__x0028_Y_x002d_N')).toString());
	 $select('fingerprint').set_value(Boolean(profile.get_item('Fingerprint')).toString());
	 $select('livingEnviroment').set_value(Boolean(profile.get_item('Living_x0020_Environment')).toString());
	 $select('earthScience').set_value(Boolean(profile.get_item('Earth_x0020_Science')).toString());
	 $select('chemistry').set_value(Boolean(profile.get_item('Chemistry')).toString());
	 $select('physics').set_value(Boolean(profile.get_item('Physics')).toString());	 
	 $select('generalscience').set_value(Boolean(profile.get_item('General_x0020_Science')).toString());		
	 $select('speech').set_value(Boolean(profile.get_item('Speech')).toString());	 
	 $select('counseling').set_value(Boolean(profile.get_item('Counseling')).toString());	 
	 $select('reading').set_value(Boolean(profile.get_item('Reading')).toString());	
	 $select('proctoronly').set_value(Boolean(profile.get_item('Proctor_x0020_Only')).toString());	
	 	 	 	 	 		 	 
     Shp.Dialog.WaittingDialog.hide();

}


function SaveProfile() {

	Shp.Dialog.WaittingDialog.show('Saving profile');
	
	var profile = {};
	profile['ID'] = $select('profileId').get_value();
	profile['Address'] = $select('address').get_value();
	profile['City'] = $select('city').get_value();
	profile['State'] = $select('state').get_value();
	profile['Zip'] = $select('zipcode').get_value();
	profile['Contact_x0020_1'] = $select('contact1').get_value();
	profile['Contact_x0020_2'] = $select('contact2').get_value();
	profile['Active_x0020__x0028_Y_x002d_N_x0'] = $select('isActive').get_value().toString();
	profile['Certified_x0020__x0028_Y_x002d_N'] = $select('certified').get_value().toString();
	profile['Fingerprint'] = $select('fingerprint').get_value().toString();
	profile['Living_x0020_Environment'] = $select('livingEnviroment').get_value().toString();
	profile['Earth_x0020_Science'] = $select('earthScience').get_value().toString();
	profile['Chemistry'] = $select('chemistry').get_value().toString();
	profile['Physics'] = $select('physics').get_value().toString();
	profile['General_x0020_Science'] = $select('generalscience').get_value().toString();
	profile['Speech'] = $select('speech').get_value().toString();
	profile['Counseling'] = $select('counseling').get_value().toString();
	profile['Reading'] = $select('reading').get_value().toString();
	profile['Proctor_x0020_Only'] = $select('proctoronly').get_value().toString();

	$SPData.UpdateItem('Tutor List', profile).then(function(item) {
		window.top.location.href = window.location.href;
	}, function(err) {
		Shp.Dialog.WaittingDialog.hide();
		Shp.Dialog.ErrorDialog.show('Cannot update profile', err);
	});

}




