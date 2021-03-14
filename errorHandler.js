const knownErrors = [
   {
      errorMessage: 'ER_DUP_ENTRY: Duplicate entry',
      messageIndex: 0,
      statusCode: 400,
      responseMessageCode: 'duplicate'
   },
   {
      errorMessage: 'ER_DATA_TOO_LONG:',
      messageIndex: 0,
      statusCode: 400,
      responseMessageCode: 'max legth exceeded'
   },
   {
      errorMessage: 'ER_SIGNAL_EXCEPTION: INEXISTANT CATEGORY',
      messageIndex: 0,
      statusCode: 400,
      responseMessageCode: 'incoherence'
   },
   {
      errorMessage: 'ModelError',
      messageIndex: 0,
      statusCode: 400,
      responseMessageCode(err) {
         return err.innerMessages;
      } 
   }
];

module.exports = (err, req, res, next) => {
   const errMsg = err.message;
   if (errMsg){
      for(let known of knownErrors) {
         if(errMsg.indexOf(known.errorMessage) === known.messageIndex){
            res.status(known.statusCode);
            let errorContent;
            if(typeof(known.responseMessageCode) === 'function') {
               errorContent = known.responseMessageCode(err);
            } else {
               errorContent = known.responseMessageCode;
            }
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