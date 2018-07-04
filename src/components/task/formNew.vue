<template>
  <q-page class="flex-center">
    <q-card class="q-mt-lg">
        <q-card-title class="bg-teal text-white text-center uppercase glossy">
            <big>Nova Tarefa</big>
        </q-card-title>
        <q-card-separator />
        <q-card-main>
            <q-field>
                <div class="row">
                    <div class="col-lg-12">
                        <q-input
                        v-model="form.title"
                        type="text"
                        float-label="Título"
                        placeholder="O que você deseja fazer?"
                        @blur="$v.form.title.$touch"
                        :error="$v.form.title.$error"
                        />
                        <q-input
                        v-model="form.description"
                        type="text"
                        float-label="Descrição"
                        placeholder="Uma pequena Descrição"
                        @blur="$v.form.description.$touch"
                        :error="$v.form.description.$error"
                        />
                        <q-datetime
                        v-model="form.date_task"
                        type="date"
                        float-label="Data Tarefa"
                        color="secondary"
                        format="DD/MM/YYYY"
                        @blur="$v.form.date_task.$touch"
                        :error="$v.form.date_task.$error"
                        />
                    </div>
                </div>
                <div class="row q-mt-lg">
                  <div class="col-lg-12">
                    <q-btn
                    class="full-width"
                    color="secondary"
                    label="Salvar"
                    @click="submit()"
                    >
                    </q-btn>
                  </div>
                </div>
            </q-field>
        </q-card-main>
    </q-card>
  </q-page>
</template>
<script>
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'form-new',
  data () {
    return {
      form: {
        title: '',
        description: '',
        dateTask: '',
        status: 0
      }
    }
  },
  validations: {
    form: {
      title: {
        required,
        minLength: minLength(3)
      },
      description: {
        required,
        minLength: minLength(3)
      },
      date_task: {
        required
      }
    }
  },
  methods: {
    emptyForm () {
      this.form.title = ''
      this.form.description = ''
      this.form.date_task = ''
      this.$v.$reset()
    },
    submit () {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.$store.dispatch('task/newTask', this.form)
        this.$q.notify({
          message: 'Tarefa Adicionada',
          timeout: 3000,
          type: 'positive',
          color: 'positive',
          position: 'bottom'
        })
        this.emptyForm()
      }
    }
  }
}
</script>
