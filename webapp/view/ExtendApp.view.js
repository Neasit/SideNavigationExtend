sap.ui.jsview("sap.demo.view.ExtendApp", {

	getControllerName: function() {
		return "sap.demo.controller.ExtendApp";
	},

	createContent: function(oController) {

		/* SideNavigation */
		var oSideNavigation = new sap.tnt.SideNavigation("sideNavigation");
		/* NavigationList */
		var oNavigationList = new sap.tnt.NavigationList("oNavigationList");

		/* NavigationListItem Level 0 */
		for (var i = 0; i <= 4; i++) {
			var oNavigationListItem = new sap.demo.controls.XNavigationListItem("", {
				text: "Level 0 - Item " + i,
				icon: "sap-icon://globe",
				expanded: true
			});

			/* NavigationListItem Level 1 */
			for (var j = 0; j <= 2; j++) {
				var oNavigationListItemSub = new sap.demo.controls.XNavigationListItem("", {
					text: "Level 1 - Item " + j,
					icon: "sap-icon://dimension",
					expanded: false
				});

				/* NavigationListItem Level 2 */
				for (var k = 0; k <= 2; k++) {
					var oNavigationListItemSub2 = new sap.demo.controls.XNavigationListItem("", {
						text: "Level 2 - Item " + k,
						icon: "sap-icon://paper-plane",
						expanded: false
					});
					
					/* NavigationListItem Level 3 */
					for (var l = 0; l <= 2; l++) {
						var oNavigationListItemSub3 = new sap.demo.controls.XNavigationListItem("", {
							text: "Level 3 - Item " + l,
							icon: "sap-icon://map",
							expanded: false
						});
						oNavigationListItemSub2.addItem(oNavigationListItemSub3);
					}
					
					oNavigationListItemSub.addItem(oNavigationListItemSub2);
				}

				oNavigationListItem.addItem(oNavigationListItemSub);
			}

			oNavigationList.addItem(oNavigationListItem);
		}

		oSideNavigation.setItem(oNavigationList);
		oSideNavigation.addStyleClass("fullHeight");

		var oPage = new sap.m.Page({
			title: "Extend App",
			content: [
				oSideNavigation
			]
		});

		var app = new sap.m.App("myApp", {
			initialPage: "oPage"
		});
		app.addPage(oPage);
		return app;
	}
});