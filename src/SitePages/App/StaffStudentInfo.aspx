<%@ Page Language="C#" masterpagefile="../../_catalogs/masterpage/dialog.master" inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" meta:progid="SharePoint.WebPartPage.Document" %>
<%@ Register tagprefix="SharePoint" namespace="Microsoft.SharePoint.WebControls" assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
<link type="text/css" media="all" href="Styles/corev15.css"  rel="stylesheet" />
<link type="text/css" media="all" href="Styles/Bootstrap/bootstrap.css" rel="stylesheet" />
<link type="text/css" media="all" href="Styles/FontAwesome/fontawesome.css" rel="stylesheet" />
<link type="text/css" media="all" href="Styles/DataTable/datatables.css" rel="stylesheet" />
<link type="text/css" media="all" href="Styles/Monthly/monthly.css" rel="stylesheet" />
<link type="text/css" media="all" href="Styles/Timepicker/timepicker.css" rel="stylesheet" />
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
<asp:ScriptReference Path="Scripts/DataTables/datatables.js" />
<asp:ScriptReference Path="Scripts/SummerNote/summernote.js" />
<asp:ScriptReference Path="StaffStudentInfo.js" />
</Scripts>
</asp:ScriptManagerProxy>

<ul class="nav nav-tabs">
  <li class="active"><a data-toggle="tab" href="#home">Student Info</a></li>
  <li><a data-toggle="tab" href="#comments">Additional Comments</a></li>
</ul>

<div class="tab-content">

	<!-- home tab -->
	<div id="home" class="tab-pane fade in active">
			<div class="col-lg-12">
			<div class="panel-body">
				<div class="row">
		<fieldset>			
		<div class="form-group">
			<div class="col-lg-6">
			<label>First Name</label>
			<input type="text" id="firstName" class="form-control input-sm" />	 
			</div>
			<div class="col-lg-6">
			<label>Last Name</label>
			<input type="text" id="lastName" class="form-control input-sm" />	 
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
			<input type="text" id="zipcode" class="form-control input-sm" />	 
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
				<textarea id="notes">				
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

	</div>
	
	
	<!-- comments tab -->
	 <div id="comments" class="tab-pane fade">
	           <br />
          <div class="panel panel-default">
              <div class="panel-body">
                  <ul id="commentsPlace" class="timeline">


                  </ul>
              </div>
          </div>
	 </div>
</div>


<SharePoint:SPDataSource runat="server" ID="DSSChools" UseInternalName="True" SelectCommand="<![CDATA[<View><Query><OrderBy><FieldRef Name='District_x002d_School' /></OrderBy></Query></View>]]>">
<SelectParameters>
<asp:Parameter Name="ListName" DefaultValue="School Districts" />
</SelectParameters>
</SharePoint:SPDataSource>


</asp:Content>
