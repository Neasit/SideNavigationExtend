sap.ui.define(
  ['sap/tnt/NavigationListRenderer'],
  function(NavigationListRenderer) {
    'use strict';

    var XNavigationListRenderer = {};

    /**
     * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
     *
     * @param {sap.ui.core.RenderManager} rm The RenderManager that can be used for writing to the renderer output buffer
     * @param {sap.ui.core.Control} control An object representation of the control that should be rendered
     */
    XNavigationListRenderer.render = function(rm, control) {
      NavigationListRenderer.render.apply(this, [rm, control]);
    };

    return XNavigationListRenderer;
  },
  /* bExport= */ true
);
