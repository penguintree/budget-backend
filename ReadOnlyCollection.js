const privates = new WeakMap();

class ReadOnlyCollection{
   constructor(source){
      if(!Array.isArray(source)){
         throw new Error('source _must_ be a Array');
      }

      privates[this] = {
         source
      };
   }

   get length(){
      return privates[this].source.length;
   }

   get(index){
      return privates[this].source[index];
   }

   filter(predicat) {
      return privates[this].source.filter(predicat);
   }

   map(factory){
      return privates[this].source.map(factory);
   }

   [Symbol.iterator]() {
      var index = -1;
      var source  = privates[this].source;
  
      return {
        next: () => ({ 
           value: source[++index], 
           done: index >= source.length 
         })
      };
    }
}

module.exports = ReadOnlyCollection;