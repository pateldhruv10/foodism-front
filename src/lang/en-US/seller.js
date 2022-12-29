export default {
  becomeSeller: {
    title: "Business Account",
    description: "Display your products and Services on Foodism <br>and grow your audience.",
    createButton: "Create your business account",
    list: {
      title1: "Gain leverage with a niche audience",
      title2: "Market yourself right",
      title3: "Connect with a potential clientele",
      title4: "Collaborate with the influencer of the food industry",
    },
    form: {
      step: "Step",
      step1: {
        title: "About Your Business",
        fields: {
          logo: {
            label: "Your Business Logo",
            placeHolder: "Ex.Johan's Kitchen",
          },
          name: {
            label: "Business Name*",
            placeHolder: "Ex.Johan's Kitchen",
          },
          username: {
            label: "Business Handle Name*",
            placeHolder: "Ex. @johankitchen",
          },
          email: {
            label: "Business Email*",
            placeHolder: "Ex.johankitchen@gmail.com",
          },
          mobile: {
            label: "Business Contact No*",
            placeHolder: "Ex.0000000000",
          },
          isdCode: {
            label: "ISD Code",
            placeHolder: "Select ISD Code",
          },
          otp: {
            label: "OTP",
            placeHolder: "Enter OTP",
          },
        }
      },
      step2: {
        title: "Categories",
        error: "Please select atLeast one category",
      },
      step3: {
        title: "Location",
        //description: "Description",
        shortDescription: "Do you have a kitchen, a warehouse, a store, a café, a cloud kitchen – we’d love to know where it is/they are!",
        addLocation: "Add Location",
      },
      step4: {
        title: "Business Portfolio",
        addOtherLink: "Add other link",
      },
      step5: {
        title: "Your License Details",
        fields: {
          gstNo: {
            label: "GST No",
            placeHolder: "Enter your GST Number",
          },
          fssaiNo: {
            label: "Fssai license No.",
            placeHolder: "Enter your Fssai license Number",
          },
        }
      },
    },
    thankyou: {
      title: "Thanks for Applying",
      description: "We shall send you a notification once <br> your Seller profile is approved.",
    }
  }
}
