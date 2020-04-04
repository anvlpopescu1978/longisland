function pageContentLoad(sender, args) {



    Shp.Dialog.WaittingDialog.show('Getting data');

    var getTutors = $SPData.GetListItems('Tutor List', '<View><Query><Where><Eq><FieldRef Name="Email" /><Value Type="Text">' + _spPageContextInfo.userEmail + '</Value></Eq></Where></Query></View>');
    Promise.all([getTutors]).then(function (results) {
        var tutorId = results[0].itemAt(0).get_item('Tutor_x0020_ID');
        GetCourses(tutorId).then(function (rows) {
            ShowCourses(rows);
        }, function (err1) {
            Shp.Dialog.WaittingDialog.hide();
            Shp.Dialog.ErrorDialog.show('Cannot get courses', JSON.parse(err1).error.message);
        });
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show('Cannot get tutor information', err);
    });

}




function ShowCourses(rows) {
    var phases = ['Accepted', 'Not accepted'];

    jq('#tblCourses').DataTable({
        responsive: false,
        scrollX: false,
        info: false,
        ordering: true,
        paging: false,
        data: rows,
        columns: [
            {
            	orderable: false,
                data: null,
                defaultContent: '',
                render: function (d, row, index, meta) {

                    var html = '<div class="dropdown show">' +
                        '<a class="btn btn-primary btn-xs dropdown-toggle" href="#" role="button" id="dropdownMenuLink' + d['ID'] + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</a>' +
                        '<div class="dropdown-menu" aria-labelledby="dropdownMenuLink' + d['ID'] + '">' +
                        '<a class="dropdown-item" href="javascript:StudentInfo(\'' + d['Student_x0020_Identifier']['ID'] + '\')">Student Info</a>' +
                        '<a class="dropdown-item" href="javascript:ContactAttempts(\'' + d['Student_x0020_Identifier']['ID'] + '\')">Contact Attempts</a>' +
                        '<a class="dropdown-item" href="javascript:StudentCalendar(\'' + d["Student_x0020_Identifier"]["St_x0020_F_x0020_Name"] + '\', \'' + d["Student_x0020_Identifier"]["St_x0020_L_x0020_Name"] + '\')">Student Availability</a>' +

                        '</div>' +
                        '</div>';
                    return html;
                }
            },
            {
                data: 'ID'
            },
            {
                data: null,
                defaultContent: '',
                render: function (d) {
                    return d["Student_x0020_Identifier"]["St_x0020_F_x0020_Name"] + ' ' +
                        d["Student_x0020_Identifier"]["St_x0020_L_x0020_Name"];
                }
            },
            {
                data: null,
                defaultContent: '',
                render: function (d) {
                    return d["Student_x0020_Identifier"]["School_x0020_District"];
                }
            },
            {
                data: 'Course_x0020_Number',
            },
            {
                data: 'Course_x0020_Description',
            },
            {
            	data: null,
            	defaultContent: '',
            	render: function(d, row, index, meta) {
                    var html = '<select id="status' + d['ID'] + '" class="form-control input-sm" onchange="javascript:SetStatus(this,\'' + d['ID'] + '\',' + meta.row + ')">' +
                        '<option value="">...</option>';
                    for (var k = 0; k < phases.length; k++) {
                        if (phases[k] === d['Phase']) {
                            html += '<option value="' + phases[k] + '" selected="selected">' + phases[k] + '</option>';
                        }
                        else {
                            html += '<option value="' + phases[k] + '">' + phases[k] + '</option>';
                        }
                    }
                    html += '</select>';
                    return html;

            	}
            }
        ]
    });

    Shp.Dialog.WaittingDialog.hide();
}



function SetStatus(el, id, rowIndex) {

    Shp.Dialog.WaittingDialog.show('Saving data');

    var updateOffer = $SPData.UpdateItem('Student Subjects-Grades', {
		'ID': id,
		'Phase': $select('status' + id).get_value()
    }), data = jq('#tblCourses').DataTable().row(rowIndex).data();

    var emailBody = '<table style="width:100%">' +
    '<tr>' +
    '<td>Student Name</td>' +
    '<td>' + data['Student_x0020_Identifier']['St_x0020_F_x0020_Name'] + ' ' + data['Student_x0020_Identifier']['St_x0020_L_x0020_Name'] + '</td>' +
    '</tr>' +
    '<tr>' +
    '<td>School District</td>' +
    '<td>' + data["Student_x0020_Identifier"]["School_x0020_District"] + '</td>' +
    '<tr>' +
    '<td>Course #</td>' +
    '<td>' + data['Course_x0020_Number'] + '</td>' +
    '</tr>' +
    '<tr>' +
    '<td>Course Description</td>' +
    '<td>' + data['Course_x0020_Description'] + '</td>' +
    '</tr>' +
    '<tr>' +
    '<td>Status </td>' +
    '<td>' +  $select('status' + id).get_value()+ '</td>' +
    '</tr>' +
    '</table>';
    var email = new Shp.Utility.EmailProperties(['AlesiaOlsen@litutorialservices.onmicrosoft.com', _spPageContextInfo.userEmail], 'AlesiaOlsen@litutorialservices.onmicrosoft.com', 'Offer status changed', emailBody);
    var sendEmail = new Promise(function(resolve, reject) {
        Shp.Utility.Email.SendEmail(email, function() {
            resolve();
        }, function(err) {
            reject(err);
        })
     });
  
     Promise.all([updateOffer, sendEmail]).then(function(results) {
        jq(el).parent('td').parent('tr').remove();
		Shp.Dialog.WaittingDialog.hide();
     }, function(err) {
		Shp.Dialog.WaittingDialog.hide();
		Shp.Dialog.ErrorDialog.show('Cannot save data', err);
     })
	
}


function GetCourses(tutorId) {
    var promise = new Promise(function (resolve, reject) {
        var url = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('Student Subjects-Grades')/items?$top=3000&$expand=Student_x0020_Identifier/ID,Student_x0020_Identifier/School_x0020_District,Student_x0020_Identifier/St_x0020_F_x0020_Name,Student_x0020_Identifier/St_x0020_L_x0020_Name&$select=*,Student_x0020_Identifier/ID,Student_x0020_Identifier/School_x0020_District,Student_x0020_Identifier/St_x0020_F_x0020_Name,Student_x0020_Identifier/St_x0020_L_x0020_Name&$filter=" +
            "Tutor_x0020_ID  eq '" + tutorId + "' and Student_x0020_Identifier ne null and Phase eq null";
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


function StudentInfo(studentId) {

    var url = _spPageContextInfo.webAbsoluteUrl + '/SitePages/App/TutorSudentInfo.aspx?studentId=' + studentId;
    Shp.Dialog.EditFormDialog.show('Edit student', url, function () {
        window.top.location.href = window.location.href;
    });

}

function ContactAttempts(courseId) {

    var url = _spPageContextInfo.webAbsoluteUrl + '/SitePages/App/ContactAttempts.aspx?courseId=' + courseId;
    Shp.Dialog.EditFormDialog.show('Edit student', url, function () {
        window.top.location.href = window.location.href;
    });

}


function StudentCalendar(firstName, lastName) {
	var url = _spPageContextInfo.webAbsoluteUrl + '/SitePages/App/StudentCalendar.aspx?firstName=' + escapeProperly(firstName) +
	'&lastName=' + escapeProperly(lastName);
	 Shp.Dialog.EditFormDialog.show('Student Calendar', url, function () {
    });


}












