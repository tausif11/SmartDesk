sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/m/MessageToast",
    "sap/ui/core/util/File"
], function (Controller, JSONModel, ODataModel, MessageToast, File) {
    "use strict";

    return Controller.extend("smartdesk.controller.PayStatement", {
        onInit: function () { 

            var oCurrentDate = new Date();
            this._oMonth = oCurrentDate.toLocaleDateString("default", { month: 'long' });
            console.log(this._oMonth);
            
            const oODataModel = new ODataModel("/v2/odata/v4/smart-desk/",{
                  json: true
            });

            oODataModel.read("/PaySlip",{
                success: (data) => {
                    // console.log(data.results[0]);

                    let oModel = data.results[0];

                    const oJSONModel = new JSONModel(oModel);
                    // console.log(oJSONModel);
                    
                    this.getView().setModel(oJSONModel,"oPaySlip")

                    // console.log(oView.oModels.oPaySlip.oData)
                },
                error: (err) => {
                    console.log(err);
                }
                
            })
            
        },

        onDownloadPaySlip: function () {
            var oModel = this.getView().getModel("oPaySlip"); 
            console.log("oModel:",oModel.oData.EmployeeName );
            
            // var oData = oModel.getProperty();
            
            // console.log("Pay Slip Data: ", this._oMonth);

            // if (!oData) {
            //     MessageToast.show("Error: Pay Slip data is missing!");
            //     return;
            // }

            // Prepare Pay Slip Content
            var paySlipContent = `
                Pay Slip - ${this._oMonth} \n
                ---------------------------------------\n
                Employee Name: ${oModel.oData.EmployeeName}\n
                Employee ID: ${oModel.oData.EmployeeID}\n
                Department: ${oModel.oData.Department}\n
                Position: ${oModel.oData.Position}\n
                Pay Date: ${this._oMonth}\n
                ---------------------------------------\n
                Earnings:\n
                - Basic Salary: ${oModel.oData.BasicSalary}\n
                - Bonus: ${oModel.oData.Bonus}\n
                - Allowances: ${oModel.oData.Allowances}\n
                ---------------------------------------\n
                Deductions:\n
                - Tax Deduction: ${oModel.oData.TaxDeduction}\n
                - Provident Fund: ${oModel.oData.ProvidentFund}\n
                - Other Deductions: ${oModel.oData.OtherDeductions}\n
                ---------------------------------------\n
                Total Earnings: ${oModel.oData.TotalEarnings}\n
                Total Deductions: ${oModel.oData.TotalDeductions}\n
                Net Pay: ${oModel.oData.NetPay}\n
                ---------------------------------------
            `;

            var blob = new Blob([paySlipContent], { type: "text/plain;charset=utf-8" });
            File.save(blob, `PaySlip_${this._oMonth}`, "txt", "text/plain");
        }
    });
});
