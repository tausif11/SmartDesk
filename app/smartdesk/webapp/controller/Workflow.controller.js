sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/odata/v2/ODataModel",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast"
], function (Controller, ODataModel, JSONModel, MessageToast) {
  "use strict";

  return Controller.extend("smartdesk.controller.Workflow", {

    onInit: function () {
    //   var oView = this.getView();

      var oODataModel = new ODataModel("/v2/odata/v4/smart-desk/", {
        json: true
      });

      oODataModel.read("/Workflow", {
        urlParameters: {
          "$expand": "steps/documents"
        },
        success: (oData)=> {
          var oJSONModel = new JSONModel(oData.results);
          const oModel = this.getView().setModel(oJSONModel, "WorkflowData");
          var aSteps = oModel.oModels.WorkflowData.oData[0].steps.results || [];

          var oStepsModel = new JSONModel(aSteps);
          this.getView().setModel(oStepsModel, "StepsModel");
          console.log(oStepsModel.oData);

        },
        error: function (oError) {
          MessageToast.show("Failed to load workflow data.");
          console.error("OData Error:", oError);
        }
      });
    }

  });
});
