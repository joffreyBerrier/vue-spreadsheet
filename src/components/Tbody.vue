<template>
  <tbody>
    <template v-for="(row, rowIndex) in rowData">
      <tr class="row" :key="row + '' + rowIndex">
        <template v-for="(col, name, index) in row">
          <td
            class="td"
            :id="name"
            @dblclick="showInput($event)"
            @click="addClassActive"
            :data-index="index"
            :key="name"
            >
            <!-- If Img -->
            <template v-if="col.type === 'img'">
              <img :src="col.value" />
            </template>

            <!-- If Input -->
            <template v-if="col.type === 'input'">
              <span>{{col.value}}</span>
              <input type="text" v-model="col.value" />
            </template>

            <!-- If Select -->
            <template v-if="col.type === 'select'">
              <select
                v-model="col.selectedOptions"
                @change="selectChange(rowIndex, index)">
                <option
                  v-for="(val, index) in col.value"
                  :value="val"
                  :key="index">
                    {{val}}
                </option>
              </select>
            </template>
          </td>
        </template>
      </tr>
    </template>
  </tbody>
</template>

<script type="text/javascript">
export default {
  name: 'vue-tbody',
  props: {
    rowData: Array,
  },
  data() {
    return {
      activElement: '',
    };
  },
  mounted() {
    window.addEventListener('keyup', this.moveKeydown);
  },
  methods: {
    selectChange(rowIndex, colIndex) {
      const activeElement = Object.values(this.rowData[rowIndex])[colIndex];
      const nextElement = Object.values(this.rowData[rowIndex])[colIndex + 1];
      const prevElement = Object.values(this.rowData[rowIndex])[colIndex - 1];

      const actualYear = new Date().getFullYear();
      if (nextElement && nextElement.selectedOptions) {
        nextElement.selectedOptions = actualYear - activeElement.selectedOptions;
      }
      if (prevElement && prevElement.selectedOptions) {
        prevElement.selectedOptions = actualYear - activeElement.selectedOptions;
      }
    },
    showInput(event) {
      if (this.activElement !== '') {
        this.activElement.classList.remove('show');
      }
      this.activElement = event.currentTarget;
      this.activElement.classList.add('show');
      this.activElement.lastElementChild.focus();
    },
    addClassActive(event) {
      document.querySelectorAll('.active_td').forEach((activeElement) => {
        activeElement.classList.remove('active_td');
      });
      event.currentTarget.classList.add('active_td');
    },
    moveKeydown(event) {
      const actualElement = document.getElementsByClassName('active_td')[0];
      if (actualElement) {
        if (event.keyCode === 37 ||
            event.keyCode === 39 ||
            event.keyCode === 40 ||
            event.keyCode === 38) {
          // remove active class / blur
          actualElement.lastElementChild.blur();
          actualElement.classList.remove('active_td');
          const index = actualElement.getAttribute('data-index');
          // right
          if (event.keyCode === 39) {
            if (!actualElement.nextElementSibling) {
              actualElement.parentElement.firstElementChild.classList.add('active_td');
            } else {
              actualElement.nextElementSibling.classList.add('active_td');
            }
          }
          // left
          if (event.keyCode === 37) {
            if (!actualElement.previousElementSibling) {
              actualElement.parentElement.lastElementChild.classList.add('active_td');
            } else {
              actualElement.previousElementSibling.classList.add('active_td');
            }
          }
          // bottom
          if (event.keyCode === 40) {
            if (!actualElement.parentElement.nextElementSibling) {
              actualElement.parentElement.parentElement.firstElementChild.childNodes[index].classList.add('active_td');
            } else {
              actualElement.parentElement.nextElementSibling.childNodes[index].classList.add('active_td');
            }
          }
          // top
          if (event.keyCode === 38) {
            if (!actualElement.parentElement.previousElementSibling) {
              actualElement.parentElement.parentElement.lastElementChild.childNodes[index].classList.add('active_td');
            } else {
              actualElement.parentElement.previousElementSibling.childNodes[index].classList.add('active_td');
            }
          }
        }
        if (event.keyCode === 13) {
          actualElement.classList.add('show');
          actualElement.lastElementChild.focus();
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.td {
  width: 120px;
  height: 40px;
  line-height: 40px;
  position: relative;
  background: white;
  border: 1px solid #dadada;
  padding: 0;
  text-align: left;
  box-sizing: border-box;
  transition: all ease 0.5s;
  &:last-child {
    border-right: 1px solid #dadada;
  }
  &.active_td {
    border-color: #17233d;
  }
  select {
    display: block;
    width: 100%;
    height: 100%;
  }
  input,
  span {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    background: white;
    text-align: left;
    padding: 2px 5px;
    line-height: 40px;
    box-sizing: border-box;
    outline: none;
    border: 0;
  }
  input,
  select {
    z-index: 5;
  }
  span {
    z-index: 10;
  }
  img {
    width: auto;
    height: 100%;
    display: block;
    margin: auto;
  }
}
.show input,
.show select {
  z-index: 11;
}
</style>
