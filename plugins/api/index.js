import {common} from './common';
import {articleColumn} from './articleColumn';

export default ({ app: { $axios } }, inject) => {
  inject('api', {
    ...common($axios),
    ...articleColumn($axios),
  })
}
