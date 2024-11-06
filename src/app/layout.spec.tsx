import { render } from "@testing-library/react";
import RootLayout from "./layout";
import { ReactElement } from "react";

jest.mock("./data/nav.json", () => ({}), { virtual: true });

beforeEach(() => {
  jest.resetModules();
});

jest.mock("./components/nav/nav-links", () => ({
  NavLinks: () => <div data-testid="nav-links">Nav Links</div>,
}));

jest.mock("./components/footer/footer-section", () => ({
  __esModule: true,
  default: () => <div data-testid="footer">Footer</div>,
}));

jest.mock("./components/banner/banner", () => ({
  __esModule: true,
  default: () => <div data-testid="banner">Banner</div>,
}));

describe("layout", () => {
  const renderLayoutContent = async () => {
    const layout = await RootLayout({
      children: <div data-testid="test-content">Test Content</div>,
    });

    // Extract the children from the body element
    const bodyElement = layout.props.children.find(
      (child: ReactElement) => child?.type === "body"
    );

    // Return just the children of the body element
    return bodyElement.props.children;
  };

  it("should render layout when displaying banner correctly", async () => {
    jest.doMock("./data/nav.json", () => ({
      isDisplayBanner: true,
    }));
    const bodyChildren = await renderLayoutContent();

    const { getByTestId } = render(<div>{bodyChildren}</div>);
    expect(getByTestId("nav-links")).toBeInTheDocument();
    expect(getByTestId("banner")).toBeInTheDocument();
    expect(getByTestId("test-content")).toBeInTheDocument();
    expect(getByTestId("footer")).toBeInTheDocument();
  });

  it("should render layout when displaying banner correctly", async () => {
    jest.doMock("./data/nav.json", () => ({
      isDisplayBanner: false,
    }));
    const bodyChildren = await renderLayoutContent();

    const { getByTestId, queryByTestId } = render(<div>{bodyChildren}</div>);
    expect(getByTestId("nav-links")).toBeInTheDocument();
    expect(queryByTestId("banner")).not.toBeInTheDocument();
    expect(getByTestId("test-content")).toBeInTheDocument();
    expect(getByTestId("footer")).toBeInTheDocument();
  });
});
