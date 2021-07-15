import store from '@/store';

// interval get Container info
let nsListTimer: number;
export const nsListSchedule = (ns: string, refreshTime: number): void => {
  if (nsListTimer) {
    clearInterval(nsListTimer);
  }

  if (refreshTime === 0) return;
  nsListTimer = setInterval(async () => {
    await store.dispatch('kube/getContainer', ns);
  }, refreshTime * 1000);
};
