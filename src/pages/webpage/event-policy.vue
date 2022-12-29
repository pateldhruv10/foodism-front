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
                <li><router-link :to="{ name: 'pricacy' }">Privacy Policy</router-link></li>
                <li><router-link :to="{ name: 'terms-and-condition' }">Terms & Condition</router-link></li>
                <li class="active"><router-link :to="{ name: 'event-policy' }">Event Policy</router-link></li>
                <li><router-link :to="{ name: 'cookies-policy' }">Cookies Policy</router-link></li>

              </ul>
            </div>
          </div>
          <div class="col-md-9 right-content">
            <section class="" id="four" ref="event_policy">
              <div class="pt-5">
                <h2 class="h1 mb-4">Event Policy</h2>
                <p>The following pages contain Foodism’s Terms and Conditions ("Terms") applicable to the Event, in relation to the registration, participation in online voting (if any), and where applicable cancellation of the attendees ("you", "your", "yours") of the Event whether physical or virtual with the use of video or web conferencing tools/platforms. We reserve the right to reject any request notably for an Event, it deems inappropriate.</p>
                <p>Foodism (“we, “our”, “us”) provides a platform for users to host events and share such events on various platforms. Foodism may itself host or arrange some events for its users and the general public to participate on its platform. This policy governs all the rules and matters related to hosting events and participating in such events.</p>
                <div class="mb-5">
                  <h3>Binding Effect</h3>
                  <p>Upon submission of your completed online registration form, you are considered ‘registered’ (pending payment, where applicable). Please note that by submitting your registration, you agree to these Terms without modification and you enter into a binding contract with us when resgistering for the Event (including if the Event is free of charge).</p>
                  <p>Where no online registration form is required by us, you may be invited via other means (e.g. Outlook or other tools) to attend the Event. In such circumstances, you agree to these Terms without modification and you enter into a binding contract with us when you purchase a ticket, follow the subscription process applicable for the Event (including if the Event is free of charge). Upon submission of your subscription you are considered “registered” (pending payment, where applicable).</p>

                </div>

                <div class="mb-5">
                  <h3>Event Changes</h3>
                  <div class="">
                    <p>It may be necessary to change the Event content and timing of any programme, the speakers, the date or the venue at any time prior to the Event. In that case, we will notify you and you will be given the opportunity to cancel your registration, according to the terms contained herein. Should you decide to cancel your registration for these grounds, we are neither responsible nor liable for any costs and/or expenses you may incur due to the cancellation of your registration.</p>
                    <p>It may sometimes happen that our Hosting Partner/s may at any time, with or without giving notice, in its absolute discretion and without giving any reason, cancel your registration and/or cancel or postpone the Event, whether physical or virtual, change its venue or any of the other published particulars, or withdraw any invitation to attend. In case of cancellation of your registration by the Hosting Partner/s and/or cancellation of the Event by the Hosting Partner/s, the paid Event fees (if any) will be reimbursed to you in due time, if Foodism genuinely feels the need to do so, looking at the circumstances. We will carry out such reimbursement using the same means of payment as you used for the initial transaction, unless you have expressly agreed otherwise. In case of postponement of the Event, the paid Event fees (if any) will not be refunded by the Hosting Partner/s. Should the Event be postponed or cancelled, we are not responsible nor liable for any costs and/or expenses you may incur due to the postponement and/or cancellation of the Event.</p>
                  </div>
                </div>
                <div class="mb-5">
                  <h3>Fees Payment</h3>
                  <div class="">
                    <p>If the Event is not free of charge, you undertake to pay the relevant fees (all taxes included) as specified on the registration form if you wish to attend the Event. The fees shall be paid in accordance with the conditions set out on the registration form. In the absence of specific conditions on the registration form, the fees shall be paid in accordance with the payment terms as set out on the invoice, but in any case, before the beginning of the Event.</p>

                  </div>
                </div>
                <div class="mb-5">
                  <h3>Conformation of Registration</h3>
                  <div class="">
                    <p>You agree and understand that your registration for the Event is subject to our confirmation that will be sent to you via email. We are entitled to deny your registration without cause.</p>

                  </div>
                </div>
                <div class="mb-5">
                  <h3>Cancellation</h3>
                  <div class="">
                    <p>If the Event is free of charge, we kindly ask you to inform us should you suddenly not be able to participate. That way, we can admit prospective participants on the waiting list to participate instead.  In the absence of specific conditions, cancellation is possible up to two (2) weeks (fourteen (14) calendar days) before the start of the Event without payment of any cancellation fees except for the credit card transaction fee. Under no circumstances, the user can cancel the event 48 hours prior to the starting date. All the requisite changes, extensions and other modifications are possible prior to 48 hours of the starting date of the event.</p>
                  </div>
                </div>
                <div class="mb-5">
                  <h3>Data Protection</h3>
                  <div class="">
                    <p>By registering and/or by participating to the Event wherever physically or virtually via video conferencing or web conferencing platforms/tools, you acknowledge that your personal data will be collected and processed by us in order to organize such Event and manage your participation, as further detailed in our Privacy Policy which you acknowledge having read.</p>

                  </div>
                </div>
                <div class="mb-5">
                  <h3>Contract with Third Party Websites and or platforms</h3>
                  <div class="">
                    <p>You may be required to register for and/or participate in the Event via third-party registration websites and/or video conferencing or web conferencing platforms/tools. We make no representation or warranties and shall have no liability or obligation whatsoever in relation to the content and/or your use of any such third-party website and/or platforms/tools, and any contract and/or terms of use you may have entered into and/or accepted with any such third party is strictly between you and the relevant third party.</p>

                  </div>
                </div>
                <div class="mb-5">
                  <h3>Photography and Filming</h3>
                  <div class="">
                    <p>By registering and/or by participating in the Event/s wherever physically or virtually via video conferencing or web conferencing platforms/tools, you acknowledge that certain sessions and/or social functions may be, photographed and/or filmed and/or web-streamed and that some of these photos and video recordings can be used for the minutes of Event/meeting, news, promotional purposes, future marketing materials, illustration, information and dissemination activities via Foodism’s own websites or inclusion on Foodism’s social media pages which may process personal data according to their own policies.</p>
                    <p>Participation in the Event (whether online or not), indicates your consent to being included in the meeting’s recording. Should you have any concerns about this, or do not wish to be featured in any of these materials, please approach the Event planner and inform her/him on the day of the Event. However you are advised that incidental inclusion of some images of yourself within any recording or photos may take place. Photos and recordings will be publicly available.</p>
                  </div>
                </div>
                <div class="mb-5">
                  <h3>Recordings and Your Materials</h3>
                  <div class="">
                    <p>You grant us, our affiliates, and our independent contractors the right to record, film, photograph, and capture your voice and image in any media at the Event (the “Recordings”). You grant to Foodism and its affiliates, agents, employees, and assign an irrevocable, nonexclusive, perpetual, worldwide, royalty- free right and license to use, reproduce, modify, distribute, and translate, for any purpose relating to our business, all or any part of the Recordings and Your Materials.  We may edit the Recordings and Your Materials, use them alone or together with other information, and allow others to use and disseminate them. To the maximum extent permitted by law, you waive any moral rights you may have in the Recordings and Your Materials.  You represent and warrant that (a) Your Materials are true and accurate to the best of your knowledge, (b) you have the necessary rights and permissions to grant the license in this Section and that your Materials do not violate or infringe any copyright, trademark, or other proprietary rights of any person or entity.</p>
                  </div>
                </div>
                <div class="mb-5">
                  <h3>Conduct at the event/s</h3>
                  <div class="">
                    <p>We are dedicated to making the Event a safe place for all.</p>
                    <p>You shall not display any content, adopt conduct, or incite any person to commit an act, which:</p>
                    <ul>
                      <li>is threatening, libellous, defamatory, or obscene;</li>
                      <li>would constitute a criminal offense, give rise to civil liability, or otherwise violate law in any manner;</li>
                      <li>infringes the intellectual property, privacy, or other rights of any third parties; or</li>
                      <li>constitutes or contains false or misleading statements.</li>
                    </ul>
                    <p>You consent also not to hack or use our infrastructure for unethical, illegal or malicious activities. We may at any time, with or without giving notice, in our absolute discretion, rescind your registration or attendance at the Event in case of violation of these Terms without incurring any liabilities to you and/or any third party. In such an event, all paid Event fees will not be reimbursed, and all Event fees shall remain due.</p>
                  </div>
                </div>
                <div class="mb-5">
                  <h3>Assumption of Risk</h3>
                  <div class="">
                    <p>You acknowledge and agree that your attendance and participation in the Event is voluntary, and you understand the nature of the Event/s. To the maximum extent permitted by law, you agree that you solely assume the risks associated with attending and participating in the Event/s.</p>

                  </div>
                </div>
                <div class="mb-5">
                  <h3>Limitations of Liability</h3>
                  <div class="">
                    <p>WE AND OUR AFFILIATES AND LICENSORS WILL NOT BE LIABLE TO YOU UNDER ANY CAUSE OF ACTION OR THEORY OF LIABILITY, EVEN IF A PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, FOR (A) INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, OR (B) LOST PROFITS, REVENUES, CUSTOMERS, OPPORTUNITIES, OR GOODWILL. IN ANY CASE, OUR AND OUR AFFILIATES’ AND LICENSORS’ AGGREGATE LIABILITY UNDER THESE TERMS WILL NOT EXCEED THE PARTICIPATION FEE PAID BY YOU. THE LIMITATIONS IN THIS SECTION APPLY ONLY TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW.</p>
                  </div>
                </div>
                <div class="mb-5">
                  <h3>Force Majeure</h3>
                  <div class="">
                    <p>Foodism will not be held liable for delay in delivery, or failure to deliver due to any cause outside of the College’s reasonable control. A Force Majeure event means any event which is beyond our and/or your reasonable control, including but not limited to, Act of God, fire, flood, lightening, storm, earthquake or other climatic or meteorological catastrophes, failure or delay of common carrier or impairment or lack of adequate transportation facilities, accident or repair to machinery, act of sabotage including but not limited to piracy or hacking, embargo, government requirement or action. Performance under these Terms is deemed to be suspended for the period that the Force Majeure event continues to affect performance. We and/or you will use our reasonable endeavors to bring the Force Majeure event to a close or to find a solution by which our and/or your obligations under these Terms may be performed despite the Force Majeure event.</p>
                  </div>
                </div>
                <div class="mb-5">
                  <h3>Governing Law & Jurisdiction</h3>
                  <div class="">
                    <p>You agree that these Terms will be exclusively governed by the laws of India, without giving effect to any conflicts of law principles. Any dispute, claim or controversy arising out of, connected with or relating to the conclusion, validity, interpretation or performance of these Terms and/or ulterior agreements that could arise therefrom, will be under the exclusive jurisdiction of the competent courts of Ahmedabad, Gujarat.</p>
                  </div>
                </div>
                <div class="mb-5">
                  <h3>Entire Agreement</h3>
                  <div class="">
                    <p>These Terms constitute the entire agreement and understanding between you and Foodism and they supersede all previous agreements, arrangements and understandings between you and Foodism relating to the same subject matter. You confirm that you have not relied upon any statement, representation or understanding that is not expressly set out in these Terms and that you shall have no remedy in respect of any statement, representation or understanding which is not expressly set out in these Terms. You are invited to regularly refer to the latest Terms in effect when you proceed to registration and/or subscription.</p>
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
  name: 'EventPolicy',
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
