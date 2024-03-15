const asynchandler=(requesthandler)=>async(req,res,next)=>{
    try{
       await requesthandler(req,res,next)
    }
    catch(error){
      res.status(error.code||500).json({
          sucess:false,
          message:error.message
      })
    }
  }
  export  {asynchandler};