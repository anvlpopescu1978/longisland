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
    var grades = ['Incomplete', '55', '56', '57', '58', '59','60','61', '62', '63', '64', '65',
    '66', '67', '68', '69', '70', '71','72','73', '74', '75', '76', '77', '78', '79', '80',
    '81', '82', '83', '84', '85', '86','87','88', '89', '90', '91', '92',
    '93', '94', '95', '96', '97', '98','99'];

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
            	orderable: false,
                data: null,
                defaultContent: '',
                render: function (d) {
                    var html = '<select id="finalGrade' + d['ID'] + '" class="form-control input-sm" onchange="javascript:SetGrade(this,\'' + d['ID'] + '\')">' +
                        '<option value="">...</option>';
                    for (var k = 0; k < grades.length; k++) {
                        if (grades[k] === d['Final_x0020_Grade']) {
                            html += '<option value="' + grades[k] + '" selected="selected">' + grades[k] + '</option>';
                        }
                        else {
                            html += '<option value="' + grades[k] + '">' + grades[k] + '</option>';
                        }
                    }
                    html += '</select>';
                    return html;
                }
            },
            {
            	orderable: false,
                data: null,
                defaultContent: '',
                render: function (d) {
                    var notesOptions = ['A pleasure to teach', 
                    'Cooperative and responsible', 
                    'Very talented in subject', 
                    'Good insight in subject',
                    'Improved Effort',
                    'Absences affecting progress',
                    'Recent decline in effort',
                    'Needs to make up work',
                    'Difficulty with subject matter',
                    'Incomplete',
                    'Evaluated on less than three (3) sessions'];
                    var html = '<select id="gradesNotes' + d['ID'] + '" class="form-control input-sm" onchange="javascript:SetNotes(this,\'' + d['ID'] + '\')">' +
                    '<option value="">...</option>';  
                    for (var k = 0; k < notesOptions.length; k++) {
                        if (notesOptions[k] === d['Grades_x0020_Notes']) {
                            html += '<option value="' + notesOptions[k] + '" selected="selected">' + notesOptions[k] + '</option>';
                        }
                        else {
                            html += '<option value="' + notesOptions[k] + '">' + notesOptions[k] + '</option>';
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


function SetNotes(el, courseId) {
    Shp.Dialog.WaittingDialog.show('Saving data');
    $SPData.UpdateItem('Student Subjects-Grades', {
		'ID': courseId,
		//'Final_x0020_Grade': $select('finalGrade' + courseId).get_value()
		'Grades_x0020_Notes': $select('gradesNotes' + courseId).get_value()
	}).then(function(item) {
		Shp.Dialog.WaittingDialog.hide();	
	}, function(err) {
		Shp.Dialog.WaittingDialog.hide();
		Shp.Dialog.ErrorDialog.show('Cannot save data', err);
	});
}

function SetGrade(el, courseId) {

	Shp.Dialog.WaittingDialog.show('Saving data');
	$SPData.UpdateItem('Student Subjects-Grades', {
		'ID': courseId,
		'Final_x0020_Grade': $select('finalGrade' + courseId).get_value()
		 //'Grades_x0020_Notes': $select('gradesNotes' + courseId).get_value()
	}).then(function(item) {
		Shp.Dialog.WaittingDialog.hide();	
	}, function(err) {
		Shp.Dialog.WaittingDialog.hide();
		Shp.Dialog.ErrorDialog.show('Cannot save data', err);

	});

}


function GetCourses(tutorId) {
    var promise = new Promise(function (resolve, reject) {
        var url = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('Student Subjects-Grades')/items?$top=3000&$expand=Student_x0020_Identifier/ID,Student_x0020_Identifier/School_x0020_District,Student_x0020_Identifier/St_x0020_F_x0020_Name,Student_x0020_Identifier/St_x0020_L_x0020_Name&$select=*,Student_x0020_Identifier/ID,Student_x0020_Identifier/School_x0020_District,Student_x0020_Identifier/St_x0020_F_x0020_Name,Student_x0020_Identifier/St_x0020_L_x0020_Name&$filter=" +
            "Tutor_x0020_ID  eq '" + tutorId + "' and Student_x0020_Identifier ne null and Phase eq 'Accepted'";
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












