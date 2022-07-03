'use strict';

const Joi = require(`joi`);
const {QueryValidationMessage, RouteIdValidationMessage, SortType} = require(`../common/enums`);

const routeId = Joi.number().required().messages({
  'number.base': RouteIdValidationMessage.NUMBER
});

const queryLimit = Joi.number().messages({
  'number.base': QueryValidationMessage.LIMIT_NUMBER
});

const queryOrder = Joi.string().valid(SortType.DESC, SortType.ASC).messages({
  'any.only': QueryValidationMessage.ORDER_EXACT_VALUE
});

module.exports = {
  routeId,
  queryLimit,
  queryOrder
};
