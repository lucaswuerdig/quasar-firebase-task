<template>
  <q-layout>
  <q-page-container>
    <q-page>
        <router-view />
    </q-page>
  </q-page-container>
</q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'newtask',
  methods: {
    openURL
  }
}
</script>
