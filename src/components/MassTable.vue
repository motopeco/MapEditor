<script lang="ts" setup>
import { useStore } from 'vuex'
import { key, MassData } from '../store'
import { ref } from 'vue'
import { ArrowUpBold, ArrowDownBold, Delete } from '@element-plus/icons-vue'
import { getTypeName } from '../libs/common'
import { up , down, remove} from '../libs/tableUtil'

const store = useStore(key)
const items = ref<MassData[]>([])

store.subscribe(mutation => {
  if (mutation.type === 'add' || mutation.type === 'update') {
    items.value = store.state.massDatum
  }
})

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
