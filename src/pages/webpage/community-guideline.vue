<template>
  <q-page class="">
    <div class="help-center">
      <div class="container">
        <div class="row">
          <div class="col-md-3">
            <div class="fixed-left">
              <ul class="sidebar-nav">
                  <!-- <li class="nav-item active">
                    <button @click="goto('community_guidelines')">Community Guidelines</button>
                  </li>
                  <li class="nav-item">
                    <button @click="goto('privacy_policy')">Privacy Policy</button>
                  </li>
                  <li class="nav-item">
                    <button @click="goto('terms&condition')">Terms & Condition</button>
                  </li>
                  <li class="nav-item">
                      <button @click="goto('event_policy')">Event Policy </button>
                  </li>
                  <li class="nav-item">
                    <button @click="goto('cookies_policy')">Cookies Policy </button>
                </li> -->
                <li class="active"><router-link :to="{ name: 'community-guideline' }">Community Guidelines</router-link></li>
                <li><router-link :to="{ name: 'pricacy' }">Privacy Policy</router-link></li>
                <li><router-link :to="{ name: 'terms-and-condition' }">Terms & Condition</router-link></li>
                <li><router-link :to="{ name: 'event-policy' }">Event Policy</router-link></li>
                <li><router-link :to="{ name: 'cookies-policy' }">Cookies Policy</router-link></li>

              </ul>
            </div>
          </div>
          <div class="col-md-9 right-content">
            <section class="" id="one" ref="community_guidelines">
              <div class="">
                <h2 class="h1 mb-4">Community Guidelines</h2>
                <p>You understand that the Foodism Community comprises users from all over the world. Foodism cares deeply about the content posted on its platform and the manner in which the content is consumed by masses. The goal of our Community Guidelines has always been to create a place for expression and give people a voice to come out openly and discuss. This is a food, home chefs, recipes, blog and networking on these aspects related website and we do not support anything off-topic. However, as much as we wish that people may express themselves confidently, the Internet creates new and increased opportunities for abuse.</p>
                <p>For these reasons, we have listed down the guidelines that our users as a community must strictly abide by. If you come across any content that violates our guidelines or if you think is not acceptable, you may please contact us so that we can review it and take further steps.</p>
                <p>Your use of the Website is subject to all applicable laws and regulations, and you are solely responsible for the substance of your communications through the website/application and availing of services. Foodism aims to protect its users, viewers, creators and all other visitors of Foodism’s website. There is zero tolerance for nudity, sexual content, harmful or dangerous content, predatory behaviour, violent graphics, hate speech, harassment, cyber bullying or any other illegal content on Foodism.</p>
                <p>By posting information in or otherwise using any videos, blogs, communications service, chat room, message board, newsgroup, or other interactive services that may be available to you on or through our website/application, you agree that you will not upload, share, post, or otherwise distribute or facilitate distribution of any content - including text, communications, software, images, sounds, data, or other information that:</p>
                <ul>
                  <li class="pb-2">Is against someone’s safety, privacy and dignity and may cause potential harm or contains violence- related content or incitement to criminal behaviour;</li>
                  <li class="pb-2">Names organizations or individuals connected with publicizing crime, terrorist activity, organised hate, murder (including attempts) or multiple murder, human trafficking, organised violence or criminal activity;</li>
                  <li class="pb-2">Is fraudulent and deceptive or contains fake reviews;</li>
                  <li class="pb-2">Is unlawful, threatening, abusive, harassing, defamatory, libellous, deceptive, fraudulent, invasive of another's privacy, tortuous, contains explicit or graphic descriptions, fetish imagery, pornography or accounts of sexual acts (including but not limited to sexual language of a violent or threatening nature directed at another individual or group of individuals), or otherwise violates our rules or policies;</li>
                  <li class="pb-2">Victimizes, harasses, degrades, or intimidates an individual or group of individuals on the basis of religion, gender, sexual orientation, race, ethnicity, age, or disability;</li>
                  <li class="pb-2">Infringes on any patent, trademark, trade secret, copyright, right of publicity, or other proprietary rights of any party;</li>
                  <li class="pb-2">Constitutes unauthorized or unsolicited advertising, junk or bulk email (also known as "spamming"), chain letters, any other form of unauthorized solicitation, or any form of lottery or gambling;</li>
                  <li class="pb-2">Dehumanizes or incites violence or hatred against individuals or groups, based on the attributes listed above, including but not limited to claiming that they are physically or morally inferior, referring negatively to them as animals, inanimate objects, or other non-human entities or promoting or justifying exclusion, segregation, or discrimination against them;</li>
                  <li class="pb-2">Contains false news, manipulated media data, negative information that harms child safety and promotes suicide or self-injury. shows violent graphics;</li>
                  <li class="pb-2">Contains software viruses or any other computer code, files, or programs that are designed or intended to disrupt, damage, or limit the functioning of any software, hardware, or telecommunications equipment or to damage or obtain unauthorized access to any data or other information of any third party; or</li>
                  <li class="pb-2">Impersonates any person or entity, including any of our employees or representatives.</li>
                </ul>
                <p>We understand that the safety of our users is of paramount importance and it includes the security of their personal information accounts, profiles and other entities that they may manage. Attempts to gather sensitive personal information or engage in unauthorised access by deceptive or invasive methods are really harmful. Therefore, we do not allow attempts to gather sensitive user information or engage in unauthorised access through the abuse of our platform, products or services.</p>
                <p>We don’t allow content that reveals personal or sensitive information including but not limited to personal ID and passport information, private contact information and addresses, online login information (usernames and passwords), photos of private people that they don’t want posted online, personal financial or medical history. </p>
                <p>Also, Foodism is not a place for trading or selling certain regulated goods—products or substances that can cause harm when used, altered or manufactured irresponsibly—or for the display or encouragement of dangerous activities. including but not limited to alcohol, tobacco, drugs and weapons, including firearms and accessories, firearm parts or attachments, or ammunition.</p>
                <p>To respect the rights of people on and off Foodism, you are requested not to  infringe anyone's intellectual property, privacy or other rights, not do anything or post any content that violates laws or regulations and not use Foodism’s name, logo or trademark in a way that confuses people (check out our brand guidelines for more details).</p>
                <p>Moreover, once you publish your content, you may not click their own links or use any means to inflate impressions and/or clicks artificially, including manual methods or promoting others to do so. You must not indulge in spam and deceptive practices like fake engagement, impersonation or posting previously removed content.</p>
                <p>You as a user cannot troll, abuse or have indecent conversations on the Foodism platform. In general, Foodism expects you to be all things clean with no mala-fide intent. Be welcoming and open-minded, respect each other, communicate with empathy and keep it legal, clean, relevant and specific.</p>
                <p>You understand that you are responsible for your interactions with other users. We reserve the right, but have no obligation, to monitor disputes between you and other users.</p>
                <p>Foodism retains the right to remove the content, penalize your account and in some cases, terminate your account at its sole discretion. You, as a user, are also bound by the Privacy Policy of Foodism. Foodism constantly monitors the news, social media, and user reports to ensure that nothing affects the safety of others.</p>
                <p>Our Community Guidelines boil down to courtesy, basic respect and decency for all. We may update these guidelines and recommend you check back once in a while. We'll also continue to introduce new community features which will fall under these guidelines.</p>
                <p>You can email INSERT EMAIL ID with feedback, questions or issues about our online community.</p>
              </div>
            </section>
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
  name: 'CommunityGuideline',
  setup () {
    return {
    }
  },
  
})
</script>
