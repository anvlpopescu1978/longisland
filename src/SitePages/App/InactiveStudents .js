
function pageContentLoad(sender, args) {

    if (Shp.Page.GetParameterFromUrl('School') === '') {
        ShowStudents([]);
        return;
    }

    Shp.Dialog.WaittingDialog.show('Getting data');

    $select('filterschool').set_value(Shp.Page.GetParameterFromUrl('School'));
    var getStudents = GetStudents();
    Promise.all([getStudents]).then(function (results) {
        var students = results[0];
        ShowStudents(students);
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show('Getting students list', err);
    });

}

function GetStudents() {
    var promise = new Promise(function (resolve, reject) {
        var url = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('CurrentStudentInfo')/items?$top=5000&$filter=School_x0020_District eq '" + Shp.Page.GetParameterFromUrl('School') + "' and Active eq 0";
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



function ShowStudents(students) {
    jq('#dataTable').DataTable({
        paging: false,
        data: students,
        info: false,
        columns: [
            {
                data: null,
                defaultContent: '',
                orderable: false,
                render: function (d, row, index, meta) {
                
                     var html = '<div class="dropdown show">' +
                        '<a class="btn btn-primary btn-xs dropdown-toggle" href="#" role="button" id="dropdownMenuLink' + d['ID'] + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</a>' +
                        '<div class="dropdown-menu" aria-labelledby="dropdownMenuLink' + d['ID'] + '">' +
                        '<a class="dropdown-item" href="javascript:EditStudent(\'' + d['ID'] + '\')">Edit</a>' +
                        '<a class="dropdown-item" href="javascript:ViewCourses(\'' + d['ID'] + '\')">Courses</a>' +
                        '</div>' +
                        '</div>';
                    return html;

                }
            },
            {
                data: null,
                defaultContent: '',
                render: function (d) {
                    return d['St_x0020_F_x0020_Name'] + ' ' + d['St_x0020_L_x0020_Name'];
                }
            },
            {
                data: 'City'
            },
            {
                data: 'Street_x0020_Address'
            },
            {
                data: 'Zip_x0020_Code'
            },
            {
                data: null,
                render: function(d) {
                    let active = d["Active"];
                    let options = [{ 'text': 'Active', 'value': true }, { 'text': 'Inactive', 'value': false }];
                    let html = '<select onchange="javascript:SetStudentStatus(this, \'' + d["ID"] + '\')" class="form-control input-sm" id="studentActive' + d['ID'] + '">';
                    for(let k = 0; k < options.length; k++) {
                        html += (options[k]['value'] === active) ? '<option text="' + options[k]['value'] +  '" selected>' + options[k]['text'] + '</option>'
                        : '<option text="' + options[k]['value'] +  '">' + options[k]['text'] + '</option>';
                    }
                    html += '<select>';
                    return html;
                }
            }
        ]
    });

    Shp.Dialog.WaittingDialog.hide();
}


function ApplyFilter() {
    window.top.location.href = _spPageContextInfo.webAbsoluteUrl + '/SitePages/App/InactiveStudents.aspx?School=' + $select('filterschool').get_value();
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

function ViewCourses(studentId) {
	var url = _spPageContextInfo.webAbsoluteUrl + '/SitePages/App/CoursesPerStudent.aspx?StudentId=' + studentId;
	Shp.Dialog.EditFormDialog.show('View courses', url, function() {
	});

}


function SetStudentStatus(element, id) {
    Shp.Dialog.WaittingDialog.show('Getting data');
    let student = {};
    student['ID'] = id;
    student['Active'] = jq(element).val() === 'true' ? 1 : 0;
    $SPData.UpdateItem('CurrentStudentInfo', student).then(function(results) {
        window.location.href = window.location.href;
    }, function(err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show('Cannot save student status',  err);
    });
}


