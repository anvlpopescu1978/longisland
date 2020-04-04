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
<asp:ScriptReference Path="Tutors.js" />
</Scripts>
</asp:ScriptManagerProxy>

<div class="row">
	<div class="col-lg-12">
	 	<h1 class="page-header">Tutors</h1>
	</div>
</div>


  <div class="row">
  	<div class="col-lg-12">

<table style="width:100%" id="dataTable" class="table table-striped table-responsive nowrap table-bordered table-hover dataTable no-footer dtr-inline">
<thead>
<tr>
	<th></th>
	<th>Tutor Name</th>
	<th>State</th>
	<th>City</th>
	<th>E-Mail</th>
	<th>Rate</th>
</tr>
</thead>
<tbody>

</tbody>
</table>
  	  
  	  

		</div>
	</div>
	
	
<SharePoint:SPDataSource runat="server" ID="DSSChools" UseInternalName="True" SelectCommand="<![CDATA[<View><Query><OrderBy><FieldRef Name='District_x002d_School' /></OrderBy></Query></View>]]>">
<SelectParameters>
<asp:Parameter Name="ListName" DefaultValue="School Districts" />
</SelectParameters>
</SharePoint:SPDataSource>


</asp:Content>