import {Notify} from 'quasar'

export const NOTIFY = Notify

export default ({ app, router, Vue }) => {
  Vue.prototype.$notify = NOTIFY
}
