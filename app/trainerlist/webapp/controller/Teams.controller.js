sap.ui.define([
    "./BaseController"
], function (BaseController) {
    "use strict";

    return BaseController.extend("com.nbx.trainerlist.controller.Teams", {

        onInit: function () {
            this.getRouter()
                .getRoute("RouteTeams")
                .attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function (oEvent) {
            this._sTrainerId = oEvent.getParameter("arguments").trainerId;

            this.getView().bindElement({
                path: "/Trainers('" + this._sTrainerId + "')",
                parameters: {
                    $expand: "teams"
                }
            });
        },
        onPressTeam: function (oEvent) {
            const oContext = oEvent.getSource().getBindingContext();
            const sTeamId = oContext.getProperty("ID");

            this.getAppViewModel().setProperty("/layout", "ThreeColumnsMidExpanded");
            this.getRouter().navTo("RouteCaptures", {
                trainerId: this._sTrainerId,
                teamId: sTeamId
            });
        },
        onNavBack: function () {
            this.getAppViewModel().setProperty("/layout", "OneColumn");
            this.getRouter().navTo("RouteTrainers");
        }
    });
});
