module.exports = {
   groupBy,
   toReadOnlyCollection
};

const ReadOnlyCollection = require('~/ReadOnlyCollection');

function groupBy(array, keySelector, valueSelector) {
   return array.reduce(groupBy$reducer(keySelector, valueSelector), {});
}

function groupBy$reducer(keySelector, valueSelector){
   return (accumulator, currentValue) => {
      const key = keySelector(currentValue);
      accumulator[key] = accumulator[key] || [];

      const value = valueSelector(currentValue);

      accumulator[key].push(value);

      return accumulator;
   };
}

function toReadOnlyCollection(array){
   return new ReadOnlyCollection(array);
}