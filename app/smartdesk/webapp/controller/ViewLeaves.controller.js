sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/odata/v2/ODataModel",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function(Controller, ODataModel, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("smartdesk.controller.ViewLeaves", {

		onInit: function() {
			const oODataModel = new ODataModel("/v2/odata/v4/smart-desk/",{
                 json:true
			});

			oODataModel.read("/Leave",{
                 success: (data) =>{
					var oModel = data.results;
					console.log(oModel);

					let LeaveType = [];

					for(let i=0; i<oModel.length; i++){
						const leaveType = oModel[i].leaveType;
						console.log(leaveType);
						
						LeaveType.push({
							key: leaveType,
                            text: leaveType + " Leave"
						});
					}

					const oLeaveTypeModel = new JSONModel(LeaveType);
					console.log(oLeaveTypeModel.oData)
                    this.getView().setModel(oLeaveTypeModel, "leaveTypes");

					var oJsonModel = new JSONModel(oModel);
					this.getView().setModel(oJsonModel,"Leave");
				 },
				 error: (err) =>{
					console.log(err);
				 }
			})
		},

		onApplyLeave: function() {
			var oModel          = this.getView().getModel();
			var oLeavesFormData = oModel.getProperty("/oLeaveData");
			var aLeavesData     = oModel.getProperty("/oNewArray/leavesData");

			var oSelect    = this.getView().byId("leaveTypeSelect");
			var sLeaveType = oSelect.getSelectedKey();
			var oNumOfDays = parseInt(oLeavesFormData.numberOfDays, 10);


			if (isNaN(oNumOfDays) || oNumOfDays <= 0) {
				MessageToast.show("Please enter a valid number of days.");
				return;
			}


			if(sLeaveType === 'Casual' && oLeavesFormData.Casual >= oNumOfDays)
            {
				oLeavesFormData.Casual = oLeavesFormData.Casual - oNumOfDays;
			} 
            else if(sLeaveType === 'Sick' && oLeavesFormData.Sick >= oNumOfDays)
            {
				oLeavesFormData.Sick = oLeavesFormData.Sick - oNumOfDays;
			}
            else if(sLeaveType === 'Paid' && oLeavesFormData.Paid >= oNumOfDays)
            {
				oLeavesFormData.Paid = oLeavesFormData.Paid - oNumOfDays;
			}
            else
            {
				MessageToast.show("Not enough leave balance for the selected leave type.");
				return;
			}

			aLeavesData.push({
				leaveType   : sLeaveType,
				startDate   : oLeavesFormData.startDate,
				numberOfDays: oLeavesFormData.numberOfDays,
				endDate     : oLeavesFormData.endDate,
				note        : oLeavesFormData.note,
				status      : "Pending",
				statusState : "Warning"
			});


			oModel.setProperty("/aLeavesData", aLeavesData);

			MessageToast.show(`${sLeaveType}: Leave applied successfully`);

			this.clearForm();
		},

		clearForm: function() {
			var oModel = this.getView().getModel();

			oModel.setProperty("/oLeaveData/startDate", null);
			oModel.setProperty("/oLeaveData/endDate", null);
			oModel.setProperty("/oLeaveData/note", "");
			oModel.setProperty("/oLeaveData/numberOfDays", "");
		}

	});
});