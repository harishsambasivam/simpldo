class APIError extends Error {
  apiErrorCode: string;
  constructor(message: any, apiErrorCode: string) {
    super(message);

    // assign the error class name in your custom error (as a shortcut)
    this.name = this.constructor.name;
    this.apiErrorCode = apiErrorCode;

    // capturing the stack trace keeps the reference to your error class
    Error.captureStackTrace(this, this.constructor);
  }
}

export { APIError };
