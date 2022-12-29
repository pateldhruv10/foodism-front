<template>
  <div class="full-h">
    <q-card-section class="row items-center pop-head">
      <h6>{{ $q.lang.addRecipes.PopUpTitle.utensils }}</h6>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-form ref="form" @submit="validate">
      <q-card-section class="pop-body popup-fix-bottm">
        <div class="add-ing-box">
          <h6>Utensils</h6>

          <div
            class="form-group border-bottom1"
            v-for="(item, index) in utensils"
            :key="index"
          >
            <div class="row q-col-gutter-x-md items-center">
              <div class="col-10">
                <div class="ing-name">
                  <q-input
                    v-model="utensils[index]"
                    class="label-none"
                    :label="$q.lang.addRecipes.stepTwo.fields.utensil.label"
                    :placeholder="
                      $q.lang.addRecipes.stepTwo.fields.utensil.placeHolder
                    "
                    :rules="[
                      (val) =>
                        required(
                          val,
                          $q.lang.addRecipes.stepTwo.fields.utensil.label
                        ),
                      (val) =>
                        max(
                          val,
                          255,
                          $q.lang.addRecipes.stepTwo.fields.utensil.label
                        ),
                    ]"
                  />
                </div>
              </div>
              <div class="col-2 controll-icon">
                <span
                  class="material-icons"
                  @click="utensils = removeItem(utensils, index)"
                  >remove_circle</span
                >
              </div>
            </div>
          </div>

          <div class="row q-col-gutter-x-lg">
            <div class="col-12 q-pt-lg" @click="addItem()">
              <q-btn
                class="btn btn2 full-width"
                icon="add"
                label="add more utensils"
              />
            </div>
          </div>
          <div class="fixed-bottom q-px-lg q-py-md box-shadow-cus">
            <q-btn
              class="btn full-width btn1"
              flat
              dense
              @click="validate()"
              :label="$q.lang.label.save"
            />
          </div>
        </div>
      </q-card-section>
    </q-form>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import _ from 'lodash'
export default defineComponent({
  name: 'AddUtensil',
  props: {
    sendValue: {
      type: Object || Array,
      default: [],
    },
    fieldName: {
      type: String,
      default: '',
    },
    sendDisplayField: {
      type: String,
      default: null,
    },
  },
  setup() {
    const popup = ref(false)
    const utensils = ref([])
    const utensilsCopy = ref([])
    return {
      popup,
      utensils,
      utensilsCopy,
    }
  },
  created() {
    this.utensils = this.sendValue
    this.utensilsCopy = _.cloneDeep(this.utensils)
    if (this.utensils.length == 0) {
      for (var i = 0; i < 3; i++) {
        this.addItem()
      }
    }
  },
  methods: {
    addItem() {
      this.utensilsCopy.push(undefined)
      this.utensils = this.utensilsCopy
    },
    validate() {
      this.$refs.form.validate().then((success) => {
        console.log(success)
        if (success) {
          this.$emit('selectValue', {
            value: this.utensils,
            field: 'utensils',
          })
        }
      })
    },
  },
})
</script>
