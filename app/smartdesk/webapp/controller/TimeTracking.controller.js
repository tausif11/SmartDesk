sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function(Controller, ODataModel, JSONModel, MessageBox) {
    "use strict";

    return Controller.extend("smartdesk.controller.TimeTracking", {
        onInit: function() {
                const oODataModel = new ODataModel("/v2/odata/v4/smart-desk/", {
                    json: true
                });

                this._oODataModel = oODataModel;

                oODataModel.read("/TimeTracking", {
                    success: (data) => {
                        console.log("TimeTracking Data: ", data.results);
                        const oJsonModel = new JSONModel({
                            TimeTracking: data.results
                        });
                        this.getView().setModel(oJsonModel);
                    },
                    error: (error) => {
                        console.log(error);
                    }
                });
            },


        onSubmit: function() {
            const oViewModel  = this.getView().getModel();
            const oODataModel = this._oODataModel;
            const oSelectDate = this.getView().byId("dpDate").getDateValue();
            const oStartDate  = this.getView().byId("tpStartDate").getDateValue();
            const oEndDate    = this.getView().byId("tpEndTime").getDateValue();
            const oTask       = this.getView().byId("inputTask").getValue();
            const oDescription = this.getView().byId("textareaDescription").getValue();

            if (!oSelectDate || !oStartDate || !oEndDate || !oTask) {
                MessageBox.warning("Please fill all required fields.");
                return;
            }

            const oNewEntry = {
                date: oSelectDate,
                startDate: oStartDate,
                endDate: oEndDate,
                task: oTask,
                description: oDescription
            };

            oODataModel.create("/TimeTracking", oNewEntry, {
                success: (data) => {
                    
                    const aCurrent = oViewModel.getProperty("/TimeTracking") || [];
                    aCurrent.push(data);
                    oViewModel.setProperty("/TimeTracking", aCurrent);
                    MessageBox.success("Time entry saved successfully.");
                    this.clearForm();
                },
                error: (error) => {
                    console.error("Error creating entry", error);
                    MessageBox.error("Failed to save entry.");
                }
            });
        },

        clearForm: function() {
            this.getView().byId("dpDate").setDateValue(null);
            this.getView().byId("tpStartDate").setDateValue(null);
            this.getView().byId("tpEndTime").setDateValue(null);
            this.getView().byId("inputTask").setValue("");
            this.getView().byId("textareaDescription").setValue("");
        }
    });
});
