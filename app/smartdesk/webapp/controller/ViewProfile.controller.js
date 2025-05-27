sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("smartdesk.controller.ViewProfile", {
        onInit: function () { 
            var oModel = new JSONModel();
            this.getView().setModel(oModel);

            var oUserProfile = {
                employeeID: "EMP12345",
                department: "Technology",
                position: "Associate Consultant",
                joiningDate: "01-Jan-2023",
                fullName: "Md. Tausif Alam",
                email: "tausif.alam@inkitsolutions.com",
                phone: "+91 9876543210",
                dob: "30/11/2000",
                projects: [
                    { 
                        projectName: "SAP UI5 App", 
                        role: "Developer", 
                        duration: "6 Months" 
                    },
                    { 
                        projectName: "SAP BPA Workflow", 
                        role: "Lead Developer", 
                        duration: "8 Months" 
                    },
                    { 
                        projectName: "SAP Build Apps", 
                        role: "Consultant", 
                        duration: "4 Months" 
                    }
                ]
            };

            oModel.setProperty("/oUserProfile", oUserProfile);
        }
    });
});
