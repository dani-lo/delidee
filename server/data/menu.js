const menu = {
  "appetizers": [
    {
      "pid"  : 1001,
      "name": "spring rolls",
      "description": "Lorem ipso dolor sit amet etiam non adispiscipt voluptas. Serves warm with lots of good stuff",
      "price": 60
    },
    {
      "pid"  : 1002,
      "name": "bruschetta",
      "description": "Lorem ipso dolor sit amet etiam non adispiscipt voluptas. Serves warm with lots of good stuff",
      "price": 70
    },
    {
      "pid"  : 1003,
      "name": "fish soup",
      "description": "Lorem ipso dolor sit amet etiam non adispiscipt voluptas. Serves warm with lots of good stuff",
      "price": 90
    }
  ],
  "thai mains": [
    {
      "pid"  : 2001,
      "name": "chicken cashewnuts",
      "description": "Lorem ipso dolor sit amet etiam non adispiscipt voluptas. Serves warm with lots of good stuff",
      "price": 150,
      "options": {
        "with": ["chicken", "tofu", "shrimp"]
      }
    },
    {
      "pid"  : 2002,
      "name": "garlic and basil fried squid",
      "description": "Lorem ipso dolor sit amet etiam non adispiscipt voluptas. Serves warm with lots of good stuff",
      "price": 140
    },
    {
      "pid"  : 2003,
      "name": "chef special",
      "description": "Lorem ipso dolor sit amet etiam non adispiscipt voluptas. Serves warm with lots of good stuff",
      "price": 170
    }
  ],
  "western mains": [
    {
      "pid"  : 3001,
      "name": "lasagne bolognese",
      "description": "Lorem ipso dolor sit amet etiam non adispiscipt voluptas. Serves warm with lots of good stuff",
      "price": 310
    },
    {
      "pid"  : 3002,
      "name": "cordon bleu",
      "description": "Lorem ipso dolor sit amet etiam non adispiscipt voluptas. Serves warm with lots of good stuff",
      "price": 320
    },
    {
      "pid"  : 3003,
      "name": "roastbeef potatoes",
      "description": "Lorem ipso dolor sit amet etiam non adispiscipt voluptas. Serves warm with lots of good stuff",
      "price": 400
    }
  ],
  "noodles": [
    {
      "pid"  : 4001,
      "name": "pad thai",
      "description": "Lorem ipso dolor sit amet etiam non adispiscipt voluptas. Serves warm with lots of good stuff",
      "price": 120,
      "options": {
        "with": ["chicken", "tofu", "shrimp"]
      }
    },
    {
      "pid"  : 4002,
      "name": "pad see yew",
      "description": "Lorem ipso dolor sit amet etiam non adispiscipt voluptas. Serves warm with lots of good stuff",
      "price": 120,
      "options": {
        "with": ["chicken", "tofu", "shrimp"]
      }
    },
    {
      "pid"  : 4003,
      "name": "rice esam noodles",
      "description": "Lorem ipso dolor sit amet etiam non adispiscipt voluptas. Serves warm with lots of good stuff",
      "price": 140,
      "options": {
        "with": ["chicken", "tofu", "shrimp"]
      }
    }
  ],
  "burgers and sandwiches": [
    {
      "pid"  : 5001,
      "name": "Double cheeseburger",
      "description": "Lorem ipso dolor sit amet etiam non adispiscipt voluptas. Serves warm with lots of good stuff",
      "price": 250,
      "options": {
        "side": ["fries", "wedges"],
        "cook": ["rare", "medium rare", "well cooked"]
      }
    },
    {
      "pid"  : 5002,
      "name": "ham and cheese sandwich",
      "description": "Lorem ipso dolor sit amet etiam non adispiscipt voluptas. Serves warm with lots of good stuff",
      "price": 190,
      "options": {
        "with": ["fries", "wedges"]
      }
    },
    {
      "pid"  : 5003,
      "name": "fish burger",
      "description": "Lorem ipso dolor sit amet etiam non adispiscipt voluptas. Serves warm with lots of good stuff",
      "price": 210,
      "options": {
        "with": ["fries", "wedges"]
      }
    }
  ],
  "beers": [
    {
      "pid"  : 6001,
      "name": "singha",
      "description": null,
      "price": 70
    },
    {
      "pid"  : 6002,
      "name": "heineken",
      "description": null,
      "price": 80
    },
    {
      "pid"  : 6003,
      "name": "lao",
      "description": null,
      "price": 60
    }
  ],
  "soft drinks": [
    {
      "pid"  : 7001,
      "name": "coke",
      "description": null,
      "price": 30
    },
    {
      "pid"  : 7002,
      "name": "diet coke",
      "description": null,
      "price": 30
    },
    {
      "pid"  : 7003,
      "name": "sprite",
      "description": null,
      "price": 40
    }
  ],
  "coffee": [
    {
      "pid"  : 8001,
      "name": "americano",
      "description": null,
      "price": 80
    },
    {
      "pid"  : 8003,
      "name": "espresso",
      "description": null,
      "price": 60
    },
    {
      "pid"  : 8003,
      "name": "latte",
      "description": null,
      "price": 120
    }
  ],
  "desserts": [
    {
      "pid"  : 9001,
      "name": "strudel",
      "description": "Lorem ipso dolor sit amet etiam non adispiscipt voluptas. Serves warm with lots of good stuff",
      "price": 240
    },
    {
      "pid"  : 9002,
      "name": "banana pudding",
      "description": "Lorem ipso dolor sit amet etiam non adispiscipt voluptas. Serves warm with lots of good stuff",
      "price": 120
    },
    {
      "pid"  : 9003,
      "name": "apple crumble",
      "description": "Lorem ipso dolor sit amet etiam non adispiscipt voluptas. Serves warm with lots of good stuff",
      "price": 230
    }
  ]
}

module.exports = menu