sap.ui.define([
    "./BaseController"
], function (BaseController) {
    "use strict";

    return BaseController.extend("com.nbx.trainerlist.controller.Captures", {
        onInit: function () {
            this.getRouter()
                .getRoute("RouteCaptures")
                .attachPatternMatched(this._onRouteMatched, this);
        },
        _onRouteMatched: function (oEvent) {
            const sTeamId = oEvent.getParameter("arguments").teamId;

            this.getView().bindElement({
                path: "/Teams('" + sTeamId + "')",
                parameters: { $expand: "captures"}
            });
        },
        onNavBack: function () {
            this.getAppViewModel().setProperty("/layout", "TwoColumnsMidExpanded");
            history.go(-1);
        }
    });
});
