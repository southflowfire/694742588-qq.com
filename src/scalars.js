/*
 * @Author: renjianshu
 * @Date: 2020-03-30 20:01:54
 * @LastEditTime: 2020-03-30 21:17:56
 * @LastEditors: renjianshu
 * @Description:
 * @FilePath: \mock\src\scalars.js
 */
const { GraphQLScalarType, Kind } = require("graphql");
const Joi = require("@hapi/joi");
const { ValidationError } = require("apollo-server-koa");
const { isNaN } = require("lodash");
const { GraphQLError } = require("graphql/error");
const { URL } = require("url");

const {
  DateTimeResolver,
  EmailAddressResolver,
  NonNegativeIntResolver,
  NonPositiveIntResolver,
  // PhoneNumberResolver,
  // PositiveIntResolver,
  UnsignedIntResolver,
  // URLResolver,
  BigIntResolver,
  LongResolver,
  GUIDResolver,
  HexColorCodeResolver,
  IPv4Resolver,
  MACResolver,
  PortResolver,
  RGBResolver,
  RGBAResolver,
  JSONResolver,
  JSONObjectResolver,
  NonNegativeFloatResolver,
} = require("graphql-scalars");

const resolvers = {
  DateTime: DateTimeResolver,
  EmailAddress: EmailAddressResolver,
  NonNegativeInt: NonNegativeIntResolver,
  NonPositiveInt: NonPositiveIntResolver,
  NonNegativeFloat: NonNegativeFloatResolver,
  // PhoneNumber: PhoneNumberResolver,
  UnsignedInt: UnsignedIntResolver,
  // URL: URLResolver,
  BigInt: BigIntResolver,
  Long: LongResolver,
  GUID: GUIDResolver,
  HexColorCode: HexColorCodeResolver,
  IPv4: IPv4Resolver,
  MAC: MACResolver,
  Port: PortResolver,
  RGB: RGBResolver,
  RGBA: RGBAResolver,
  JSON: JSONResolver,
  JSONObject: JSONObjectResolver,
  // Date: new GraphQLScalarType({
  //   name: 'Date',
  //   description: 'Date String',
  //   parseValue(value) {
  //     if (!isValid(new Date(value))) {
  //       throw new ValidationError()
  //     }
  //     return value // value from the client
  //   },
  //   serialize(value) {
  //     return value// value sent to the client
  //   },
  //   parseLiteral(ast) {
  //     const value = ast.value;
  //     if (!isValid(new Date(value))) {
  //       throw new ValidationError()
  //     }
  //     return value
  //   }
  // }),
  URL: new GraphQLScalarType({
    name: 'URL',
    description: 'A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt.',
    serialize(value) {
      if (typeof value === 'string') {
        value = value.trim();
      }
      if (value === null || value === '') { return null; }
      if (typeof value !== 'string' && !(value instanceof URL)) {
        throw new TypeError(`Value is not string or URL: ${value}`);
      }
      return new URL(value.toString()).toString();
    },
    parseValue(value) {
      if (value === null) { return null; }
      if (typeof value !== 'string') {
        throw new TypeError(`Value is not string: ${value}`);
      }
      return new URL(value);
    },
    parseLiteral(ast) {
      if (ast.value === null) { return null; }
      if (ast.kind !== Kind.STRING) {
        throw new GraphQLError(`Can only validate strings as URLs but got a: ${ast.kind}`);
      }
      return new URL(ast.value);
    },
  }),
  PhoneNumber: new GraphQLScalarType({
    name: 'PhoneNumber',
    description: 'Chinese Phone Number type',
    parseValue(value) {
      if (!/^1\d{10}$/.test(value)) {
        throw new ValidationError('手机号码错误');
      }
      return value;
    },
    serialize(value) {
      return value; // value sent to the client
    },
    parseLiteral(ast) {
      if (!/^1\d{10}$/.test(ast.value)) {
        throw new ValidationError('手机号码错误');
      }
      return ast.value;
    },
  }),
  Currency: new GraphQLScalarType({
    name: 'Currency',
    description: '非负整型数，表示以分为单位的金额，例如3.23元对应的值为323',
    parseValue(value) {
      if (!Number.isInteger(value) || value < 0) {
        throw new ValidationError('Currency 类型验证错误: 非正整数');
      }
      return value;
    },
    serialize(value) {
      return value; // value sent to the client
    },
    parseLiteral(ast) {
      let regexp = new RegExp('^[0-9]+$');
      if (!regexp.test(ast.value)) {
        throw new ValidationError('Currency 类型验证错误: 非正整数');
      }

      let val = parseInt(ast.value);
      if (!Number.isInteger(val) || val < 0) {
        throw new ValidationError('Currency 类型验证错误: 非正整数');
      }
      return val;
    },
  }),
};

module.exports = {
  resolvers
};
