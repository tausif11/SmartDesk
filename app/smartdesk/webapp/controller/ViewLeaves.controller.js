sap.ui.define(
	[
		"sap/ui/core/mvc/Controller",
		"sap/ui/model/odata/v2/ODataModel",
		"sap/ui/model/json/JSONModel",
		"sap/m/MessageToast",
	],
	function(Controller, ODataModel, JSONModel, MessageToast) {
		"use strict";

		return Controller.extend("smartdesk.controller.ViewLeaves", {
			onInit: function() {

				const oODataModel = new ODataModel("/v2/odata/v4/smart-desk/", {
                    json: true
                });

				this._oODataModel = oODataModel;

				oODataModel.read("/Leave", {
					success: (data) => {
						var oModel = data.results;
						console.log(oModel);

						let LeaveType = [];

						for (let i = 0; i < oModel.length; i++) {
							const leaveType = oModel[i].leaveType;
							console.log(leaveType);

							LeaveType.push({
								key: leaveType,
								text: leaveType + " Leave",
							});
						}

						const oLeaveTypeModel = new JSONModel(LeaveType);
						console.log(oLeaveTypeModel.oData);
						this.getView().setModel(oLeaveTypeModel, "leaveTypes");

						var oJsonModel = new JSONModel(oModel);
						this.getView().setModel(oJsonModel, "Leave");
					},
					error: (err) => {
						console.log(err);
					},
				});
			},

			onApplyLeave: function() {
				var oModel = this.getView().getModel("Leave");
				const oODataModel = this._oODataModel;

				/*-------------------------------------------------*/
				var CasualDays = oModel.oData[0].casualLeave;
				var PaidDays = oModel.oData[0].paidLeave;
				var SickDays = oModel.oData[0].sickLeave;

				console.log("CasualDays", CasualDays);
				console.log("PaidDays", PaidDays);
				console.log("SickDays", SickDays);
				/*-------------------------------------------------*/

				// var oLeavesFormData = oModel.getProperty("/oLeaveData");
				// var aLeavesData     = oModel.getProperty("/oNewArray/leavesData");

				var LeaveType = this.getView().byId("ComboBox").getValue();

				var oStartDate = this.getView().byId("startDatePicker").getValue();
				var oEndDate = this.getView().byId("endDatePicker").getValue();
				var oLeaveDays = this.getView().byId("numOfDays").getValue();
				var oNumOfDays = parseInt(oLeaveDays, 10);

				console.log("LeaveType:", LeaveType);
				console.log("oStartDate:", oStartDate);
				console.log("oEndDate:", oEndDate);
				console.log("oLeaveDays:", typeof oNumOfDays);

				if (isNaN(oNumOfDays) || oNumOfDays <= 0) {
					MessageToast.show("Please enter a valid number of days.");
					return;
				}

				var oLeaveBalances = oModel.getProperty("/0");

				var CasualDays = oLeaveBalances.casualLeave;
				var PaidDays = oLeaveBalances.paidLeave;
				var SickDays = oLeaveBalances.sickLeave;

				if (LeaveType === "Casual Leave" && CasualDays >= oNumOfDays) {
					CasualDays = CasualDays - oNumOfDays;
					oModel.setProperty("/0/casualLeave", CasualDays);
				} else if (LeaveType === "Sick Leave" && SickDays >= oNumOfDays) {
					SickDays = SickDays - oNumOfDays;
					oModel.setProperty("/0/sickLeave", SickDays);
				} else if (LeaveType === "Paid Leave" && PaidDays >= oNumOfDays) {
					PaidDays = PaidDays - oNumOfDays;
					oModel.setProperty("/0/paidLeave", PaidDays);
				} else {
					MessageToast.show("Not enough leave balance for the selected leave type.");
					return;
				}

				var oLeaveRecord = {
					leaveType : LeaveType,
					startDate : oStartDate,
					endDate   : oEndDate,
					leaveDays : oLeaveDays
				}

				oODataModel.create("/Leave", oLeaveRecord, {
                      success: (data) => {
						   const oCurrent = oModel.getProperty("/Leave") || [];
						   oCurrent.push(data);
						   oViewModel.setProperty("/Leave", oCurrent);
                           MessageBox.success("Leave entry saved successfully.");
					  },
					  error: (err) => {
						   onsole.error("Error creating entry", error);
                           MessageBox.error("Failed to save entry.");
					  }
				});

				this.clearForm();
			},

			clearForm: function() {
				var oModel = this.getView().getModel();

				oModel.setProperty("/oLeaveData/startDate", null);
				oModel.setProperty("/oLeaveData/endDate", null);
				oModel.setProperty("/oLeaveData/note", "");
				oModel.setProperty("/oLeaveData/numberOfDays", "");
			},
		});
	}
);