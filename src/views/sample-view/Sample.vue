<template>
  <div class="sample">
    <h1>{{info}}</h1>
  </div>
</template>

<script lang="ts">
import { onMounted, toRefs, reactive } from '@vue/composition-api';
import store from '@/store';

export default {
  setup() {
    onMounted(() => {
      store.dispatch('global/setContainer', 'test');
      store.dispatch('global/setRefreshTime', 15);
      store.dispatch('global/setIsDiagramView', false);

      store.dispatch('kube/getContainer');
    });
    const state = reactive({
      info: 'sample page!!',
    });
    return {
      ...toRefs(state),
    };
  },
};

</script>
