
function pageContentLoad(sender, args) {

   
}



function GetCourses() {
	var promise = new Promise(function(resolve, reject) {
		        var url = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('Student Subjects-Grades')/items?$expand=Student_x0020_Identifier/ID,Student_x0020_Identifier/School_x0020_District,Student_x0020_Identifier/St_x0020_F_x0020_Name,Student_x0020_Identifier/St_x0020_L_x0020_Name&$select=*,Student_x0020_Identifier/ID,Student_x0020_Identifier/School_x0020_District,Student_x0020_Identifier/St_x0020_F_x0020_Name,Student_x0020_Identifier/St_x0020_L_x0020_Name&$filter=" +

	});
	
	return promise;
}






