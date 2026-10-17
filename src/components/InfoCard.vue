<script lang="ts" setup>
export interface InfoCardProps {
  title?: string;
  headerBgColor: string;
}

const props = defineProps<InfoCardProps>();
</script>

<template>
  <div class="card info-card mb-4 mt-4">
    <div class="card-header" :style="{ backgroundColor: headerBgColor }">
      <strong>{{ props.title ?? "Info" }}</strong>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.info-card {
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
}
</style>
