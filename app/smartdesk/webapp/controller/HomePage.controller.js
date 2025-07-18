sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
], (Controller, Fragment, UIComponent, JSONModel) => {
    "use strict";

    return Controller.extend("smartdesk.controller.HomePage", {

        onInit() {
            var oModel = new JSONModel();
            this.getView().setModel(oModel);

            var currentTime = new Date();
            var hours = currentTime.getHours();
            var minutes = currentTime.getMinutes();
            var sec = currentTime.getSeconds();

            var localTime = `Current Time: ${hours}:${minutes}`;
            console.log(`Current Time: ${hours}:${minutes}:${sec}`);

            var timeOfDay = "";

            if (hours < 12) {
                timeOfDay = "Good Morning...";
            } else if (hours >= 12 && hours <= 16) {
                timeOfDay = "Good Afternoon...";
            } else {
                timeOfDay = "Good Evening...";
            }

            

            oModel.setProperty("/timeOfDay", timeOfDay);
            oModel.setProperty("/localTime", localTime);
        },

        onProfile: function (oEvent) {
            var oView = this.getView();

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
            }).then(function (oActionSheet) {
                this._oActionSheet = oActionSheet;
                oView.addDependent(oActionSheet);
                oActionSheet.openBy(oEvent.getSource());
            }.bind(this)).catch(function (error) {
                console.error("Error loading ActionSheet fragment: ", error);
            });
        },

        _navTo: function (route, id) {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo(route, { "Id": id });
        },

        onSideNavSelect: function (oEvent) {
            const sKey = oEvent.getParameter("item").getKey();

            switch (sKey) {
                case "timeTracking":
                    this.onTimeTracking();
                    break;
                case "workflows":
                    this.onWorkflows();
                    break;
                case "payStatement":
                    this.onPayStatement();
                    break;
                case "profile":
                    this.onViewProfile();
                    break;
                case "learning":
                    this.onViewLearning();
                    break;
                case "org":
                    this.onViewOrg();
                    break;
                case "leaves":
                    this.onViewLeaves();
                    break;
                default:
                    console.warn("No route mapped for key:", sKey);
                    break;
            }
        },

        onTimeTracking: function () {
            this._navTo("TimeTracking", "TimeTracking");
        },

        onWorkflows: function () {
            this._navTo("Workflow", "Workflow");
        },

        onPayStatement: function () {
            this._navTo("PayStatement", "PayStatement");
        },

        onViewProfile: function () {
            this._navTo("ViewProfile", "ViewProfile");
        },

        onViewLearning: function () {
            this._navTo("ViewLearning", "ViewLearning");
        },

        onViewOrg: function () {
            this._navTo("ViewOrg", "ViewOrg");
        },

        onViewLeaves: function () {
            this._navTo("ViewLeaves", "ViewLeaves");
        },

        onViewReport: function () {
            this._navTo("ViewTileReport", "ViewTileReport");
        }
    });
});
