const SIAM = {

  BREAKFAST: {
    title: {
      en: 'Breakfast all day'
    },
//     American-Breakfast-300x300.jpg
// VM1165:14 English-Breakfast-300x300.jpg
// VM1165:14 EggTomatoAvocadoCheese-On-Toast-300x300.jpg
// VM1165:14 Tomato-HamCheese-Toastie-300x300.jpg
// VM1165:14 HamCheese-Croissant-with-Salad-300x300.jpg
// VM1165:14 Thai-Breakfast-Rice-Soup-with-Mice-Pork-300x300.jpg
// VM1165:14 Fruit-Platter-2-300x300.png
    items: [
      {
        "pid"  : 66,
        "name": "AMERICAN BREAKFAST",
        "img": "American-Breakfast-300x300.jpg",
        "price": 159
      },
      {
        "pid"  : 67,
        "name": "ENGLISH BREAKFAST",
        "img": "English-Breakfast-300x300.jpg",
        "price": 159
      },
      {
        "pid"  : 68,
        "name": "EGG,TOMATO,AVOCADO,CHEESE ON TOAST",
        "img": "EggTomatoAvocadoCheese-On-Toast-300x300.jpg",
        "price": 120
      },
      {
        "pid"  : 69,
        "name": "TOMATO HAM AND CHEESE TOASTIE",
        "img": "Tomato-HamCheese-Toastie-300x300.jpg",
        "price": 99
      },
      {
        "pid"  : 74,
        "name": "HAM AND CHEESE CROISSANT WITH SALAD",
        "img": "HamCheese-Croissant-with-Salad-300x300.jpg",
        "price": 150
      },
      {
        "pid"  : 75,
        "name": "THAI BREAKFAST : RICE SOUP WITH MICE PORK",
        "img": "Thai-Breakfast-Rice-Soup-with-Mice-Pork-300x300.jpg",
        "price": 80
      },
      {
        "pid"  : 76,
        "name": "FRUIT PLATTER",
        "img": "Fruit-Platter-2-300x300.png",
        "price": 90
      }
    ]
  },
//   Beef-Cheese-with-Fried-egg-Burger-300x300.jpg
// VM88:14 Chicken-and-Mango-salsa-Salad-Burger-300x300.jpg
// VM88:14 Brown-OnionAvocado-and-Feta-Cheese-Burger-e1547384110499-300x300.jpg
  BURGER: {
    title: {
      en: 'Burgers'
    },
    notes: [
      {
        en: 'All Burgers come with a free choice of chips, wedges or basic salad'
      }
    ],
    items: [
      {
        "pid"  : 84,
        "name": "BEEF & CHEESE WITH FRIED EGG BURGER",
        "price": 280,
        "img"   : "Beef-Cheese-with-Fried-egg-Burger-300x300.jpg",
        "options": {
          "side": ["fries", "wedges", "salad"],
          "cook": ["well done", "medium rare", "rare"]
        }
      },
      {
        "pid"  : 85,
        "name": "CHICKEN AND MANGO SALSA SALAD BURGER",
        "price": 250,
        "img"   : "Chicken-and-Mango-salsa-Salad-Burger-300x300.jpg",
        "options": {
          "side": ["fries", "wedges", "salad"],
          "cook": ["well done", "medium rare", "rare"]
        }
      },
      {
        "pid"  : 86,
        "name": "BROWN ONION,AVOCADO AND FETA CHEESE BURGER",
        "price": 220,
        "img"   : "Brown-OnionAvocado-and-Feta-Cheese-Burger-e1547384110499-300x300.jpg",
        "options": {
          "side": ["fries", "wedges", "salad"],
          "cook": ["well done", "medium rare", "rare"]
        }
      }
    ]
  },
//   Chicken-Breast-served-with-vegetable-garnish-Home-made-tomato-Sauce-300x300.jpg
// VM6447:14 Pan-Fried-Sea-bass-Green-Salad-Lime-Garlic-Sauce-300x300.jpg
// VM6447:14 Fish-chips-with-Mashy-Peas-colslaw-300x300.jpg
// VM6447:14 Caramel-Apple-Pork-Loin-Mash-Potaotes-300x300.jpg
// VM6447:14 Grilled-Marinated-Shrimp-Garlic-Rice-Lemon-Sauce-300x300.jpg
   MAIN: {
    title: {
      en: 'Main Courses'
    },
    items: [
      {
        "pid"  : 146,
        "name": "CHICKEN BREAST SERVED WITH VEGETABLE GARNISH & HOME MADE TOMATO SAUCE",
        "img"   : "Chicken-Breast-served-with-vegetable-garnish-Home-made-tomato-Sauce-300x300.jpg",
        "price": 280,
      },
      {
        "pid"  : 147,
        "name": "PAN FRIED SEA BASS , GREEN SALAD ,LIME & GARLIC SAUCE",
        "img"   : "Pan-Fried-Sea-bass-Green-Salad-Lime-Garlic-Sauce-300x300.jpg",
        "price": 280,
      },
      {
        "pid"  : 148,
        "name": "FISH & CHIPS WITH MUSHY PEAS & COLESLAW",
        "img"   : "Fish-chips-with-Mashy-Peas-colslaw-300x300.jpg",
        "price": 280,
      },
      {
        "pid"  : 149,
        "name": "CARAMEL APPLE PORK LOIN , MASH POTAOTES",
        "img"   : "Caramel-Apple-Pork-Loin-Mash-Potaotes-300x300.jpg",
        "price": 280,
      },
      {
        "pid"  : 150,
        "name": "GRILLED MARINATED SHRIMP , GARLIC RICE , LEMON SAUCE",
        "img"   : "Grilled-Marinated-Shrimp-Garlic-Rice-Lemon-Sauce-300x300.jpg",
        "price": 280,
      }
    ]
  },
//   Rad-na-300x300.jpg
// VM110:14 Pad-se-ew-300x300.jpg
// VM110:14 Pad-Kee-Maow-300x300.jpg
// VM110:14 Noodle-Soup-with-Chicken-300x300.jpg
// VM110:14 Pad-Thai-with-Shrimp-300x300.jpg
  NOODLES: {
    title: {
      en: 'Noodles'
    },
    items: [
      {
        "pid"  : 137,
        "name": "RAD NA: NOODLE WITH SAUCE",
        "img"   : "Rad-na-300x300.jpg",
        "price": 90,
        "options": {
          "with": ["shrimp", "chicken", "tofu"]
        }
      },
      {
        "pid"  : 138,
        "name": "PAD SE' EW : FRIED NOODLE WITH SOYA SAUCE",
        "img"   : "Pad-se-ew-300x300.jpg",
        "price": 90,
        "options": {
          "with": ["shrimp", "chicken", "tofu"]
        }
      },
      {
        "pid"  : 139,
        "name": "PAD KEE MAOW : FRIED NOODLE WITH ROASTED DRIED CHILLI",
        "img"   : "Pad-Kee-Maow-300x300.jpg",
        "price": 90,
        "options": {
          "with": ["shrimp", "chicken", "tofu"]
        }
      },
      {
        "pid"  : 140,
        "name": " NOODLE SOUP WITH CHICKEN",
        "img"   : "Noodle-Soup-with-Chicken-300x300.jpg",
        "price": 90,
        "options": {
          "with": ["shrimp", "chicken", "tofu"]
        }
      },
      {
        "pid"  : 141,
        "name": "PAD THAI WITH SHRIMP",
        "img"   : "Pad-Thai-with-Shrimp-300x300.jpg",
        "price": 90,
        "options": {
          "with": ["shrimp", "chicken", "tofu"]
        }
      }
    ]
  },
//   Tuna-Hotdog-Black-Olive-Pizza-300x300.jpg
// VM76:14 Ham-Bacon-Pineapple-Pizza-300x300.jpg
// VM76:14 Tomato-Basil-and-Cheese-Pizza-300x300.jpg
// VM76:14 Onion-Mushroom-Bolonaise-Pizza-300x300.jpeg
// VM76:14 Mixed-Cheese-Pizza-300x300.jpg
  PIZZA: {
    title: {
      en: 'Pizza'
    },
    items: [
      {
        "pid"  : 94,
        "name": "TUNA, WURSTEL AND BLACK OLIVE PIZZA",
        "img"   : "Tuna-Hotdog-Black-Olive-Pizza-300x300.jpg",
        "price": 199
      },
      {
        "pid"  : 95,
        "name": "HAM, BACON AND PINEAPPLE PIZZA",
        "img"   : "Ham-Bacon-Pineapple-Pizza-300x300.jpg",
        "price": 199
      },
      {
        "pid"  : 96,
        "name": "ONION, MUSHROOM AND BOLOGNAISESE PIZZA",
        "img"   : "Tomato-Basil-and-Cheese-Pizza-300x300.jpg",
        "price": 159
      },
      {
        "pid"  : 97,
        "name": "ONION, MUSHROOM AND BOLOGNESE PIZZA",
        "img"   : "Onion-Mushroom-Bolonaise-Pizza-300x300.jpeg",
        "price": 159
      },
      {
        "pid"  : 98,
        "name": "MIXED CHEESE  PIZZA",
        "img"   : "Mixed-Cheese-Pizza-300x300.jpg",
        "price": 220
      }
    ]
  },
//   Chicken-Bacon-Parmesan-Salad-300x300.jpg
// VM96:14 Smoked-SalmonAvocado-Feta-Cheese-Salad-e1547263687653-300x300.jpg
// VM96:14 Mixed-Green-Salad-300x300.jpg
// VM96:14 Fish-Salad-300x300.jpg
// VM96:14 Salad-Nicois-300x300.jpg
  SALAD: {
    title: {
      en: 'Salads'
    },
    items: [
      {
        "pid"  : 107,
        "name": "CHICKEN, BACON AND PARMESAN",
        "img"   : "Chicken-Bacon-Parmesan-Salad-300x300.jpg",
        "price": 180
      },
      {
        "pid"  : 108,
        "name": "SMOKED SALMON, AVOCADO AND FETA CHEESE",
        "img"   : "Smoked-SalmonAvocado-Feta-Cheese-Salad-e1547263687653-300x300.jpg",
        "price": 220
      },
      {
        "pid"  : 109,
        "name": "MIXED GREEN",
        "img"   : "Mixed-Green-Salad-300x300.jpg",
        "price": 110
      },
      {
        "pid"  : 110,
        "name": "FISH SALAD",
        "img"   : "Fish-Salad-300x300.jpg",
        "price": 220
      },
      {
        "pid"  : 111,
        "name": "NICOISE SALAS",
        "img"   : "Salad-Nicois-300x300.jpg",
        "price": 190
      },
    ]
  },
//   Triple-decker-steak-sandwich-300x300.jpg
// VM96:14 Smoked-Salmon-300x300.jpeg
// VM96:14 Chicken-Schnitzel-Sandwich-1-300x300.jpeg
  SANDWICHES: {
    title: {
      en: 'Sandwiches'
    },
    items: [
      {
        "pid"  : 78,
        "name": "TRIPLE DECKER BEEF SANDWICH",
        "img"   : "Triple-decker-steak-sandwich-300x300.jpg",
        "price": 250
      },
      {
        "pid"  : 81,
        "name": "SMOKED SALMON,AVOCADO,CAPPERS WITH HORSERADISH SAUCE",
        "img"   : "Smoked-Salmon-300x300.jpeg",
        "price": 240
      },
      {
        "pid"  : 82,
        "name": "CHICKEN SCHNITZEL SANDWICH",
        "img"   : "Chicken-Schnitzel-Sandwich-1-300x300.jpeg",
        "price": 180
      }
    ]
  },
//   French-Fries-300x300.png
// VM88:14 Wedge-Fries-with-Garlic-Parsley-300x300.jpg
// VM88:14 Fish-Finger-Fries-300x300.jpg
// VM88:14 Chicken-Wings-300x300.jpg
// VM88:14 Cheese-Fries-300x300.jpg
// VM88:14 Onion-Rings-300x300.jpg
// VM88:14 Garlic-Bread-300x300.jpeg
// VM88:14 Cheese-Balls-300x300.jpg
  SNACK: {
    title: {
      en: 'Snacks and Appetizers'
    },
    items: [
      {
        "pid"  : 100,
        "name": "FRENCH FRIES",
        "img"   : "French-Fries-300x300.png",
        "price": 100
      },
      {
        "pid"  : 101,
        "name": "WEDGE FRIES WITH GARLIC & PARSLEY",
        "img"   : "Wedge-Fries-with-Garlic-Parsley-300x300.jpg",
        "price": 120
      },
      {
        "pid"  : 102,
        "name": "FISH FINGER & FRIES",
        "img"   : "Fish-Finger-Fries-300x300.jpg",
        "price": 150
      },
      {
        "pid"  : 103,
        "name": "CHICKEN WINGS",
        "img"   : "Chicken-Wings-300x300.jpg",
        "price": 120
      },
      {
        "pid"  : 104,
        "name": "CHEESE FRIES",
        "img"   : "Cheese-Fries-300x300.jpg",
        "price": 150
      },
      {
        "pid"  : 105,
        "name": "ONION RINGS",
        "img"   : "Onion-Rings-300x300.jpg",
        "price": 100
      },
      {
        "pid"  : 106,
        "name": "GARLIC BREAD",
        "img"   : "Garlic-Bread-300x300.jpeg",
        "price": 90
      },
      {
        "pid"  : 99,
        "name": "CHEESE BALLS",
        "img"   : "Cheese-Balls-300x300.jpg",
        "price": 180
      }
    ]
  },
//   Side-Rice-with-Spicy-pork-and-Basil-e1547262564810-300x300.jpg
// VM120:14 Side-Rice-Shrimp-with-chilli-Paste-300x300.jpg
// VM120:14 Side-Rice-Chicken-with-Bell-Peppers-300x300.jpg
// VM120:14 Fried-Rice-with-Chicke-Pork-Pork-300x300.jpg
  THAICARTE: {
    title: {
      en: 'Thai a La Carte'
    },notes: [
      {
        en: 'All come with side rice'
      }
    ],
    items: [
      {
        "pid"  : 142,
        "name": " SPICY PORK AND BASIL",
        "img"   : "Side-Rice-with-Spicy-pork-and-Basil-e1547262564810-300x300.jpg",
        "price": 120
      },
      {
        "pid"  : 143,
        "name": "SHRIMP WITH CHILLI PASTE",
        "img"   : "Side-Rice-Shrimp-with-chilli-Paste-300x300.jpg",
        "price": 120,
        "options": {
          "with": [],
          "cook": [],
          "side": []
        }
      },
      {
        "pid"  : 144,
        "name": "CHICKEN WITH BELL PEPPERS",
        "img"   : "Side-Rice-Chicken-with-Bell-Peppers-300x300.jpg",
        "price": 120,
        "options": {
          "with": [],
          "cook": [],
          "side": []
        }
      },
      {
        "pid"  : 145,
        "name": "SPECIAL FRIED RICE",
        "img"   : "Fried-Rice-with-Chicke-Pork-Pork-300x300.jpg",
        "price": 120,
        "options": {
          "with": ["CHICKEN", "PORK"]
        }
      }
    ]
  },
//   Green-Curry-300x300.jpg
// VM86:14 Yellow-Curry-300x300.jpg
// VM86:14 Dry-Red-Curry-300x300.jpg
// VM86:14 Massaman-Curry-300x300.jpg
// VM86:14 Panang-Curry-300x300.jpg
  THAICURRY: {
    title: {
      en: 'Thai Curry'
    },
    items: [
      {
        "pid"  : 125,
        "name": "GREEN CURRY",
        "img"   : "Green-Curry-300x300.jpg",
        "price": 150,
        "options": {
          "with": ["CHICKEN", "PORK", "BEEF", "SHRIMP", "TOFU"]
        }
      },
      {
        "pid"  : 126,
        "name": "YELLOW CURRY",
        "img"   : "Yellow-Curry-300x300.jpg",
        "price": 150,
        "options": {
          "with": ["CHICKEN", "PORK", "BEEF", "SHRIMP", "TOFU"]
        }
      },
      {
        "pid"  : 127,
        "name": "DRY & RED CURRY",
        "img"   : "Dry-Red-Curry-300x300.jpg",
        "price": 150,
        "options": {
          "with": ["CHICKEN", "PORK", "BEEF", "SHRIMP", "TOFU"]
        }
      },
      {
        "pid"  : 128,
        "name": "MASSAMAN CURRY",
        "img"   : "Massaman-Curry-300x300.jpg",
        "price": 150,
        "options": {
          "with": ["CHICKEN", "PORK", "BEEF", "SHRIMP", "TOFU"]
        }
      },
      {
        "pid"  : 129,
        "name": "PANANG CURRY",
        "img"   : "Panang-Curry-300x300.jpg",
        "price": 150,
        "options": {
          "with": ["CHICKEN", "PORK", "BEEF", "SHRIMP", "TOFU"]
        }
      }
    ]
  },
//   Chicken-with-Cashewnut-300x300.jpg
// VM108:14 Shrimp-with-Tamarind-Sauce-300x300.jpg
// VM108:14 Stire-fried-Shrimp-with-asparagus-300x300.jpg
// VM108:14 Pork-Garlic-Pepper-300x300.jpg
// VM108:14 Fired-Mixed-Vegetable-in-oyster-Sauce-300x300.jpg
// VM108:14 Fish-Sweet-Sour-300x300.jpg
// VM108:14 Steam-Rice-300x300.jpg
  THAIDISHES: {
    title: {
      en: 'Thai Dishes'
    },
    items: [
      {
        "pid"  : 130,
        "name": "CHICKEN WITH CASHEWNUTS",
        "img"   : "Chicken-with-Cashewnut-300x300.jpg",
        "price": 150
      },
      {
        "pid"  : 131,
        "name": "SHRIMPS WITH TAMARIND SAUCE",
        "img"   : "Shrimp-with-Tamarind-Sauce-300x300.jpg",
        "price": 180
      },
      {
        "pid"  : 132,
        "name": "STIRE FRIED SHRIMPS WITH ASPARAGUS",
        "img"   : "Stire-fried-Shrimp-with-asparagus-300x300.jpg",
        "price": 180
      },
      {
        "pid"  : 133,
        "name": "PORK GARLIC & PEPPER",
        "img"   : "Pork-Garlic-Pepper-300x300.jpg",
        "price": 150
      },
      {
        "pid"  : 134,
        "name": "FIRED MIXED VEGETABLE IN OYSTER SAUCE",
        "img"   : "Fired-Mixed-Vegetable-in-oyster-Sauce-300x300.jpg",
        "price": 90
      },
      {
        "pid"  : 135,
        "name": "FISH SWEET & SOUR",
        "img"   : "Fish-Sweet-Sour-300x300.jpg",
        "price": 180
      },
      {
        "pid"  : 136,
        "name": "STEAMED RICE",
        "img"   : "Steam-Rice-300x300.jpg",
        "price": 80
      },
    ]
  },
//   Spring-Rolls-300x300.jpg
// VM75:14 Shrimp-Deep-Fried-300x300.jpg
// VM75:14 Gyoza-300x300.jpg
// VM75:14 Fish-Cake-300x300.jpg
// VM75:14 Papaya-Salad-with-Shrimp-300x300.jpg
  THAISTARTERS: {
    title: {
      en: 'Thai Starters'
    },
    items: [
      {
        "pid"  : 116,
        "name": "SPRING ROLLS",
        "img"   : "Spring-Rolls-300x300.jpg",
        "price": 120
      },
      {
        "pid"  : 117,
        "name": "DEEP FRIED SHRIMPS",
        "img"   : "Shrimp-Deep-Fried-300x300.jpg",
        "price": 150
      },
      {
        "pid"  : 118,
        "name": "GYOZA",
        "img"   : "Gyoza-300x300.jpg",
        "price": 120
      },
      {
        "pid"  : 119,
        "name": "THAI FISH CAKES",
        "img"   : "Fish-Cake-300x300.jpg",
        "price": 120
      },
      {
        "pid"  : 120,
        "name": "PAPAYA SALAD WITH SHRIMPS",
        "img"   : "Papaya-Salad-with-Shrimp-300x300.jpg",
        "price": 150
      }
    ]
  },
//   Chicken-Jalapenos-and-Cheese-300x300.jpg
// VM87:14 Deep-Fried-Fish-300x300.jpg
// VM87:14 Mixed-Meat-Wraps-300x300.jpg
  WRAPS: {
    title: {
      en: 'Wraps'
    },
    items: [
      {
        "pid"  : 89,
        "name": "CHICKEN JALAPENOES & CHEESE",
        "img"   : "Chicken-Jalapenos-and-Cheese-300x300.jpg",
        "price": 150,
      },
      {
        "pid"  : 92,
        "name": "DEEP FRIED FISH",
        "img"   : "Deep-Fried-Fish-300x300.jpg",
        "price": 180,
      },
      {
        "pid"  : 93,
        "name": "MIXED MEAT",
        "img"   : "Mixed-Meat-Wraps-300x300.jpg",
        "price": 150,
      }
    ]
  },
//   Singha-Beer-300x300.jpg
// VM85:14 Chang-Beer-300x300.jpg
// VM85:14 Tiger-Beer-300x300.jpg
// VM85:14 Leo-Beer-e1547563052783-300x300.jpg
// VM85:14 Heineken-Beer-300x300.jpg
// VM85:14 San-miguel-light-300x300.jpg
  BEERS: {
    title: {
      en: 'Beers'
    },
    items: [
      {
        "pid"  : 50,
        "name": "SINGHA",
        "img"   : "Singha-Beer-300x300.jpg",
        "price": 80
      },
      {
        "pid"  : 51,
        "name": "CHANG",
        "img"   : "Chang-Beer-300x300.jpg",
        "price": 70
      },
      {
        "pid"  : 52,
        "name": "TIGER",
        "img"   : "Tiger-Beer-300x300.jpg",
        "price": 70
      },
      {
        "pid"  : 53,
        "name": "LEO",
        "img"   : "Leo-Beer-e1547563052783-300x300.jpg",
        "price": 70
      },
      {
        "pid"  : 54,
        "name": "HEINEKEN",
        "img"   : "Heineken-Beer-300x300.jpg",
        "price": 110
      },
      {
        "pid"  : 55,
        "name": "SAN MIGUEL",
        "img"   : "San-miguel-light-300x300.jpg",
        "price": 110
      }
    ]
  },
//   Mojito-300x300.jpg
// VM115:14 Long-Island-Iced-Tea-300x300.jpg
// VM115:14 Pina-Colada-300x300.jpeg
// VM115:14 Tequila-Sunrise-300x300.jpg
// VM115:14 Gin-Tonic-300x300.jpg
  COCKTAILS: {
    title: {
      en: 'Cocktails'
    },
    items: [
      {
        "pid"  : 56,
        "name": "MOJITO",
        "img"   : "Mojito-300x300.jpg",
        "price": 190
      },
      {
        "pid"  : 57,
        "name": "LONG ISLAND ICED TEA",
        "img"   : "Long-Island-Iced-Tea-300x300.jpg",
        "price": 190
      },
      {
        "pid"  : 58,
        "name": "PINA COLADA",
        "img"   : "Pina-Colada-300x300.jpeg",
        "price": 190
      },
      {
        "pid"  : 59,
        "name": "TEQUILA SUNRISE",
        "img"   : "Tequila-Sunrise-300x300.jpg",
        "price": 190
      },
      {
        "pid"  : 60,
        "name": "GIN TONIC",
        "img"   : "Gin-Tonic-300x300.jpg",
        "price": 190
      }
    ]
  },
  COFFEE: {
    title: {
      en: 'Coffee'
    },
    items: [
      {
        "pid"  : 1001,
        "name": "ESPRESSO HOT",
        "img"   : "placeholder.png",
        "price": 50
      },
      {
        "pid"  : 1002,
        "name": "DOUBLE ESPRESSO",
        "img"   : "placeholder.png",
        "price": 60
      },
      {
        "pid"  : 1003,
        "name": "ESPRESSO ICE",
        "img"   : "placeholder.png",
        "price": 70
      },
      {
        "pid"  : 1004,
        "name": "AMERICANO HOT",
        "img"   : "placeholder.png",
        "price": 60
      },
      {
        "pid"  : 1005,
        "name": "AMERICANO ICE",
        "img"   : "placeholder.png",
        "price": 70
      },
      {
        "pid"  : 1006,
        "name": "CAFE LATTE",
        "img"   : "placeholder.png",
        "price": 70
      },
      {
        "pid"  : 1007,
        "name": "CAFE LATTE’ ICE",
        "img"   : "placeholder.png",
        "price": 80
      },
      {
        "pid"  : 1008,
        "name": "LATTE’ MACCHIATO CARAMEL HOT",
        "img"   : "placeholder.png",
        "price": 80
      },
      {
        "pid"  : 1009,
        "name": "LATTE’ MACCHIATO CARAMEL ICE",
        "img"   : "placeholder.png",
        "price": 90
      },
      {
        "pid"  : 1010,
        "name": "GREEN TEA LATTE HOT",
        "img"   : "placeholder.png",
        "price": 70
      },
      {
        "pid"  : 1011,
        "name": "GREEN TEA LATTE ICE",
        "img"   : "placeholder.png",
        "price": 80
      },
      {
        "pid"  : 1012,
        "name": "CHOCOLATE HOT",
        "img"   : "placeholder.png",
        "price": 70
      },
      {
        "pid"  : 1013,
        "name": "CHCOLATE ICE",
        "img"   : "placeholder.png",
        "price": 80
      },
      {
        "pid"  : 1014,
        "name": "TEA",
        "img"   : "placeholder.png",
        "price": 60
      },
      {
        "pid"  : 1015,
        "name": "BLACK ICE TEA",
        "img"   : "placeholder.png",
        "price": 70
      },
      {
        "pid"  : 1016,
        "name": "THAI ICE TEA",
        "img"   : "placeholder.png",
        "price": 70
      },
      {
        "pid"  : 1017,
        "name": "ICE LEMON TEA",
        "img"   : "placeholder.png",
        "price": 70
      }
    ]
  },
//   Banana-Friter-Ice-Cream-300x300.jpg
// VM87:14 Mango-sticky-Rice-300x300.jpg
// VM87:14 Honey-Toast-with-Ice-Cream-300x300.jpg
// VM87:14 Scoop-of-Ice-Cream-300x300.jpg
  DESSERTS: {
    title: {
      en: 'Desserts'
    },
    items: [
      {
        "pid"  : 155,
        "name": "BANANA FRITTER AND ICE CREAM",
        "img"   : "Banana-Friter-Ice-Cream-300x300.jpg",
        "price": 150
      },
      {
        "pid"  : 156,
        "name": "MANGO STICKY RICE",
        "img"   : "Mango-sticky-Rice-300x300.jpg",
        "price": 120
      },
      {
        "pid"  : 157,
        "name": "HONEY TOAST WITH ICE CREAM",
        "img"   : "Honey-Toast-with-Ice-Cream-300x300.jpg",
        "price": 150
      }
    ]
  },
//   Cowboy-300x300.jpg
// VM78:14 Green-Freedom-300x300.jpg
  DETOX: {
    title: {
      en: 'Detox'
    },
    items: [
      {
        "pid"  : 61,
        "name": "COWBOY",
        "img"   : "Cowboy-300x300.jpg",
        "price": 150
      },
      {
        "pid"  : 63,
        "name": "GREEN FREEDOM",
        "img"   : "Green-Freedom-300x300.jpg",
        "price": 150
      }
    ]
  },
  FRESHFRUITSODA: {
    title: {
      en: 'Fresh Fruit Sodas'
    },
    items: [
      {
        "pid"  : 35,
        "name": "MANGO SODA",
        "img"   : "placeholder.png",
        "price": 90
      },
      {
        "pid"  : 36,
        "name": "PASSION FRUIT SODA",
        "img"   : "placeholder.png",
        "price": 90
      },
      {
        "pid"  : 37,
        "name": "BLUEBERRY SODA",
        "img"   : "placeholder.png",
        "price": 90
      },
      {
        "pid"  : 38,
        "name": "STRAWBERRY SODA",
        "img"   : "placeholder.png",
        "price": 90
      },
      {
        "pid"  : 39,
        "name": "MIXED BERRY SODA",
        "img"   : "placeholder.png",
        "price": 90
      }
    ]
  },
  FRUITJUICE: {
    title: {
      en: 'Fruite Juices'
    },
    items: [
      {
        "pid"  : 12,
        "name": "WATERMELON",
        "img"   : "placeholder.png",
        "price": 60
      },
      {
        "pid"  : 13,
        "name": "PINEAPPLE",
        "img"   : "placeholder.png",
        "price": 60
      },
      {
        "pid"  : 14,
        "name": "GREEN APPLE",
        "img"   : "placeholder.png",
        "price": 80
      },
      {
        "pid"  : 15,
        "name": "PASSION FRUIT",
        "img"   : "placeholder.png",
        "price": 80
      },
      {
        "pid"  : 16,
        "name": "MANGO",
        "img"   : "placeholder.png",
        "price": 80
      },
      {
        "pid"  : 17,
        "name": "TOMATO JUICE",
        "img"   : "placeholder.png",
        "price": 60
      },
      {
        "pid"  : 18,
        "name": "ORANGE JUICE",
        "img"   : "placeholder.png",
        "price": 90
      },
      {
        "pid"  : 19,
        "name": "ORANGE LIME & LEMON JUICE",
        "img"   : "placeholder.png",
        "price": 80
      },
      {
        "pid"  : 31,
        "name": "FRESH COCONUT",
        "img"   : "placeholder.png",
        "price": 80
      },
    ]
  },
  FRUITSHAKE: {
    title: {
      en: 'Fruit Shakes'
    },
    items: [
      {
        "pid"  : 20,
        "name": "WATERMELON",
        "img"   : "placeholder.png",
        "price": 60
      },
      {
        "pid"  : 21,
        "name": "PINEAPPLE",
        "img"   : "placeholder.png",
        "price": 80
      },
      {
        "pid"  : 22,
        "name": "GREEN APPLE",
        "img"   : "placeholder.png",
        "price": 80
      },
      {
        "pid"  : 23,
        "name": "PASSION FRUIT",
        "img"   : "placeholder.png",
        "price": 80
      },
      {
        "pid"  : 24,
        "name": "MANGO",
        "img"   : "placeholder.png",
        "price": 60
      },
      {
        "pid"  : 25,
        "name": "ORANGE JUICE",
        "img"   : "placeholder.png",
        "price": 90
      },
      {
        "pid"  : 26,
        "name": "ORANGE LIME & LEMON JUICE",
        "img"   : "placeholder.png",
        "price": 80
      },
    ]
  },
//   Banana-Vanilla-Milk-Shake-300x300.jpg
// VM70:14 Strawberry-Milkshake-300x300.jpg
// VM70:14 Chocolate-Milk-Shake-300x300.jpg
// VM70:14 Coconut-Milk-Shake-300x300.jpg
  MILKSHAKE: {
    title: {
      en: 'Milk Shakes'
    },
    items: [
      {
        "pid"  : 27,
        "name": "BANANA & VANILLA",
        "img"   : "Banana-Vanilla-Milk-Shake-300x300.jpg",
        "price": 90
      },
      {
        "pid"  : 28,
        "name": "STRAWBERRY",
        "img"   : "Strawberry-Milkshake-300x300.jpg",
        "price": 90
      },
      {
        "pid"  : 29,
        "name": "CHOCOLATE",
        "img"   : "Chocolate-Milk-Shake-300x300.jpg",
        "price": 90
      },
      {
        "pid"  : 30,
        "name": "COCONUT",
        "img"   : "Coconut-Milk-Shake-300x300.jpg",
        "price": 90
      }
    ]
  },
//   Coke-300x300.jpg
// VM102:14 Diet-Coke-300x300.jpg
// VM102:14 Coke-Zero-300x300.jpg
// VM102:14 Fanta-Orange.jpg
// VM102:14 Fanto-Red-300x300.jpg
// VM102:14 Ginger-Ale-1-300x300.jpg
// VM102:14 Tonic-300x300.jpg
// VM102:14 placeholder.png
// VM102:14 Sprite-300x300.jpg
// VM102:14 Red-Bull-300x300.jpg
  SOFTDRINK: {
    title: {
      en: 'Soft Drinks'
    },
    items: [
      {
        "pid"  : 40,
        "name": "COKE",
        "img"   : "Coke-300x300.jpg",
        "price": 40
      },
      {
        "pid"  : 41,
        "name": "DIET COKE",
        "img"   : "Diet-Coke-300x300.jpg",
        "price": 40
      },
      {
        "pid"  : 42,
        "name": "COKE ZERO",
        "img"   : "Coke-Zero-300x300.jpg",
        "price": 40
      },
      {
        "pid"  : 43,
        "name": "FANTA ORANGE",
        "img"   : "Fanta-Orange.jpg",
        "price": 40
      },
      {
        "pid"  : 44,
        "name": "FANTA RED",
        "img"   : "Fanto-Red-300x300.jpg",
        "price": 40
      },
      {
        "pid"  : 45,
        "name": "GINGER ALE",
        "img"   : "Ginger-Ale-1-300x300.jpg",
        "price": 40
      },
      {
        "pid"  : 46,
        "name": "TONIC",
        "img"   : "Tonic-300x300.jpg",
        "price": 40
      },
      {
        "pid"  : 47,
        "name": "MINERAL WATER",
        "img"   : "placeholder.png",
        "price": 30
      },
      {
        "pid"  : 48,
        "name": "SPRITE",
        "img"   : "Sprite-300x300.jpg",
        "price": 40
      },
      {
        "pid"  : 49,
        "name": "RED BULL",
        "img"   : "Red-Bull-300x300.jpg",
        "price": 40
      },
    ]
  },
//   Spaghetti-Bolognese-300x300.jpg
// VM83:14 Spaghetti-Carbonara-300x300.jpeg
// VM83:14 Spaghetti-Pesto-Sauce-300x300.jpg
// VM83:14 Spaghetti-Tuna-with-Garlic-Chilli-300x300.jpg
  SPAGHETTI: {
    title: {
      en: 'Spaghetti'
    },
    items: [
      {
        "pid"  : 151,
        "name": "SPAGHETTI BOLOGNESE",
        "img"   : "Spaghetti-Bolognese-300x300.jpg",
        "price": 220
      },
      {
        "pid"  : 152,
        "name": "SPAGHETTI CARBONARA",
        "img"   : "Spaghetti-Carbonara-300x300.jpeg",
        "price": 220
      },
      {
        "pid"  : 153,
        "name": "SPAGHETTI AL PESTO",
        "img"   : "Spaghetti-Pesto-Sauce-300x300.jpg",
        "price": 220
      },
      {
        "pid"  : 154,
        "name": "SPAGHETTI TUNA, GARLIC AND CHILLI",
        "img"   : "Spaghetti-Tuna-with-Garlic-Chilli-300x300.jpg",
        "price": 190
      }
    ]
  },
//   Chicken-Cream-Soup-300x300.jpeg
// VM77:14 Mushroom-Chicken-Cream-Soup-e1547387018585-300x300.jpg
// VM77:14 Clear-Soup-with-vegetable-300x300.jpg
// VM77:14 Potatoes-Cream-Soup-300x300.jpg
  SOUP: {
    title: {
      en: 'Soups'
    },
    items: [
      {
        "pid"  : 112,
        "name": "CHICKEN CREAM SOUP",
        "img"   : "Chicken-Cream-Soup-300x300.jpeg",
        "price": 90
      },
      {
        "pid"  : 113,
        "name": "MUSHROOM CHICKEN CREAM SOUP",
        "img"   : "Mushroom-Chicken-Cream-Soup-e1547387018585-300x300.jpg",
        "price": 90
      },
      {
        "pid"  : 114,
        "name": "CLEAR SOUP WITH VEGETABLE",
        "img"   : "Clear-Soup-with-vegetable-300x300.jpg",
        "price": 90
      },
      {
        "pid"  : 115,
        "name": "POTATOES CREAM SOUP",
        "img"   : "Potatoes-Cream-Soup-300x300.jpg",
        "price": 90
      }
    ]
  },
//   Mixed-Berry-Smoothies-e1547560220862-300x300.jpg
// VM79:14 Banana-Honey-Smoothies-300x300.jpg
  SMOOTHIES : {
    title: {
      en: 'Smoothies'
    },
    items: [
      {
        "pid"  : 33,
        "name": "MIXED BERRY",
        "img"   : "Mixed-Berry-Smoothies-e1547560220862-300x300.jpg",
        "price": 90
      },
      {
        "pid"  : 34,
        "name": "BANANA HONEY",
        "img"   : "Banana-Honey-Smoothies-300x300.jpg",
        "price": 90
      }
    ]
  }
}

module.exports = SIAM