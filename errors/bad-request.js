const CustomAPIError=require('./custom-error')


class badRequest extends CustomAPIError{
    constructor(message){
        super(message)
        this.statusCode=400
    }
}

module.exports=badRequest