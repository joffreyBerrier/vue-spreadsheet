<template>
  <tbody>
    <template v-for="(row, rowIndex) in tbodyData">
      <tr
        class="table_row"
        :key="`row${rowIndex}`"
        :class="{
          checked_row:
            'vuetable_checked' in tbodyData[rowIndex] &&
            tbodyData[rowIndex].vuetable_checked === true,
        }"
      >
        <td
          v-if="tbodyCheckbox && 'vuetable_checked' in tbodyData[rowIndex]"
          :class="{ highlight_spreadsheet: tbodyHighlight.includes(rowIndex) }"
          :key="`checkbox-${currentTable}-${rowIndex}`"
          class="vs_checkbox index"
        >
          <input
            type="checkbox"
            :id="`checkbox-${currentTable}-${rowIndex}`"
            @change="checkedRow(tbodyData[rowIndex])"
            v-model="tbodyData[rowIndex].vuetable_checked"
          />
          <label :for="`checkbox-${currentTable}-${rowIndex}`"></label>
        </td>

        <td
          v-if="tbodyIndex"
          class="index"
          :class="{ highlight_spreadsheet: tbodyHighlight.includes(rowIndex) }"
          :key="`td-${currentTable}-index-${rowIndex}`"
        >
          {{ rowIndex + 1 }}
        </td>

        <template v-for="(header, colIndex) in headerKeys">
          <td
            v-if="row[header]"
            class="td"
            :data-header="header"
            :data-col-index="colIndex"
            :data-row-index="rowIndex"
            :data-type="row[header].type"
            @mouseover.stop="handleHoverTooltip(header, rowIndex, colIndex, row[header].type)"
            @mouseout.stop="handleOutTooltip"
            @click.shift.exact="
              handleSelectMultipleCell($event, header, rowIndex, colIndex, row[header].type)
            "
            @contextmenu="handleContextMenuTd($event, header, rowIndex, colIndex, row[header].type)"
            @click.exact="
              handleClickTd($event, row[header], header, rowIndex, colIndex, row[header].type)
            "
            @dblclick="
              handleDoubleClickTd($event, header, row[header], rowIndex, colIndex, row[header].type)
            "
            @mousemove="handleMoveDragToFill($event, header, row[header], rowIndex, colIndex)"
            @mouseup="
              handleUpDragToFill($event, header, row[header], rowIndex, colIndex, row[header].type)
            "
            :class="{
              active_td: row[header].active,
              show: row[header].show,
              selected: row[header].selected,
              copy: row[header].stateCopy,
              disabled: row[header].disabled || disableCells.find((x) => x === header),
              rectangleSelection: row[header].rectangleSelection,
            }"
            :current-table="currentTable"
            :ref="`td-${currentTable}-${colIndex}-${rowIndex}`"
            :key="header"
            :style="row[header].style"
          >
            <transition name="transitionTooltip">
              <div
                class="vuetable_tooltip"
                v-if="
                  row[header].value !== '' &&
                  !row[header].search &&
                  !row[header].active &&
                  row[header].type !== 'img' &&
                  !row[header].selected &&
                  vuetableTooltip[rowIndex] === header
                "
              >
                {{ row[header].value }}
              </div>
            </transition>

            <span
              class="vuetable_triange"
              :style="[
                row[header].comment.borderColor
                  ? { borderTopColor: row[header].comment.borderColor }
                  : {},
              ]"
              v-if="row[header].value !== '' && !row[header].search && row[header].comment"
              @mouseover.stop="handleHoverTriangleComment(header, rowIndex)"
              @mouseout.stop="handleOutTriangleComment"
            >
              <transition name="transitionComment">
                <div
                  class="vuetable_triange_comment"
                  v-if="vueTableComment[rowIndex] === header && row[header].comment.value"
                  @mouseout.stop="handleOutTriangleComment"
                >
                  {{ row[header].comment.value }}
                </div>
              </transition>
            </span>

            <button
              class="drag_to_fill"
              @mousedown="handleDownDragToFill($event, header, row[header], rowIndex, colIndex)"
              @mouseup="
                handleUpDragToFill(
                  $event,
                  header,
                  row[header],
                  rowIndex,
                  colIndex,
                  row[header].type
                )
              "
            ></button>

            <div class="submenu" :ref="`contextMenu-${currentTable}-${colIndex}-${rowIndex}`">
              <div
                class="submenu_wrap"
                v-if="
                  submenuTbody &&
                  submenuStatusTbody &&
                  rowIndex === submenuEnableRow &&
                  colIndex === submenuEnableCol &&
                  submenuTbody.find((sub) => sub.disabled.includes(header) == 0)
                "
              >
                <template v-for="(submenu, index) in submenuTbody">
                  <template v-if="submenu.type === 'button'">
                    <button
                      v-if="submenu.disabled.includes(header) == 0"
                      :key="index"
                      @click.stop="
                        handleClickSubmenu(
                          $event,
                          header,
                          rowIndex,
                          colIndex,
                          row[header].type,
                          submenu.function
                        )
                      "
                    >
                      {{ submenu.value }}
                    </button>
                  </template>
                </template>
              </div>
            </div>

            <!-- If Img -->
            <template v-if="row[header].type === 'img'">
              <span>
                <img :src="row[header].value" :title="row[header].value" />
              </span>
            </template>

            <!-- If Input -->
            <template v-if="row[header].type === 'input'">
              <span :ref="`span-${currentTable}-${colIndex}-${rowIndex}`">
                {{ row[header].value }}
              </span>
              <textarea
                v-model="row[header].value"
                @keydown="inputHandleKeydow($event, header, rowIndex, colIndex)"
                @change="inputHandleChange($event, header, rowIndex, colIndex)"
                @keyup.esc="escKeyup(row[header], rowIndex, header, colIndex, row[header].type)"
                :ref="`textarea-${currentTable}-${colIndex}-${rowIndex}`"
              >
              </textarea>
            </template>

            <!-- If Select -->
            <v-select
              :ref="`vsSelect-${currentTable}-${colIndex}-${rowIndex}`"
              :colIndex="colIndex"
              :currentTable="currentTable"
              :disabledEvent="disabledEvent"
              :filteredList="filteredList"
              :header="header"
              :row="row"
              :rowIndex="rowIndex"
              :trad="trad"
              @tbody-handle-to-open-select="tbodyOpenSelect"
              @tbody-handle-select-change="tbodySelectChange"
              @tbody-handle-search-input-select="tbodySearchInputSelect"
            />
          </td>
        </template>
      </tr>
    </template>
  </tbody>
</template>

<script type="text/javascript" src="./TBody.js"></script>

<style lang="scss" src="./TBody.scss"></style>
