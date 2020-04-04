
function pageContentLoad(sender, args) {

    GetCourses().then(function (items) {
    	ShowCourses(items);
    }, function (err) {
    	alert(err);
    });
}

function CloseModal() {
    window.parent.Shp.Dialog.EditFormDialog.hide();
}


function ShowCourses(items) {
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
                    var html = '';
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
            }
        ]
    });

}

function GetCourses() {
    var promise = new Promise(function (resolve, reject) {
        var url = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('Student Subjects-Grades')/items?$top=5000&$select=*,Student_x0020_Identifier_x003a_S/Student_x0020_Identifier_x003a_S,Student_x0020_Identifier_x003a_S/Student_x0020_Identifier_x003a_S0" +
        	"&$expand=Student_x0020_Identifier_x003a_S/Student_x0020_Identifier_x003a_S,Student_x0020_Identifier_x003a_S/Student_x0020_Identifier_x003a_S0" +
            "&$filter=Student_x0020_ID eq " + Shp.Page.GetParameterFromUrl('StudentId');
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









