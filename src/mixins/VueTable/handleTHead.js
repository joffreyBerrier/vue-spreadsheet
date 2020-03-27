// eslint-disable-next-line import/prefer-default-export
export const handleTHead = {
  methods: {
    handleUpDragSizeHeader(event, headers) {
      this.$emit("handle-up-drag-size-header", event, headers);
    },
    handleTheadContextMenu() {
      this.submenuStatusTbody = false;
    },
  },
};
