<template>
  <q-page class="">
     <div class="banner-sec">
        <div class="container">
           <div class="row align-items-center">
              <div class="col-md-7 col-sm-7">
                 <div class="bnr-left">
                    <div class="title">
                       <!-- <p>Foodism</p> -->
                       <h2>Enter the Foodverse</h2>
                    </div>
                    <p class="py-3">Explore food like never before! Create your unique foodie persona, discover exclusive recipes & blogs and connect with top chefs/restaurateurs via foodism to learn industries best-kept secret to establish or grow your food business. We are your one-stop platform to connect you with the food industry globally.</p>
                    <div class="bnr-btns">
                       <!-- <q-btn @click="signupform = true" class="btn btn2" v-if="!this.isLoggedIn">Sign Up</q-btn> -->
                       <q-btn href="user-home" class="btn btn1">Explore</q-btn>
                    </div>
                    <div class="q-pt-lg">
                        <h5 class="mb-4">Download Foodism Mobile App.</h5>
                        <p class="app-download-btn q-mt-md">
                           <a href="https://play.google.com/store/apps/details?id=food.foodism.xyz" target="_blank" class="q-mr-md"><q-img src="~assets/images/android-app.png" /></a>
                           <a href="https://apps.apple.com/in/app/foodism/id6444040264" target="_blank" class="q-mr-md"><q-img src="~assets/images/ipn-app.png" /></a>
                        </p>
                     </div>
                    <div class="pop-cat">
                       <div class="title">
                          <p>Popular Categories</p>
                       </div>
                       <div class="cat-list">
                          <div class="cat-box text-center">
                             <div class="cat-img shadow q-mb-sm">
                                <q-img src="~assets/images/appitizer.png"></q-img>
                             </div>
                             <p>Appetizers</p>
                          </div>
                          <div class="cat-box text-center">
                             <div class="cat-img shadow q-mb-sm">
                                <q-img src="~assets/images/Health-Bite.png"></q-img>
                             </div>
                             <p>Healthy Bites</p>
                          </div>
                          <div class="cat-box text-center">
                             <div class="cat-img shadow q-mb-sm">
                                <q-img src="~assets/images/seasonal.png"></q-img>
                             </div>
                             <p>Seasonal</p>
                          </div>
                          <div class="cat-box text-center">
                             <div class="cat-img shadow q-mb-sm">
                                <q-img src="~assets/images/dessert.png"></q-img>
                             </div>
                             <p>Desserts</p>
                          </div>
                          <div class="cat-box text-center">
                             <div class="cat-img shadow q-mb-sm">
                                <q-img src="~assets/images/main-course.png"></q-img>
                             </div>
                             <p>Main Course</p>
                          </div>
                       </div>
                    </div>

                 </div>
              </div>
              <div class="col-md-5 col-sm-5 col-12">
                 <div class="bnr-right mt-5">
                    <q-img src="~assets/images/banner-right.png"></q-img>
                 </div>
              </div>
           </div>
        </div>
     </div>
     <div class="what-we-do">
        <div class="container">
           <div class="title text-center">
              <h2>Here is what we are all about</h2>
           </div>
           <div class="row q-pt-lg q-col-gutter-lg">
              <div class="col-md-4 col-sm-4 col-12">
                 <div class="we-do-box shadow text-center">
                    <q-img class="q-mb-md" src="~assets/images/explore-recipes.png"></q-img>
                    <h5>Explore Recipes</h5>
                    <p class="q-pt-sm">Find the largest and most exclusive collection of recipes, food hacks, interesting food stories, and more on Foodism’s food blog!</p>
                 </div>
              </div>
              <div class="col-md-4 col-sm-4 col-12">
                 <div class="we-do-box shadow text-center">
                    <q-img class="q-mb-md" src="~assets/images/attend-workshop.png"></q-img>
                    <h5>Attend or Host Events</h5>
                    <p class="q-pt-sm">Learn Together - Participate in or host food events with Foodism! From virtual ice cream-making sessions to make-your-own beer classes, get on-camera lessons from top chefs. Build your brand or grow your business!</p>
                 </div>
              </div>
              <div class="col-md-4 col-sm-4 col-12">
                 <div class="we-do-box shadow text-center">
                    <q-img class="q-mb-md" src="~assets/images/connect-create-collaboration.png"></q-img>
                    <h5>Build Social Connections</h5>
                    <p class="q-pt-sm">Connect, Create and Collaborate with food connoisseurs and F&B brands across the globe.</p>
                 </div>
              </div>
           </div>
        </div>
     </div>
     <div class="sec-info">
        <div class="container">
           <div class="row items-center">
              <div class="col-md-6 col-sm-6  col-12">
                 <div class="info-imd">
                    <q-img src="~assets/images/info-left-new.png"></q-img>
                 </div>
              </div>
              <div class="col-md-6 col-sm-6  col-12">
                 <div class="info-box">
                    <div class="title">
                       <!-- <p>Lorem Ipsum</p> -->
                       <h2>Discover delicious recipes from around the world</h2>
                    </div>
                    <p>Explore vlogs, recipes, tips and tricks. Dig into the rich culinary scene of Foodism! Find foodies & food experts all under one roof at Foodism- India’s leading food recipe blog & destination</p>
                    <!-- <p class="pt-3"><button class="btn btn2">View More</button></p> -->
                 </div>
              </div>
           </div>
        </div>
     </div>
     <div class="sec-counter">
        <div class="container">
           <div class="row justify-center">
              <div class="col-md-3 col-sm-6 text-center">
                 <q-img class="q-mb-md" src="~assets/images/recipes.png"></q-img>
                 <h2>20k +</h2>
                 <p>Recipes</p>
              </div>
              <div class="col-md-3 col-sm-6 text-center">
                 <q-img class="q-mb-md" src="~assets/images/Users.png"></q-img>
                 <h2>7k +</h2>
                 <p>Users</p>
              </div>
           </div>
        </div>
     </div>
     <div class="app-download">
        <div class="container">
           <div class="row">
              <div class="col-sm-12 col-md-6 col-lg-6 ">
                 <div class="app-left">
                    <div class="title">
                       <p>Foodism app coming soon</p>
                       <h2>Welcome to Foodism's Foodverse </h2>
                    </div>
                    <div class="app-feature">
                       <div class="row q-col-gutter-md">
                          <div class="col-md-6 col-sm-6">
                             <div class="af-box mb-5">
                                <h4>
                                   <q-img src="~assets/images/share-content.png"></q-img>
                                   Build your brand
                                </h4>
                                <p>Put yourself out there! Share your food memories and delectable recipes, food vlogs, blogs and more
                                </p>
                             </div>
                          </div>
                          <div class="col-md-6 col-sm-6">
                             <div class="af-box mb-5">
                                <h4>
                                   <q-img src="~assets/images/become-influencers.png"></q-img>
                                   Become an influencer
                                </h4>
                                <p> Build your food portfolio on our exclusive platform and set trends for your loyal subscribers</p>
                             </div>
                          </div>
                          <div class="col-md-6 col-sm-6">
                             <div class="af-box mb-5">
                                <h4>
                                   <q-img src="~assets/images/host-events.png"></q-img>
                                   host events
                                </h4>
                                <p>Promote your f&b business/ services and share your food knowledge with other foodies. Build trust within your community of followers</p>
                             </div>
                          </div>
                          <div class="col-md-6 col-sm-6">
                             <div class="af-box mb-5">
                                <h4>
                                   <q-img src="~assets/images/business.png"></q-img>
                                   Connect to industry experts
                                </h4>
                                <p>Foodism bridges the gap between business experts and culinary artists. Connect to top chefs and f&b experts to take your food business venture to the next level with their guidance and problem-solving tools </p>
                             </div>
                          </div>
                       </div>
                    </div>
                    <h5 class="mb-4">Download Foodism Mobile App.</h5>
                     <p class="app-download-btn q-mt-md">
                        <a href="https://play.google.com/store/apps/details?id=food.foodism.xyz" target="_blank" class="q-mr-md"><q-img src="~assets/images/android-app.png" /></a>
                        <a href="https://apps.apple.com/in/app/foodism/id6444040264" target="_blank" class="q-mr-md"><q-img src="~assets/images/ipn-app.png" /></a>
                     </p>
                 </div>
              </div>
              <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                 <div class="app-right">
                    <q-img src="~assets/images/app-right.png"></q-img>
                 </div>
              </div>
           </div>
        </div>
     </div>
     <div class="testimonial">
        <div class="container">
           <div class="title text-center mb-5">
              <!-- <p>Lorem Ipsume</p> -->
              <h2>Testimonials</h2>
           </div>
           <div class="carousel-inner q-mt-xl">
              <q-carousel
                 animated
                 v-model="slide"
                 :autoplay="autoplay"
                 arrows
                 transition-prev="slide-right"
                 transition-next="slide-left"
                 @mouseenter="autoplay = false"
                 @mouseleave="autoplay = true"
                 infinite
                 >
                 <q-carousel-slide :name="1">
                    <div class="carousel-item">
                       <div class="row">
                          <div class="col-md-6 col-sm-12 col-12">
                             <div class="testi-img">
                                <q-img src="~assets/images/Kruthika.jpg"></q-img>
                             </div>
                          </div>
                          <div class="col-md-6 col-sm-12 col-12">
                             <div class="testi-content">
                                <h4>Kruthika Kashyap</h4>
                                <p>Happy to be a part of Foodism and loved the platform</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </q-carousel-slide>
                 <q-carousel-slide :name="2">
                    <div class="carousel-item">
                       <div class="row">
                          <div class="col-md-6 col-sm-12 col-12">
                             <div class="testi-img">
                                <q-img src="~assets/images/Gurneet.jpg"></q-img>
                             </div>
                          </div>
                          <div class="col-md-6 col-sm-12 col-12">
                             <div class="testi-content">
                                <h4>Gurneet Nayar</h4>
                                <p>Foodism team is always available to solve my queries, Very Courteous and helpful.</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </q-carousel-slide>
                 <q-carousel-slide :name="3">
                    <div class="carousel-item">
                       <div class="row">
                          <div class="col-md-6 col-sm-12 col-12">
                             <div class="testi-img">
                                <q-img src="~assets/images/Aishwarya.jpg"></q-img>
                             </div>
                          </div>
                          <div class="col-md-6 col-sm-12 col-12">
                             <div class="testi-content">
                                <h4>Aishwarya Tengli</h4>
                                <p>I have been part of Foodism since long and it never disappoints.</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </q-carousel-slide>
                 <q-carousel-slide :name="4">
                    <div class="carousel-item">
                       <div class="row">
                          <div class="col-md-6 col-sm-12 col-12">
                             <div class="testi-img">
                                <q-img src="~assets/images/Shubham.jpg"></q-img>
                             </div>
                          </div>
                          <div class="col-md-6 col-sm-12 col-12">
                             <div class="testi-content">
                                <h4>Shubham Dubbal</h4>
                                <p>I love cooking just because of looking at the recipes on Foodism platform.</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </q-carousel-slide>
                 <q-carousel-slide :name="5">
                    <div class="carousel-item">
                       <div class="row">
                          <div class="col-md-6 col-sm-12 col-12">
                             <div class="testi-img">
                                <q-img src="~assets/images/Tashnif.jpg"></q-img>
                             </div>
                          </div>
                          <div class="col-md-6 col-sm-12 col-12">
                             <div class="testi-content">
                                <h4>Tashnif Rubayat</h4>
                                <p>The best part about the Foodism is the contest and their give a ways and prices.</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </q-carousel-slide>
                 <q-carousel-slide :name="6">
                    <div class="carousel-item">
                       <div class="row">
                          <div class="col-md-6 col-sm-12 col-12">
                             <div class="testi-img">
                                <q-img src="~assets/images/Sima.jpg"></q-img>
                             </div>
                          </div>
                          <div class="col-md-6 col-sm-12 col-12">
                             <div class="testi-content">
                                <h4>Sima Das</h4>
                                <p>I have tried to cook the recipes looking at Foodism recipe and it is fun to explore new recipes.</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </q-carousel-slide>
                 <q-carousel-slide :name="7">
                    <div class="carousel-item">
                       <div class="row">
                          <div class="col-md-6 col-sm-12 col-12">
                             <div class="testi-img">
                                <q-img src="~assets/images/Shobha.jpg"></q-img>
                             </div>
                          </div>
                          <div class="col-md-6 col-sm-12 col-12">
                             <div class="testi-content">
                                <h4>Shobha Hari</h4>
                                <p>I explored and loved the Indian sweet dish on Foodism platform which helped me to learn new recipes.</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </q-carousel-slide>
                 <q-carousel-slide :name="8">
                    <div class="carousel-item">
                       <div class="row">
                          <div class="col-md-6 col-sm-12 col-12">
                             <div class="testi-img">
                                <q-img src="~assets/images/Prisha.jpg"></q-img>
                             </div>
                          </div>
                          <div class="col-md-6 col-sm-12 col-12">
                             <div class="testi-content">
                                <h4>Prisha Thakkar</h4>
                                <p>Foodism has a great opportunity for all the foodies.</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </q-carousel-slide>
                 <q-carousel-slide :name="9">
                    <div class="carousel-item">
                       <div class="row">
                          <div class="col-md-6 col-sm-12 col-12">
                             <div class="testi-img">
                                <q-img src="~assets/images/Nas.jpg"></q-img>
                             </div>
                          </div>
                          <div class="col-md-6 col-sm-12 col-12">
                             <div class="testi-content">
                                <h4>Nas Reen</h4>
                                <p>Foodism is such a great platform where one can exhibit their culinary skills with ease.</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </q-carousel-slide>
                 <q-carousel-slide :name="10">
                    <div class="carousel-item">
                       <div class="row">
                          <div class="col-md-6 col-sm-12 col-12">
                             <div class="testi-img">
                                <q-img src="~assets/images/Sravyasatish.jpg"></q-img>
                             </div>
                          </div>
                          <div class="col-md-6 col-sm-12 col-12">
                             <div class="testi-content">
                                <h4>Sravyasatish</h4>
                                <p>I love to take part in the amazing contest with so many recipes to learn and explore.</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </q-carousel-slide>
              </q-carousel>
           </div>
        </div>
     </div>
     <!-- <div class="blog-new">
        <div class="container-fluid">
           <div class="title text-center">
              <h2>Blogs and News</h2>
              <p>Article title plus, first line is same</p>
           </div>
           <div class="row pt-4">
              <div class="col-md-4 col-12" v-for="n in getBlogData.length" :key="`none-${n}`">
                 <div class="blog-box shadow">
                    <div class="blog-img">
                       <span v-if="getBlogData[n-1].blog_image">
                          <q-img :src="getBlogImage(getBlogData[n-1].blog_image)"></q-img>
                       </span>
                       <span class="blog-view">{{getBlogData[n-1].blogViewCount}} Views</span>
                    </div>
                    <div class="blog-content">
                       <h4>{{getBlogData[n-1].blog_title}}</h4>
                       <div class="blg-dis" ><span v-html="getBlogData[n-1].blog_desc"></span></div>
                       <p class="q-mb-none">
                          <router-link :to="{ name: 'web-blog-detail', params: { slug: getBlogData[n-1].id } }" class="btn btn1">Read More</router-link>
                       </p>
                    </div>
                 </div>
              </div>
              <div class="col-md-12 text-center q-pt-lg">
                 <router-link class="btn btn2" :to="{ name: 'web-blog'}" >View More</router-link>
              </div>
           </div>
        </div>
     </div> -->
     <div class="subscribe">
        <div class="container">
           <div class="sub-box">
              <div class="row align-items-center">
                 <div class="col-md-12">
                    <div class="title text-center">
                       <h2>Need Help? Contact Us!</h2>
                    </div>
                    <router-link class="btn btn2" :to="{ name: 'web-support' }">Support</router-link>
                    <!-- <a href="support.html" class="btn btn2">Support</a> -->
                 </div>
              </div>
           </div>
        </div>
        <!-- <div class="faq-section">
           <div class="container">
             <div class="title text-center">
               <h2>Frequently Asked Questions</h2>
             </div>
             <div class="accordion pt-3" id="accordionExample">
               <q-list>
               <q-expansion-item
                 group="faqgroup"
                 label="1)  How to upload my recipe?"
               >
                 <q-card>
                   <q-card-section>
                     Please follow these guidelines- <a href="#" data-bs-toggle="modal" data-bs-target="#recipeupload">How to upload recipes?</a>
                   </q-card-section>
                 </q-card>
               </q-expansion-item>

               <q-expansion-item group="faqgroup" label="2)  How to Sign up?">
                 <q-card>
                   <q-card-section>
                     Please follow these guidelines- <a href="#" data-bs-toggle="modal" data-bs-target="#signup">How to Sign up?</a>
                   </q-card-section>
                 </q-card>
               </q-expansion-item>


               <q-expansion-item group="faqgroup" label="3)  Why should I upload on Foodism?" >
                 <q-card>
                   <q-card-section>
                     Foodism is the only platform that revolves around food and gives its users the opportunity to connect. Create & collaborate with users & brands. It’s the perfect platform to create your food community.
                   </q-card-section>
                 </q-card>
               </q-expansion-item>

             </q-list>
             </div>
             <div class="text-center q-mt-lg">
               <router-link class="btn btn1" :to="{ name: 'web-faq' }">View More</router-link>
             </div>
           </div>
           </div> -->
     </div>
  </q-page>
  <q-dialog class="web-center-popup" v-model="signupform">
     <q-card>
        <div class="web-signin web-signup">
           <!-- <div class="">
              <h4 class="flex"><q-img src="~assets/logo1.png"></q-img>Sign in</h4>
              </div> -->
           <q-card-section class="row items-center q-pb-none">
              <h4 class="flex">
                 <q-img src="~assets/logo1.png"></q-img>
                 Sign Up
              </h4>
              <q-space />
              <!-- <q-btn icon="close" flat round dense v-close-popup /> -->
           </q-card-section>
           <q-card-section>
              <div>
                <template v-if="!otpSent">
                    <p class="text-subtitle1 text-red text-center"><strong>{{ $q.lang.authentication.signup.lable }}</strong></p>
                    <div class="row q-my-sm justify-center">
                       <q-icon class="q-mx-md" name="img:/images/google.png" size="lg">
                          <q-tooltip>Google</q-tooltip>
                       </q-icon>
                       <!-- <q-icon class="q-mx-md" name="img:/images/240px-Apple-logo.png" size="lg" color="white"><q-tooltip>Apple</q-tooltip></q-icon> -->
                       <q-icon class="q-mx-md" name="img:/images/733547.png" size="lg">
                          <q-tooltip>Facebook</q-tooltip>
                       </q-icon>
                    </div>
                    <p class="text-weight-bold text-red text-center"><strong>{{ $q.lang.label.or }}</strong></p>
                    <q-form @submit="getOTP" @reset="onReset" class="form" ref="registerForm">
                       <div class="">
                          <div class="row">
                             <div class="col-3">
                                <q-select
                                   v-model="countrycode"
                                   :options="options"
                                   :label="$q.lang.authentication.signup.isdCode.label"
                                   :placeholder="$q.lang.authentication.signup.placeHolder"
                                   :rules="[
                                   (val) => required(val, 'country code'),
                                   ]"
                                   />
                             </div>
                             <div class="col-9 q-pl-md">
                                <q-input
                                   type="number"
                                   v-model="phone"
                                   :label="$q.lang.authentication.signup.mobile.label"
                                   :placeholder="$q.lang.authentication.signup.mobile.placeHolder"
                                   :dense="dense"
                                   :rules="[
                                   (val) => required(val, 'mobile number'),
                                   (val) => isNumber(val, 'mobile number'),
                                   (val) => min(val, 10, 'mobile number'),
                                   (val) => max(val, 10, 'mobile number'),
                                   ]"
                                   />
                             </div>
                          </div>
                          <div class="">
                             <div class="row">
                                <div class="col-12">
                                   <q-input
                                      v-model="name"
                                      :label="$q.lang.authentication.signup.name.label"
                                      :placeholder="$q.lang.authentication.signup.name.placeHolder"
                                      :dense="dense"
                                      :rules="[
                                      (val) => required(val, 'name'),
                                      ]"
                                      />
                                </div>
                             </div>
                          </div>
                          <!-- <div class="row">
                             <div class="col-12">
                               <q-input
                                 v-model="email"
                                 :label="$q.lang.authentication.signup.email.label"
                                 :placeholder="$q.lang.authentication.signup.email.placeHolder"
                                 :dense="dense"
                                 :rules="[
                                   (val) => required(val, 'email'),
                                   (val) => isEmail(val),
                                 ]"
                               />
                             </div>
                             </div> -->
                          <div class="row">
                             <div class="col-12">
                                <q-input
                                   v-model="email"
                                   :label="$q.lang.authentication.signup.email.label"
                                   :placeholder="$q.lang.authentication.signup.email.placeHolder"
                                   :dense="dense"
                                   :rules="[
                                   (val) => required(val, 'email'),
                                   (val) => isEmail(val),
                                   ]"
                                   />
                             </div>
                          </div>
                          <div class="login-con">
                             <q-toggle
                                v-model="accept"
                                label=""
                                :rules="[
                                (val) => (val == true) || $q.lang.authentication.signup.accept.requiredMessage,
                                ]"
                                />
                             <span>I accept </span>
                             <router-link :to="{ name: 'terms-and-condition' }"> {{ $q.lang.general.terms }}</router-link>
                             <span> and </span>
                             <router-link :to="{ name: 'pricacy' }"> {{ $q.lang.general.privacy }}</router-link>
                          </div>
                       </div>
                       <div class="form-btm q-pt-md">
                          <q-btn class="btn btn1 q-mr-md" :label="$q.lang.label.login" @click="getOTP()" />
                          <q-btn class="btn btn3" :label="$q.lang.label.sendOTP" @click="getOTP()" />
                       </div>
                    </q-form>
                 </template>
                 <template v-if="otpSent">
                    <q-form @submit="onSubmit" @reset="onReset" class="form" ref="otpForm">
                       <div class="submit-otp q-pb-md">
                          <p class="q-mb-sm">Enter OTP</p>
                          <div class="otp-digit">
                             <otp-input
                                v-model="otp"
                                :rules="[
                                (val) => required(val, 'otp'),
                                ]"
                                ref="otpInput"
                                input-classes="otp-input"
                                separator="-"
                                :num-inputs="6"
                                inputClasses="q-mr-md"
                                :should-auto-focus="true"
                                :is-input-num="true"
                                @on-change="handleOnChange"
                                @on-complete="handleOnComplete"
                                />
                             <!-- <button @click="handleClearInput()">Clear Input</button> -->
                          </div>
                       </div>
                       <div class="submit-otp q-pb-md">
                          <p class="q-mb-sm">resendOTP in: {{ timerCount }}</p>
                       </div>
                       <div class="form-btm q-pb-lg q-pt-md">
                          <p v-if="verifyingOTP"> Verifying </p>
                          <q-btn class="btn btn1 q-mr-md" :label="$q.lang.label.resendOTP" @click="resendOTP()" :disabled="isDisabled" />
                          <q-btn type="submit" class="btn btn3" :label="$q.lang.label.submit" @click="onSubmit" />
                       </div>
                    </q-form>
                 </template>
              </div>
           </q-card-section>
        </div>
     </q-card>
  </q-dialog>
</template>
<script>
  import { defineComponent, defineAsyncComponent, computed } from 'vue';
  import { useQuasar , openURL } from 'quasar';
  import { ref } from 'vue'
  import { mapActions } from "vuex";
  import { useStore } from 'vuex'
  import { LocalStorage, SessionStorage } from 'quasar';
  import { Platform } from 'quasar';
  import api from '../../apis/index';

  export default defineComponent({
    name: 'Webhome',

    setup () {
      const store = useStore()
      return {
        slide: ref(1),
        autoplay: ref(true),
        signupform: ref(false),
        isLoggedIn: computed( () => {
          return store.getters['auth/isLoggedIn'];
        }),
      }
    },
    data() {
      return{
        phone: ref(null),
        name: ref(null),
        email: ref(null),
        password: ref(null),
        dense: ref(false),
        accept:ref(false),
        countrycode: ref("+91"),
        options: ['+91', '+1', '+6'],
        otpSent: false,
        verifyingOTP: false,
        timerCount: 0,
        isDisabled: true,
        gotoURL(url) {
          openURL(url)
        },
        getBlogData:[],
      }

    },
    components:{
      'otp-input': defineAsyncComponent(() => import('components/auth/otp-input.vue')),
    },
    methods: {
      ...mapActions({
        sendOTP: "auth/sendOTP",
        verifyOTP: "auth/verifyOTP",
        resend: "auth/resendOTP",
      }),
      showForm() {
        this.$emit('changeform', { 'position': 'bottom', 'form' : 'sign-in' })
      },
      handleOnComplete(value) {
        console.log('OTP completed: ', value);
        this.otp = value;
        this.onSubmit();
      },
      handleOnChange(value) {
        this.otp = value;
        console.log('OTP changed: ', value);
      },
      handleClearInput() {
        this.$refs.otpForm.clearInput();
      },
      getOTP() {
        this.timerCount=30;
        this.isDisabled= true,
        this.$refs.registerForm.validate().then((success) => {
          console.log('success', success)
          if( !success ) {
            return;
          }

          if( success && !this.accept ) {
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'error',
              message: 'Please accept the license and terms',
            })
            return
          }

          const phoneNumber = this.countrycode+this.phone;

          this.sendOTP({
            task: 'register',
            phone_number: phoneNumber,
            name: this.name,
            email: this.email,
            password: this.password,
            accept: this.accept,
          }).then((result) => {
              this.otpSent = true; // show otp form
              console.log(result);
            })
            .catch((err) => {
              console.log(err);
            });
        })
      },
      resendOTP() {
        this.timerCount=30;
        this.isDisabled=true;
        const phoneNumber = this.countrycode+this.phone;
        this.resend({
          phone_number: phoneNumber,
        }).then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
      },
      onSubmit(e) {
        this.$refs.otpForm.validate().then((success) => {
          console.log("success", success);
          if (success) {

            this.$q.notify({
              spinner: true,
              message: 'Please wait... Verifying OTP',
              timeout: 1000
            })

            this.verifyingOTP = true;

            const phoneNumber = this.countrycode+this.phone;
            if(Platform.is.android){
              var device_name = "Android";
            }else{
               var device_name = "IOS";
            }

            this.verifyOTP({
              task: 'register',
              phone_number: phoneNumber,
              otp: this.otp,
              device_name:device_name,
              device_token:LocalStorage.getItem("fcmtoken"),
            }).then((result) => {
              if(result.success) {
                this.$store.dispatch('auth/me');
                this.verifyingOTP = false;
                console.log(result);
                this.$router.push({ name: 'user-detail' });
              }
            })
            .catch((err) => {
              console.log(err);
            });
          } else {
            this.$q.notify({
              color: "red-5",
              textColor: "white",
              icon: "error",
              message: "Please fill all required details",
            });
          }
        });
      },
      getBlog () {
        // var getEventData = [];
        api.get('/blog').then(res => {
          // console.log(res.data);
          for(var i in res.data) {
            if(i < 3){
            this.getBlogData.push(res.data[i]);
            }
          }
          console.log(this.getBlogData);
      }).catch(err => {
        console.log(err);
        reject(err)
      });
      },
      getBlogImage(img){
        console.log();
        return (
          process.env.ASSET_URL+img
        )
      },
    },
    created () {
      this.getBlog();
      // console.log(this.getBlogData);
    },
    watch: {
              timerCount: {
                  handler(value) {

                      if (value > 0) {
                          setTimeout(() => {
                              this.timerCount--;
                          }, 1000);
                      }
                      if(value <= 0){
                        this.isDisabled=false;
                      }

                  },
                  immediate: true // This ensures the watcher is triggered upon creation
              }

          }
  })
</script>
