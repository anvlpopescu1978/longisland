function pageContentLoad(sender, args) {
	
	var url = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('Payment Requests')/items?" +
	"$select=*,File,Status,Month,Email&$expand=File&$filter=Email eq '" + _spPageContextInfo.userEmail + "'";
    var executor = new SP.RequestExecutor(_spPageContextInfo.webAbsoluteUrl);
    executor.executeAsync({
        url: url,
        method: 'GET',
        headers: { "Accept": "application/json; odata=verbose" },
        error: function (data, errorCode, errorMessage) {
            alert(data.body);
        },
        success: function (results) {
            var response = JSON.parse(results.body);
            var rows = response.d.results;
            ShowData(rows);
        }
    });	

}



function ShowData(data) {


	 jq('#dataTable').DataTable({
	    initComplete: function (settings, json) {
        },
	 	scrollX: false,
        data: data,
        info: false,
        ordering: true,
        paging: false,
        columns:[{ 
        	data: null,
        	render: function(d, row) {
        		var html = '<a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn btn-primary btn-xs dropdown-toggle" role="button">' + d["File"]["Name"] + '</a>'
        		html += '<div class="dropdown-menu" aria-labelledby="dropdownMenuLink">' +
        				'<a class="dropdown-item" href="' + d["File"]["ServerRelativeUrl"] + '">Download file</a>' +
    					'<a class="dropdown-item" href="javascript:PreviewFile(\'' + d["File"]["ServerRelativeUrl"] + '\')">View file</a>';
    			if(d['Status'] === 'Pending Approval' || d['Status'] === 'Not Approved') {
    			html += '<a class="dropdown-item" href="javascript:DeleteFile(\'' + d['ID'] + '\')">Delete file</a>';
    			}
  				html += '</div>';
        		return html;
        	} 
        }, 
        {
        	data: 'Total'
        },
        {
        	data: 'Total_x0020_Hours'
        },
       
        {
        	data: 'Month'
        },
        {
        	data: 'Year'
        },
        {
        	data: 'Status'
        }]
	 });
}

function PreviewFile(url) {
	jq.ajax({
		url: url,
		method: 'POST',
		dataType : "html",
		success: function(data) {
			Shp.Dialog.PromptDialog.show('Payment Request', data, function() {
				Shp.Dialog.PromptDialog.hide();
			});
		}
	});
}




