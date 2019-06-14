<template>
  <div
    ref="vueTable"
    :style="styleWrapVueTable"
    @scroll="scrollFunction">

    <slot name="header">
    </slot>

    <table class="vue_table" oncontextmenu="return false;" ref="table">
      <VueThead
        ref="vueThead"
        :disable-sort-thead="disableSortThead"
        :header-top="headerTop"
        :headers="headers"
        :thead-highlight="highlight.thead"
        :sort-header="customOptions.sortHeader"
        :submenu-status-thead="submenuStatusThead"
        :submenu-thead="submenuThead"
        :tbody-index="customOptions.tbodyIndex"
        @handle-up-drag-size-header="handleUpDragSizeHeader"
        @handle-up-drag-to-fill="handleUpDragToFill"
        @submenu-enable="enableSubmenu"
        @thead-submenu-click-callback="callbackSubmenuThead"
        @thead-td-context-menu="handleTheadContextMenu"
        @thead-td-sort="callbackSort">
      </VueThead>

      <slot name="loader" v-if="loading">
      </slot>

      <VueTbody v-if="!loading"
        ref="vueTbody"
        :disable-cells="disableCells"
        :filtered-list="filteredList"
        :headers="headers"
        :tbody-highlight="highlight.tbody"
        :submenu-status-tbody="submenuStatusTbody"
        :submenu-tbody="submenuTbody"
        :tbody-data="tbodyData"
        :tbody-index="customOptions.tbodyIndex"
        :trad="customOptions.trad"
        @handle-to-calculate-position="calculPosition"
        @handle-to-open-select="enableSelect"
        @submenu-enable="enableSubmenu"
        @tbody-down-dragtofill="handleDownDragToFill"
        @tbody-handle-search-input-select="handleSearchInputSelect"
        @tbody-handle-set-oldvalue="setOldValueOnInputSelect"
        @tbody-input-change="handleTbodyInputChange"
        @tbody-move-dragtofill="handleMoveDragToFill"
        @tbody-select-change="handleTbodySelectChange"
        @tbody-select-multiple-cell="handleSelectMultipleCell"
        @tbody-submenu-click-callback="callbackSubmenuTbody"
        @tbody-td-click="handleTbodyTdClick"
        @tbody-td-context-menu="handleTBodyContextMenu"
        @tbody-td-double-click="handleTbodyTdDoubleClick"
        @tbody-up-dragtofill="handleUpDragToFill">
      </VueTbody>
    </table>
  </div>
</template>

<script src="./VueTable.ts"></script>

<style lang="scss">
  :root {
    // select style
    --selectLeft: 0;
    --selectTop: 0;
    --selectWidth: 0;

    // bg of comment triangle
    --borderCommentColor: #696969;
    --borderCommentSize: 8px;
    --boxCommentWidth: 120px;
    --BoxCommentHeight: 80px;

    // rectangle style
    --rectangleBottom: 0;
    --rectangleHeight: 40px;
    --rectangleLeft: 0;
    --rectangleRight: 0;
    --rectangleTop: 0;
    --rectangleWidth: 100%;

    // drag Header
    --dragHeaderHeight: 100%;
  }

  table{
    table-layout: fixed;
    margin: 0;
    border-collapse: collapse;
    border-spacing: 0;
    th {
      color: #000;
      font-weight: normal;
    }
    td, th {
      margin: 0;
    }
  }
</style>
