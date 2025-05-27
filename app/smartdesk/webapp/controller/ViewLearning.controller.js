sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, JSONModel,Filter,FilterOperator) {
    "use strict";

    return Controller.extend("smartdesk.controller.ViewLearning", {
        onInit: function () {
            var oData = {

                learningData: [
                    { 
                        title: "SAP UI5/FIORI", 
                        category: "Development", 
                        duration: "120", 
                        progress: 50 
                    },
                    { 
                        title: "SAP Build Apps", 
                        category: "Application Development", 
                        duration: "90", 
                        progress: 80 
                    },
                    { 
                        title: "SAP BTP", 
                        category: "Cloud", 
                        duration: "90", 
                        progress: 80 
                    },
                    { 
                        title: "SAP Build Process Automation (BPA)", 
                        category: "Workflow", 
                        duration: "60", 
                        progress: 30 
                    }
                ]
            };
            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel);
        },

        onSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("newValue").toLowerCase();
            var oList = this.getView().byId("learningList");
            var oBinding = oList.getBinding("items");
            var aFilters = [];

            if (sQuery) {
                aFilters.push(
                    new Filter({
                        filters: [
                            new Filter("title", FilterOperator.Contains, sQuery),
                            new Filter("category", FilterOperator.Contains, sQuery)
                        ],
                        and: false
                    })
                );
            }

            oBinding.filter(aFilters);
        },

        /* onFilterSelect: function (oEvent) {
            var sKey = oEvent.getId("id");
            var oList = this.getView().byId("learningList");
            var oBinding = oList.getBinding("items");
            var aFilters = [];

            if (sKey === "inProgress") {
                aFilters.push(new Filter("progress", FilterOperator.LT, 100));
            } else if (sKey === "completed") {
                aFilters.push(new Filter("progress", FilterOperator.EQ, 100));
            }
            oBinding.filter(aFilters);
        } */

        /*
           onSearch: function(oEvent){
                var sQuery = oEvent.getParameter("newValue").toLowerCase();
                var oList  = this.getView().byId("learningList");
                var oBinding = oList.getBinding("items");

                var aFilter = [];

                if(sQuery){
                   aFilter.push(new Filter("title", FilterOperator.Contains,sQuery));
                }
              
                oBinding.filter(aFilter);
           }
         */
    });
});
