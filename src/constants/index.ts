// 静态常量
import { channelRoutes, channelCommissioner, administratorsRoues, IBestAFSRoute } from '../../config/routes';

export const DEFAULT_NAME = 'Umi Max';

type AuthorityDIC = {
  [key: number]: IBestAFSRoute[]
}
// 菜单权限字典
export const authorityDIC: AuthorityDIC = {
  1: administratorsRoues,
  2: channelCommissioner,
  3: channelRoutes
};
