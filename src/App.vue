<template>
  <div id="app">
    <GNB :ns="ns" :namespace-list="namespaceList"
         :refresh-time="refreshTime"
         @change="changeEvent"
         @refresh="refreshEvent"
    />
    <div class="dashboard">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import {
  getCurrentInstance, defineComponent, computed, watch,
  reactive, toRefs, onMounted, ComponentRenderProxy,
} from '@vue/composition-api';
import GNB from '@/components/modules/gnb/GNB.vue';
import store from '@/store';
import { nsListSchedule } from '@/utils/schedule';

export default defineComponent({
  name: 'App',
  components: {
    GNB,
  },
  setup() {
    const vm = getCurrentInstance() as ComponentRenderProxy;

    // state
    const state = reactive({
      viewType: computed(() => vm.$store.state.global.viewType),
      ns: computed(() => vm.$store.state.global.NS),
      namespaceList: computed(() => vm.$store.state.global.NSList),
      refreshTime: computed(() => vm.$store.state.global.refreshTime),
    });

    watch(() => state.refreshTime, (newValue) => {
      nsListSchedule(state.ns, newValue);
    });

    onMounted(async () => {
      if (state.viewType === 'graph') {
        await vm.$store.dispatch('global/getNSList');
        await vm.$store.dispatch('kube/getContainer', state.ns);
        nsListSchedule(state.ns, state.refreshTime);
      }
    });

    // GNB NameSpace Change
    const changeEvent = (type:number, value: string) => {
      // type -> 0: NS , 1: refreshTime
      switch (type) {
        case 1:
          vm.$store.dispatch('global/setRefreshTime', value);
          break;

        default: // 0
          vm.$store.dispatch('global/setNS', value);
          break;
      }
    };
    const refreshEvent = async () => {
      await store.dispatch('kube/getContainer', state.ns);
    };
    return {
      ...toRefs(state),
      changeEvent,
      refreshEvent,
    };
  },
});
</script>

<style>
#app {
  overflow-y: hidden;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
}
.dashboard {
  overflow: hidden;
  width: 100%;
  height: calc(100vh - 4rem);
  margin-top: 4rem;
  background-color: #f2f2f2;
}
</style>
