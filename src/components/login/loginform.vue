<template>
  <q-page class="flex flex-center">
    <div class="row">
      <div class="col-lg-12">
        <img src="~/assets/icon-task.png" alt="Task Logo">
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <q-btn icon="fab fa-google" label="Logar com Google" color="red" size="lg" @click="loginWithGoogle" />
      </div>
    </div>
  </q-page>
</template>
<script>
import {config} from 'src/config/firebaseConfig'

export default {
  name: 'login-form',
  methods: {
    loginWithGoogle () {
      console.log(this.$auth.app)
      if (!this.$auth.app.firebase_.apps.length) {
        this.$auth.initializeApp(config)
      }
      this.$auth.languageCode = 'pt'
      let provider = new this.$auth.app.firebase_.auth.GoogleAuthProvider()
      this.$auth.signInWithPopup(provider).then((result) => {
        this.$store.dispatch('auth/setUser', result.user)
        this.$store.dispatch('auth/setToken', result.credential.accessToken).then((result) => {
          if (result) {
            this.$router.push('/')
          }
        }).catch((error) => {
          console.log(error)
        })
      }).catch((error) => {
        console.log(error.code)
        console.log(error.message)
        console.log(error.email)
        console.log(error.credential)
      })
    }
  }
}
</script>
