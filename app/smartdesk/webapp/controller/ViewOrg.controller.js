sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel"
], function (Controller, Filter, ODataModel, FilterOperator, JSONModel) {
    "use strict";

    return Controller.extend("smartdesk.controller.ViewOrg", {
        pageSize: 5,         
        currentPage: 1,      
        fullEmployeeList: [],

        onInit: function () {
            const oODataModel = new ODataModel("/v2/odata/v4/smart-desk/", {
                json: true
            });

            oODataModel.read("/Organisation", {
                urlParameters: {
                    "$expand": "departments,employees"
                },
                success: (data) => {
                    var oOrgData = data.results[0];
                    var oModel = new JSONModel(oOrgData);
                    this.getView().setModel(oModel, "oOrgData");

                    var oDepartment = oOrgData.departments.results;
                    var oDepartmentModel = new JSONModel(oDepartment);
                    this.getView().setModel(oDepartmentModel, "department");

                    this.fullEmployeeList = oOrgData.employees.results;
                    this.currentPage = 1;

                    this._updateEmployeeList();
                },
                error: (err) => {
                    console.error(err);
                }
            });
        },

        _updateEmployeeList: function () {
            // Calculate start and end index for slicing
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;

            // Slice employees for current page
            const pageEmployees = this.fullEmployeeList.slice(start, end);

            // Update the JSON model bound to the list
            var oEmployeeModel = new JSONModel(pageEmployees);
            this.getView().setModel(oEmployeeModel, "employee");

            // Enable/disable buttons accordingly
            this._updatePaginationButtons();
        },

        _updatePaginationButtons: function () {
            const totalPages = Math.ceil(this.fullEmployeeList.length / this.pageSize);
            const oView = this.getView();

            oView.byId("btnPrevious").setEnabled(this.currentPage > 1);
            oView.byId("btnNext").setEnabled(this.currentPage < totalPages);
        },

        onPreviousPage: function () {
            if (this.currentPage > 1) {
                this.currentPage--;
                this._updateEmployeeList();
            }
        },

        onNextPage: function () {
            const totalPages = Math.ceil(this.fullEmployeeList.length / this.pageSize);
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this._updateEmployeeList();
            }
        },

        onSearchEmployee: function (oEvent) {
            const sQuery = oEvent.getParameter("newValue").toLowerCase();

            if (!sQuery) {
                // If search cleared, reset to full list and first page
                this.fullEmployeeList = this.getView().getModel("oOrgData").getProperty("/employees/results");
            } else {
                // Filter full list by search query
                this.fullEmployeeList = this.getView().getModel("oOrgData").getProperty("/employees/results")
                    .filter(emp => emp.name.toLowerCase().includes(sQuery));
            }

            this.currentPage = 1;
            this._updateEmployeeList();
        }

    });
});
