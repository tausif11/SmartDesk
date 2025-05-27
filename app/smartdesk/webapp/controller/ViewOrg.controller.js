sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
     "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel"
], function (Controller,Filter, FilterOperator, JSONModel) {
    "use strict";

    return Controller.extend("smartdesk.controller.ViewOrg", {
        onInit: function () {
            var oModel = new JSONModel();
            this.getView().setModel(oModel);
            
            var oOrgData = {
                companyName: "INKIT Solutions",
                foundedYear: "2014",
                headquarters: "Melbourne, VIC",
                employeeCount: "500+",
                departments: [
                    { 
                        name: "Technology", 
                        description: "SAP BTP, ABAP, UI5 and Integration" 
                    },
                    { 
                        name: "HR & Admin", 
                        description: "Employee Relations & Payroll" 
                    },
                    { 
                        name: "Sales & Marketing", 
                        description: "Lead Generation & Client Relations" 
                    }
                ],
                employees: [
                    { 
                        name: "Md. Tausif Alam", 
                        designation: "Associate Consultant" 
                    },
                    { 
                        name: "Aman Garg", 
                        designation: "HR Manager" 
                    },
                    { 
                        name: "Shiv Krishnan", 
                        designation: "Marketing Lead" 
                    }
                ]
            }

            oModel.setProperty("/oOrgData",oOrgData);
            
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
