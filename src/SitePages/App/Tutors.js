
function pageContentLoad(sender, args) {


    Shp.Dialog.WaittingDialog.show('Getting data');

    var getTutors = GetTutors();
    Promise.all([getTutors]).then(function (results) {
        ShowTutors(results[0]);
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show('Cannot get tutor list', err);
    });

}

function GetTutors() {
    var promise = new Promise(function (resolve, reject) {
        var url = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('Tutor List')/items?$top=2000";
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



function ShowTutors(tutors) {


    jq('#dataTable').DataTable({
        paging: false,
        data: tutors,
        columns: [
            {
                data: null,
                defaultContent: '',
                orderable: false,
                render: function (d, row, index, meta) {
                    return '<a href="javascript:EditTutor(\'' + d['ID'] + '\')">Edit</a>';
                }
            },
            {
                data: null,
                defaultContent: '',
                render: function (d) {
                    return d['T_x0020_F_x0020_Name'] + ' ' + d['T_x0020_L_x0020_Name'];
                }
            },
            {
                data: 'State'
            },
            {
                data: 'City'
            },
            {
                data: 'Email'
            },
            {
            	data: 'Salary'
            }
        ]
    });

    Shp.Dialog.WaittingDialog.hide();
}


function ApplyFilter() {
    window.top.location.href = _spPageContextInfo.webAbsoluteUrl + '/SitePages/App/Students.aspx?School=' + $select('filterschool').get_value();
}

function AddStudent() {
	var url = _spPageContextInfo.webAbsoluteUrl + '/SitePages/App/StaffAddStudent.aspx?School=' + $select('filterschool').get_value();
	Shp.Dialog.EditFormDialog.show('Edit student', url, function() {
	});
}

function EditStudent(studentId) {
	var url = _spPageContextInfo.webAbsoluteUrl + '/SitePages/App/StaffStudentInfo.aspx?studentId=' + studentId;
	Shp.Dialog.EditFormDialog.show('Edit student', url, function() {
	});
	
}

function EditTutor(tutorId) {
	var url = _spPageContextInfo.webAbsoluteUrl + '/SitePages/App/StaffTutorInfo.aspx?tutorId=' + tutorId;
	Shp.Dialog.EditFormDialog.show('Edit tutor profile', url, function() {
	});
	
}



