<%@ Page Language="C#" masterpagefile="../../_catalogs/masterpage/dialog.master" inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" meta:progid="SharePoint.WebPartPage.Document" %>
<%@ Register tagprefix="SharePoint" namespace="Microsoft.SharePoint.WebControls" assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
<link type="text/css" media="all" href="Styles/corev15.css"  rel="stylesheet" />
<link type="text/css" media="all" href="Styles/Bootstrap/bootstrap.css" rel="stylesheet" />
<link type="text/css" media="all" href="Styles/FontAwesome/fontawesome.css" rel="stylesheet" />
<link type="text/css" media="all" href="Styles/FullCalendar/core/main.css" rel="stylesheet" />
<link type="text/css" media="all" href="Styles/FullCalendar/daygrid/main.css" rel="stylesheet" />

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
<asp:ScriptReference Path="Scripts/FullCalendar/core/main.js" />
<asp:ScriptReference Path="Scripts/FullCalendar/daygrid/main.js" />
<asp:ScriptReference Path="StudentCalendar.js" />
</Scripts>
</asp:ScriptManagerProxy>

<div class="row" id="calendar">

</div>
<div class="row">
<br />
<button type="button" class="btn btn-sm btn-danger" onclick="javascript:CloseModal()">Close</button>
<br />
</div>


</asp:Content>
