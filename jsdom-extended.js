const JSDOMEnvironment = require("jest-environment-jsdom").default;

class JSDOMEnvironmentExtended extends JSDOMEnvironment {
  constructor(...args) {
    super(...args);

    this.global.ReadableStream = ReadableStream;
    this.global.TextDecoder = TextDecoder;
    this.global.TextEncoder = TextEncoder;

    this.global.Request = Request;
    this.global.Response = Response;
  }
}

module.exports = JSDOMEnvironmentExtended;
