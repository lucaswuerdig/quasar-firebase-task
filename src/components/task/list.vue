<template>
  <q-page class="flex-center">
    <q-card class="q-mt-lg">
        <q-card-title class="text-center capitalize">
            <big class="text-secondary">TAREFAS</big>
        </q-card-title>
        <q-card-separator />
        <q-card-main>
            <div v-for="(task, key) in tasks[0]" :key="key">
              <q-card class="q-mt-lg">
                  <q-card-title class="capitalize">
                      <big>{{ task.title }}</big><br> <small>{{ formatDate(task.dateTask) }}</small>
                  </q-card-title>
                  <q-card-separator />
                  <q-card-main>
                      <p>{{ task.description }}</p>
                  </q-card-main>
                  <q-card-separator />
                  <q-card-actions>
                    <div class="col-lg-12">
                      <q-btn
                          label="Concluir"
                          color="secondary"
                          icon-right="check"
                          :loading="loading"
                          @click="updateTask(key)"
                      />
                      <q-btn
                          class="float-right"
                          label="Excluir"
                          icon-right="close"
                          color="negative"
                          @click="deleteTask(key)"
                      />
                    </div>
                  </q-card-actions>
              </q-card>
            </div>
        </q-card-main>
        <q-card-separator />
        <q-card-actions class="flex-center">
            <q-field>
              <q-radio
                v-model="filter"
                val="all"
                color="teal"
                label="Todas"
              />
              <q-radio
                v-model="filter"
                val="active"
                color="teal"
                label="Ativas"
              />
              <q-radio
                v-model="filter"
                val="completed"
                color="teal"
                label="Completadas"
              />
            </q-field>
        </q-card-actions>
    </q-card>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { date } from 'quasar'

export default {
  name: 'list-task',
  data () {
    return {
      loading: false,
      filter: 'all'
    }
  },
  computed: {
    ...mapGetters({
      tasks: 'task/getTask'
    })
  },
  beforeMount () {
    this.getTask()
  },
  methods: {
    checkTask () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 3000)
    },
    deleteTask (task) {
      this.$q.dialog({
        title: 'Excluir Registro',
        message: 'Deseja realmente excluir esta tarefa?',
        ok: {
          push: true,
          label: 'Sim',
          color: 'secondary'
        },
        cancel: {
          push: true,
          color: 'negative',
          label: 'Não'
        }
      }).then(() => {
        this.$store.dispatch('task/deleteTask', task)
        this.$q.notify({
          message: 'Tarefa Excluida',
          timeout: 3000,
          type: 'positive',
          color: 'positive',
          position: 'bottom'
        })
      })
    },
    updateTask (key) {
      console.log(key)
    },
    formatDate (dateT) {
      return date.formatDate(dateT, 'DD/MM/YYYY')
    },
    ...mapActions({
      getTask: 'task/getTask'
    })
  }
}
</script>
