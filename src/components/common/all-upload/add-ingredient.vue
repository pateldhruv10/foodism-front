<template>
  <div class="full-h">
    <q-card-section class="row items-center pop-head">
      <h6>{{ $q.lang.addRecipes.stepTwo.fields.ingredient.add }}</h6>
      <q-space />
      <q-btn icon="close" @click="cancleit()" flat round dense />
    </q-card-section>

    <q-form ref="ingForm" @submit="validate">
      <q-card-section class="pop-body popup-fix-bottm">
        <div class="add-ing-box">
          <h6>{{ $q.lang.addRecipes.stepTwo.fields.ingredient.label }}</h6>
          <div class="form-group border-bottom1">
            <div class="row q-col-gutter-x-md items-center">
              <div class="col-6">
                <label>
                  <b>{{
                    $q.lang.addRecipes.stepTwo.fields.ingredient.quantity
                  }}</b>
                  <b class="q-pl-lg">{{
                    $q.lang.addRecipes.stepTwo.fields.ingredient.unit
                  }}</b>
                </label>
              </div>
              <!-- <div class="col-3">
                <label>
                  <b>{{ $q.lang.addRecipes.stepTwo.fields.ingredient.unit }}</b>
                </label>
              </div> -->
              <div class="col-5">
                <label>
                  <b>{{
                    $q.lang.addRecipes.stepTwo.fields.ingredient.ingredient
                  }}</b>
                </label>
              </div>
              <div class="col-1 controll-icon"></div>
            </div>
          </div>
          <div
            class="form-group border-bottom1"
            v-for="(item, index) in ingredients"
            :key="index"
          >
            <div class="row q-col-gutter-x-md items-center">
              <div class="col-6">
                <div class="select-cus" @click="open(index)">
                  <label
                    class="label-none"
                    :label="item.quantity + ' ' + item.unitName"
                  >
                    {{ item.quantity + ' ' + item.unitName }}
                  </label>

                  <q-icon name="expand_more" />
                </div>
              </div>
              <div class="col-5">
                <div class="ing-name">
                  <q-input
                    v-model="item.ingredient"
                    class="label-none"
                    :label="
                      $q.lang.addRecipes.stepTwo.fields.ingredient.ingredient
                    "
                    :placeholder="
                      $q.lang.addRecipes.stepTwo.fields.ingredient.placeHolder
                    "
                    :rules="[
                      (val) =>
                        required(
                          val,
                          $q.lang.addRecipes.stepTwo.fields.ingredient
                            .ingredient
                        ),
                      (val) =>
                        max(
                          val,
                          255,
                          $q.lang.addRecipes.stepOne.fields.brand.label
                        ),
                    ]"
                  />
                </div>
              </div>
              <div
                class="col-1 controll-icon"
                v-if="ingredients.length > 3"
                @click="removeItem(index)"
              >
                <span class="material-icons">remove_circle</span>
              </div>
            </div>
          </div>
          <div class="row q-col-gutter-x-lg">
            <div class="col-12 q-pt-lg" @click="addItem()">
              <q-btn
                class="btn btn2 full-width"
                icon="add"
                label="add more ingredients"
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
    <q-dialog v-model="popup" position="bottom" class="full-popup add-ing">
      <portion-unit
        :currentIndex="currentIndex"
        :edit="edit"
        v-on:selectValueAtIndex="setOnIndex"
      />
    </q-dialog>
  </div>
</template>

<script>
  import { defineAsyncComponent, ref } from 'vue'
  import { Notify } from 'quasar'

  export default {
    name: 'AddIngredient',
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
    components: {
      'portion-unit': defineAsyncComponent(() =>
        import('../../../components/common/all-upload/portion-unit.vue')
      ),
    },
    setup() {
      const popup = ref(false)
      const ingredients = ref([])
      const ingForm = ref(null)
      const cancle = ref(true)
      return {
        cancle,
        ingForm,
        popup,
        ingredients,
        edit: ref({
          quantity: 0,
          unit: 0,
        }),
      }
    },
    created() {
      this.ingredients = this.sendValue

      if (this.ingredients.length == 0) {
        for (var i = 0; i < 3; i++) {
          this.addItem()
        }
      }
    },

    methods: {
      cancleit() {
        if (this.ingredients[0].ingredient == null) {
          this.$emit('closePopup', {})
        } else {
          this.validate()
        }

        // // alert('fd')
        // console.log(this.sendValue)
        //  this.cancle = true
      },
      open(index) {
        this.popup = true
        this.currentIndex = index
        this.edit.quantity = this.ingredients[index].quantity
        this.edit.unit = this.ingredients[index].unit
      },
      setOnIndex(data) {
        this.popup = false
        this.ingredients[data.index].quantity = data.quantity
        this.ingredients[data.index].unit = data.unit
        this.ingredients[data.index].unitName = data.unitName
      },
      addItem() {
        console.log(this.sendValue)

        this.ingredients.push({
          quantity: '',
          unit: '',
          unitName: '',
          ingredient: null,
        })
      },
      removeItem(index) {
        this.ingredients.splice(index, 1)
      },
      validate() {
        this.$refs.ingForm.validate().then((success) => {
          console.log(success)
          if (success) {
            let error = false
            this.ingredients.forEach((item) => {
              if (item.quantity == '') {
                Notify.create({
                  type: 'negative',
                  message: 'Please select Quantity and Units',
                })
                error = true;
              }
            })
            if(!error) {

              this.$emit('selectValue', {
                value: this.ingredients,
                field: this.fieldName,
              })
            }
          }
        })
      },
    },
  }
</script>
<style lang="scss">
  // $
</style>
