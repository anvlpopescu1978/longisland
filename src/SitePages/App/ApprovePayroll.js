
function pageContentLoad(sender, args) {

    Shp.Dialog.WaittingDialog.show('Getting payroll data');    
	var getPayrollData = GetFileContent();
	Promise.all([getPayrollData]).then(function(results) {
		var parser = new DOMParser();
		var fileContent = parser.parseFromString(results[0], 'text/html');
		var bodyContent = fileContent.querySelector('body').innerHTML + '<br/ >' +
		'<div class="row" style="padding-left:10px">' +
		'<button type="button" class="btn btn-primary btn-sm" onclick="javascript:ApprovePayrollDocument(\'Approved\')">Approve</button> ' +
		'<button type="button" class="btn btn-primary btn-sm" onclick="javascript:ApprovePayrollDocument(\'Rejected\')">Reject</button> ' +
		'<button type="button" class="btn btn-danger btn-sm" onclick="javascript:CloseModal()">Close</button> ' +
		'</div>'
		jq('body').html(bodyContent);
		Shp.Dialog.WaittingDialog.hide();
	}, function(err) {
		 Shp.Dialog.WaittingDialog.hide('Getting payroll data'); 
		 Shp.Dialog.ErrorDialog.show('Cannot payroll data');
	});

}


function CloseModal() {
	window.parent.Shp.Dialog.EditFormDialog.hide();
}

function ApprovePayrollDocument(status, documentId) {
	window.parent.ApprovePayrollDocument(status, Shp.Page.GetParameterFromUrl('fileId'));
	window.parent.Shp.Dialog.EditFormDialog.hide();
}


function GetFileContent() {
	var promise = new Promise(function(resolve, reject) {
		var url =  unescapeProperly(Shp.Page.GetParameterFromUrl('fileUrl'));
		jq.post(url, '', function (response) {
        	resolve(response);
        }).fail(function () {
        	reject('Cannot get payroll data');
        });
	});
	return promise;
}


function CloseModal() {
	var parentW = window.parent;
	parentW.Shp.Dialog.EditFormDialog.hide();
}













