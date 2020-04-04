
function pageContentLoad(sender, args) {

    Shp.Dialog.WaittingDialog.show('Getting student info');    

    var getStudentInfo = $SPData.GetListItems('CurrentStudentInfo', '<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' + Shp.Page.GetParameterFromUrl('studentId') + '</Value></Eq></Where></Query></View>');
    Promise.all([getStudentInfo]).then(function (results) {
        var student = results[0].itemAt(0);

        $select('firstName').set_value(student.get_item('St_x0020_F_x0020_Name') === null ? '' : student.get_item('St_x0020_F_x0020_Name'));
        $select('lastName').set_value(student.get_item('St_x0020_L_x0020_Name') === null ? '' : student.get_item('St_x0020_L_x0020_Name'));
        $select('state').set_value(student.get_item('State') === null ? '' : student.get_item('State'));
        $select('city').set_value(student.get_item('City') === null ? '' : student.get_item('City'));
        $select('streetAddress').set_value(student.get_item('Street_x0020_Address') === null ? '' : student.get_item('Street_x0020_Address'));
        $select('parentName').set_value(student.get_item('Parent_x0020_Name') === null ? '' : student.get_item('Parent_x0020_Name'));
        $select('email').set_value(student.get_item('E_x002d_Mail') === null ? '' : student.get_item('E_x002d_Mail'));
        $select('hphone').set_value(student.get_item('H_x0020_Phone') === null ? '' : student.get_item('H_x0020_Phone'));
        $select('wphone').set_value(student.get_item('W_x0020_Phone') === null ? '' : student.get_item('W_x0020_Phone'));
        $select('cphone1').set_value(student.get_item('C_x0020_Phone_x0020_1') === null ? '' : student.get_item('C_x0020_Phone_x0020_1'));
        $select('cphone2').set_value(student.get_item('C_x0020_Phone_x0020_2') === null ? '' : student.get_item('C_x0020_Phone_x0020_2'));
        jq('#comments').summernote('code', student.get_item('Comments'));
        jq('#comments').summernote();
        
        Shp.Dialog.WaittingDialog.hide();         
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show('Cannot get tutor information', err);
    });

}

function CloseModal() {
	window.parent.Shp.Dialog.EditFormDialog.hide();
}



function SaveStudent() {
	Shp.Dialog.WaittingDialog.show('Saving data');
	
	var student = {
		'ID': Shp.Page.GetParameterFromUrl('studentId'),
		'State': $select('state').get_value(),
		'City': $select('City').get_value(),
		'Street_x0020_Address': $select('streetAddress').get_value(),
		'Parent_x0020_Name': $select('parentName').get_value(),
		'E_x002d_Mail': $select('email').get_value(),
		'H_x0020_Phone': $select('hphone').get_value(),
		'W_x0020_Phone': $select('wphone').get_value(),
		'C_x0020_Phone_x0020_1': $select('cphone1').get_value(),
		'C_x0020_Phone_x0020_2': $select('cphone2').get_value(),
		 'Comments':  jq('#comments').summernote('code')
	};
	
	$SPData.UpdateItem('CurrentStudentInfo', student).then(function(item) {
		window.parent.top.location.href = window.parent.location.href;
	}, function(err) {
		Shp.Dialog.WaittingDialog.hide();
		Shp.Dialog.ErrorDialog.show('Cannot save data', err);
	});
}














