const knownErrors = [
   {
      errorMessage: 'ER_DUP_ENTRY: Duplicate entry',
      messageIndex: 0,
      statusCode: 400,
      responseMessageCode: 'duplicate'
   }
];

module.exports = (err, req, res, next) => {
   const errMsg = err.message;
   if (errMsg){
      for(let known of knownErrors) {
         if(errMsg.indexOf(known.errorMessage) === known.messageIndex){
            res.status(known.statusCode);
            res.json({
               error: known.responseMessageCode
            });
            return;
         }
      }
   }

   console.log(err);
   res.status(500);
   res.end();
};