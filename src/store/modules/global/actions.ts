import { Commit } from 'vuex';
import { getNameSpaceList } from '@/api/nameSpace';

export const setViewType = ({ commit }: {commit: Commit}, type: string): void => {
  commit('setViewType', type);
};

export const setNS = ({ commit }: {commit: Commit}, NS: string): void => {
  commit('setNS', NS);
};

export const getNSList = async ({ commit }: {commit: Commit}): Promise<void> => {
  await getNameSpaceList().then((res) => {
    const { data } = res || [];
    const list = data.map((v:string, i:number) => ({
      id: i,
      label: v,
      value: v,
    }));
    commit('setNSList', list);
  });
};

export const setNSList = ({ commit }: {commit: Commit}, NSList: Array<any>): void => {
  commit('setNSList', NSList);
};

export const setRefreshTime = ({ commit }: {commit: Commit}, refreshTime: number): void => {
  commit('setRefreshTime', refreshTime);
};

export const setIsDiagramView = ({ commit }: {commit:Commit}, isDiagramView: boolean): void => {
  commit('setIsDiagramView', isDiagramView);
};
