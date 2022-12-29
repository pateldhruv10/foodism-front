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
                <li><router-link :to="{ name: 'community-guideline' }">Community Guidelines</router-link></li>
                <li class="active"><router-link :to="{ name: 'pricacy' }">Privacy Policy</router-link></li>
                <li><router-link :to="{ name: 'terms-and-condition' }">Terms & Condition</router-link></li>
                <li><router-link :to="{ name: 'event-policy' }">Event Policy</router-link></li>
                <li><router-link :to="{ name: 'cookies-policy' }">Cookies Policy</router-link></li>

              </ul>
            </div>
          </div>
          <div class="col-md-9 right-content">
            <section class="" id="two" ref="privacy_policy">
              <div class="pt-5">
                <h2 class="h1 mb-4">Privacy Policy</h2>
                <div class="mb-5 mt-5">
                  <h3>Introduction</h3>
                  <p>Foodism.xyz PrivateLimited, including our subsidiary (ies) and/or affiliate(s), (hereinafter referred to as <strong>“Foodism/ we/ our/ Company”</strong>) acknowledges the expectations of its users (hereinafter referred to as <strong>“User/ you/ your”</strong>)regarding privacy, confidentiality, processing and security of personal information that resides with Foodism. Keeping the personal information of users secure and preventing any misuse thereof, is, therefore, a top priority of Foodism.</p>
                  <p>We are strongly committed to protecting the privacy of our users and have taken all necessary and reasonable measures in line with the best industry practice to protect the confidentiality of your personal information and its transmission through our website/applications.</p>
                  <p>This Privacy Policy(hereinafter referred to as <strong>“Policy”</strong>) therefore, explains how we and/or our subsidiary (ies) and/or affiliate(s) protect your personal information provided to us on our website/application (jointly referred to as <strong>“Website”</strong>)and how we use that information in connection with the service offered through the website/application (hereinafter called as <strong>"services"</strong>) and must be read in conjunction with our Terms of Service.</p>
                  <p>Please read this Privacy Policy and understand it before using our services. By visiting and/or availing services on this Website, you agree and, where required, consent to the collection, use and transfer of your information as set out in this policy and you agree to be legally bound by this Privacy Policy and any code of conduct or amendments thereof that we may put forth from time to time. If you do not agree with this policy, please do not use or access the website/application.</p>
                  <p>By using this site, you represent that you are at least the age of majority in your state or country of residence and you have given us your consent to allow any of your minor dependents to use this site.</p>
                  <p><em>This Policy is published and shall be construed to be in accordance with the provisions of the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules,2011 under the Information Technology Act, 2000 and other applicable laws that require publishing of the privacy notice for collection, usage, storage, disclosure and transfer of sensitive personal data or information.</em></p>

                </div>

                <div class="mb-5">
                  <h3>Collection of Information</h3>
                  <div class="">
                    <p>While you use our platforms, we may collect and process personal information (personally identifiable or potentially personally-identifiable) about you when you voluntarily provide us with such information. The personal information that we collect may include your name, surname, email address, phone number, postal address, social security number, identification number, date of birth, transaction information, payment card information amongst the others. If you contact us, we may also keep a record of the correspondence. We collect all the information to carry out the functions offered on the Website and to provide you with offers and information about Foodism and other services we think you may be interested in. We might collect this personal information through your interaction on our platform, entry into competitions; subscribing to our newsletter; creating a user account; sending 'contact us' messages or other correspondence through the Website.</p>
                    <p>When you visit our Website and/or use our services, we automatically collect the information sent to us by your computer, mobile device or other equipment that provide access. This information includes, but is not limited to information from your interaction with our Website and Services, including, but not limited to, device ID, device type, geo-location information, computer and connection information, statistics on page views, traffic to and from our website, referring URL, ad data, IP address and standard web log information. We may collect this information in the background even if you are not actively using the Website/application.</p>
                    <p>Further, Foodism may use analytics services provided by third parties. These service providers may use various technologies to collect information about your activities on the Website/application. You may also be able to connect to the Foodism Website through social media platforms, programs or applications, such as Twitter, Google, Instagram, LinkedIn, Facebook or any other social media platform (“Social Media”), in which case we may collect your Social Media user name/ID, session key timestamps and your user profile picture, URL (if applicable) and list of friends/contact IDs etc.</p>
                    <p>Moreover, if you permit the Website/application to access the address book on your device through the permission system used by your device platform, we may access and store names, contact and messages information from your address book to facilitate any form of interactions through our Services and for other purposes specified in this Privacy Policy corresponding to our Terms of Use.</p>
                    <p>All the aforesaid information is service dependent and we may use the above-said user information to, maintain, protect, and improve services (including advertising services)and/or for developing new services. Users can always refuse to supply personally identifiable or any other information, with the condition that it may prevent them from engaging in certain website-related activities and functionalities.</p>
                  </div>
                </div>
                <div class="mb-5">
                  <h3>Usage of Information</h3>
                  <div class="">
                    <p>Foodism generally uses the information collected about you to provide and improve the Services, including to:</p>
                    <ul>
                      <li>Provide and deliver services;</li>
                      <li>Send you technical notices, updates, security alerts, notifications, support and administrative messages;</li>
                      <li>Provide you access to our Services and Customer Support using e-mail or telephone;</li>
                      <li>Respond to your comments, questions and requests and provide customer service;</li>
                      <li>Communicate with you about products, services, offers, promotions, rewards and events, if any, offered by Foodism and others and provide news and information we think will be of interest to you;</li>
                      <li>Monitor and analyse, usage and activities in connection with our services;</li>
                      <li>Revise, modify, and update existing services and develop new services;</li>
                      <li>Detect, investigate and prevent fraudulent transactions and other illegal activities and protect the rights of Foodism and others;</li>
                      <li>Personalise the service and present you with advertising, content or features that we believe will be of interest or useful to you;</li>
                      <li>Facilitate contests, sweepstake, promotions, process and deliver entries and rewards;</li>
                      <li>Establish or exercise our legal rights or defend against legal claims;</li>
                      <li>Trace computer resources or any person who may have contravened, or is suspected of having or being likely to contravene, any provision of law including the Information Technology Act,2000 that is likely to have an adverse impact on the services provided on the Website;</li>
                      <li>Link or combine with information we get from others to help understand your needs and provide you with better service; and</li>
                      <li>Carry out any other purpose described to you at the time the information was collected.</li>`
                    </ul>
                    <p>We may disclose any information we receive or collect in connection with your use of the Website to the extent that we determine in good faith to be required by any applicable laws, rules, regulations, order or in the enforcement of our rights or property or the defence of claims. Without limiting the foregoing and in addition, thereto, we may transfer your information to another entity if we are acquired by or merged with another entity if all or substantially all of our assets or business are acquired by another company, or as part of bankruptcy proceedings.</p>

                  </div>
                </div>
                <div class="mb-5">
                  <h3>Information Usage for Advertising</h3>
                  <div class="">
                    <p>We may use your history to help us and other third party brands present advertisements that are more relevant to you on our website and third-party websites, mobile applications and other digital media channels. We will not increase the number of ads you see but instead will help deliver more personalized advertisements and offerings to you.</p>
                    <p>Interest-based advertising, generally called “online behavioural advertising” uses information collected from your online behaviour across multiple websites that you visit, or across multiple devices you may use, in order to predict your preferences and show you ads that are most likely to be of interest to you. In an effort to provide you with relevant content and offers that may be useful to you, we may partner with third-party companies to display content, offers or advertising that is tailored to your interests based on how you browse and shop online. These third-party companies use information and technologies such as browser type, hardware or software information, cookies, session ID, time or date, click-stream information or static IP addresses. We may provide your personal information to third-party companies that display purchase-based or interest-based ads. In addition, others (advertisers and ad networks, ad serving companies, or other service providers) may infer user interests or purchase history based on interactions with, or clicks on, personalized ads or content.</p>

                  </div>
                </div>
                <div class="mb-5">
                  <h3>Information Security</h3>
                  <div class="">
                    <p>To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.</p>
                    <p>All the information described above is stored on restricted database servers. Foodism also has in place reasonable administrative, technical, and physical safeguards to protect the confidentiality, security, and integrity of personal information. Foodismmakes persistent efforts to take appropriate security measures to protect against unauthorized access to or unauthorized alteration, disclosure or destruction of data including but not limited to internal reviews of our data collection, storage and processing practices and security measures, including appropriate encryption and physical security measures to guard against unauthorized access to systems where personal data is stored. We will destroy any personal information that we hold about you that we no longer required under the terms of this Privacy Policy. Where you have chosen a password to access certain services of the Website, you are responsible for keeping your password confidential. We recommend not sharing your password with anyone.</p>
                    <p>All the information gathered is securely stored within our controlled database. The database is stored on servers secured behind a firewall; access to the servers is password-protected and is strictly limited. However, as effective as our security measures are, no security system is impenetrable. We cannot guarantee the security of our database, nor can we guarantee that information you supply will not be intercepted while being transmitted to us over the web. You can contact us immediately if you become aware or have reason to believe there has been any unauthorized use of your personal information in connection with the Website.</p>
                    <p>Foodism may give you access to message boards, forums or chat rooms from time to time. You acknowledge and agree that any personal data or any other kind of data published by you using these features is at your sole discretion and is accessible by the public.</p>
                  </div>
                </div>
                <div class="mb-5">
                  <h3>Data Protection and Confidentiality</h3>
                  <div class="">
                    <p>Besides the implementation of reasonable and adequate physical, technical and administrative security measures to protect personal information from loss, misuse, alteration or destruction, we ensure that the service providers are committed to the “same level of data protection” as applicable data protection laws and regulations. To ensure maximum confidentiality of all the information, we ensure that the data is processed fairly & lawfully; data is obtained only with the consent of the information provider; data is collected only when the information is collected for a lawful purpose connected with a function or activity to provide services and the collection of sensitive personal data or information is considered necessary for that purpose.</p>
                    <p>We further ensure that the data is kept secure against unauthorized or unlawful processing and against accidental loss, destruction or damage, as per the prescribed standards.</p>
                  </div>
                </div>
                <div class="mb-5">
                  <h3>Third-party Services</h3>
                  <div class="">
                    <p>Users acknowledge that we may engage the services of third parties to help us serve our customers better. In general, the third-party service providers engaged by us will only collect, use and disclose your information to the extent necessary to allow them to perform the services they provide to us. However, certain third-party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies in respect to the information we are required to provide to them for your purchase-related transactions and they pursue their operations as per their privacy policies and they process your personal information accordingly.</p>
                  </div>
                </div>
                <div class="mb-5">
                  <h3>Links to Third-party Websites</h3>
                  <div class="">
                    <p>Our Website contains links to third party websites. Any information you provide to, or that is collected by, third-party sites may be subject to the privacy policies of those sites if any. You may please take note that the third party websites are independent of the services provided by Foodism, and Foodism and its affiliates shall not be liable for wrongful use or disclosure of your personally identifiable information by any third party. When you click on third party links on our Website, we are not responsible for the privacy practices of other sites and for the loss or consequential damage that may be caused to you. We encourage you to review the privacy policy of any website before submitting your personal information.</p>
                    <p>Foodism hereby disclaims liability for, any information, materials, products or services posted or offered at any of the third-party sites linked to this website. By creating a link to a third-party website, Foodism does not endorse or recommend any products or services offered or information contained at that website, nor is Foodism liable for any failure of products or services offered or advertised at those sites. Such third party may have a privacy policy different from that of Foodism and the third-party website may provide less security than this site.</p>
                  </div>
                </div>
                <div class="mb-5">
                  <h3>User Rights</h3>
                  <div class="">
                    <p>Every user has the right to ask us not to process his/her data for marketing purposes. We will usually inform you (before collecting your data) if we intend to use your data for such purposes or if we intend to disclose your information to any third party for such purposes. You can exercise your right to prevent such processing by checking/ticking certain tick boxes we use to collect your data. You can also exercise the right at any time by contacting us using our contact details set out below.</p>
                  </div>
                </div>
                <div class="mb-5">
                  <h3>Grieveance Redressal</h3>
                  <div class="">
                    <p>If you have grievances, complaints, questions, comments, concerns or feedback in relation to the processing of information or regarding this Privacy and Security Policy or any other privacy or security concern, contact us at:</p>
                    <p><strong>Foodism.xyz Private Limited</strong></p>
                    <p>601, Sarap, B/h.Guj. Vidyapit Navjivan Press Road, </p>
                    <p>Ashram Road,Ahmedabad- 380014, Gujarat</p>
                  </div>
                </div>
                <div class="mb-5">
                  <h3>Modifications to the Policy</h3>
                  <div class="">
                    <p>We reserve the right to modify or revise this Privacy Policy at any time and our sole discretion. If we revise this Privacy Policy, we will make the revised Privacy Policy available through our Service. We encourage you to visit this Privacy Policy regularly to stay informed about our practices concerning your information and to learn of any changes to those practices. Your continued use of the Website will constitute acceptance of, and agreement to be bound by, those changes.</p>
                  </div>
                </div>
                <div class="">
                  <h3>Contact</h3>
                  <div class="">
                    <p>If you have any questions, comments or requests about this privacy policy, the practices of the Website or your dealings with the Website, please contact us at <a href="tel:+91 6359111000">+91 6359111000</a> or e-mail us at <a href="mailto:help@foodism.xyz">help@foodism.xyz.</a></p>
                  </div>
                </div>
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
  name: 'Privacy',
  setup () {
    return {
    }
  },
  methods: {
    goto(refName) {
    	var element = this.$refs[refName];
      console.log(element);
      var top = element.offsetTop;

      window.scrollTo(0, top);
    }
  }
})
</script>
