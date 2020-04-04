function pageContentLoad(sender, args) {

    $select('filteryear').set_value(Shp.Page.GetParameterFromUrl('year'));
    $select('filtermonth').set_value(Shp.Page.GetParameterFromUrl('month'));

    if ($select('filteryear').get_value() === '' || $select('filtermonth').get_value() === '') {
        ShowData([]);
        return;
    }

    var url = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('Payment Requests')/items?" +
        "$select=*,File,Status,Month,Email&$expand=File&$filter=Year eq '" + Shp.Page.GetParameterFromUrl('year') + "' and " +
        "Month eq '" + Shp.Page.GetParameterFromUrl('month') + "'";
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


function ShowData(rows) {

    jq('#dataTable').DataTable({
        initComplete: function (settings, json) {
        },
        scrollX: false,
        data: rows,
        info: false,
        ordering: true,
        paging: false,
        columns: [{
            data: null,
            render: function (d, row) {
                var html = '<a id="fileContainer' + d['ID'] + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn btn-primary btn-xs dropdown-toggle" role="button">' + d["File"]["Name"] + '</a>'
                html += '<div class="dropdown-menu" aria-labelledby="fileContainer' + d['ID'] + '">' +
                    '<a class="dropdown-item" href="javascript:ApprovePayroll(\'' + d["File"]["ServerRelativeUrl"] + '\',\'' + d['ID'] + '\')">Approve payroll</a>' +
                    '<a class="dropdown-item" href="javascript:PreviewFile(\'' + d["File"]["ServerRelativeUrl"] + '\')">View file</a>';
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


function ApplyFilters() {
    var url = _spPageContextInfo.webAbsoluteUrl + '/SitePages/App/PaymentRequests.aspx?year=' + $select('filteryear').get_value()
        + '&month=' + $select('filtermonth').get_value();
    window.top.location.href = url;
}

function ApprovePayroll(fileUrl, fileId) {

    var url = _spPageContextInfo.webAbsoluteUrl + '/SitePages/App/ApprovePayroll.aspx?fileUrl=' + escapeProperly(fileUrl) + '&fileId=' + fileId;
    Shp.Dialog.EditFormDialog.show('Edit student', url, function () {
    });

}


function ApprovePayrollDocument(status, documentId) {

	$SPData.UpdateItem('Payment Requests', { 'ID': documentId, 'Status': status }).then(function(item) {
		window.top.location.href = window.location.href;
	}, function(err) {
		Shp.Dialog.ErrorDialog.show('Cannot update payroll', err);
	});
}



