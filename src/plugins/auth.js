import * as firebase from 'firebase'
import {config} from 'src/config/firebaseConfig'

const fireApp = firebase.initializeApp(config)

export const AUTH = fireApp.auth()

export default ({ app, router, Vue }) => {
  Vue.prototype.$auth = AUTH
}
