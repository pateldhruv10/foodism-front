<template>
  <div class="full-h">
    <q-card-section class="row items-center pop-head">
      <h6>{{ $q.lang.addRecipes.stepTwo.fields.ingredient_brand.add }}</h6>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-form ref="form" @submit="validate">
      <q-card-section class="pop-body popup-fix-bottm">
        <div class="add-ing-box">
          <h6>
            {{ $q.lang.addRecipes.stepTwo.fields.ingredient_brand.label }}
          </h6>
          <div>
            <!-- style="height:62vh; overflow:scroll;" -->
            <div
              class="form-group border-bottom1"
              v-for="(item, index) in brands"
              :key="index"
            >
              <div class="row q-col-gutter-x-md items-center">
                <div class="col-10">
                  <div class="ing-name">
                    <q-input
                      :tabindex="index + 1"
                      v-model="brands[index]"
                      class="label-none"
                      :label="$q.lang.addRecipes.stepOne.fields.brand.label"
                      :placeholder="
                        $q.lang.addRecipes.stepOne.fields.brand.placeHolder
                      "
                      :rules="[
                        (val) =>
                          required(
                            val,
                            $q.lang.addRecipes.stepOne.fields.brand.label
                          ),
                        (val) =>
                          max(
                            val,
                            255,
                            $q.lang.addRecipes.stepOne.fields.brand.label
                          ),
                      ]"
                      @focus="setScroll"
                    />
                  </div>
                </div>
                <div class="col-2 controll-icon" v-if="index !== 0">
                  <span
                    class="material-icons"
                    @click="brands = removeItem(brands, index)"
                    >remove_circle</span
                  >
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row q-col-gutter-x-md">
                <div class="col-12 q-pt-lg" @click="addItem()">
                  <q-btn
                    class="btn btn2 full-width"
                    icon="add"
                    :label="$q.lang.addRecipes.stepOne.fields.brand.addMore"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="fixed-bottom row q-col-gutter-x-lg" style="bottom: 10vh;">
            <div class="col-12 q-pt-lg" @click="addItem()">
              <q-btn
                class="btn btn2 full-width"
                icon="add"
                :label="$q.lang.addRecipes.stepOne.fields.brand.addMore"
              />
            </div>
          </div> -->

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
import addProductVue from 'src/pages/add-product.vue'
import { defineComponent, ref } from 'vue'
import _ from 'lodash'
export default defineComponent({
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
  setup() {
    const popup = ref(false)
    const brands = ref([])
    const brandsCopy = ref([])
    return {
      brandsCopy,
      popup,
      brands,
    }
  },
  created() {
    this.brands = this.sendValue
    this.brandsCopy = _.cloneDeep(this.brands)
    if (this.brands.length == 0) {
      this.addItem()
    }
  },
  methods: {
    // scrollToElement (el) {
    //   const target = getScrollTarget(el)
    //   const offset = e.target.offsetHeight;
    //   const duration = 1000
    //   setVerticalScrollPosition(target, offset, duration)
    // },
    setScroll(e) {
      const el = e.target
      el.scrollIntoView({ behavior: 'smooth' })
      // el.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
      // var inputHeight=e.target.offsetHeight;
      // console.log(inputHeight)
      // e.target.animate({ scrollTop: inputHeight}, 600);
      // e.target.scrollTo( inputHeight);
      // window.scrollTo(0,0);
    },
    setValue(data) {
      this.popup = false
      this[`${data.field}`] = data.value
    },
    addItem() {
      this.brandsCopy.push(undefined)
      this.brands = this.brandsCopy
    },
    validate() {
      this.$refs.form.validate().then((success) => {
        console.log(success)
        if (success) {
          this.$emit('selectValue', {
            value: this.brands,
            field: this.fieldName,
          })
        }
      })
    },
  },
})
</script>
