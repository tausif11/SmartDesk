sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/odata/v2/ODataModel",
     "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel"
], function (Controller,Filter, ODataModel, FilterOperator, JSONModel) {
    "use strict";

    return Controller.extend("smartdesk.controller.ViewOrg", {
        onInit: function () {
            const oODataModel = new ODataModel("/v2/odata/v4/smart-desk/",{
                  json: true
            });
            
            oODataModel.read("/Organisation",{
                urlParameters: {
                "$expand": "departments,employees"
                },
                success: (data) => {
                    console.log(data);

                    var oOrgData = data.results[0];
                    var oModel = new JSONModel(oOrgData);

                    var oView = this.getView().setModel(oModel,"oOrgData");
                    // console.log(oView);

                    var oDepartment = oView.oModels.oOrgData.oData.departments.results;
                    // console.log(oDepartment)

                    var oDepartmentModel = new JSONModel(oDepartment);
                    var oDept = this.getView().setModel(oDepartmentModel,"department");
                    // console.log(oDept);

                    var oEmployee = oView.oModels.oOrgData.oData.employees.results;
                    console.log(oEmployee)

                    var oEmployeeModel = new JSONModel(oEmployee);
                    var oEmp = this.getView().setModel(oEmployeeModel,"employee");
                    console.log(oEmp);
                    

                },
                error: (err) => {
                    console.log(err);
                }
            })
        },

        onViewDepartment: function (oEvent) {
            var oButton = oEvent.getSource();
            var sDepartment = oButton.getParent().getItems()[0].getText();
            sap.m.MessageToast.show("Viewing details for " + sDepartment);
        },

        onSearchEmployee: function(oEvent){
            var sQuery = oEvent.getParameter("newValue").toLowerCase();
            var oList = this.getView().byId("employeeList");
            console.log(oList);
            
            var oBinding = oList.getBinding("items");

            var oFilter = [];

            if(sQuery){
                oFilter.push(new Filter("name", FilterOperator.Contains, sQuery))
            }

            oBinding.filter(oFilter);
        }
        
    });
});
