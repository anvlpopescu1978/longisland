﻿<%@ Page Language="C#" masterpagefile="../../_catalogs/masterpage/dialog.master" inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" meta:progid="SharePoint.WebPartPage.Document" %>
<%@ Register tagprefix="SharePoint" namespace="Microsoft.SharePoint.WebControls" assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
<link type="text/css" media="all" href="Styles/corev15.css"  rel="stylesheet" />
<link type="text/css" media="all" href="Styles/Bootstrap/bootstrap.css" rel="stylesheet" />
<link type="text/css" media="all" href="Styles/FontAwesome/fontawesome.css" rel="stylesheet" />
<link type="text/css" media="all" href="Styles/SummerNote/summernote.css" rel="stylesheet" />

<link type="text/css" media="all" href="Styles/App.css" rel="stylesheet" />
</asp:Content>

<asp:Content ContentPlaceHolderID="ContentPlaceHolderMaim" runat="server">
<asp:ScriptManagerProxy runat="server">
<Scripts>
<asp:ScriptReference Path="Scripts/Dialog/sharepoint.dialog.js" />
<asp:ScriptReference Path="Scripts/Controls/sharepoint.controls.js" />
<asp:ScriptReference Path="Scripts/Data/sharepoint.lists.js" />
<asp:ScriptReference Path="Scripts/Data/sharepoint.data.js" />
<asp:ScriptReference Path="Scripts/SummerNote/summernote.js" />
<asp:ScriptReference Path="StudentInfo.js" />
</Scripts>
</asp:ScriptManagerProxy>

<div class="col-lg-12">
	<div class="panel-body">
		<div class="row">
<fieldset>		
<div class="form-group">
	<div class="col-lg-6">
	<label>First Name</label>
	<input type="text" readonly="readonly" id="firstName" class="form-control input-sm" />	 
	</div>
	<div class="col-lg-6">
	<label>Last Name</label>
	<input type="text" readonly="readonly" id="lastName" class="form-control input-sm" />	 
	</div>
</div>

<div class="form-group">
	<div class="col-lg-6">
	<label>State</label>
	<input type="text" id="state" class="form-control input-sm" />	 
	</div>
	<div class="col-lg-6">
	<label>City</label>
	<input type="text" id="city" class="form-control input-sm" />	 
	</div>
</div>

<div class="form-group">
	<div class="col-lg-6">
	<label>ZIP Code</label>
	<input type="text" id="state" class="form-control input-sm" />	 
	</div>
	<div class="col-lg-6">
	<label>Street Address</label>
	<input type="text" id="streetAddress" class="form-control input-sm" />	 
	</div>
</div>

<div class="form-group">
	<div class="col-lg-6">
	<label>Parent Name</label>
	<input type="text" id="parentName" class="form-control input-sm" />	 
	</div>
	<div class="col-lg-6">
	<label>Email</label>
	<input type="text" id="email" class="form-control input-sm" />	 
	</div>
</div>

<div class="form-group">
	<div class="col-lg-6">
	<label>H Phone</label>
	<input type="text" id="hphone" class="form-control input-sm" />	 
	</div>
	<div class="col-lg-6">
	<label>W Phone</label>
	<input type="text" id="wphone" class="form-control input-sm" />	 
	</div>
</div>

<div class="form-group">
	<div class="col-lg-6">
	<label>C Phone 1</label>
	<input type="text" id="cphone1" class="form-control input-sm" />	 
	</div>
	<div class="col-lg-6">
	<label>C Phone 2</label>
	<input type="text" id="cphone2" class="form-control input-sm" />	 
	</div>
</div>

<div class="form-group">
	<div class="col-lg-12">
		<label>Notes</label>

		<textarea id="comments">
		
		</textarea>
	</div>
</div>

	<div class="col-lg-12"><br /><br />
	<button type="button" class="btn btn-primary btn-md" onclick="javascript:SaveStudent()">
	Save</button>&nbsp;
	<button type="button" class="btn btn-danger btn-md" onclick="javascript:CloseModal();">
	Cancel</button>&nbsp;


</div>
</fieldset>
		
		</div>	
	</div>
</div>

</asp:Content>
