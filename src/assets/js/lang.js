export default getlang = (section, currlang, str) => {
  return LANG[section][currlang][str]
}

const LANG = {
   "order":{
      "en":{
         current_order:"current order",
         change_delivery_information:"change delivery information",
         submit_order:"submit order",
         no_orders_to_show:"no orders to show",
         delivering_to:"delivering to",
         just_for_this_order:"just for this order, your account address will not change",
         order_delivery_details:"order delivery details",
         choose_ingredient:"choose ingredient",
         choose_cooking_style:"choose cooking style",
         choose:"choose",
         choose_side:"choose side",
         comments_or_special_requests:" comments or special requests",
         delete_from_order:"delete from order",
         add_to_order:"add to order"
      }
   },
   "select":{
      "en":{
         "please_choose":"please choose",
         "chicken":"chicken",
         "pork":"pork",
         "fish":"fish",
         "squid":"squid",
         "shrimp":"shrimp",
         "tofu":"tofu",
         "meat":"meat"
      }
   },
   "account":{
      "en":{
         "account":"account",
         "your_account":"your account",
         "submit_registration":"submit registration",
         "create_account":"create account",
         "submit_login":"submit login",
         "you_are_signed_in_as":"you are signed in as",
         "you_need_to_register":"you need to register",
         "we_only_neeed_your_email_and_address_details_for_delivery":"we only neeed your email and address details for delivery",
         "go_to_registration":"go to registration",
         "your_account_location":"your account location",
         "click_on_map_to_set_or_change_your_address":"click on map to set or change your address",
         "your_delivery_location":"your delivery location",
         "your_order_delivery_location":"your order delivery location",
         "email":"email",
         "name":"name",
         "second_name":"second name",
         "address_line_1":"address line 1",
         "address_line_2":"address line 2",
         "telephone":"telephone",
         "map_location_":"map location\t"
      }
   },
   "app":{
      "en":{
         "welcome_to":"welcome to"
      }
   },
   "shop":{
      "en":{
         "shop_area":"shop area"
      }
   }
}