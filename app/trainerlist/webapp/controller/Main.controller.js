sap.ui.define([
    "./BaseController"
], function (BaseController) {
    "use strict";

    return BaseController.extend("com.nbx.trainerlist.controller.Main", {
        onInit: function () {},

        onPressTrainer: function (oEvent) {
            const oContext = oEvent.getSource().getBindingContext(),
                sTrainerId = oContext.getProperty("ID"); 

            this.getAppViewModel().setProperty("/layout", "TwoColumnsMidExpanded");
            this.getRouter().navTo("RouteTeams", {
                trainerId: sTrainerId
            });
        }
    });
});