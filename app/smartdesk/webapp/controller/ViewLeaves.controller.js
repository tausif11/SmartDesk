sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function(Controller, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("smartdesk.controller.ViewLeaves", {

		onInit: function() {
			var oModel = new JSONModel();
			this.getView().setModel(oModel);

			var oLeaveData = {
				Casual       : 9,
				Paid         : 15,
				Sick         : 10,
				startDate    : null,
				endDate      : null,
				numberOfDays : "",
				note         : "",
				leavesData   : []
			};

			var oNewArray = {
				leavesData: []
			}

			oModel.setProperty("/oNewArray", oNewArray);
			oModel.setProperty("/oLeaveData", oLeaveData);
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