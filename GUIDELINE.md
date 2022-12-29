# Foodism (foodism) Coding Guideline

## Language Helper
Default language for application **en-US**

You can see the default static words created for application in **lang/en-US.js**

- For Add Module Specific words. create new json object

```
home: {
  exploreCuisine: "Explore by Cuisines",
  topPicks: "Top Picks for you",
  popularSellers: "Popular Sellers",
  byOccasions: "Explore by Occasions",
  popularFood: "Popular food near me",
}
```

### How to use language object in any .vue file

1. Make sure you have imported quasar in particular file.
```
import { useQuasar } from 'quasar'

const $q = useQuasar()
```

2. Access language variable using **$q** variable

```
{{ $q.lang.home.exploreCuisine }}
```

## Route Helper

Use named route instead of url.
```
eg.
{
  path: "home",
  name: "home", // access using this route name
  component: () => import("src/pages/Home.vue"),
},
```

- For add url in ***router-link*** element
```
<router-link :to="{ name: 'home' }">  Label </router-link>
```

- Using js method
```
this.$router.push({ 'name' : 'home' })
```

### Authenticated Routes

Specify the **meta** object with **requiresAuth** variable with ***true*** value

It will be check if user has token or not using boot method

```
eg.
{
  // User authendicated routes
  path: "/user",
  component: () => import("pages/user.vue"),
  meta: {
    requiresAuth: true,
  }
},
```

### Common Validations

Quasar Provides their own validation method and if we can also use external library for validation like **vee-validate**

We have used Quasar own internal validation system [Click here for document](https://quasar.dev/vue-components/input#internal-validation)

Created some basic validation function using Vue Mixin and Registered it Globally. [Check created validation methods](./src/boot/mixin.js)

```
eg.
This is how we call the validation method from input field

<q-input
  v-model="name"
  label="Name"
  :rules="[
    (val) => required(val, 'username'),
  ]"
/>


Check two different validation in one input

<q-input
  v-model="email"
  label="Email"
  :rules="[
    (val) => required(val, 'email'),
    (val) => isEmail(val),
  ]"
/>

```
