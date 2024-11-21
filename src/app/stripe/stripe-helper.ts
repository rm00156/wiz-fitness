import { Stripe } from "stripe";

const stripe = new Stripe(process.env.stripe_server_key as string);

export type Product = {
  id: string;
  name: string;
  default_price: Stripe.Price;
  secondary_price?: Stripe.Price;
  features: Stripe.Product.MarketingFeature[];
  isMostPopular?: boolean;
};

export const getProductsList = async () => {
  const [products, prices] = await Promise.all([
    stripe.products.list({
      expand: ["data.default_price"],
      active: true,
    }),
    stripe.prices.list({ active: true }),
  ]);

  // Map products with their prices
  const productsList = products.data.map((product: Stripe.Product) => {
    const productPrices = prices.data.filter(
      (price: Stripe.Price) => price.product === product.id
    );

    const secondaryPrice = productPrices.find(
      (price: Stripe.Price) =>
        price.id !== (product.default_price as Stripe.Price)?.id
    );

    return {
      id: product.id,
      name: product.name,
      default_price: product.default_price as Stripe.Price,
      secondary_price: secondaryPrice as Stripe.Price | undefined,
      features: product.marketing_features,
      isMostPopular: product.metadata.isMostPopular === "true",
    };
  });

  const dailyProducts = productsList
    .filter((p: Product) => p.secondary_price === undefined)
    .sort((a: Product, b: Product) => {
      const aPrice = a.default_price.unit_amount ?? Infinity;
      const bPrice = b.default_price.unit_amount ?? Infinity;
      return aPrice - bPrice;
    }) as Product[];

  const membershipProducts = productsList
    .filter((p: Product) => p.secondary_price !== undefined)
    .sort((a: Product, b: Product) => {
      const aPrice = a.default_price.unit_amount ?? Infinity;
      const bPrice = b.default_price.unit_amount ?? Infinity;
      return aPrice - bPrice;
    }) as Product[];

  return { dailyProducts, membershipProducts };
};

export const createCheckoutSession = async (
  priceId: string,
  mode: "payment" | "subscription"
) => {
  const session = await stripe.checkout.sessions.create({
    mode,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],

    consent_collection: {
      terms_of_service: "required",
    },
    custom_text: {
      terms_of_service_acceptance: {
        message: "I agree to the [Terms of Service](https://example.com/terms)",
      },
    },
    ui_mode: "embedded",

    return_url:
      "http://localhost:3000/join-now/payment/processing?session_id={CHECKOUT_SESSION_ID}",
  });
  return { client_secret: session.client_secret, id: session.id };
};

export const getCheckoutSession = async (sessionId: string) => {
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  return {
    status: session.status,
    payment_status: session.payment_status,
  };
};
