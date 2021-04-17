// eslint-disable-next-line import/prefer-default-export
export const callback = {
  methods: {
    callbackCheckedAll(isChecked) {
      this.$emit("tbody-all-checked-row", isChecked);

      if (this.customOptions.tbodyCheckbox) {
        this.value.forEach((data) => {
          this.$set(data, "vuetable_checked", isChecked);
        });
      }
    },
    callbackSort(event, header, colIndex) {
      this.$emit("thead-td-sort", event, header, colIndex);
    },
    callbackSubmenuThead(event, header, colIndex, submenuFunction, selectOptions) {
      this.submenuStatusThead = false;

      if (selectOptions) {
        this.$emit(
          `thead-submenu-click-${submenuFunction}`,
          event,
          header,
          colIndex,
          selectOptions
        );
      } else {
        this.$emit(`thead-submenu-click-${submenuFunction}`, event, header, colIndex);
      }
    },
    callbackSubmenuTbody(event, header, rowIndex, colIndex, type, submenuFunction) {
      this.calculPosition(event, rowIndex, colIndex, "submenu");
      this.$emit(
        `tbody-submenu-click-${submenuFunction}`,
        event,
        header,
        rowIndex,
        colIndex,
        type,
        submenuFunction
      );
    },
  },
};
