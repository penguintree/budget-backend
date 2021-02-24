class RoutingConfig {
   constructor(){
      this._routes = {
         get: [],
         put: [],
         post: [],
         delete: []
      };
   }

   register({ verb, route, handler }){
      if(!this._routes[verb]) throw Error(`invalid verb ${verb}`);

      this._routes[verb].push({
         route,
         handler
      });
   }

   enumerate(f){
      for(let verb in this._routes) {
         for(let route of this._routes[verb]) {
            f({ verb, route: route.route, handler: route.handler });
         }
      }
   }
}

module.exports = new RoutingConfig();