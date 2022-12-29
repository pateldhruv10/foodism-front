import { LocalStorage } from "quasar";

export default function () {
  return {
    currentTab: LocalStorage.getItem('currentTab') ?? "recipes",
    // currentProfileTab : LocalStorage.getItem('currentProfileTab') ?? "Videos",
    eventTab: LocalStorage.getItem('eventTab') ?? "current",
    eventType: LocalStorage.getItem('eventType') ?? null,
    recipeTab: LocalStorage.getItem('recipeTab') ?? "allrcp",
    events: [],
    profile: [],
    event: {},
    myInterested : [],
    filter: {
      city: false,
      filter: [],
      sort: 'c2u'
    },
    cuisines: [
      {
        image: "../../assets/img1.jpg",
        title: "Indian",
        slug: "/bakery",
      },
      {
        image: "../../assets/img1.jpg",
        title: "mexican",
        slug: "/bakery",
      },
      {
        image: "../../assets/img1.jpg",
        title: "italian",
        slug: "/bakery",
      },
      {
        image: "../../assets/img1.jpg",
        title: "french",
        slug: "/bakery",
      },
      {
        image: "../../assets/img1.jpg",
        title: "thai",
        slug: "/bakery",
      },
      {
        image: "../../assets/img1.jpg",
        title: "Chinesex",
        slug: "/bakery",
      },
      {
        image: "../../assets/img1.jpg",
        title: "Continental",
        slug: "/bakery",
      },
      {
        image: "../../assets/img1.jpg",
        title: "Fusion",
        slug: "/bakery",
      },
    ],
    toppicks: [
      {
        image: "../../assets/img1.jpg",
        title: "Fruit Caramel Custard",
        slug: "/frout-caramel-custard",
        discount: '10% off',
        tag: "New",
        price: '430',
      },
      {
        image: "../../assets/img1.jpg",
        title: "Fruit Caramel Custard",
        slug: "/frout-caramel-custard",
        discount: '10% off',
        tag: "New",
        price: '330',
      },
      {
        image: "../../assets/img1.jpg",
        title: "Fruit Caramel Custard",
        slug: "/frout-caramel-custard",
        discount: '5% off',
        tag: "New",
        price: '230',
      },
      {
        image: "../../assets/img1.jpg",
        title: "Fruit Caramel Custard",
        slug: "/frout-caramel-custard",
        discount: '15% off',
        tag: "New",
        price: '530',
      },
    ],
    popularsellers: [
      {
        title: "Sangita Kitchen",
        slug: "/sangita-kitchen",
        image: "../../assets/lg1.png"
      }
    ],
    occasions: [
      {
        title: "Diwali",
        slug: "/diwali",
        image: "../../assets/oc1.jpg"
      },
      {
        title: "Diwali",
        slug: "/diwali",
        image: "../../assets/oc1.jpg"
      },
      {
        title: "Diwali",
        slug: "/diwali",
        image: "../../assets/oc1.jpg"
      },
      {
        title: "Diwali",
        slug: "/diwali",
        image: "../../assets/oc1.jpg"
      },
    ],
    popularfoods: [
      {
        title: "1 Summer Sun lceream with chocolate",
        slug: "/summer-sun-lceream-with-chocolate",
        tag: "New",
        kitchenTitle: "Sangita Kitchen",
        kitchenRating: "3.5",
        originalPrice: "430",
        sellingPrice: "330",
        discount: "10% off",
      },
      {
        title: "2 Summer Sun lceream with chocolate",
        slug: "/summer-sun-lceream-with-chocolate",
        tag: "New",
        kitchenTitle: "Sangita Kitchen",
        kitchenRating: "3.5",
        originalPrice: "430",
        sellingPrice: "330",
        discount: "10% off",
      },
      {
        title: "3 Summer Sun lceream with chocolate",
        slug: "/summer-sun-lceream-with-chocolate",
        tag: "New",
        kitchenTitle: "Sangita Kitchen",
        kitchenRating: "3.5",
        originalPrice: "430",
        sellingPrice: "330",
        discount: "10% off",
      }
    ]
  }
}
