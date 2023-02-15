import { InitialState } from './app';

// 权限
export default (initialState: InitialState) => {
  return {
    canSeeAdmin: initialState.role > 1, // 权限
  };
};
