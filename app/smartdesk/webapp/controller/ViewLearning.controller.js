sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, ODataModel, Filter,FilterOperator) {
    "use strict";

    return Controller.extend("smartdesk.controller.ViewLearning", {
        onInit: function () {
             const oODataModel = new ODataModel("/v2/odata/v4/smart-desk/",{
                  json: true
            });

            oODataModel.read("/Course", {
                success: (data) => {
                    const aCourses = data.results;
                    const oJSONModel = new JSONModel({
                        Course: aCourses
                    });

                    this.getView().setModel(oJSONModel);
                },
                error: (err) => {
                    console.error("OData Read Error:", err);
                }
            });
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
