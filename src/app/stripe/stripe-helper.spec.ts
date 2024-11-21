import {
  stripePriceFactory,
  stripeProductFactory,
} from "../test-factory/stripe-factory";

describe("stripe helper", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });
  it("should return lists of daily and membership products and associated prices", async () => {
    jest.doMock("stripe", () => ({
      Stripe: jest.fn().mockImplementation(() => ({
        products: {
          list: () =>
            Promise.resolve({
              data: [
                stripeProductFactory.build(),
                stripeProductFactory.build({
                  id: "product4",
                  default_price: stripePriceFactory.build({
                    id: "price4",
                    product: "product4",
                    unit_amount: 80000,
                  }),
                }),
                stripeProductFactory.build({
                  id: "productId2",
                  default_price: stripePriceFactory.build({
                    id: "price2",
                  }),
                }),
              ],
            }),
        },

        prices: {
          list: () =>
            Promise.resolve({
              data: [
                stripePriceFactory.build(),
                stripePriceFactory.build({
                  id: "price4",
                  product: "product4",
                }),
                stripePriceFactory.build({
                  id: "price2",
                  product: "productId2",
                }),
                stripePriceFactory.build({
                  id: "price3",
                  product: "productId2",
                }),
              ],
            }),
        },
      })),
    }));
    const { getProductsList } = require("./stripe-helper");
    const { dailyProducts, membershipProducts } = await getProductsList();

    expect(dailyProducts.length).toBe(2);
    expect(membershipProducts.length).toBe(1);
  });

  it("should return lists of daily products and associated prices even when has a prices are null", async () => {
    jest.doMock("stripe", () => ({
      Stripe: jest.fn().mockImplementation(() => ({
        products: {
          list: () =>
            Promise.resolve({
              data: [
                stripeProductFactory.build({
                  default_price: stripePriceFactory.build({
                    unit_amount: null,
                  }),
                }),
                stripeProductFactory.build({
                  id: "product4",
                  default_price: stripePriceFactory.build({
                    id: "price4",
                    product: "product4",
                    unit_amount: null,
                  }),
                }),
              ],
            }),
        },

        prices: {
          list: () =>
            Promise.resolve({
              data: [
                stripePriceFactory.build(),
                stripePriceFactory.build({
                  id: "price4",
                  product: "product4",
                }),
              ],
            }),
        },
      })),
    }));
    const { getProductsList } = require("./stripe-helper");
    const { dailyProducts, membershipProducts } = await getProductsList();

    expect(dailyProducts.length).toBe(2);
    expect(membershipProducts.length).toBe(0);
  });

  it("should return lists of membership products and associated prices when prices are null", async () => {
    jest.doMock("stripe", () => ({
      Stripe: jest.fn().mockImplementation(() => ({
        products: {
          list: () =>
            Promise.resolve({
              data: [
                stripeProductFactory.build({
                  id: "productId2",
                  default_price: stripePriceFactory.build({
                    id: "price2",
                    unit_amount: null,
                  }),
                }),

                stripeProductFactory.build({
                  id: "productId10",
                  default_price: stripePriceFactory.build({
                    id: "price10",
                    unit_amount: null,
                  }),
                }),
              ],
            }),
        },

        prices: {
          list: () =>
            Promise.resolve({
              data: [
                stripePriceFactory.build({
                  id: "price2",
                  product: "productId2",
                }),
                stripePriceFactory.build({
                  id: "price3",
                  product: "productId2",
                }),

                stripePriceFactory.build({
                  id: "price10",
                  product: "productId10",
                }),
                stripePriceFactory.build({
                  id: "price11",
                  product: "productId10",
                }),
              ],
            }),
        },
      })),
    }));
    const { getProductsList } = require("./stripe-helper");
    const { dailyProducts, membershipProducts } = await getProductsList();

    expect(dailyProducts.length).toBe(0);
    expect(membershipProducts.length).toBe(2);
  });

  it("should return created checkout sessions client secret", async () => {
    jest.doMock("stripe", () => ({
      Stripe: jest.fn().mockImplementation(() => ({
        checkout: {
          sessions: {
            create: () =>
              Promise.resolve({
                client_secret: "secret",
              }),
          },
        },
      })),
    }));
    const { createCheckoutSession } = require("./stripe-helper");
    const { client_secret } = await createCheckoutSession("priceId", "payment");

    expect(client_secret).toBe("secret");
  });

  it("should get checkout sessions status and payment status", async () => {
    jest.doMock("stripe", () => ({
      Stripe: jest.fn().mockImplementation(() => ({
        checkout: {
          sessions: {
            retrieve: () =>
              Promise.resolve({
                status: "open",
                payment_status: "unpaid",
              }),
          },
        },
      })),
    }));
    const { getCheckoutSession } = require("./stripe-helper");
    const { status, payment_status } = await getCheckoutSession("sessionId");

    expect(status).toBe("open");
    expect(payment_status).toBe("unpaid");
  });
});
