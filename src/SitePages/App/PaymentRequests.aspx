<%@ Page Language="C#" masterpagefile="../../_catalogs/masterpage/lit.master" MaintainScrollPositionOnPostback="true" inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" meta:progid="SharePoint.WebPartPage.Document" %>
<%@ Register tagprefix="SharePoint" namespace="Microsoft.SharePoint.WebControls" assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
<link type="text/css" media="all" href="Styles/corev15.css"  rel="stylesheet" />
<link type="text/css" media="all" href="Styles/Bootstrap/bootstrap.css" rel="stylesheet" />
<link type="text/css" media="all" href="Styles/FontAwesome/fontawesome.css" rel="stylesheet" />
<link type="text/css" media="all" href="Styles/DataTable/datatables.css" rel="stylesheet" />
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
<asp:ScriptReference Path="PaymentRequests.js" />
</Scripts>
</asp:ScriptManagerProxy>

<div class="row">
	<div class="col-lg-12">
	 	<h1 class="page-header">Payroll Management</h1>
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
		    <button type="button" class="btn btn-xs btn-primary" onclick="javascript:ApplyFilters()">Apply filters</button>		
			</div>
		</div>
	</div>
</div>

  <div class="row">
  	<div class="col-lg-12">

<table style="width:100%" id="dataTable" class="table table-striped table-responsive nowrap table-bordered table-hover dataTable no-footer dtr-inline">
<thead>
<tr>
	<th>File</th>
	<th>Total ($)</th>
	<th>Total (h)</th>
	<th>Month</th>
	<th>Year</th>
	<th>Status</th>
</tr>
</thead>
<tbody>

</tbody>
</table>
  	  
  	  

		</div>
	</div>
	

</asp:Content>