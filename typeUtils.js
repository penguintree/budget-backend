module.exports = {
   isString,
   isNumber,
   isDate
};

function isString(o){
   return typeof(o) === 'string' || o instanceof String;
}

function isNumber(o){
   return (typeof(o) === 'number' || o instanceof Number) && !isNaN(o);
}

function isDate(o){
   return typeof(o) === 'date' || o instanceof Date;
}