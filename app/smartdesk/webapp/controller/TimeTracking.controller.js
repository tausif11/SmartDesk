sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("smartdesk.controller.TimeTracking", {
        onInit() {
            var oModel = new JSONModel();
            this.getView().setModel(oModel);

            var TimeTracking = {
                date: null,
                startDate: null,
                endDate: null,
                task: "",
                description: "",
                   
            };

            var oNewArrayData = {
                entries: []
            };

            oModel.setProperty("/oNewArrayData", oNewArrayData);
            oModel.setProperty("/TimeTracking", TimeTracking);
        },

        onSubmit: function() {
            var oModel = this.getView().getModel();
            var oTimeTracking = oModel.getProperty("/TimeTracking");
            var aNewArrayEntries = oModel.getProperty("/oNewArrayData/entries");

            var oNewEntry = {
                Date        : oTimeTracking.date,
                startDate   : oTimeTracking.startDate,
                endDate     : oTimeTracking.endDate,
                task        : oTimeTracking.task,
                description : oTimeTracking.description
            };
 
            aNewArrayEntries.push(oNewEntry);
            oModel.setProperty("/aNewArrayEntries", aNewArrayEntries);
            this.clearForm();
        },

        clearForm: function() {
            var oModel = this.getView().getModel();
            
            oModel.setProperty("/TimeTracking/date", null);
            oModel.setProperty("/TimeTracking/startDate", null);
            oModel.setProperty("/TimeTracking/endDate", null);
            oModel.setProperty("/TimeTracking/task", "");
            oModel.setProperty("/TimeTracking/description", "");
        }
    });
});
