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
<asp:ScriptReference Path="StaffTutorInfo.js" />
</Scripts>
</asp:ScriptManagerProxy>

<div class="row">
    <div class="col-lg-12">
        <h1 class="page-header">Edit Tutor Profile</h1>
        <div class="form-group">
        	<div class="col-sm-12">
        		<label>Profile ID</label>
        		<input type="text" class="form-control input-sm" value="" id="profileId" />
        	</div>
        </div>
        <div class="form-group">
            <div class="col-sm-6">
                <label>Tutor ID</label>
                <input type="text" class="form-control input-sm" value="" id="tutorId"  />
            </div>
            <div class="col-sm-6">
                <label>Hire Date</label>
                <input type="text" class="form-control input-sm" value="" id="hireDate"  />
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-6">
                <label>First Name</label>
                <input type="text" class="form-control input-sm" value="" id="firstName"  />
            </div>
            <div class="col-sm-6">
                <label>Last Name</label>
                <input type="text" class="form-control input-sm" value="" id="lastName"  />
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-6">
                <label>Address</label>
                <input type="text" class="form-control input-sm" value="" id="address" />
            </div>
            <div class="col-sm-6">
                <label>City</label>
                <input type="text" class="form-control input-sm" value="" id="city" />
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-6">
                <label>State</label>
                <input type="text" class="form-control input-sm" value="" id="state" />
            </div>
            <div class="col-sm-6">
                <label>ZIP Code</label>
                <input type="text" class="form-control input-sm" value="" id="zipcode" />
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-6">
                <label>Contact 1</label>
                <input type="text" class="form-control input-sm" value="" id="contact1" />
            </div>
            <div class="col-sm-6">
                <label>Contact 2</label>
                <input type="text" class="form-control input-sm" value="" id="contact2" />
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-6">
                <label>E-Mail</label>
                <input type="text" class="form-control input-sm" value="" id="email" readonly="readonly" />
            </div>
            <div class="col-sm-6">
                <label>Rate</label>
                <input type="text" class="form-control input-sm" value="" id="salary" readonly="readonly" />
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-4">
                <label>Active</label>
                <select id="isActive" class="form-control input-sm">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
            <div class="col-sm-4">
                <label>Certified</label>
                <select id="certified" class="form-control input-sm">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
            <div class="col-sm-4">
                <label>Fingerprint</label>
                <select id="fingerprint" class="form-control input-sm">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-4">
                <label>Living Environment</label>
                <select id="livingEnviroment" class="form-control input-sm">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
            <div class="col-sm-4">
                <label>Earth Science</label>
                <select id="earthScience" class="form-control input-sm">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
            <div class="col-sm-4">
                <label>Chemistry</label>
                <select id="chemistry" class="form-control input-sm">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-4">
                <label>Physics</label>
                <select id="physics" class="form-control input-sm">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
            <div class="col-sm-4">
                <label>General Science</label>
                <select id="generalscience" class="form-control input-sm">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
            <div class="col-sm-4">
                <label>Speech</label>
                <select id="speech" class="form-control input-sm">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-4">
                <label>Counseling</label>
                <select id="counseling" class="form-control input-sm">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
            <div class="col-sm-4">
                <label>Reading</label>
                <select id="reading" class="form-control input-sm">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
            <div class="col-sm-4">
                <label>Proctor Only</label>
                <select id="proctoronly" class="form-control input-sm">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
         </div>
         <div class="form-group">
            <div class="col-sm-4">
                <label>Bi-Lingual</label>
                <input type="text" id="bilingual" class="form-control input-sm" />
            </div>
            
            <div class="col-sm-4">
                <label>Special Ed</label>
                <input type="text" id="specialed" class="form-control input-sm" />
            </div>
            <div class="col-sm-4">
                <label>Elementary</label>
                <input type="text" id="elementary" class="form-control input-sm" />
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-4">
                <label>Social Studies</label>
                <input type="text" id="socialstudies" class="form-control input-sm" />
            </div>
            
            <div class="col-sm-4">
                <label>Mathematics</label>
                <input type="text" id="mathematics" class="form-control input-sm" />
            </div>
            <div class="col-sm-4">
                <label>Business</label>
                <input type="text" id="business" class="form-control input-sm" />
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-4">
                <label>PE-Health</label>
                <input type="text" id="lehealth" class="form-control input-sm" />
            </div>
            
            <div class="col-sm-4">
                <label>ASL/ESL/LOTE</label>
                <input type="text" id="lote" class="form-control input-sm" />
            </div>
            <div class="col-sm-4">
                <label>Music-Art</label>
                <input type="text" id="musicart" class="form-control input-sm" />
            </div>
        </div>

        <div class="form-group">
        	<div class="col-sm-12">
        	<br />
        	        <button type="button" class="btn btn-sm btn-primary" onclick="SaveProfile()">
					Save</button>&#160;
					<button type="button" class="btn btn-sm btn-danger" onclick="javascript:CloseModal()">
					Close</button>

        	</div>
        </div>
    </div>
    </div>
    <br /><br />


</asp:Content>
