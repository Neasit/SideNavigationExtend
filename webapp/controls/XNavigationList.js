sap.ui.define(['jquery.sap.global', 'sap/tnt/NavigationList'], function(jQuery, NavigationList) {
  'use strict';

  var XNavigationList = NavigationList.extend(
    'sap.demo.controls.XNavigationList',
    /** @lends sap.tnt.NavigationList.prototype */
    {
      _findItemByKey: function(selectedKey) {
        var groupItems = this.getItems(),
          groupItem,
          items,
          item,
          i,
          j;

        for (i = 0; i < groupItems.length; i++) {
          groupItem = groupItems[i];
          if (groupItem._getUniqueKey() === selectedKey) {
            return groupItem;
          }

          items = groupItem.getAllItems();

          for (j = 0; j < items.length; j++) {
            item = items[j];
            if (item._getUniqueKey() === selectedKey) {
              return item;
            }
          }
        }

        return null;
      },
    }
  );

  return XNavigationList;
});
