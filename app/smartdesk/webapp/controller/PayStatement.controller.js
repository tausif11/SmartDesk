sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/core/util/File"
], function (Controller, JSONModel, MessageToast, File) {
    "use strict";

    return Controller.extend("smartdesk.controller.PayStatement", {
        onInit: function () { 
            var oModel = new JSONModel();
            this.getView().setModel(oModel);

            var oCurrentDate = new Date();
            var oMonth = oCurrentDate.toLocaleDateString("default", { month: 'long' });
            console.log(oMonth);
            

            var oPaySlip = {
                month: oMonth,
                employeeName: "Md. Tausif Alam",
                employeeID: "EMP12345",
                department: "Technology",
                position: "Associate Consultant",
                payDate: "1 " + oMonth ,
                basicSalary: "₹50,000",
                bonus: "₹5,000",
                allowances: "₹3,000",
                taxDeduction: "₹8,000",
                providentFund: "₹2,000",
                otherDeductions: "₹1,000",
                totalEarnings: "₹58,000",
                totalDeductions: "₹11,000",
                netPay: "₹47,000"
            };

            oModel.setProperty("/oPaySlip", oPaySlip);
        },

        onDownloadPaySlip: function () {
            var oModel = this.getView().getModel(); 
            console.log("oModel:",oModel );
            
            var oData = oModel.getProperty("/oPaySlip");
            
            console.log("Pay Slip Data: ", oData);

            if (!oData) {
                MessageToast.show("Error: Pay Slip data is missing!");
                return;
            }

            // Prepare Pay Slip Content
            var paySlipContent = `
                Pay Slip - ${oData.month} \n
                ---------------------------------------\n
                Employee Name: ${oData.employeeName}\n
                Employee ID: ${oData.employeeID}\n
                Department: ${oData.department}\n
                Position: ${oData.position}\n
                Pay Date: ${oData.payDate}\n
                ---------------------------------------\n
                Earnings:\n
                - Basic Salary: ${oData.basicSalary}\n
                - Bonus: ${oData.bonus}\n
                - Allowances: ${oData.allowances}\n
                ---------------------------------------\n
                Deductions:\n
                - Tax Deduction: ${oData.taxDeduction}\n
                - Provident Fund: ${oData.providentFund}\n
                - Other Deductions: ${oData.otherDeductions}\n
                ---------------------------------------\n
                Total Earnings: ${oData.totalEarnings}\n
                Total Deductions: ${oData.totalDeductions}\n
                Net Pay: ${oData.netPay}\n
                ---------------------------------------
            `;

            var blob = new Blob([paySlipContent], { type: "text/plain;charset=utf-8" });
            File.save(blob, `PaySlip_${oData.month}`, "txt", "text/plain");
        }
    });
});
