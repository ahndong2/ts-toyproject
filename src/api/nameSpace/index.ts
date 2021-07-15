import API from '../index-instance';

export const getNameSpaceList = (): Promise<any> => API.request({
  method: 'GET',
  url: '/kube/name/',
});
