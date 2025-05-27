sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
], (Controller, Fragment, UIComponent,JSONModel) => {
    "use strict";

    return Controller.extend("smartdesk.controller.HomePage", {
        onInit() {

            var oModel = new JSONModel();
            this.getView().setModel(oModel);

           var currentTime = new Date();
           var hours = currentTime.getHours();
           
           var hour = currentTime.getHours();
           var minutes = currentTime.getMinutes();
           var sec = currentTime.getSeconds();

           var localTime = `Current Time: ${hour}:${minutes}`;
           console.log(`Current Time: ${hour}:${minutes}:${sec}`);
            
            var timeOfDay = "" ;

            if(hours < 12 ){
                timeOfDay = "Good Morning..."
            }
            
            else if(hours >= 12 && hours <= 16){
                timeOfDay = "Good Afternoon..."
            }

            else if(hours >= 16 && hours <= 24){
                timeOfDay = "Good Evening..."
            }

            var oComboBox = [
                { Name: "Home" },
                { Name: "Admin Center" },
                { Name: "Calibration" },
                { Name: "Careers" },
                { Name: "Company Info" },
                { Name: "Compensation Info" },
                { Name: "Continuous Performance" },
                { Name: "Development"},
                { Name: "Learning"},
                { Name: "Payroll" }
            ];
 
            oModel.setProperty("/timeOfDay", timeOfDay); 
            oModel.setProperty("/localTime", localTime);
            oModel.setProperty("/oComboBox", oComboBox); 
            
        },

        onProfile: function (oEvent) {
            var oView = this.getView(); 
            console.log(oView);

            if (this._oActionSheet) {
                if (this._oActionSheet.isOpen()) {
                    this._oActionSheet.close();
                } else {
                    this._oActionSheet.openBy(oEvent.getSource());
                }
                return;
            }

            Fragment.load({
                id: oView.getId(),
                name: "northwindui5.northwindui.Fragment.Actionsheet", 
                type: "XML"
            }).then(function(oActionSheet)
            {
                this._oActionSheet = oActionSheet; 
                oView.addDependent(oActionSheet); 
                oActionSheet.openBy(oEvent.getSource());
            }.bind(this)).catch(function (error) 
            {
                console.error("Error loading ActionSheet fragment: ", error);
            });
        },

        onViewProfile1: function(oEvent)
        {
            console.log("View Profile");
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("ViewProfile1", {
               "Id":"ViewProfile1"
          });
        },

        onTimeTracking: function(oEvent){
            var oRouter = UIComponent.getRouterFor(this);
             oRouter.navTo("TimeTracking", {
                "Id" : "TimeTracking"
            });
        },
        onWorkflows: function(oEvent){
            var oRouter = UIComponent.getRouterFor(this);
             oRouter.navTo("Workflow", {
                "Id" : "Workflow"
            });
        },

        onPayStatement: function(oEvent)
        {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("PayStatement", {
               "Id":"PayStatement"
          });
        },
        onViewProfile: function(oEvent)
        {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("ViewProfile", {
               "Id":"ViewProfile"
          });
        },
        onViewLearning: function(oEvent)
        {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("ViewLearning", {
               "Id":"ViewLearning"
          });
        },
        onViewOrg: function(oEvent)
        {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("ViewOrg", {
               "Id":"ViewOrg"
          });
        },
        onViewLeaves: function(oEvent){
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("ViewLeaves",{
                "Id": "ViewLeaves"
            })
        },
        onViewReport: function(oEvent){
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("ViewTileReport",{
                "Id": "ViewTileReport"
            })
        }
    });
});
