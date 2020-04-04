
function pageContentLoad(sender, args) {

    Shp.Dialog.WaittingDialog.show('Getting students list');

    var getTutors = $SPData.GetListItems('Tutor List', '<View><Query><Where><Eq><FieldRef Name="Email" /><Value Type="Text">' + _spPageContextInfo.userEmail + '</Value></Eq></Where></Query></View>');
    Promise.all([getTutors]).then(function (results) {
        var tutorId = results[0].itemAt(0).get_item('Tutor_x0020_ID');
        PopulateSelect(tutorId);
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show('Cannot get tutor information', err);
    });

}


function PopulateSelect(tutorId) {

    var caml = '<View>' +
        '<Query>' +
        '<OrderBy><FieldRef Name="Student_x0020_Identifier_x003a_S0" /><FieldRef Name="Student_x0020_Identifier_x003a_S" /></OrderBy>' +
        '<Where>' +
        '<And>' +
        '<Eq><FieldRef Name="Tutor_x0020_ID" /><Value Type="Text">' + tutorId + '</Value></Eq>' +
        '<IsNotNull><FieldRef Name="Student_x0020_Identifier" /></IsNotNull>' +
        '</And>' +
        '</Where>' +
        '</Query>' +
        '</View>';

    var getStudents = $SPData.GetListItems('Student Subjects-Grades', caml);
    Promise.all([getStudents]).then(function (results) {

        var html = '<option value="">...</option>';        
        var listItemEnumerator = results[0].getEnumerator();
        while (listItemEnumerator.moveNext()) {
            var currentItem = listItemEnumerator.get_current();
            if (currentItem.get_item('Student_x0020_Identifier_x003a_S0') !== null || currentItem.get_item('Student_x0020_Identifier_x003a_S') !== null) {
                var optionValue = currentItem.get_item('Student_x0020_Identifier_x003a_S0').get_lookupValue() + ' ' +
                    currentItem.get_item('Student_x0020_Identifier_x003a_S').get_lookupValue() + ' Course#: ' + currentItem.get_item('Course_x0020_Number');
                html += '<option value="' + currentItem.get_id() + '">' + optionValue + '</option>';
            }
        }

        jq('#CourseSelector').html(html);
        Shp.Dialog.WaittingDialog.hide();

    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show('Cannot get students list: ', err);
    });


}


function ChangeStudent() {

    jq('#courseDetails').html('');

    // var getAppoinments = $SPData.GetListItems('Sessions', '<View><Query><Where><Eq><FieldRef Name="Subject_x0020__x002d__x0020_Grad" LookupId="TRUE" /><Value Type="Lookup">' + jq('#CourseSelector').val() + '</Value></Eq></Where></Query></View>');
    var getCourseDetails = $SPData.GetListItems('Student Subjects-Grades', '<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' + jq('#CourseSelector').val() + '</Value></Eq></Where></Query></View>');
    Promise.all([getCourseDetails]).then(function (results) {


        var course = results[0].itemAt(0);
        var tutor_hours = course.get_item('jan') + course.get_item('feb') + course.get_item('mar') + course.get_item('april') + course.get_item('may') + course.get_item('jun') + course.get_item('jul') + course.get_item('sep') + course.get_item('oct') + course.get_item('nov') + course.get_item('dec');
        var remaining_hours = course.get_item('Subject_x0020_Hours') - tutor_hours;
        var student_name = course.get_item('Student_x0020_Identifier_x003a_S0').get_lookupValue() + ' ' + course.get_item('Student_x0020_Identifier_x003a_S').get_lookupValue();
        var schoolDistrict = course.get_item('Student_x0020_Identifier_x003a_S1') === null ? '' : course.get_item('Student_x0020_Identifier_x003a_S1').get_lookupValue();
        var tutorStartDate = course.get_item('Tutor_x0020_Start_x0020_Date') === null ? '' : course.get_item('Tutor_x0020_Start_x0020_Date').format('yyyy-MM-dd');


        var html = '<h3>Course Details:</h3>' +
            '<div class="form-group">' +
            '<div class="col-md-12"><label>School District</label><input type="text" id="schoolDistrict' + course.get_id() + '" value="' + schoolDistrict + '" readonly="readonly" class="form-control input-sm" /></div>' +
            '</div>' +
            '</div>' +
            '<div class="form-group">' +
            '<div class="col-md-6"><label>Student Name</label><input type="text" id="studentName' + course.get_id() + '" value="' + student_name + '" readonly="readonly" class="form-control input-sm" /></div>' +
            '<div class="col-md-6"><label>Parent Name</label><input type="text" id="parentName' + course.get_id() + '" value="' + course.get_item('Student_x0020_Identifier_x003a_P').get_lookupValue() + '" readonly="readonly" class="form-control input-sm" /></div>' +
            '</div>' +
            '<div class="form-group">' +
            '<div class="col-md-6"><label>Total Hours</label><input type="text" id="totalHours' + course.get_id() + '" value="' + course.get_item('Tutor_x0020_Hours') + '" readonly="readonly" class="form-control input-sm" /></div>' +
            '<div class="col-md-6"><label>Remaining Hours</label><input type="text" id="remainingHours' + course.get_id() + '" value="' + course.get_item('Remaining_x0020_Hours') + '" readonly="readonly" class="form-control input-sm" /></div>' +
            '</div>' +
            '<div class="form-group">' +
            '<div class="col-md-6"><label>Start Date</label><input type="text" id="tutorStartDate' + course.get_id() + '" value="' + tutorStartDate + '" readonly="readonly" class="form-control input-sm" /></div>' +
            '<div class="col-md-6"><label>Description</label><input type="text" id="courseDescription' + course.get_id() + '" value="' + course.get_item('Course_x0020_Description') + '" readonly="readonly" class="form-control input-sm" /></div>' +
            '</div>' +
            '<div class="form-group">' +
            '<div class="col-md-6"><label>Meeting Date</label><input required onchange="javascript:CalculateDuation(\'' + course.get_id() + '\')" type="date" id="meetingDate' + course.get_id() + '" value="' + remaining_hours + '" class="form-control input-sm" /></div>' +
            '<div class="col-md-6"><label>Meeting Duration</label><input type="number" readonly id="meetingDuration' + course.get_id() + '" value="" class="form-control input-sm" /></div>' +
            '</div>' +
            '<div class="form-group">' +
            '<div class="col-md-6"><label>Start Time</label>' +
            '<select required  onchange="javascript:CalculateDuation(\'' + course.get_id() + '\')" id="startTime' + course.get_id() + '" value="" class="form-control input-sm">' +
            '<option value="">...</option>' +
            '<option value="9:00">9:00</option>' +
            '<option value="9:30">9:30</option>' +
            '<option value="10:00">10:00</option>' +
            '<option value="10:30">10:30</option>' +
            '<option value="11:00">11:00</option>' +
            '<option value="11:30">11:30</option>' +
            '<option value="12:00">12:00</option>' +
            '<option value="12:30">12:30</option>' +
            '<option value="13:00">13:00</option>' +
            '<option value="13:30">13:30</option>' +
            '<option value="14:00">14:00</option>' +
            '<option value="14:30">14:30</option>' +
            '<option value="15:00">15:00</option>' +
            '<option value="15:30">15:30</option>' +
            '<option value="16:00">16:00</option>' +
            '<option value="16:30">16:30</option>' +
            '<option value="17:00">17:00</option>' +
            '<option value="17:30">17:30</option>' +
            '<option value="18:00">18:00</option>' +
            '<option value="18:30">18:30</option>' +
            '<option value="19:00">19:00</option>' +
            '<option value="19:30">19:30</option>' +
            '<option value="20:00">20:00</option>' +
            '</select>' +
            '</div>' +
            '<div class="col-md-6"><label>End Time</label>' +
            '<select required onchange="javascript:CalculateDuation(\'' + course.get_id() + '\')" id="endTime' + course.get_id() + '" value="" class="form-control input-sm">' +
            '<option value="">...</option>' +
            '<option value="9:00">9:00</option>' +
            '<option value="9:30">9:30</option>' +
            '<option value="10:00">10:00</option>' +
            '<option value="10:30">10:30</option>' +
            '<option value="11:00">11:00</option>' +
            '<option value="11:30">11:30</option>' +
            '<option value="12:00">12:00</option>' +
            '<option value="12:30">12:30</option>' +
            '<option value="13:00">13:00</option>' +
            '<option value="13:30">13:30</option>' +
            '<option value="14:00">14:00</option>' +
            '<option value="14:30">14:30</option>' +
            '<option value="15:00">15:00</option>' +
            '<option value="15:30">15:30</option>' +
            '<option value="16:00">16:00</option>' +
            '<option value="16:30">16:30</option>' +
            '<option value="17:00">17:00</option>' +
            '<option value="17:30">17:30</option>' +
            '<option value="18:00">18:00</option>' +
            '<option value="18:30">18:30</option>' +
            '<option value="19:00">19:00</option>' +
            '<option value="19:30">19:30</option>' +
            '<option value="20:00">20:00</option>' +
            '</select>' +
            '</div>' +
            '</div>' +
            '<div class="form-group">' +
            '<div class="col-md-12">' +
            '<br /><br />' +
            '<button type="button" class="btn btn-primary btn-sm" onclick="javascript:CreateMeeting(\'' + course.get_id() + '\')">Create Appointment</button>' +
            '</div>' +
            '</div><br /><br /><br />';


        jq('#courseDetails').html(html);



    }, function (err) {
        Shp.Dialog.ErrorDialog.show('Cannot get course details: ' + err);
    });



}


function CreateMeeting(id) {

    var errors = 0;
    var controls_to_validate = ['meetingDate' + id, 'startTime' + id, 'endTime' + id];

	/*
    for (var i = 0; i < controls_to_validate.length; i++) {
        var isValid = controls_to_validate[i].check_validity();
        if (isValid === false) {
            errors++;
            jq('#' + controls_to_validate[i]).addClass('is-invalid');
        }
        else {
            jq('#' + controls_to_validate[i]).removeClass('is-invalid');
        }
    } */

    if (errors > 0) {
        return;
    }


    Shp.Dialog.WaittingDialog.show('Setting up a meeting with the student');


    // Variables
    var studentName = $select('studentName' + id).get_value();
    var appointmentDate = $select('meetingDate' + id).get_date('yyyy-MM-dd');
    var start_time = $select('startTime' + id).get_value();
    var end_time = $select('endTime' + id).get_value();

    // Get list items per day
    $SPData.GetListItems('Sessions', '<View><Query><Where><And><Eq><FieldRef Name="Student_x0020_Name" /><Value Type="Text">' + studentName + '</Value></Eq><Eq><FieldRef Name="Date" /><Value Type="Datetime" IncludeTimeValue="FALSE">' + appointmentDate + '</Value></Eq></And></Where></Query></View>').then(function (items) {


        var conflicts = [];
        var enumerator = items.getEnumerator();
        while (enumerator.moveNext()) {

            var current = enumerator.get_current();
            var current_start = current.get_item('Start_x0020_Time');
            var current_end = current.get_item('End_x0020_Time');

            // Is included in timespan
            if (start_time <= current_start && end_time >= current_end) {
                conflicts.push(current);
            }
            // Timspan includes
            else if (start_time >= current_start && end_time <= current_end) {
                conflicts.push(current);
            }
            // Start is included in timespan
            else if (start_time >= current_start && start_time <= current_end) {
                conflicts.push(current);
            }
            // End is included in timespan
            else if (end_time >= current_start && end_time <= current_end) {
                conflicts.push(current);
            }

        }

        if (conflicts.length > 0) {

            var rows = '';

            for (var k = 0; k < conflicts.length; k++) {
                var conflict = conflicts[k];
                rows += '<tr>' +
                    '<td>' + conflict.get_item('Start_x0020_Time') + '</td>' +
                    '<td>' + conflict.get_item('End_x0020_Time') + '</td>' +
                    '<td>' + conflict.get_item('Author').get_lookupValue() + '</td>' +
                    '</tr>';
            }

            var html = '<table style="width:100%" class="conflict-table">' +
                '<thead><tr><th>Start Time</th><th>End Time</th><th>Tutor</th></tr></thead>' +
                '<tbody>' + rows + '</tbody>' +
                '</table>';

            Shp.Dialog.WaittingDialog.hide();
            Shp.Dialog.ErrorDialog.show('Conflict with other appointments', html);


            return;
        }

        _CreateMeeting(id)


    }, function (err) {
        alert(err);
    });

}


function CalculateDuation(id) {

    if (jq('#meetingDate' + id).val() === '' || jq('#startTime' + id).val() === '' || jq('#endTime' + id).val() === '') {
        jq('#meetingDuration').val('');
        return;
    }

    var startTime = Date.parseInvariant(jq('#meetingDate' + id).val() + ' ' + jq('#startTime' + id).val(), 'yyyy-mm-dd HH:mm');
    var endTime = Date.parseInvariant(jq('#meetingDate' + id).val() + ' ' + jq('#endTime' + id).val(), 'yyyy-mm-dd HH:mm');
    var duration = Math.abs((startTime.getTime() - endTime.getTime()) / 3600000);
    var totalHours = $select('totalHours' + id).get_value();
    var remainingHours = $select('remainingHours' + id).get_value();
    jq('#meetingDuration' + id).val(duration);

    /*
    if (duration + parseFloat(totalHours) >= parseFloat(totalHours)) {
        jq('#finalGrade').parent('div').parent('div').show();
    }
    else {
        jq('#finalGrade').parent('div').parent('div').hide();
    }*/

}


function _CreateMeeting(id) {


    var meetingDuration = $select('meetingDuration' + id).get_value();
    var month_s = ['jan', 'feb', 'mar', 'april', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var dt = new Date(Date.parseInvariant($select('meetingDate' + id).get_value(), 'yyyy-MM-dd'));
    var reminderDate = Date.parseInvariant(jq('#meetingDate' + id).val(), 'yyyy-mm-dd');
    reminderDate.setDate(reminderDate.getDate() - 1);

    var meeting = {
        'Subject_x0020__x002d__x0020_Grad': id,
        'Student_x0020_Name': $select('studentName' + id).get_value(),
        'Parent_x0020_Name': $select('parentName' + id).get_value(),
        'School_x0020_Name': $select('schoolDistrict' + id).get_value(),
        'Duration': $select('meetingDuration' + id).get_value(),
        'Date': $select('meetingDate' + id).get_date('yyyy-MM-dd'),
        'Start_x0020_Time': $select('startTime' + id).get_value(),
        'End_x0020_Time': $select('endTime' + id).get_value(),
        'Duration': $select('meetingDuration' + id).get_value(),
        'Year': dt.getFullYear(),
        'Month': month[dt.getMonth()],
        'Reminder_x0020_Date_x0020_1': reminderDate
    }

    var fieldName = month_s[dt.getMonth()];
    var appointment = {}
    appointment['ID'] = id;
    appointment[fieldName] = meetingDuration;
    appointment['Final_x0020_Grade'] = (jq('#finalGrade').parent('div').parent('div').is(":hidden") === false) ? jq('#finalGrade').val() : '';
   

 if (jq('#tutorStartDate' + id) === '') {
        appointment['Tutor_x0020_Start_x0020_Date'] = $select('meetingDate' + id).get_date('yyyy-MM-dd');
    }


    var addAppointment = $SPData.AddItem('Sessions', meeting);
    // var updateHours = $SPData.UpdateItem('Student Subjects-Grades', appointment);
    Promise.all([addAppointment]).then(function (results) {
        NavigateToPage('/SitePages/App/MyAppointments.aspx?year=' + dt.getFullYear() + '&month=' + month[dt.getMonth()]);
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show('Cannot create meeting', err);
    });

}












