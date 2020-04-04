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
<asp:ScriptReference Path="NoStartDate.js" />
</Scripts>
</asp:ScriptManagerProxy>


<div class="row">
    <h1 class="page-header">No Start Date</h1>
</div>

<div class="row">
<table id="tblCourses" class="table table-striped nowrap table-bordered table-hover dataTable no-footer dtr-inline"  style="width:100%; border-collapse:collapse">
<thead>
<tr>
<th></th>
<th>ID</th>
<th>Student Name</th>
<th>School District</th>
<th>Course #</th>
<th>Description</th>
<th>Grade</th>
</thead>
<tbody>
</tbody>
</table>

</div>	

</asp:Content>