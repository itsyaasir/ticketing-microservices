import { CustomError } from "./custom-error"

export class DatabaseConnectionError extends CustomError {

  statusCode = 500
  reason = "Error connecting to Database"
  constructor() {
    super("Error connecting to db")

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }


  serialiseErrors() {
    return [
      { message: this.reason },
    ]
  }
}