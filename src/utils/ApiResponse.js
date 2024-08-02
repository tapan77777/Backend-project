class ApiResponse {
    constructor(statusCode , data , message = "Success"){
        this.satusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400

    }
}