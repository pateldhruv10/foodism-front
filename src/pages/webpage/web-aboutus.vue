<template>
  <q-page class="">
    <div class="about-us">
      <div class="banner-cus">
        <q-img src="~assets/images/about-us.jpg"></q-img>
        <div class="banner-content">
          <h2>About Us</h2>
        </div>
      </div>
      <div class="about-text q-mb-lg">
        <div class="about-container">
          <p>Foodism is a unique metaverse for food. Explore food like never before! Create your unique foodie persona, discover exotic recipes, share recipes and connect to top chefs with foodism for brain-storming sessions, improving your skills and growing your business.</p>
        </div>
      </div>
      <div class="about-container">
        <div class="title">
          <h2>Vision and Mission</h2>
        </div>
        <p>Our vision is to bring together the food community of India, through an influx of excellent content from all around the world. We want people to relish and revel in the delicacies that are made in every household in India. Taking inspiration from the Sanskrit saying, ‘Vasudhaiva Kutumbakam’, the world is one family, we want to create an extended food family that will help people connect and collaborate through visual and textual content.</p>
        <h3 class="text-center mt-5 mb-5"><b>Create, Connect, Collaborate</b></h3>
        <div class="q-mb-xl">
          <div class="q-mb-md">
            <q-img src="~assets/images/ab1.jpg"></q-img>
          </div>
          <div class="title">
            <h2>Create</h2>
          </div>
          <div class="">
            <p>Content is the future of the food industry. Foodism is all set to deliver exclusive top-notch quality content to its users. You can be one of our many contributors - Learn how to create content that sells! Create your line of products and showcase it on foodism.</p>
            <b>Here’s what you can create & share using Foodism</b>
            <ul>
              <li>Recipe Videos</li>
              <li>Recipe Cards (Textual)</li>
              <li>Travelogues</li>
              <li>Cooking Tips</li>
              <li>Kitchen Hacks</li>
              <li>Wellness Advice</li>
            </ul>
          </div>
        </div>
        <div class="q-mb-xl">
          <div class="q-mb-md">
            <q-img src="~assets/images/ab2.jpg"></q-img>
          </div>
          <div class="title">
            <h2>Connect</h2>
          </div>
          <div class="">
            <p>We are your one-stop platform to connect to the global food industry. Connect to our vast community of foodies and industry professionals & discover your creative side. Build your unique culinary persona and share it with the world via Foodism!</p>
            <b>Connect with</b>
            <ul>
              <li>Chefs</li>
              <li>Consultants</li>
              <li>Restaurateurs</li>
              <li>Vendors</li>
              <li>Suppliers</li>
              <li>Farmers/Agriculturalists</li>
              <li>Health and Wellness Experts</li>
              <li>Caterers</li>
              <li>Hospitality and Tourism brands</li>
            </ul>
          </div>
        </div>

        <div class="q-mb-xl">
          <div class="q-mb-md">
            <q-img src="~assets/images/ab3.jpg"></q-img>
          </div>
          <div class="title">
            <h2>Collaborate</h2>
          </div>
          <div class="">
            <p>We know that business ventures run on collaborative efforts and we have made collaborating easier than ever before! Build connections with Foodism’s vast network of top chefs, industrialists, and content specialists and allow yourself to grow with their knowledge. Get in touch with the right people who can help you take your business to the next level!</p>
            <b>You can collaborate with</b>
            <ul>
              <li>Influencers</li>
              <li>Food Bloggers</li>
              <li>Large brands</li>
              <li>Food professionals across the country</li>
            </ul>
          </div>
        </div>
      </div>

    </div>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue'

export default defineComponent({
  name: 'WebAboutUs',
  setup () {
    return {
      current: ref(3)
    }
  },
})
</script>
