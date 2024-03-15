class apiresponse{
    constructor(status,data,message="Sucess"){
        this.status=status
        this.data=data
        this.message=message
        this.sucess=status<400
    }
}
export {apiresponse}