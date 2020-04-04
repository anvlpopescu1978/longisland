function pageContentLoad(sender, args) {



    Shp.Dialog.WaittingDialog.show('Getting data');
    $select('filteryear').set_value(Shp.Page.GetParameterFromUrl('year'));
    $select('filtermonth').set_value(Shp.Page.GetParameterFromUrl('month'));

    var getAppointments = GetAppointments();
    Promise.all([getAppointments]).then(function (results) {

        function showDetails(d, rowIndex) {
            var html = '<div class="row">';
            html += '<div class="form-group">' +
                '<div class="col-sm-4"><label>Attempt Date</label><input type="date" class="form-control input-sm" /></div>' +
                '<div class="col-sm-4"><label>Attempt Channel</label><input type="date" class="form-control input-sm" /></div>' +
                '<div class="col-sm-4"><label>Attempt Status</label><input type="date" class="form-control input-sm" /></div>' +
                '</div>';
            html += '</div>'
            return html;
        }

        // Show appointments
        var appointments = results[0];
        jq('#tblAppointments').DataTable({
            initComplete: function (settings, json) {
                jq('#tblAppointments tbody td.details-control').click(function () {
                    let tr = jq(this).closest('tr');
                    let row = jq('#tblAppointments').DataTable().row(tr);
                    let tdi = tr.find("i.fa");
                    if (row.child.isShown()) {
                        // This row is already open - close it
                        row.child.hide();
                        tr.removeClass('shown');
                        tdi.first().removeClass('fa-minus-square');
                        tdi.first().addClass('fa-plus-square');
                    }
                    else {
                        // Open this row
                        row.child(showDetails(row.data())).show();
                        tr.addClass('shown');
                        tdi.first().removeClass('fa-plus-square');
                        tdi.first().addClass('fa-minus-square');
                    }
                });
            },
            info: false,
            paging: false,
            data: appointments,
            columns: [{
                data: null,
                orderable: false,
                className: 'details-control',
                defaultContent: '',
                orderable: false,
                render: function () {
                    return '<i class="fa fa-plus-square" aria-hidden="true"></i>';
                }
            },
            { data: 'Student_x0020_Name' },
            { data: 'Parent_x0020_Name' },
            {
                data: null,
                defaultContent: '',
                render: function (d) {
                    if (d["Subject_x0020__x002d__x0020_Grad"] !== null && d["Subject_x0020__x002d__x0020_Grad"].hasOwnProperty("Course_x0020_Number") === true) {
                        return d["Subject_x0020__x002d__x0020_Grad"]["Course_x0020_Number"];
                    }
                    else {
                        return '';
                    }
                }
            },
            {
                data: null,
                defaultContent: '',
                render: function (d) {
                    var html = d["Date"] !== null ? String(d["Date"]).split('T')[0] : '';
                    return html;
                }
            },
            { data: 'Duration' },
            { data: 'Start_x0020_Time' },
            { data: 'End_x0020_Time' },
            {
                data: null,
                defaultContent: '',
                render: function (d, row, index, meta) {
               
                    var phases = ['Scheduled', 'No show', 'Last Minute Cancellation (LMC)', 'Tutor Cancelled', 'Completed'];
                    var readonly = d['Status'] === 'Scheduled' ? '' : 'disabled="disabled"';
                    var html = '<select data-status="' + d['Status'] + '" ' + readonly + ' onchange="javascript:ChangeStatus(this, \'' + d['ID'] + '\', \'' + d["Subject_x0020__x002d__x0020_Grad"]["ID"] + '\', \'' + d['Month'] + '\', ' + d['Duration'] + ')" id="sessionstatus' + d['ID'] + '" class="form-control input-sm">';
                    for (var i = 0; i < phases.length; i++) {
                        if (phases[i] === d['Status']) {
                            html += '<option selected="selected" value="' + phases[i] + '">' + phases[i] + '</option>';
                        }
                        else {
                            html += '<option value="' + phases[i] + '">' + phases[i] + '</option>';
                        }
                    }
                    html += '</select>';
                    return html;
                }
            }]
        });

        Shp.Dialog.WaittingDialog.hide();
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show('Cannot get data', err);
    });

}


function ChangeStatus(element, sessionId, courseId, month, duration) {

	var selectElement = jq(element);
	Shp.Dialog.PromptDialog.show('Confirm appointment status', 'Please confirm appointment status change', function() {
		Shp.Dialog.PromptDialog.hide();
		Shp.Dialog.WaittingDialog.show('Saving data');
		
		// Recalculate duration based on status
		var _duration;
		switch(selectElement.val()) {
			case 'Last Minute Cancellation (LMC)':
			case 'No show':
				_duration = 1;
				break;
			case 'Tutor Cancelled':
				_duration = 0;
				break;
			default:
				_duration = duration;
		}
		
	    $SPData.GetListItems('Student Subjects-Grades', '<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' + courseId + '</Value></Eq></Where></Query></View>').then(function (items) {
	        _ChangeStatus(element, sessionId, courseId, month, _duration, items.itemAt(0));
	    }, function (err) {
	        Shp.Dialog.WaittingDialog.hide();
	        Shp.Dialog.ErrorDialog.show('Cannot get course data', err);
	    });
		
	}, function() {
		$select('sessionstatus' + sessionId).set_value(selectElement.data('status'));
		Shp.Dialog.PromptDialog.hide();
	});
	
	
}


function _ChangeStatus(element, sessionId, courseId, month, duration, course) {

	var courseDuration = duration;
	var appointmentStatus = $select('sessionstatus' + sessionId).get_value();
	var spFieldName = {
        'January': 'jan',
        'February': 'feb',
        'March': 'mar',
        'April': 'april',
        'May': 'may',
        'June': 'jun',
        'July': 'jul',
        'August': 'aug',
        'September': 'sep',
        'October': 'oct',
        'November': 'nov',
        'December': 'dec'
    }, fieldName = spFieldName[month], courseItem = {};
    courseItem['ID'] = courseId;
    courseItem[fieldName] = course.get_item(fieldName) + duration;

    var updateSession = $SPData.UpdateItem('Sessions', {
        'ID': sessionId,
        'Status': jq(element).val()
    });

    var updateCourse = $SPData.UpdateItem('Student Subjects-Grades', courseItem);

    Promise.all([updateSession, updateCourse]).then(function (results) {
        window.top.location.href = window.location.href;
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show('Cannot save data', err);
    });
}


function GetAppointments() {

    var promise = new Promise(function (resolve, reject) {

        if (Shp.Page.GetParameterFromUrl('year') === '' || Shp.Page.GetParameterFromUrl('month') === '') {
            resolve([]);
            return;
        };

        var url = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('Sessions')/items?$top=5000&$orderby=Created desc&$expand=Subject_x0020__x002d__x0020_Grad/Final_x0020_Grade,   Subject_x0020__x002d__x0020_Grad/ID,Subject_x0020__x002d__x0020_Grad/Course_x0020_Number,Author/Id,Author/Title&$select=*,Subject_x0020__x002d__x0020_Grad/Final_x0020_Grade,Subject_x0020__x002d__x0020_Grad/ID,Subject_x0020__x002d__x0020_Grad/Course_x0020_Number,Author/ID,Author/Title&$filter=Author/Id eq "
            + _spPageContextInfo.userId + " and Year eq " + Shp.Page.GetParameterFromUrl('year') +
            " and Month eq '" + Shp.Page.GetParameterFromUrl('month') + "'";
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


function GenerateDocument() {

    var data = jq('#tblAppointments').DataTable().rows().data();
    var students = [];
    for (var i = 0; i < data.length; i++) {
        var student = data[i]["Student_x0020_Name"];
        if (Array.contains(students, student) === false) {
            students.push(student);
        }
    }
    students.sort();

    var opts = '<option value="">...</option>';
    for (var k = 0; k < students.length; k++) {
        opts += '<option value="' + students[k] + '">' + students[k] + '</option>';
    }

    var html = '<div class="form-group">' +
        '<select id="studentSelector" class="form-control input-sm">' + opts + '</select>' +
        '</div>';

    Shp.Dialog.PromptDialog.show('Generate document', html, function () {
        _GenerateDocument(data, jq('#studentSelector').val());

    });

}


function _GenerateDocument(data, studentName) {
    Shp.Dialog.PromptDialog.hide();

    var appointmentsTable = '';
    var data = jq('#tblAppointments').DataTable().rows().data();
    for (var i = 0; i < data.length; i++) {
        var appointment = data[i];
        if (studentName === appointment['Student_x0020_Name']) {
            appointmentsTable += '<tr>' +
                '<td>' + appointment['Date'].split('T')[0] + '</td>' +
                '<td>' + appointment['Start_x0020_Time'] + '</td>' +
                '<td>' + appointment['End_x0020_Time'] + '</td>' +
                '<td>' + appointment['Subject_x0020__x002d__x0020_Grad']['Final_x0020_Grade'] + '</td>' +
                '<td>' + appointment['Subject_x0020__x002d__x0020_Grad']['Course_x0020_Number'] + '</td>' +
                '</tr>';
        }
    }


    var head = '<style type="text/css">' +
        '@page {  size:A4; }' +
        'table.sessions-paperwork { width:100%;  border-collapse:separate; border-spacing:1px 1px; }' +
        'table.sessions-paperwork tbody td { background-color:#EEEEEE; }' +
        'table.sessions-paperwork thead {  background-color: #de3a3a; color: #ffffff; font-weight: bold;  }' +
        '</style>';
    var body = '<table style="width:100%">' +
        '<tr>' +
        '<td style="font-weight: bold; text-align: left; font-size:10px; width:50%">' +
        '173 N Main Street Suite 213<br />Sayville, NY 11782<br />P 631.316.0426<br />F 631.656.0029' +
        '</td>' +
        '<td style="text-align:right">' +
        '<img src="data:image/png;base64,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" />' +
        '</td>' +
        '</tr>' +
        '<tr><td colspan="2" style="text-align:center"><h4>Long Island Tutorial Services</h4></td></tr>' +
        '<tr><td colspan="2" style="text-align:center">Monthly Report ' + Shp.Page.GetParameterFromUrl('month') + ' ' + Shp.Page.GetParameterFromUrl('year') + '</td></tr>' +
        '<tr>' +
        '<td stylw="vertical-align:top">Student Name: ' + studentName + '</td>' +
        '<td stylw="vertical-align:top">Tutor Name: ' + _spPageContextInfo.userDisplayName + '</td>' +
        '</tr>' +
        '</table><br /><br />' +
        '<table style"width:100%"  class="sessions-paperwork">' +
        '<thead>' +
        '<tr>' +
        '<th>Date</th>' +
        '<th>Start Time</th>' +
        '<th>End Time</th>' +
        '<th>Numeric Grade</th>' +
        '<th>Course #</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>' +
        appointmentsTable +
        '</tbody>' +
        '<tfoot></foot>' +
        '<tr>' +
        '<td colspan="2"><strong>Tutor:<br /><br />_______________________</strong></td>' +
        '<td colspan="2"><strong>Parent:</strong></td>' +
        '</tr>' +
        '</table>';
    var html = '<!DOCTYPE html><html lang="en" xmlns="http://www.w3.org/1999/xhtml"><head>' + head + '</head><body>' + body + '</body></html>';

    Shp.Dialog.WaittingDialog.hide();
    Shp.Dialog.PromptDialog.show('Monthly paperwork', html, function () {
        printElement(html);
        Shp.Dialog.PromptDialog.hide();
    });
}



function CreatePaymentRequest() {

    Shp.Dialog.WaittingDialog.show("Getting template data");

    var contractUrl = _spPageContextInfo.webAbsoluteUrl + '/SitePages/Internal/payment_request_template.html';
    var getTemplate = function () {
        return new Promise(function (resolve, reject) {
            jq.post(contractUrl, '', function (response) {
                resolve(response);
            }).fail(function () {
                reject('Cannot get template data');
            });
        });
    };

    var getTutorInfo = $SPData.GetListItems('Tutor List', '<View><Query><Where><Eq><FieldRef Name="Email" /><Value Type="Text">' + _spPageContextInfo.userEmail + '</Value></Eq></Where></Query></View>');

    Promise.all([getTutorInfo, getTemplate()]).then(function (results) {
        var tutor = results[0].itemAt(0);
        var salary = tutor.get_item('Salary');
        var total = 0;
        var total_hours = 0;
        var template = results[1];
        template = template.replace('{{Month}}', $select('filtermonth').get_value()).replace('{{Year}}', $select('filteryear').get_value());
        var parser = new DOMParser();
        var content = parser.parseFromString(template, 'text/html');

        var data = jq('#tblAppointments').DataTable().rows().data();
        var table = '';
        for (var i = 0; i < data.length; i++) {
            var row = data[i];
            table += '<tr>' +
                // Student Name
                '<td>' + row['Student_x0020_Name'] + '</td>' +
                // School District
                '<td>' + row['School_x0020_Name'] + '</td>' +
                // Course No
                '<td>' + row["Subject_x0020__x002d__x0020_Grad"]["Course_x0020_Number"] + '</td>' +
                // Date
                '<td>' + (row["Date"] !== null ? String(row["Date"]).split('T')[0] : '') + '</td>' +
                // Start Time
                '<td>' + row['Start_x0020_Time'] + '</td>' +
                // End Time
                '<td>' + row['End_x0020_Time'] + '</td>' +
                // Duration
                '<td>' + row['Duration'] + '</td>' +
                '</tr>';

            if (row["Duration"] !== null) {
                total += salary * row['Duration'];
                total_hours += row['Duration'];
            }
        }

        content.getElementById('sessions').innerHTML = table;
        content.getElementById('totalAmount').innerHTML = 'Total: ' + total + '$';
        content.getElementById('totalDuration').innerHTML = total_hours;
        content = '<!DOCTYPE html><html lang="en" xmlns="http://www.w3.org/1999/xhtml>' + content.documentElement.innerHTML + '</html>';

        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.PromptDialog.show('Payment request', content, function () {
            SavePaymentDocument(content, total, total_hours);
        });

    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show("Canot get data", err);
    });
}

function SavePaymentDocument(content, total, total_hours) {

    Shp.Dialog.PromptDialog.hide();
    Shp.Dialog.WaittingDialog.show("Creating payment request");


    var fileName = _spPageContextInfo.userEmail + ' - ' + $select('filtermonth').get_value() + ' - ' + $select('filteryear').get_value() + '.html';
    var fileContent = content;

    Shp.File.add(fileName, fileContent, 'Payment Requests').then(function (response) {
        var properties = {
            'Title': _spPageContextInfo.userEmail + ' - ' + $select('filtermonth').get_value() + ' - ' + $select('filteryear').get_value(),
            'Month': $select('filtermonth').get_value(),
            'Year': $select('filteryear').get_value(),
            'Status': 'Pending Approval',
            'Email': _spPageContextInfo.userEmail,
            'Total': total,
            'Total_x0020_Hours': total_hours
        }

        UpdatePaymentProperties(response["d"]["ServerRelativeUrl"], properties);

    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show('Cannot save document', err);
    });

}

function UpdatePaymentProperties(fileUrl, properties) {
    Shp.File.update(fileUrl, properties).then(function (response) {
        window.top.location.href = _spPageContextInfo.webAbsoluteUrl + '/SitePages/App/MyPaymentRequests.aspx';
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show("Cannot update document properties", err);
    });
}


function ExportToExcel() {
    var data = jq('#tblAppointments').DataTable().rows().data()
    var rows = [];
    for (var i = 0; i < data.length; i++) {
        var row = data[i];
        rows.push({
            'ID': row['ID'],
            'Student Name': row['Student_x0020_Name'],
            'Grade': row["Subject_x0020__x002d__x0020_Grad"]["Course_x0020_Number"],
            'Start': Date.parseInvariant(row["Date"].toString().split('T')[0] + ' ' + row['Start_x0020_Time'], 'yyyy-MM-dd HH:mm'),
            'End': Date.parseInvariant(row["Date"].toString().split('T')[0] + ' ' + row['End_x0020_Time'], 'yyyy-MM-dd HH:mm'),
            'Duration': row['Duration']
        });
    }

    var ws = XLSX.utils.json_to_sheet(rows);
    sheet_set_column_format(ws, 3, 'MM/dd/yyyy hh:mm');
    sheet_set_column_format(ws, 4, 'MM/dd/yyyy hh:mm');
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Appointments");
    XLSX.writeFile(wb, "appointments.xlsx");

}

function sheet_set_column_format(ws, C, Z) {
    var range = XLSX.utils.decode_range(ws["!ref"]);
    /* this loop starts on the second row, as it assumes the first row is a header */
    for (var R = range.s.r + 1; R <= range.e.r; ++R) {
        var cell = ws[XLSX.utils.encode_cell({ r: R, c: C })];
        if (!cell) continue;
        cell.z = Z;
    }
}


function printElement(e) {
    var ifr = document.createElement('iframe');
    ifr.style = 'height: 0px; width: 0px; position: absolute'
    document.body.appendChild(ifr);

    jq(e).clone().appendTo(ifr.contentDocument.body);
    ifr.contentWindow.print();

    ifr.parentElement.removeChild(ifr);
}

function ChangeFilter() {
    window.top.location.href = _spPageContextInfo.webAbsoluteUrl +
        '/SitePages/App/MyAppointments.aspx?month=' + $select('filtermonth').get_value() +
        '&year=' + $select('filteryear').get_value();
}


