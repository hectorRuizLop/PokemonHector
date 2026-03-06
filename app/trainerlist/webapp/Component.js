sap.ui.define([
    "sap/ui/core/UIComponent",
    "com/nbx/trainerlist/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("com.nbx.trainerlist.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            UIComponent.prototype.init.apply(this, arguments);
            this.setModel(models.createDeviceModel(), "device");
            this.getRouter().initialize();
            //Load the permissions
            this._loadUserConfig();
        },
        _loadUserConfig() {
            const oODataModel = this.getModel(); 
            const oUserConfigModel = this.getModel("userConfig"); 
            const oOperation = oODataModel.bindContext("/getUserConfig(...)");

            oOperation.execute().then(() => {
                const oConfig = oOperation.getBoundContext().getObject();

                oUserConfigModel.setData({
                    roleName:   oConfig.roleName,
                    canCreate:  oConfig.canCreate,
                    canRead:    oConfig.canRead,
                    canUpdate:  oConfig.canUpdate,
                    canDelete:  oConfig.canDelete,
                    canCapture: oConfig.canCapture,
                    canSeeAll:  oConfig.canSeeAll
                });

            })
        }
    });
});