import Firebase from 'firebase'
import {config} from 'src/config/firebaseConfig'

const authGoogle = () => {
  if (!Firebase.apps.length) {
    return Firebase.initializeApp(config)
  }
  return Firebase
}

export default { authGoogle }
