<template>
  <div class="progress">
    <div
      class="progress-bar bg-dark"
      role="progressbar"
      v-bind:style="{ width: percentage + '%' }"
      aria-valuenow="25"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      {{ percentage }}%
    </div>
  </div>
</template>

<script>
export default {
  name: "progress-bar",
  props: ["percentage"]
};
</script>
