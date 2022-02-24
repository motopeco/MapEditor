<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import EditorCanvas from './components/EditorCanvas.vue'
import MassSelector from './components/MassSelector.vue'
import JsonView from './components/JsonView.vue'
import MassTable from './components/MassTable.vue'
</script>

<template>
  <el-row>
    <el-col :span="24">
      <MassSelector></MassSelector>
    </el-col>
    <el-col :span="15">
      <EditorCanvas></EditorCanvas>
    </el-col>
    <el-col :span="9">
      <MassTable></MassTable>
    </el-col>
    <el-col :span="24">
      <JsonView></JsonView>
    </el-col>
  </el-row>
</template>
