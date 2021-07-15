<template>
  <div class="cytoscape">
    <div id="cy" ref="cyElement" />
    <info-box v-if="infoBoxData" :info-box-data="infoBoxData" />
  </div>
</template>

<script lang="ts">
import {
  computed, ComponentRenderProxy, getCurrentInstance,
  onMounted, reactive, ref, toRefs, watch,
} from '@vue/composition-api';
import cytoscape from 'cytoscape';
import store from '@/store';
import InfoBox from '@/components/modules/cytoscape/InfoBox.vue';
import { containerDataFactory } from '@/utils/dataFactory';

interface Container {
  [index: string]: string;
  ingresses?: any;
  services?: any;
  pods?: any;
}

export default {
  name: 'Cytoscape',
  components: {
    InfoBox,
  },
  setup() {
    const vm = getCurrentInstance() as ComponentRenderProxy;
    const checkContainer = (con: Container): number => {
      let count = 0;
      Object.keys(con).forEach((v):void => {
        count += con[v].length;
      });
      return count;
    };
    const data = reactive({
      NS: computed(() => vm.$store.state.global.NS),
      elements: computed(() => {
        const container = vm.$store.state.kube.container;
        if (checkContainer(container) === 0) {
          return null;
        }
        return containerDataFactory(container);
      }),
      infoBoxData: null,
    });

    const cyElement = ref(null);

    const drawGraph = () => {
      if (!data.elements) return;
      const cy = cytoscape({
        container: document.getElementById('cy'),
        wheelSensitivity: 0.1, // 스크롤 확대 축소 비율
        maxZoom: 5, // 최대 확대 비율
        minZoom: 0.2, // 최소 확대 비율
        selectionType: 'single',

        // style
        style: [
          {
            selector: 'node',
            style: {
              content: 'data(id)',
              'text-opacity': 0.5,
              'text-valign': 'center',
              'text-halign': 'right',
              'text-margin-x': 5,
              'font-size': '20%',
              'background-opacity': 0,
              'background-image': function (ele) {
                const dataType = ele.data().char;
                let iconName;
                switch (dataType) {
                  case 'ingress':
                    iconName = 'ing';
                    break;
                  case 'service':
                    iconName = 'svc';
                    break;
                  case 'pod':
                    // status: pending, running
                    if (ele.data().status === 'Running') {
                      iconName = 'pod-running';
                    } else {
                      iconName = 'pod-pending';
                    }
                    break;
                  case 'replicaSet':
                    iconName = 'rs';
                    break;
                  case 'deployment':
                    iconName = 'dev';
                    break;
                  default:
                    break;
                }
                const iconSrc = `img/res/${iconName}.svg`;
                return iconSrc;
              },
              'background-fit': 'cover',
              width: 80,
              height: 80,
            },
          },
          {
            selector: 'edge',
            style: {
              'curve-style': 'bezier',
              width: 3,
              'target-arrow-shape': 'triangle',
              'line-color': '#ccc',
              'target-arrow-color': '#ccc',
            },
          },
        ],

        // node & edge data
        elements: { nodes: data.elements.nodes, edges: data.elements.edges },
      });

      cy.layout({
        name: 'breadthfirst',
        roots: data.elements.root,
        // roots: cy.nodes('[id="tmp1"]'), // param => filter 형식 '[id = "tmp1"],[id = "tmp1"] ...'
        nodeDimensionsIncludeLabels: true,
        spacingFactor: 1,
      }).run();

      // node infobox open
      cy.on('select', (evt) => {
        // node/edge 구분
        if (evt.target.isNode()) {
          data.infoBoxData = evt.target.data();
        }
      });

      // infobox close
      cy.on('click tap', (evt) => {
        if (!evt.target.length && data.infoBoxData) {
          data.infoBoxData = null;
        }
      });
    };

    onMounted(() => {
      drawGraph();
    });

    // GNB select box change
    watch(() => data.NS, (newValue) => {
      const newNS = newValue;
      store.dispatch('kube/getContainer', newNS);
    });

    watch(() => data.elements, () => {
      drawGraph();
      data.infoBoxData = null;
    });

    return {
      ...toRefs(data),
      cyElement,
    };
  },
};
</script>

<style scoped>
.cytoscape {
  position: relative;
  height: calc(100vh - 4rem);
}
#cy {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  z-index: 999;
}
</style>
