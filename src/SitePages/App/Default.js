function pageContentLoad(sender, args) {


	var students = GetStudentsGrades();
	var tutor = $SPData.GetListItems('Tutor List', '<View><Query><Where><Eq><FieldRef Name="Email" /><Value Type="Text">' +  _spPageContextInfo.userEmail + '</Value></Eq></Where></Query></View>');
	Promise.all([students, tutor]).then(function(results) {
		var salary = results[1].itemAt(0).get_item('Salary');
		ShowData(results[0], salary);
	}, function(err) {
		Shp.Dialog.ErrorDialog.show('Error getting data', err);
	});
}


function GetStudentsGrades() 
{
	var promise = new Promise(function(resolve, reject) {
		var url = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('Student Subjects-Grades')/items?" +
		"$select=*,Student_x0020_Identifier/St_x0020_L_x0020_Name,Student_x0020_Identifier/St_x0020_F_x0020_Name" +
		"&$expand=Student_x0020_Identifier";
	    var executor = new SP.RequestExecutor(_spPageContextInfo.webAbsoluteUrl);
	    executor.executeAsync({
	        url: url,
	        method: 'GET',
	        headers: { "Accept": "application/json; odata=verbose" },
	        error: function (data, errorCode, errorMessage) {
	            reject(data.body);
	        },
	        success: function (results) {
	            var response = JSON.parse(results.body);
	            var rows = response.d.results;
	            resolve(rows);
	        }
	    });
	});
	
	return promise;
}



function ShowData(data, salary) {

	function showMonths() {
		var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
		var html = '';
		for(var k = 0; k < months.length; k++) {
			html += '<option value="' + months[k] + '">' + months[k] + '</option>';
		}
		return html;
	}


	function showDetails(d) {
		var student_name = String(d["Student_x0020_Identifier"]["St_x0020_L_x0020_Name"]) + ' ' + String(d["Student_x0020_Identifier"]["St_x0020_F_x0020_Name"]);
		var tutor_hours =  d['jan'] + d['feb'] +  d['mar'] +  d['april'] + d['may'] + d['jun'] + d['jul'] + d['sep'] +  d['oct'] + d['nov'] +  d['dec'];
		var remaining_hours = d['Subject_x0020_Hours'] -  tutor_hours;
		return '<div class="form-group">' +
		'<div class="col-md-1"><label>Jan</label><input type="text" readonly="readonly" value="' + d['jan'] + '" class="form-control" /></div>' +
		'<div class="col-md-1"><label>Feb</label><input type="text" readonly="readonly" value="' + d['feb'] + '" class="form-control" /></div>' +
		'<div class="col-md-1"><label>Mar</label><input type="text" readonly="readonly" value="' + d['mar'] + '" class="form-control" /></div>' +
		'<div class="col-md-1"><label>Apr</label><input type="text" readonly="readonly" value="' + d['april'] + '" class="form-control" /></div>' +
		'<div class="col-md-1"><label>May</label><input type="text" readonly="readonly" value="' + d['may'] + '" class="form-control" /></div>' +
		'<div class="col-md-1"><label>Jun</label><input type="text" readonly="readonly" value="' + d['jun'] + '" class="form-control" /></div>' +
		'<div class="col-md-1"><label>Jul</label><input type="text" readonly="readonly" value="' + d['jul'] + '" class="form-control" /></div>' +
		'<div class="col-md-1"><label>Sep</label><input type="text" readonly="readonly" value="' + d['sep'] + '" class="form-control" /></div>' +
		'<div class="col-md-1"><label>Oct</label><input type="text" readonly="readonly" value="' + d['oct'] + '" class="form-control" /></div>' +
		'<div class="col-md-1"><label>Nov</label><input type="text" readonly="readonly" value="' + d['nov'] + '" class="form-control" /></div>' +
		'<div class="col-md-1"><label>Dec</label><input type="text" readonly="readonly" value="' + d['dec'] + '" class="form-control" /></div>' +
		'</div>' +
		'<div class="form-group">' +
		'<div class="col-md-6"><label>Tutor Hours</label><input type="text" id="tutorHours'  + d['ID'] + '" value="' + tutor_hours + '" readonly="readonly" class="form-control" /></div>' +
		'<div class="col-md-6"><label>Remaining Hours</label><input type="text" id="remainingHours' + d['ID']  + '" value="' + remaining_hours + '" readonly="readonly" class="form-control" /></div>' +
		'</div>' +
		'<div class="form-group">' +
		'<div class="col-md-6">Hours<input class="form-control" data-courseno="' + d['Course_x0020_Number'] + '" data-studentname="' + student_name +'" data-entryid="' +  d['ID'] + '" id="submittedHours'  + d['ID'] + '" type="number" /></div>' +
		'<div class="col-md-6">Month<select class="form-control" id="invoiceMonth'  + d['ID'] + '">' + showMonths() + '</select></div>' +
		'</div>' +
		'<div class="form-group" style="padding-top:4px;">' +
		'</div>';
	}


	 jq('#dataTable').DataTable({
	    initComplete: function (settings, json) {
	    
	    
	    	jq('#btnGenerate').data('salary', salary);
	    
            jq('.dataTables_scrollBody thead tr').css({ visibility: 'collapse' });
            jq('#dataTable tbody td.details-control').click(function () {
                let tr = jq(this).closest('tr');
                let row = jq('#dataTable').DataTable().row(tr);
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
	 	scrollX: false,
        data: data,
        info: false,
        ordering: true,
        paging: false,
        columns:[{ 
        	data: null,
            orderable: false,
            className: 'details-control',
            width: '100px',
            defaultContent: '',
            orderable: false,
            render: function () {
            	return '<i class="fa fa-plus-square" aria-hidden="true"></i>';
            }
        },
        { 
        	data: null,
        	render: function(d, row) {
        		return String(d["Student_x0020_Identifier"]["St_x0020_L_x0020_Name"]) + ' ' + String(d["Student_x0020_Identifier"]["St_x0020_F_x0020_Name"]);
        	} 
        }, 
        {
        	data: 'Course_x0020_Number'
        },
        {
        	data: 'Subject_x0020_Hours'
        }]
	 });
}


function UpdatePaymentProperties(fileUrl, properties) {
	Shp.File.update(fileUrl, properties).then(function(response) {
		window.top.location.href = window.location.href;
	}, function(err) { 
		alert('Cannot update payment request: ' + err);
	});
}


function GeneratePaymentRequest(el) {

	var salary = parseFloat(jq(el).data('salary'));
	var total = 0;
	var total_hours = 0;

	var tbl = '<table style="width:100%; border-collapse: separate; border-spacing: 1px 1px">' +
	'<thead>' +
	'<tr>' +
	'<th style="background-color:#0096D6; color:#ffffff">Student Name</th>' +
	'<th style="background-color:#0096D6; color:#ffffff">Course No.</th>' +
	'<th style="background-color:#0096D6; color:#ffffff">Billed Hours</th>' +
	'<th style="background-color:#0096D6; color:#ffffff">Rate/Hour</th>' +
	'<th style="background-color:#0096D6; color:#ffffff">Month</th>' +
	'</tr>' +
	'</thead>' +	
	'<tbody>';
	jq('#dataTable input[id*="submittedHours"]').each(function() {
		var id = jq(this).data('entryid');
		tbl += '<tr>' +
		'<td style="background-color:#EEEEEE;">' + jq(this).data('studentname') + '</td>' +
		'<td style="background-color:#EEEEEE;">' + jq(this).data('courseno') + '</td>' +
		'<td style="background-color:#EEEEEE;">' + jq(this).val() + '</td>' +
		'<td style="background-color:#EEEEEE;">' + salary + '</td>' +
		'<td style="background-color:#EEEEEE;">' + jq('#invoiceMonth' +id).val() + '</td>' +
		
		'</tr>';
		
		total += parseFloat(jq(this).val()) * salary;
		total_hours += parseFloat(jq(this).val());
	});
	tbl += '</tbody>' +
	'<tfoot>' +
	'<tr>' +
	'<td colspan="2"></td>' +
	'<td style="background-color:#0096D6; color:#ffffff">' + total_hours + '</td>' +
	'<td style="background-color:#0096D6; color:#ffffff">' + total +  '</td>' +
	'<td></td>' +
	'</tr>' +
	'</tfoot>' +
	'</table>';

	var html = '<html>' +
	'<head></head>' +
	'<tbody>' +
	'<div style="text-align:center"><h2>Payment request for ' + _spPageContextInfo.userDisplayName + '</h2></div>' +
	tbl +
	'</tbody>' +
	'</html>';
	Shp.Dialog.PromptDialog.show('Payment Request', html, function() {
	
		var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		var dt = new Date();
		var fileName =  _spPageContextInfo.userEmail + ' - ' +  months[dt.getMonth()] + '.html';
		var fileContent = html;
		Shp.File.add(fileName, fileContent, 'Payment Requests').then(function(response) {
			var properties = {
				'Title': _spPageContextInfo.userEmail + ' - ' +  months[dt.getMonth()],
				'Month':  months[dt.getMonth()],
				'Year': dt.getFullYear(),
				'Status': 'Pending Approval',
				'Email': _spPageContextInfo.userEmail,
				'Total': total,
				'Total_x0020_Hours': total_hours
			}
			UpdatePaymentProperties(response["d"]["ServerRelativeUrl"], properties);  

		}, function(err) {
			alert(err);
		});
	});
}


