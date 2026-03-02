sap.ui.define([
    "./BaseController"
], function (BaseController) {
    "use strict";

    return BaseController.extend("com.nbx.trainerlist.controller.Main", {
        _oAddTrainerDialog: null,
        onInit: function () {},

        onPressTrainer: function (oEvent) {
            const oContext = oEvent.getSource().getBindingContext(),
                sTrainerId = oContext.getProperty("ID"); 

            this.getAppViewModel().setProperty("/layout", "TwoColumnsMidExpanded");
            this.getRouter().navTo("RouteTeams", {
                trainerId: sTrainerId
            });
        },

        
        onAddTrainer: function () {
    
            if (this._oAddTrainerDialog) {
                this._oAddTrainerDialog.open();
                return;
            }
            
            sap.ui.core.Fragment.load({
                id: this.getView().getId(),
                name: "com.nbx.trainerlist.view.fragment.AddTrainerDialog",
                controller: this
            }).then(function (oDialog) {
                this._oAddTrainerDialog = oDialog;
                this.getView().addDependent(this._oAddTrainerDialog);
                this._oAddTrainerDialog.open();
            }.bind(this));
        },  
        onSaveTrainer: function(){
            const sViewId = this.getView().getId();

            const sFirstName = sap.ui.core.Fragment.byId(sViewId, "inputFirstName").getValue();
            const sLastName  = sap.ui.core.Fragment.byId(sViewId, "inputLastName").getValue();
            const sEmail     = sap.ui.core.Fragment.byId(sViewId, "inputEmail").getValue();
            const oModel = this.getView().getModel();
            const oListBinding = oModel.bindList("/Trainers");

            oListBinding.create({
                FirstName: sFirstName,
                LastName:  sLastName,
                Email:     sEmail
            });
            sap.m.MessageToast.show("Trainer added successfully!");
            this._oAddTrainerDialog.close();

        }
        
        

    });
});