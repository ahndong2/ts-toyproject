<template>
  <div>
    chart
  </div>
</template>

<script lang="ts">
import {
  defineComponent, getCurrentInstance, ComponentRenderProxy,
  reactive, toRefs,
} from '@vue/composition-api';

export default defineComponent({
  name: 'Chart',
  components: {
  },
  setup() {
    const vm = getCurrentInstance() as ComponentRenderProxy;

    // state
    const state = reactive({
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style>
</style>
