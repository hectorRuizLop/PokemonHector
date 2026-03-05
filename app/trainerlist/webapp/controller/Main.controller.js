sap.ui.define([
    "./BaseController"
], function (BaseController) {
    "use strict";
    

    return BaseController.extend("com.nbx.trainerlist.controller.Main", {
        _oAddTrainerDialog: null,
        _oCurrentPokemon: null,
        _oImportDialog: null,

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

            const sFirstName = this.getView().byId( "inputFirstName").getValue();
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

        },
        //The list of pokemon
        onGetPokemons: function () {
            const oModel = this.getView().getModel(); 
            const oFunction = oModel.bindContext("/getPokemons()");

            oFunction.fetch().then(() => {
                const aPokemons = oFunction.getObject().value;  
                
                const oJSONModel = new sap.ui.model.json.JSONModel({ pokemons: aPokemons });
                this.getView().setModel(oJSONModel, "pokemonList");  
                
            });
        },
        //Obtain a random pokemon
        onImportPokemon: function () {
            const oModel = this.getView().getModel();
            const oOperation = oModel.bindContext("/importPokemon(...)");

            oOperation.execute().then(function(){
                this._oCurrentPokemon = oOperation.getBoundContext().getObject();
                this._openImportDialog();
            }.bind(this));
        },
        //Recycle this window once open
        _openImportDialog: function () {
            //The window exist
            if (this._oImportDialog) {
                this._fillPokemonData();
                this._oImportDialog.open();
                return;
            }
            //The window don't exist
            sap.ui.core.Fragment.load({
                //Same id as the main window to find the controller
                id: this.getView().getId(),
                //Load the xml
                name : "com.nbx.trainerlist.view.fragment.ImportPokemonDialog",
                //Connect the button
                controller: this
            }).then((oDialog) => {
                //Save this window for the next itime
                this._oImportDialog = oDialog;
                //Register the windows in the main window to ui5 work
                this.getView().addDependent(oDialog);
                //Put the data of the pokemon in this window
                this._fillPokemonData();
                //Open the window
                oDialog.open();
            });
        },

        _fillPokemonData: function () {
            const sViewId = this.getView().getId();
            const p = this._oCurrentPokemon;
            sap.ui.core.Fragment.byId(sViewId, "txtPokemonName").setText(p.name);
            sap.ui.core.Fragment.byId(sViewId, "txtPokemonHeight").setText(`${p.height} dm`);
            sap.ui.core.Fragment.byId(sViewId, "txtPokemonWeight").setText(`${p.weight} hg`);
        },
        onConfirmCapture: function () {
            const oModel = this.getView().getModel();
            const sViewId = this.getView().getId();
            
            const oSelect = sap.ui.core.Fragment.byId(sViewId, "selectTeam");
            //Obtain the id of the team in the select
           const sTeamId = oSelect.getSelectedKey();
            //Prepare the data
            const p = this._oCurrentPokemon;
            const oCaptureBinding = oModel.bindList("/Captures");
            //Create the register in odta
            const oCreated = oCaptureBinding.create({
                PokemonName: p.name,
                Height:      p.height,
                Weight:      p.weight,
                team_ID:     sTeamId
            });
            oCreated.created().then(function() {
                this._oImportDialog.close();
                oModel.refresh();
            }.bind(this));
        }
    });   
});