'use strict';

angular
  .module('agGridCustomFilters.services')
  .service('agCheckboxFilter', ['$filter', function ($filter) {

    var template = [
        '<div class="form">',
          '<div class="checkbox">',
            '<input type="checkbox" class="ag-filter-checkbox" ng-model="selectedAll" ng-change="selectedAllChanged(selectedAll)"/>',
            '<label>',
              '([SELECT ALL])',
            '</label>',
          '</div>',
          '<div ng-repeat="item in items" class="checkbox">',
            '<input type="checkbox" ng-change="valuesChanged()" name="selectedValues[]" value="{{item[idKey]}}" ng-model="item.checked" class="ag-filter-checkbox"/>',
            '<label>',
              '{{item[displayKey]}}',
            '</label>',
          '</div>',
        '</div>',
        '<button type="button" id="applyButton">[APPLY FILTER]</button>'
    ].join('');

    // Class function.
    function CheckboxFilter() { }

    // mandatory methods
    CheckboxFilter.prototype.init = function (params) {
      var that = this;
      this.utils = window.agGrid.Utils;
      this.$scope = params.$scope;
      this.$scope.items = _.cloneDeep(params.values);
      this.$scope.idKey = params.idKey || 'id';
      this.$scope.displayKey = params.displayKey || 'value';

      this.localeTextFunc = params.column.gridOptionsWrapper.getLocaleTextFunc();
      this.$scope.selectedValues = [];
      // this.localeTextFunc = params.localeTextFunc || function(key){return key;};
      this.valueGetter = params.valueGetter;
      this.applyActive = params.filterParams && params.apply === true;
      this.filterChangedCallback = params.filterChangedCallback;
      this.filterModifiedCallback = params.filterModifiedCallback;
      this.filterComparator = params.filterComparator || null;
      this.$scope.selectedAll = true;

      for (var itemIdx in that.$scope.items) {
        var item = that.$scope.items[itemIdx];
        item.checked = true;
      }

      this.$scope.selectedItems = function selectedItems() {
        return $filter('filter')(that.$scope.items, { checked: true });
      };

      this.$scope.valuesChanged = function () {
        that.$scope.selectedValues = $filter('filter')(that.$scope.items, { checked: true }).map(function (item) {
          return item[that.$scope.idKey];
        });

        that.$scope.selectedAll = that.$scope.selectedValues.length === that.$scope.items.length;

        if (!that.applyActive) {
          that.filterChangedCallback();
        }
      };

      this.$scope.selectedAllChanged = function (nv) {
        for (var itemIdx in that.$scope.items) {
          var item = that.$scope.items[itemIdx];
          item.checked = nv;
        }
        that.$scope.valuesChanged();
      };

      this.createGui();
    };

    CheckboxFilter.prototype.afterGuiAttached = function () {
      this.$scope.$apply();
    };

    CheckboxFilter.prototype.getGui = function () {
      return this.eGui;
    };

    CheckboxFilter.prototype.getModel = function () {
      var selectedItems = _.map(this.$scope.selectedItems(), this.$scope.idKey);

      if(selectedItems.length === this.$scope.items.length){
        return undefined;
      }

      return selectedItems;
    };

    CheckboxFilter.prototype.setModel = function (model) {
      for (var itemIdx in this.$scope.items) {
        var item = this.$scope.items[itemIdx];
        item.checked = model.indexOf(item[this.$scope.idKey]) >= 0;
      }

      this.$scope.valuesChanged();
    };

    CheckboxFilter.prototype.isFilterActive = function () {
      return this.$scope.selectedValues.length !== this.$scope.items.length;
    };

    CheckboxFilter.prototype.nativeComparator = function(model, value) {
      if(value === null){
        return true;
      }
      return model.indexOf(value) > -1;
    };

    CheckboxFilter.prototype.doesFilterPass = function(params) {
      var valueGetter = this.valueGetter;
      if(!this.filterComparator){
        return this.nativeComparator(this.getModel(), valueGetter(params.node), params);
      } else {
        return this.filterComparator(this.getModel(), valueGetter(params.node), params);
      }

    };

    // CheckboxFilter.prototype.getApi = function () {
    //   var that = this;
    //   return {
    //     getModel: function () {
    //       if (!that.isFilterActive()) {
    //         return undefined;
    //       }
    //       return that.$scope.selectedValues;
    //     },
    //     setModel: function (model) {
    //       for (itemIdx in that.$scope.items) {
    //         var item = that.$scope.items[itemIdx];
    //         item.checked = model.indexOf(item[that.$scope.idKey]) >= 0;
    //       }

    //       that.$scope.valuesChanged();
    //     }
    //   };
    // };

    CheckboxFilter.prototype.createTemplate = function () {
      return template
        .replace('[SELECT ALL]', this.localeTextFunc('selectAll'))
        .replace('[APPLY FILTER]', this.localeTextFunc('applyFilter'));
    };

    CheckboxFilter.prototype.createGui = function () {
      this.eGui = this.utils.loadTemplate(this.createTemplate());
      this.setupApply();
    };
    CheckboxFilter.prototype.setupApply = function () {
      var _this = this;
      if (this.applyActive) {
        this.eApplyButton = this.eGui.querySelector('#applyButton');
        this.eApplyButton.addEventListener('click', function () {
          _this.filterChangedCallback();
        });
      }
      else {
        _this.utils.removeElement(this.eGui, '#applyButton');
      }
    };

    return CheckboxFilter;

  }]);