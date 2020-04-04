function pageContentLoad(sender, args) {



    Shp.Dialog.WaittingDialog.show('Getting data');
    
    
    
    var getCourses = GetCourses();
    Promise.all([getCourses]).then(function(results) {
    	ShowCourses(results[0]);
    }, function(err) {
    	Shp.Dialog.WaittingDialog.hide();
    	Shp.Dialog.ErrorDialog.show('Cannot get data', err);
    });    
    return;
}

function ShowCourses(rows) {

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
                data: 'Final_x0020_Grade'
            }
        ]
    });

    Shp.Dialog.WaittingDialog.hide();
}


function GetCourses() {
    var promise = new Promise(function (resolve, reject) {
        var url = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('Student Subjects-Grades')/items?$top=5000&$expand=Student_x0020_Identifier/ID,Student_x0020_Identifier/School_x0020_District,Student_x0020_Identifier/St_x0020_F_x0020_Name,Student_x0020_Identifier/St_x0020_L_x0020_Name&$select=*,Student_x0020_Identifier/ID,Student_x0020_Identifier/School_x0020_District,Student_x0020_Identifier/St_x0020_F_x0020_Name,Student_x0020_Identifier/St_x0020_L_x0020_Name&$filter=" +
            "Tutor_x0020_Start_x0020_Date eq null and Student_x0020_Identifier ne null";
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

    var url = _spPageContextInfo.webAbsoluteUrl + '/SitePages/App/StudentInfo.aspx?studentId=' + studentId;
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












