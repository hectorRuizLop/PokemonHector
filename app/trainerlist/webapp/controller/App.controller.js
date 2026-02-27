sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("com.nbx.trainerlist.controller.App", {
        onInit: function () {
            var oViewModel = new JSONModel({
                busy: false,
                delay: 0,
                layout: "OneColumn",
                previousLayout: "",
                actionButtonsInfo: {
                    midColumn: { fullScreen: false },
                    endColumn: { fullScreen: false }
                }
            });
            this.getView().setModel(oViewModel, "appView");
        }
    });
});
