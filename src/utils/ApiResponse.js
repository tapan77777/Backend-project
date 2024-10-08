class ApiResponse {
    constructor(statusCode , data , message = "Successfull"){
        this.satusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400

    }
}

export { ApiResponse }
