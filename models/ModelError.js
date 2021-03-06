class ModelError extends Error {
   constructor(message) {
      super('ModelError');

      this.innerMessage = message;
   }
}

module.exports = ModelError;