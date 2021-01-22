sap.ui.define(['jquery.sap.global', 'sap/tnt/NavigationListItem'], function(jQuery, NavigationListItem) {
  'use strict';

  var XNavigationListItem = NavigationListItem.extend(
    'sap.demo.controls.XNavigationListItem',
    /** @lends sap.tnt.NavigationListItem.prototype */
    {
      getAllItems: function() {
        var aAllItems;
        if (this.getLevel() === 0) {
          var aItems = this.getAggregation('items') || [];
          aAllItems = aItems.reduce(function(aRes, item) {
            var aSubItems = item.getItems() || [];
            aRes = aRes.concat(aSubItems);
            return aRes;
          }, aItems);
        } else {
          aAllItems = this.getAggregation('items') || [];
        }
        return aAllItems || [];
      },

      /**
       * Gets the tree level of this item.
       * @private
       */
      getLevel: function() {
        var level = 0;
        var parent = this.getParent();
        /* Added while loop instead of if - Musa Arda */
        while (parent && parent.getMetadata().getName() === 'sap.demo.controls.XNavigationListItem') {
          level += 1;
          parent = parent.getParent();
        }
        return level;
      },

      /**
       * Gets the NavigationList control, which holds this item.
       */
      getNavigationList: function() {
        var parent = this.getParent();

        while (
          parent &&
          parent.getMetadata().getName() != 'sap.tnt.NavigationList' &&
          parent.getMetadata().getName() != 'sap.demo.controls.XNavigationList'
        ) {
          parent = parent.getParent();
        }

        return parent;
      },

      /**
       * Renders the item.
       * @private
       */
      render: function(rm, control, index, length) {
        if (!this.getVisible()) {
          return;
        }
        var items = this._getVisibleItems(this);

        if (this.getLevel() === 0) {
          this.renderFirstLevelNavItem(rm, control);
        } else if (this.getLevel() >= 1 && items.length) {
          this.renderNextLevelNavItem(rm, control);
        } else {
          this.renderSecondLevelNavItem(rm, control);
        }
        // this.renderFirstLevelNavItem(rm, control, index, length);
      },

      renderSecondLevelNavItem: function(rm, control) {
        var group = this.getParent();

        rm.openStart('li', this);
        rm.class('sapTntNavLIItem');
        rm.class('sapTntNavLIGroupItem');

        if (!this.getEnabled() || !group.getEnabled()) {
          rm.class('sapTntNavLIItemDisabled');
        } else {
          rm.attr('tabindex', '-1');
        }

        var text = this.getText();

        var tooltip = this.getTooltip_AsString() || text;
        if (tooltip) {
          rm.attr('title', tooltip);
        }

        // ARIA
        rm.accessibilityState({
          role: control.hasStyleClass('sapTntNavLIPopup') ? 'menuitem' : 'treeitem',
          level: '2',
        });

        var indentValue = this.getLevel() * 0.75;
        rm.style('padding-left', indentValue + 'rem');

        rm.openEnd();

        this._renderText(rm);

        rm.close('li');
      },
      /**
       * Renders the first-level navigation item. - Standard
       * Renders all levels - Musa Arda
       * @private
       */
      renderNextLevelNavItem: function(rm, control) {
        var item;
        var items = this._getVisibleItems(this);
        var childrenLength = items.length;
        var expanded = this.getExpanded();
        var isListExpanded = control.getExpanded();

        rm.openStart('li', this);

        if (this.getEnabled() && !isListExpanded) {
          rm.attr('tabindex', '-1');
        }

        rm.openEnd();

        this.renderGroupItem(rm, control);

        // If has sub items - Musa Arda -> items.length
        if (isListExpanded && childrenLength > 0) {
          rm.openStart('ul');
          rm.attr('aria-hidden', 'true');

          rm.attr('role', 'group');
          rm.class('sapTntNavLIGroupItems');
          if (!expanded) {
            rm.class('sapTntNavLIHiddenGroupItems');
          }

          rm.openEnd();

          for (var i = 0; i < childrenLength; i++) {
            item = items[i];
            item.render(rm, control, i, childrenLength);
          }

          rm.close('ul');
        }
        rm.close('li');
      },

      /**
       * Selects this item.
       * @private
       */
      _select: function() {
        var $this = this.$();
        var navList = this.getNavigationList();
        if (!navList) {
          return;
        }

        // Removed - Musa Arda
        //$this.addClass('sapTntNavLIItemSelected');

        // Check subItems to add 'sapTntNavLIItemSelected' - Musa Arda
        var subItems = this.getItems();
        if (!(subItems.length > 0)) {
          $this.addClass('sapTntNavLIItemSelected');
        } else {
          $this.addClass('customNavigationGroupSelected');
        }
        if (navList.getExpanded()) {
          if (this.getLevel() === 0) {
            $this = $this.find('.sapTntNavLIGroup');
          }
          $this.attr('aria-selected', true);
        } else {
          $this.attr('aria-pressed', true);
          navList._closePopover();
        }
      },
      /**
       * Deselects this item.
       * @private
       */
      _unselect: function() {
        var $this = this.$(),
          navList = this.getNavigationList();

        if (!navList) {
          return;
        }
        var subItems = this.getItems();
        if (!(subItems.length > 0)) {
          $this.removeClass('sapTntNavLIItemSelected');
        } else {
          $this.removeClass('customNavigationGroupSelected');
        }
        if (navList.getExpanded()) {
          if (this.getLevel() === 0) {
            $this = $this.find('.sapTntNavLIGroup');
          }

          $this.removeAttr('aria-selected');
        } else {
          $this.removeAttr('aria-pressed');
        }
      },
      /**
       * Expands the child items (works only on first-level items).
       */
      expand: function(duration) {
        if (this.getExpanded() || !this.getHasExpander() || this.getItems().length == 0) {
          return;
        }
        this.setProperty('expanded', true, true);
        this.$().attr('aria-expanded', true);
        var expandIconControl = this._getExpandIconControl();
        expandIconControl.setSrc(NavigationListItem.collapseIcon);
        expandIconControl.setTooltip(this._getExpandIconTooltip(false));

        /* Replaced this with below code - Musa Arda
        var $container = this.$().find('.sapTntNavLIGroupItems');
        $container.stop(true, true).slideDown(duration || 'fast', function() {
          $container.toggleClass('sapTntNavLIHiddenGroupItems');
        });
        */
        /* Check Sub Items - Musa Arda */
        var $firstULContainer = this.$()
          .children('ul')
          .first();
        $firstULContainer.toggleClass('sapTntNavLIHiddenGroupItems');

        this.getNavigationList()._updateNavItems();
        return true;
      },

      /**
       * Collapses the child items (works only on first-level items).
       */
      collapse: function(duration) {
        if (!this.getExpanded() || !this.getHasExpander() || this.getItems().length == 0) {
          return;
        }
        this.setProperty('expanded', false, true);
        this.$().attr('aria-expanded', false);
        var expandIconControl = this._getExpandIconControl();
        expandIconControl.setSrc(NavigationListItem.expandIcon);
        expandIconControl.setTooltip(this._getExpandIconTooltip(true));

        /* Replaced this with below code - Musa Arda
        var $container = this.$().find('.sapTntNavLIGroupItems');
        $container.stop(true, true).slideUp(duration || 'fast', function() {
          $container.toggleClass('sapTntNavLIHiddenGroupItems');
        });
        */
        /* Check Sub Items - Musa Arda */
        var $firstULContainer = this.$()
          .children('ul')
          .first();
        $firstULContainer.toggleClass('sapTntNavLIHiddenGroupItems');

        this.getNavigationList()._updateNavItems();
        return true;
      },

      /**
       * Handles tap event.
       * @private
       */
      ontap: function(event) {
        if (event.isMarked('subItem') || !this.getEnabled()) {
          return;
        }

        event.setMarked('subItem');
        event.preventDefault();

        var navList = this.getNavigationList();
        var source = sap.ui.getCore().byId(event.target.id);
        var level = this.getLevel();

        /* Removed - Musa Arda
        // second navigation level
        if (level == 1) {
          var parent = this.getParent();
          if (this.getEnabled() && parent.getEnabled()) {
            this._selectItem(event);
          }
          return;
        }
        */

        // All navigation levels - Musa Arda
        if (navList.getExpanded() || this.getItems().length == 0) {
          if (!source || source.getMetadata().getName() != 'sap.ui.core.Icon' || !source.$().hasClass('sapTntNavLIExpandIcon')) {
            this._selectItem(event);
            return;
          }
          if (this.getExpanded()) {
            this.collapse();
          } else {
            this.expand();
          }
        } else {
          var list = this.createPopupList();
          navList._openPopover(this, list);
        }
      },

      /**
       * Renders the group item.
       * @private
       */
      renderGroupItem: function(rm, control) {
        var isListExpanded = control.getExpanded(),
          isNavListItemExpanded = this.getExpanded(),
          text = this.getText(),
          tooltip,
          ariaProps = {
            level: '1',
          };

        //checking if there are items level 2 in the NavigationListItem
        //of yes - there is need of aria-expanded property
        if (isListExpanded && this.getItems().length !== 0) {
          ariaProps.expanded = isNavListItemExpanded;
        }

        rm.openStart('div');

        rm.class('sapTntNavLIItem');
        rm.class('sapTntNavLIGroup');

        if (!this.getEnabled()) {
          rm.class('sapTntNavLIItemDisabled');
        } else if (control.getExpanded()) {
          rm.attr('tabindex', '-1');
        }

        if (!isListExpanded || control.hasStyleClass('sapTntNavLIPopup')) {
          tooltip = this.getTooltip_AsString() || text;
          if (tooltip) {
            rm.attr('title', tooltip);
          }

          ariaProps.role = 'menuitem';
          if (!control.hasStyleClass('sapTntNavLIPopup')) {
            ariaProps.haspopup = true;
          }
        } else {
          ariaProps.role = 'treeitem';
        }

        rm.accessibilityState(ariaProps);

        if (control.getExpanded()) {
          tooltip = this.getTooltip_AsString() || text;
          if (tooltip) {
            rm.attr('title', tooltip);
          }
        }

        // Indent - Musa Arda
        var indentValue = this.getLevel() * 0.75;
        rm.style('padding-left', indentValue + 'rem');
        rm.openEnd();

        this._renderIcon(rm);

        if (control.getExpanded()) {
          var expandIconControl = this._getExpandIconControl();
          expandIconControl.setVisible(this.getItems().length > 0 && this.getHasExpander());
          expandIconControl.setSrc(this.getExpanded() ? NavigationListItem.collapseIcon : NavigationListItem.expandIcon);
          expandIconControl.setTooltip(this._getExpandIconTooltip(!this.getExpanded()));

          this._renderText(rm);
          rm.renderControl(expandIconControl);
        }

        rm.close('div');
      },
    }
  );

  return XNavigationListItem;
});
