<%@ Page Language="C#" masterpagefile="../../_catalogs/masterpage/lit.master" MaintainScrollPositionOnPostback="true" inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" meta:progid="SharePoint.WebPartPage.Document" %>
<%@ Register tagprefix="SharePoint" namespace="Microsoft.SharePoint.WebControls" assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
<link type="text/css" media="all" href="Styles/corev15.css"  rel="stylesheet" />
<link type="text/css" media="all" href="Styles/Bootstrap/bootstrap.css" rel="stylesheet" />
<link type="text/css" media="all" href="Styles/FontAwesome/fontawesome.css" rel="stylesheet" />
<link type="text/css" media="all" href="Styles/DataTable/datatables.css" rel="stylesheet" />
<link type="text/css" media="all" href="Styles/Monthly/monthly.css" rel="stylesheet" />
<link type="text/css" media="all" href="Styles/App.css" rel="stylesheet" />
</asp:Content> 

<asp:Content ContentPlaceHolderID="ContentPlaceHolderMaim" runat="server">
<asp:ScriptManagerProxy runat="server">
<Scripts>
<asp:ScriptReference Path="Scripts/Dialog/sharepoint.dialog.js" />
<asp:ScriptReference Path="Scripts/Controls/sharepoint.controls.js" />
<asp:ScriptReference Path="Scripts/Data/sharepoint.lists.js" />
<asp:ScriptReference Path="Scripts/Data/sharepoint.data.js" />
<asp:ScriptReference Path="Scripts/DataTables/datatables.js" />
<asp:ScriptReference Path="Scripts/Monthly/monthly.js" />
<asp:ScriptReference Path="Scripts/XLSX/xlsx.full.min.js" />
<asp:ScriptReference Path="MyAppointments.js" />
</Scripts>
</asp:ScriptManagerProxy>


<div class="row">
    <h1 class="page-header">My Appointments</h1>
    <div class="panel panel-default">
     <div class="panel-heading">
     <div class="form-group">
         <label>Year <span class="ms-accentText">*</span></label>
         <input type="text" id="filteryear" class="form-control input-sm" required />
    </div>
    <div class="form-group">
         <label>Month <span class="ms-accentText">*</span></label>
         <select id="filtermonth"  class="form-control input-sm" required>
	         <option value="">...</option>
	         <option value="January">January</option>
	         <option value="February">February</option>
	         <option value="March">March</option>
	         <option value="April">April</option>
	         <option value="May">May</option>
	         <option value="June">June</option>
	         <option value="July">July</option>
	         <option value="August">August</option>
	         <option value="September">September</option>
	         <option value="October">October</option>
	         <option value="November">November</option>
	         <option value="December">December</option>
         </select>
    </div>

     <div class="form-group">
        <button type="button" class="btn btn-primary btn-xs" onclick="ChangeFilter()">
		Change Filter</button>&nbsp;
        <button type="button" class="btn btn-primary btn-xs" onclick="GenerateDocument()">
		Generate Monthly Report</button>&nbsp;
        <button type="button" class="btn btn-primary btn-xs" onclick="CreatePaymentRequest()">
		Create Payment Request</button>
		<button type="button" class="btn btn-primary btn-xs" onclick="ExportToExcel()">
		Export to Excel</button>
     </div>
    </div>
    </div>
</div>

<div class="row">
<table id="tblAppointments" class="table table-striped nowrap table-bordered table-hover dataTable no-footer dtr-inline"  style="width:100%; border-collapse:collapse">
<thead>
<tr>
<th></th>
<th>Student Name</th>
<th>Parent Name</th>
<th>Course #</th>
<th>Date </th>
<th>Start Time</th>
<th>End Time</th>
<th>Duration</th>
<th>Status</th>
</thead>
<tbody>
</tbody>
</table>

</div>	

</asp:Content>