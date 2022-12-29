<template>
  <div class="full-h">
    <q-card-section class="row items-center pop-head">
      <h6>{{ $q.lang.addRecipes.stepTwo.fields.ingredient_brand.add }}</h6>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-form ref="form" @submit="validate" >
      <q-card-section class="pop-body popup-fix-bottm">
        <div class="add-ing-box">
          <h6>{{ $q.lang.addRecipes.stepTwo.fields.ingredient_brand.label }}</h6>

          <q-virtual-scroll
            ref="virtualListRef"
            :items="brands"
            @virtual-scroll="onVirtualScroll"
          >
            <template v-slot="{ item, index }">
              <div :key="index" class="form-group border-bottom1" :class="{ 'ss': index === virtualListIndex }">
                <div class="row q-col-gutter-x-md items-center">
                  <div class="col-10">
                    <div class="ing-name">
                      <span class="hidden">{{ item }}</span>
                      <q-input
                        v-model="brands[index]"
                        class="label-none"
                        :label="$q.lang.addRecipes.stepOne.fields.brand.label"
                        :placeholder="
                          $q.lang.addRecipes.stepOne.fields.brand.placeHolder
                        "
                        ref="brand"
                        :rules="[
                          (val) => required(val, $q.lang.addRecipes.stepOne.fields.brand.label),
                          (val) => max(val, 255, $q.lang.addRecipes.stepOne.fields.brand.label),
                        ]"
                      />
                    </div>
                  </div>
                  <div class="col-2 controll-icon" v-if="index !== 0">
                    <span class="material-icons" @click="brands = removeItem(brands, index)">remove_circle</span>
                  </div>
                </div>
              </div>
            </template>

          </q-virtual-scroll>

          <div class="row q-col-gutter-x-lg">
            <div class="col-12 q-pt-lg" @click="addItem()">
              <q-btn class="btn btn2 full-width" icon="add" :label="$q.lang.addRecipes.stepOne.fields.brand.addMore" />
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
import { defineComponent, ref } from 'vue';


export default defineComponent ({
  name: "AddIngredient",
  props: {
    sendValue : {
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
    }
  },
  setup() {
    const virtualListRef = ref(null)
    const virtualListIndex = ref(1200)
    const popup = ref(false)
    const brands = ref([])
    return {
      brand: ref(null),
      popup,
      brands,
      virtualListRef,
      virtualListIndex,

      onVirtualScroll ({ index }) {
        virtualListIndex.value = index
      },

      executeScroll () {
        virtualListRef.value.scrollTo(virtualListIndex.value, 'start-force')
      }
    }
  },
  created() {
    this.brands = this.sendValue;

    if(this.brands.length == 0) {
      this.addItem();
    }
  },
  methods: {
    setValue(data) {
      this.popup = false
      this[`${data.field}`] = data.value
    },
    addItem() {
      this.brands.push(undefined);
      this.virtualListIndex = this.brands.length - 1;
      this.executeScroll();
      this.$refs.brand.focus()
      this.$refs.brand.focus()
      this.$refs.brand.scrollTo(0, 0);
    },
    validate() {
      this.$refs.form.validate().then(success => {
        console.log(success)
        if (success) {
          this.$emit('selectValue', {
            value: this.brands,
            field: this.fieldName
          })
        }
      })
    }
  }
})
</script>

<style lang="sass">
.sample-placeholder
  .q-virtual-scroll__padding
    background-size: auto var(--q-virtual-scroll-item-height, 50px)
</style>
