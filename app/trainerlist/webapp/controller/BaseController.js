sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("com.nbx.trainerlist.controller.BaseController", {
        getRouter: function () {
            return this.getOwnerComponent().getRouter();
        },
        getModel: function (sName) {
            return this.getView().getModel(sName) || this.getOwnerComponent().getModel(sName);
        },
        getAppViewModel: function () {
            return this.getOwnerComponent().getRootControl().getModel("appView");
        }
    });
});