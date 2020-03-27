// eslint-disable-next-line import/prefer-default-export
export const scrollOnTable = {
  data() {
    return {
      headerTop: 0,
      lastSubmenuOpen: null,
    };
  },
  mounted() {
    document.addEventListener("scroll", (event) => {
      this.scrollTopDocument(event);
    });
  },
  methods: {
    scrollFunction(event) {
      this.affixHeader(event, "vueTable");

      if (this.lastSelectOpen) {
        this.calculPosition(
          this.lastSelectOpen.event,
          this.lastSelectOpen.rowIndex,
          this.lastSelectOpen.colIndex,
          "dropdown"
        );
      } else if (this.lastSubmenuOpen) {
        this.calculPosition(
          this.lastSubmenuOpen.event,
          this.lastSubmenuOpen.rowIndex,
          this.lastSubmenuOpen.colIndex,
          "contextMenu"
        );
      }
    },
    scrollTopDocument(event) {
      this.affixHeader(event, "document");

      if (this.lastSelectOpen) {
        this.calculPosition(
          event,
          this.lastSelectOpen.rowIndex,
          this.lastSelectOpen.colIndex,
          "dropdown"
        );
      } else if (this.lastSubmenuOpen) {
        this.calculPosition(
          event,
          this.lastSubmenuOpen.rowIndex,
          this.lastSubmenuOpen.colIndex,
          "contextMenu"
        );
      }
    },
    affixHeader(offset, target) {
      if (
        this.$refs &&
        this.$refs[`${this.customTable}-table`] &&
        this.$refs[`${this.customTable}-table`].offsetTop
      ) {
        this.scrollDocument = document.querySelector(
          `${this.parentScrollElement.attribute}`
        ).scrollTop;
        const offsetTopVueTable = this.$refs[`${this.customTable}-table`].offsetTop;
        const scrollOnDocument = this.scrollDocument || target === "document";
        const offsetEl = scrollOnDocument ? this.scrollDocument : offset.target.scrollTop;

        if (offsetEl > offsetTopVueTable) {
          this.headerTop = scrollOnDocument ? offsetEl - offsetTopVueTable : offsetEl - 18;
        } else {
          this.headerTop = 0;
        }
      }
    },
  },
};
