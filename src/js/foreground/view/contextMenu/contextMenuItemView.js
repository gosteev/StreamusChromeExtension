﻿define(function(require) {
    'use strict';

    var Tooltipable = require('foreground/view/behavior/tooltipable');
    var ContextMenuItemTemplate = require('text!template/contextMenu/contextMenuItem.html');

    var ContextMenuItemView = Marionette.ItemView.extend({
        tagName: 'li',
        className: function() {
            var className = 'listItem listItem--small listItem--clickable';
            className += this.model.get('disabled') ? ' is-disabled' : '';
            return className;
        },
        template: _.template(ContextMenuItemTemplate),

        events: {
            'click': '_onClick'
        },

        attributes: function() {
            return {
                'data-ui': 'tooltipable',
                'data-tooltip-text': this.model.get('title')
            };
        },

        behaviors: {
            Tooltipable: {
                behaviorClass: Tooltipable
            }
        },

        _onClick: function() {
            var enabled = !this.model.get('disabled');

            if (enabled) {
                this.model.get('onClick')();
            }

            //  Return false to prevent the view from closing which emulates how native, disabled contextMenu views work when clicked.
            return enabled;
        }
    });

    return ContextMenuItemView;
});