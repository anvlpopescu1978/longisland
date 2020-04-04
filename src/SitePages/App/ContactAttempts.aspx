<%@ Page Language="C#" masterpagefile="../../_catalogs/masterpage/dialog.master" inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" meta:progid="SharePoint.WebPartPage.Document" %>
<%@ Register tagprefix="SharePoint" namespace="Microsoft.SharePoint.WebControls" assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
<link type="text/css" media="all" href="Styles/corev15.css"  rel="stylesheet" />
<link type="text/css" media="all" href="Styles/Bootstrap/bootstrap.css" rel="stylesheet" />
<link type="text/css" media="all" href="Styles/FontAwesome/fontawesome.css" rel="stylesheet" />
<link type="text/css" media="all" href="Styles/DataTable/datatables.css" rel="stylesheet" />
<link type="text/css" media="all" href="Styles/Monthly/monthly.css" rel="stylesheet" />
<link type="text/css" media="all" href="Styles/Timepicker/timepicker.css" rel="stylesheet" />
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
<asp:ScriptReference Path="ContactAttempts.js" />
</Scripts>
</asp:ScriptManagerProxy>

<div class="row">
	<fieldset>
	<div class="form-group">
	<div class="col-lg-12">
		<h1>Contact Attempts</h1>
	</div>
	</div>
	
	<div class="form-group">
	<div class="col-lg-4">
		<label>Attempt #1 Date</label>
		<input type="date" value="" id="attemptDate1" class="form-control input-sm" required  />
	</div>
		<div class="col-lg-4">
		<label>Attempt #1 Channel</label>
		<select class="form-control input-sm" id="attemptChannel1" required>
			<option value="">...</option>
			<option value="E-Mail">E-Mail</option>
			<option value="Phone">Phone</option>
			<option value="Voicemail">Voicemail</option>
		</select>
	</div>
	<div class="col-lg-4">
		<label>Attempt #1 Status</label>
		<select class="form-control input-sm" id="attemptStatus1" required>
	
			<option value="">...</option>
			<option value="Not reached">Not reached</option>
			<option value="Reached">Reached</option>
		</select>
	</div>
	</div>
	
	<div class="form-group">
	<div class="col-lg-4">
		<label>Attempt #2 Date</label>
		<input type="date" value="" id="attemptDate2" class="form-control input-sm" required  />
	</div>
		<div class="col-lg-4">
		<label>Attempt #2 Channel</label>
		<select class="form-control input-sm" id="attemptChannel2" required>
			<option value="">...</option>
			<option value="E-Mail">E-Mail</option>
			<option value="Phone">Phone</option>
			<option value="Voicemail">Voicemail</option>
		</select>
	</div>
	<div class="col-lg-4">
		<label>Attempt #2 Status</label>
		<select class="form-control input-sm" id="attemptStatus2" required>
			<option value="">...</option>
			<option value="Not reached">Not reached</option>
			<option value="Reached">Reached</option>
		</select>
	</div>
	</div>
	
	<div class="form-group">
	<div class="col-lg-4">
		<label>Attempt #3 Date</label>
		<input type="date" value="" id="attemptDate3" class="form-control input-sm" required  />
	</div>
		<div class="col-lg-4">
		<label>Attempt #3 Channel</label>
		<select class="form-control input-sm" id="attemptChannel3" required>
			<option value="">...</option>
			<option value="E-Mail">E-Mail</option>
			<option value="Phone">Phone</option>
			<option value="Voicemail">Voicemail</option>
		</select>
	</div>
	<div class="col-lg-4">
		<label>Attempt #3 Status</label>
		<select class="form-control input-sm" id="attemptStatus3" required>
			<option value="">...</option>
			<option value="Not reached">Not reached</option>
			<option value="Reached">Reached</option>
		</select>
	</div>
	</div>

	<div class="form-group">
	<div class="col-lg-4">
		<label>Attempt #4 Date</label>
		<input type="date" value="" id="attemptDate4" class="form-control input-sm" required  />
	</div>
		<div class="col-lg-4">
		<label>Attempt #4 Channel</label>
		<select class="form-control input-sm" id="attemptChannel4" required>
			<option value="">...</option>
			<option value="E-Mail">E-Mail</option>
			<option value="Phone">Phone</option>
			<option value="Voicemail">Voicemail</option>
		</select>
	</div>
	<div class="col-lg-4">
		<label>Attempt #4 Status</label> 
		<select class="form-control input-sm" id="attemptStatus4" required>
			<option value="">...</option>
			<option value="Not reached">Not reached</option>
			<option value="Reached">Reached</option>
		</select>
	</div>
	</div>


	<div class="form-group">
	<div class="col-lg-4">
		<label>Attempt #5 Date</label>
		<input type="date" value="" id="attemptDate5" class="form-control input-sm" required  />
	</div>
		<div class="col-lg-4">
		<label>Attempt #5 Channel</label>
		<select class="form-control input-sm" id="attemptChannel5" required>
			<option value="">...</option>
			<option value="E-Mail">E-Mail</option>
			<option value="Phone">Phone</option>
			<option value="Voicemail">Voicemail</option>
		</select>
	</div>
	<div class="col-lg-4">
		<label>Attempt #54 Status</label>
		<select class="form-control input-sm" id="attemptStatus5" required>
			<option value="">...</option>
			<option value="Not reached">Not reached</option>
			<option value="Reached">Reached</option>
		</select>
	</div>
	</div>

	<div class="form-group">
	<div class="col-lg-12">
		<br />
		<button type="button" class="btn btn-sm btn-primary" onclick="javascript:SaveAttempts()">Save</button>&#160;
		<button type="button" class="btn btn-sm btn-danger" onclick="javascript:CloseModal()">Close</button>&#160;
	</div>
	</div>
	
	</fieldset>
</div>


</asp:Content>
