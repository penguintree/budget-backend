module.exports = {
   newOperation,
   operationFromPostModel
};

const ModelError = require('./ModelError');
const dateUtil = require('~/dateUtil');
const arrayUtil = require('~/arrayUtils');
const typeUtil = require('~/typeUtils');

const privates = new WeakMap();

function newOperation(id, name, date) {
   return new Operation(id, name, date);
}

function operationFromPostModel(model) {
   const operation = new Operation(undefined, model.name, model.date, true);
   const details = privates.get(operation).details;
   for(let d of model.details) {
      details.push(new OperationDetail(d, true));
   }
   return operation
}

class Operation {
   constructor(id, name, date, $create = false) {
      const out = {};

      if(!initOperationFields($create, id, name, date, out)) {
         throw new ModelError(out.errors);
      }
      privates.set(this, out.fields);
   }

   get id() {
      return privates.get(this).id;
   }

   get name() {
      return privates.get(this).name;
   }

   get date() {
      return privates.get(this).date;
   }

   get details(){
      return privates.get(this).roDetails;
   }

   addDetail({ id, description, categoryId, amount }) {
      const detail = new OperationDetail({ id, description, categoryId, amount });
      privates.get(this).details.push(detail);

      return detail;
   }

   toReadModel(){
      const rm = {
         id: this.id,
         name: this.name,
         date: dateUtil.dateToString(this.date),
         details:[]
      };

      for(let d of this.details){
         rm.details.push({
            id: d.id,
            description: d.description,
            categoryId: d.categoryId,
            amount: d.amount
         })
      }

      return rm;
   }

   applyPutModel(model) {
      const out = {};
      if(!initOperationFields(false, model.id, model.name, model.date, out)) {
         throw new ModelError(out.errors);
      }

      if(this.id !== out.fields.id) {
         throw new ModelError('incoherent id');
      }

      const thisPrivates = privates.get(this);
      thisPrivates.name = out.fields.name;
      thisPrivates.date = out.fields.date;

      const modelDetails = (model.details || []).map(d => {
         return new OperationDetail(d, true);
      });

      thisPrivates.details.length = 0;
      thisPrivates.details.push(...modelDetails);
   }
}

class OperationDetail {
   constructor({ id, description, categoryId, amount }, $canCreate = false) {
      const out = {};
      if(!initDetailField($canCreate, id, description, categoryId, amount, out)){
         throw new ModelError(out.errors);
      }

      privates.set(this, out.fields);
   }

   get id() {
      return privates.get(this).id;
   }

   get description() {
      return privates.get(this).description;
   }

   get categoryId() {
      return privates.get(this).categoryId;
   }

   get amount() {
      return privates.get(this).amount;
   }
}

function initOperationFields(create, id, name, date, out) {
   out.errors = [];
   if (create) {
      if (id !== undefined) {
         out.errors.push('id _must_ be undefined in creation');
      }
   }
   else {
      id = +id;
      if (!typeUtil.isNumber(id)) {
         out.errors.push(`id _must_ be a number, got ${typeof id}`);
      }
   }

   if (!typeUtil.isString(name)) {
      out.errors.push(`name _must_ be a string, got ${typeof name}`);
   }

   if (name.length === 0) {
      out.errors.push('name cannot be empty');
   }
   
   if (name.length > 255) {
      out.errors.push('name cannot exceed 255 char long');
   }

   if (typeUtil.isString(date)) {
      const parsedDate = {};
      if (!dateUtil.tryDateFromString(date, parsedDate)) {
         out.errors.push(`Date error : ${parsedDate.error}`);
      }
      date = parsedDate.date;
   } else if (!typeUtil.isDate(date)) {
      out.errors.push(`date _must_ be String or Date, got ${typeof date}`);
   }

   if (out.errors.length === 0) {
      const details = [];
      const roDetails = arrayUtil.toReadOnlyCollection(details);
      out.fields = {
         id,
         name,
         date,
         details,
         roDetails
      };
   }

   return out.errors.length === 0;
}

function initDetailField(canCreate, id, description, categoryId, amount, out){
   out.errors = [];
   if(id === undefined) {
      if (!canCreate) {
         out.errors.push('id _must_be defined');
      }
   } else {
      id = +id;
      if(isNaN(id)){
         out.errors.push('id _must_ be a number');
      }
   }

   if (description === undefined){
      out.errors.push('description _must_ be defined');
   } else if (description.length > 255) {
      out.errors.push('description _cannot_ exceed 255 chars long');
   }

   categoryId = +categoryId;
   if(isNaN(categoryId)){
      out.errors.push('cagtegoryId _must_ be a number');
   }

   amount = +amount;
   if(isNaN(amount)){
      out.errors.push('amount _must_ be a number');
   }

   if(out.errors.length === 0){
      out.fields = {
         id,
         description,
         categoryId,
         amount
      };
   }

   return out.errors.length === 0;
}