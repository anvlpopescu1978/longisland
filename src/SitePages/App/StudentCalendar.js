
function pageContentLoad(sender, args) {

	Shp.Dialog.WaittingDialog.show('Getting data');
	  	
	var getMyAppointments = GetAppointments();
	Promise.all([getMyAppointments]).then(function(results) {
		var appointments = results[0];
		var events = [];
		for(var i = 0; i < appointments.length; i++){
			var appointment = appointments[i];
			events.push({
				'title': appointment['Student_x0020_Name'],
				'start': Date.parseInvariant(appointment['Date'].split('T')[0] + ' ' + appointment['Start_x0020_Time'], 'yyyy-MM-dd HH:mm'),
				'end': Date.parseInvariant(appointment['Date'].split('T')[0] + ' ' + appointment['End_x0020_Time'], 'yyyy-MM-dd HH:mm'),
				'allDay': false
			});
		}
		
		Shp.Dialog.WaittingDialog.hide();
		ShowCalendar(events);
		
	}, function(err) {
		Shp.Dialog.WaittingDialog.hide();
		Shp.Dialog.ErrorDialog.show('Cannot get data', err);
	});
}


function ShowCalendar(calendarEvents) {
 	var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
    	  header: {
    	  	left: 'prev,next',
    	  	center: 'title',
    	  	right: 'dayGridDay,dayGridWeek,dayGridMonth'
    	  },
          plugins: [ 'dayGrid' ],
          events: calendarEvents,
          defaultView: 'dayGridWeek'
    });
    calendar.render();
}


function CloseModal() {
	window.parent.Shp.Dialog.EditFormDialog.hide();
}


function GetAppointments() {

    var promise = new Promise(function (resolve, reject) {
    	var studentName = Shp.Page.GetParameterFromUrl('firstName') + ' ' + Shp.Page.GetParameterFromUrl('lastName');
        var url = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('Sessions')/items?$top=5000&$orderby=Created desc&$expand=Subject_x0020__x002d__x0020_Grad/Course_x0020_Number,Author/Id,Author/Title&$select=*,Subject_x0020__x002d__x0020_Grad/Course_x0020_Number,Author/ID,Author/Title&$filter=Student_x0020_Name eq '" + studentName + "'";
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





function GetStudentInfo(success, fail) {

	var caml = '<View>' +
	'<Query>' +
	'<Where>' +
	'<And>' +
	'<Eq><FieldRef Name="St_x0020_F_x0020_Name" /><Value Type="Text">' + Shp.Page.GetParameterFromUrl('firstName') + '</Value></Eq>' +
	'<Eq><FieldRef Name="St_x0020_L_x0020_Name" /><Value Type="Text">' + Shp.Page.GetParameterFromUrl('lastName') + '</Value></Eq>' +
	'</And>' +
	'</Where>' +
	'</Query>'+
	'</View>';
	 $SPData.GetListItems('CurrentStudentInfo', caml).then(function(students) {
	 	var student = students.itemAt(0);
	 	success(student);
	 }, function(err) {
	 	fail(err);
	 });

}
