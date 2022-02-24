<script lang="ts" setup>
import { useStore } from 'vuex'
import { key, MassData } from '../store'
import { computed, ref, watch } from 'vue'
import { ArrowUpBold, ArrowDownBold, Delete } from '@element-plus/icons-vue'

function getTypeName(type: number) {
  switch (type) {
    case 1:
      return 'Start'
    case 2:
      return 'Goal'
    case 3:
      return 'Lucky'
    case 4:
      return 'UnLucky'
    case 5:
      return 'findWork'
    case 6:
      return 'work'
    case 7:
      return 'marry'
    case 8:
      return 'birth'
    default:
      return '-'
  }
}

const store = useStore(key)
const items = ref<MassData[]>([])

store.subscribe(mutation => {
  if (mutation.type === 'add' || mutation.type === 'update') {
    items.value = store.state.massDatum
  }
})

function up(index: number) {
  const datum = store.state.massDatum
  if (index === 0) return

  const data = datum[index]
  const prevData = datum[index - 1]
  datum.splice(index - 1, 1, data)
  datum.splice(index, 1, prevData)

  store.commit('update', datum)
}

function down(index: number) {
  const datum = store.state.massDatum
  if (index === datum.length - 1) return

  const data = datum[index]
  const nextData = datum[index + 1]
  datum.splice(index + 1, 1, data)
  datum.splice(index, 1, nextData)

  store.commit('update', datum)
}

function remove(index: number) {
  const datum = store.state.massDatum
  datum.splice(index, 1)

  store.commit('update', datum)
}

</script>

<template>
  <el-table :data="items" max-height="500">
    <el-table-column label="#" width="80">
      <template #default="scope">{{ scope.$index }}</template>
    </el-table-column>
    <el-table-column prop="type" label="type" width="80">
      <template #default="scope">
        {{ getTypeName(scope.row.type) }}
      </template>
    </el-table-column>
    <el-table-column prop="x" label="x" width="80"></el-table-column>
    <el-table-column prop="y" label="y" width="80"></el-table-column>
    <el-table-column label="アクション">
      <template #default="scope">
        <el-button type="primary" :icon="ArrowUpBold" circle @click="up(scope.$index)"></el-button>
        <el-button type="primary" :icon="ArrowDownBold" circle @click="down(scope.$index)"></el-button>
        <el-button type="warning" :icon="Delete" circle @click="remove(scope.$index)"></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
