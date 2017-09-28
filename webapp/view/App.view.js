sap.ui.jsview("sap.demo.view.App", {

	getControllerName: function() {
		return "sap.demo.controller.App";
	},

	createContent: function(oController) {

		/* SideNavigation */
		var oSideNavigation = new sap.tnt.SideNavigation("sideNavigation");
		/* NavigationList */
		var oNavigationList = new sap.tnt.NavigationList("oNavigationList");

		/* NavigationListItem Level 0 */
		for (var i = 0; i <= 4; i++) {
			var oNavigationListItem = new sap.tnt.NavigationListItem("", {
				text: "Level 0 - Item " + i,
				icon: "sap-icon://globe",
				expanded: true
			});

			/* NavigationListItem Level 1 */
			for (var j = 0; j <= 2; j++) {
				var oNavigationListItemSub = new sap.tnt.NavigationListItem("", {
					text: "Level 1 - Item " + j,
					icon: "sap-icon://dimension",
					expanded: true
				});

				/* NavigationListItem Level 2 */
				for (var k = 0; k <= 2; k++) {
					var oNavigationListItemSub2 = new sap.tnt.NavigationListItem("", {
						text: "Level 2 - Item " + j,
						icon: "sap-icon://paper-plane",
						expanded: true
					});
					oNavigationListItemSub.addItem(oNavigationListItemSub2);
				}

				oNavigationListItem.addItem(oNavigationListItemSub);
			}

			oNavigationList.addItem(oNavigationListItem);
		}

		oSideNavigation.setItem(oNavigationList);
		oSideNavigation.addStyleClass("fullHeight");

		var oPage = new sap.m.Page({
			title: "{i18n>title}",
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