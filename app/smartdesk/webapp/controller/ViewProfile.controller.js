sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel"
], function (Controller, ODataModel, JSONModel) {
    "use strict";

    return Controller.extend("smartdesk.controller.ViewProfile", {
        onInit: function () { 
            const oODataModel = new ODataModel("/v2/odata/v4/smart-desk/", {
                json:true
            });

            oODataModel.read("/Profile",{
               urlParameters: {
                "$expand": "projects"
                },
                success: (data) => {
                    var oModel = data.results[0]; 
                    console.log(oModel);
                    var oJSONModel = new JSONModel(oModel);
                    // console.log("JSONModel:",oJSONModel);
                    
                    var oView = this.getView().setModel(oJSONModel,"oProfile");
                    var oProject = oView.oModels.oProfile.oData.projects.results;

                    var oProjectData = new JSONModel(oProject);
                    this.getView().setModel(oProjectData,"oProjects")
                     

                    // var oProject = oModel.
                    
                },
                error: (err) =>{
                    console.log(err);
                }
            })
        }
    });
});
