class ApiResponse {
  constructor(success, message, data = null, error = null) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.error = error;
    this.timestamp = new Date().toISOString();
  }

  static success(res, message, data = null, statusCode = 200) {
    return res.status(statusCode).json(new ApiResponse(true, message, data));
  }

  static error(res, message, error = null, statusCode = 500) {
    return res.status(statusCode).json(new ApiResponse(false, message, null, error));
  }
}

export default ApiResponse;