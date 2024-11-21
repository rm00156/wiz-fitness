import * as Factory from "factory.ts";
import { Product } from "@/app/stripe/stripe-helper";
import Stripe from "stripe";

export const stripePriceFactory = Factory.Sync.makeFactory<Stripe.Price>(() => {
  return {
    id: "id",
    object: "price",
    active: true,
    billing_scheme: "per_unit",
    created: Date.now(),
    currency: "gbp",
    custom_unit_amount: null,
    livemode: false,
    lookup_key: null,
    metadata: {},
    nickname: "Daily Passes",
    product: "productId",
    recurring: null,
    tax_behavior: null,
    tiers_mode: null,
    transform_quantity: null,
    type: "one_time",
    unit_amount: 20000,
    unit_amount_decimal: null,
  };
});

export const marketingFeatureFactory =
  Factory.Sync.makeFactory<Stripe.Product.MarketingFeature>(() => {
    return {
      name: "feature",
    };
  });

export const membershipFactory = Factory.Sync.makeFactory<Product>(() => {
  return {
    id: "1",
    name: "name",
    default_price: stripePriceFactory.build(),
    features: [marketingFeatureFactory.build()],
    isMostPopular: false,
  };
});
