module.exports = {
   dateToString,
   dateFromString,
   tryDateFromString   
};

function dateFromString(s) {
   const parsed = {};
   if(!TryDateFromString(s, parsed)){
      throw new Error(parsed.error);
   }

   return parsed.date;
}

function tryDateFromString(s, out) {
   const parts = s.split('-');
   if (parts.length !== 3) {
      out.error = 'format_invalid';
      return false;
   }

   const year = +(parts[0]);
   const month = +(parts[1]);
   const day = +(parts[2]);

   if(isNaN(year) || isNaN(month) || isNaN(day)){
      out.error = 'format_invalid';
      return false;
   }

   const d = new Date();
   d.setFullYear(year);
   d.setMonth(month - 1);
   d.setDate(day);

   out.date = d;
   
   return true;
}

function dateToString(date) {
   if (!(date instanceof Date)) {
      throw new Error('not a Date object');
   }

   const year = date.getFullYear();
   let month = date.getMonth() + 1;
   let day = date.getDate();

   if (month < 10) {
      month = `0${month}`;
   }
   if (day < 10) {
      day = `0${day}`;
   }

   return `${year}-${month}-${day}`;
}