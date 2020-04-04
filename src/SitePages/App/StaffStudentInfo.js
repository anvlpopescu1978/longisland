
function pageContentLoad(sender, args) {

    Shp.Dialog.WaittingDialog.show('Getting student data');    

	var getComments = GetComments();
    var getStudentInfo = $SPData.GetListItems('CurrentStudentInfo', '<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' + Shp.Page.GetParameterFromUrl('studentId') + '</Value></Eq></Where></Query></View>');
    Promise.all([getStudentInfo, getComments]).then(function (results) {
        var student = results[0].itemAt(0);
        $select('firstName').set_value(student.get_item('St_x0020_F_x0020_Name') === null ? '' : student.get_item('St_x0020_F_x0020_Name'));
        $select('lastName').set_value(student.get_item('St_x0020_L_x0020_Name') === null ? '' : student.get_item('St_x0020_L_x0020_Name'));
        $select('state').set_value(student.get_item('State') === null ? '' : student.get_item('State'));
        $select('city').set_value(student.get_item('City') === null ? '' : student.get_item('City'));
        $select('zipcode').set_value(student.get_item('Zip_x0020_Code') === null ? '' : student.get_item('Zip_x0020_Code'));
        $select('streetAddress').set_value(student.get_item('Street_x0020_Address') === null ? '' : student.get_item('Street_x0020_Address'));
        $select('parentName').set_value(student.get_item('Parent_x0020_Name') === null ? '' : student.get_item('Parent_x0020_Name'));
        $select('email').set_value(student.get_item('E_x002d_Mail') === null ? '' : student.get_item('E_x002d_Mail'));
        $select('hphone').set_value(student.get_item('H_x0020_Phone') === null ? '' : student.get_item('H_x0020_Phone'));
        $select('wphone').set_value(student.get_item('W_x0020_Phone') === null ? '' : student.get_item('W_x0020_Phone'));
        $select('cphone1').set_value(student.get_item('C_x0020_Phone_x0020_1') === null ? '' : student.get_item('C_x0020_Phone_x0020_1'));
        $select('cphone2').set_value(student.get_item('C_x0020_Phone_x0020_2') === null ? '' : student.get_item('C_x0020_Phone_x0020_2'));
        jq('#notes').summernote('code', student.get_item('Comments'));
        jq('#notes').summernote();
        
        // Display comments
        var comments = results[1], html = '';
        var index = 0;
        for (var k = 0; k < comments.length; k++) {
            var comment = comments[k];
            if(comment['Additional_x005f_x0020_x005f_Comments'] === null) 
            	continue;
           	index++;
            html += (index % 2 === 0 ? '<li>' : '<li class="timeline-inverted">') +
                '<div class="timeline-badge warning" style="background-color:#0096D6 !important"><i class="fa fa-comment"></i></div>' +
                '<div class="timeline-panel">' +
                '<div class="timeline-heading">' +
                '<small class="text-muted">' + comment['Created'].split('T')[0] + '</small>' +
                '</div>' +
                '<div class="timeline-body">' +
                 comment['Additional_x005f_x0020_x005f_Comments'] +
                '</div>' +
                '</div>' +
                '</li>';
        }
        jq('#commentsPlace').html(html);
      
        
        Shp.Dialog.WaittingDialog.hide();         
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show('Cannot get tutor information', err);
    });

}

function CloseModal() {
	window.parent.Shp.Dialog.EditFormDialog.hide();
}


function GetComments() {
    
    var promise = new Promise(function (resolve, reject) {
    	var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/getbytitle('CurrentStudentInfo')/items(" + Shp.Page.GetParameterFromUrl('studentId') + ")/versions?$select=Additional_x0020_Comments,Created";
        var executor = new SP.RequestExecutor(_spPageContextInfo.webAbsoluteUrl);
        executor.executeAsync({
            url: url,
            method: 'GET',
            headers: { "Accept": "application/json; odata=verbose" },
            error: function (data, errorCode, errorMessage) {
                reject(data.body);
            },
            success: function (results) {
                let response = JSON.parse(results.body);
                let rows = response.d.results;
                resolve(rows);
            }
		});
    });
    
    return promise;
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
		'Zip_x0020_Code': $select('zipcode').get_value()
	};
	
	$SPData.UpdateItem('CurrentStudentInfo', student).then(function(item) {
		window.parent.top.location.href = window.parent.location.href;
	}, function(err) {
		Shp.Dialog.WaittingDialog.hide();
		Shp.Dialog.ErrorDialog.show('Cannot save data', err);
	});
}














