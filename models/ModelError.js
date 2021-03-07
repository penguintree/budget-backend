class ModelError extends Error {
   constructor(message) {
      super('ModelError');

      if (Array.isArray(message)) {
         this.innerMessages = message;   
      } else {
         this.innerMessages = [ message ];
      }
   }
}

module.exports = ModelError;