export type ApiError = {
    success: boolean,
    message: string,
    error?: unknown
}

/* 
For Future Reference

class AppError extends Error {
  statusCode: number 
  
  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}
*/