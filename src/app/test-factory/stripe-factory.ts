import * as Factory from "factory.ts";
import Stripe from "stripe";

export const stripePriceFactory = Factory.Sync.makeFactory<Stripe.Price>(() => {
  return {
    id: "priceId",
    object: "price",
    active: true,
    billing_scheme: "per_unit",
    created: 11213232,
    currency: "gbp",
    custom_unit_amount: null,
    livemode: false,
    lookup_key: null,
    metadata: {},
    nickname: null,
    product: "productId",
    recurring: null,
    tax_behavior: null,
    tiers_mode: null,
    transform_quantity: null,
    type: "recurring",
    unit_amount: 10000,
    unit_amount_decimal: null,
  };
});

export const stripeProductFactory = Factory.Sync.makeFactory<Stripe.Product>(
  () => {
    return {
      id: "id",
      object: "product",
      active: true,
      created: 12345678910,
      default_price: stripePriceFactory.build(),
      description: "description",
      images: [],
      livemode: false,
      marketing_features: [{ name: "Gym Access" }],
      metadata: {},
      name: "productName",
      package_dimensions: null,
      shippable: null,
      tax_code: null,
      type: "service",
      updated: 256127281,
      url: null,
    };
  }
);
