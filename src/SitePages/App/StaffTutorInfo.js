
function pageContentLoad(sender, args) {
	Shp.Dialog.WaittingDialog.show('Getting data');
	var getTutor = $SPData.GetListItems('Tutor List', '<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' + Shp.Page.GetParameterFromUrl('tutorId') + '</Value></Eq></Where></Query></View>');
	Promise.all([getTutor]).then(function(results) {
		var tutor = results[0].itemAt(0);
		PopulateForm(tutor);
	}, function(err) {
		Shp.Dialog.WaittingDialog.hide();		
		Shp.Dialog.ErrorDialog.show('Cannot get data', err);
	});
}

function PopulateForm(tutor) {
	$select('profileId').set_value(tutor.get_id().toString());	
	$select('tutorId').set_value(tutor.get_item('Tutor_x0020_ID'));
	$select('contact1').set_value(tutor.get_item('Contact_x0020_1'));
	$select('contact2').set_value(tutor.get_item('Contact_x0020_2'));

	Shp.Dialog.WaittingDialog.hide();
}

function CloseModal() {
	window.parent.Shp.Dialog.EditFormDialog.hide();
}




	