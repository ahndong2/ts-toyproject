import { Commit, ActionContext } from 'vuex';
import { getKubeList } from '@/api/kube';
import { ContainerState } from './type';

export interface GetContainerType {
  commit: Commit;
  state: ActionContext<ContainerState, ContainerState>;
}

export const getContainer = async (
  { commit, state }: GetContainerType,
  newNS: string,
): Promise<void> => {
  const param = newNS;
  await getKubeList(param).then((res) => {
    const { data } = res || {};
    commit('setContainer', data);
  });
};
