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
	NonNegativeFloatResolver
} = require("graphql-scalars");
const passwordReg = /^[0-9a-z~!@#$%^&-_]{6,18}$/i;

const resolvers = {
	DateTime: DateTimeResolver,
	EmailAddress: EmailAddressResolver,
	NonNegativeInt: NonNegativeIntResolver,
	NonPositiveInt: NonPositiveIntResolver,
	NonNegativeFloat: NonNegativeFloatResolver,
	// PhoneNumber: PhoneNumberResolver,
	// PositiveInt: PositiveIntResolver,
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
		name: "URL",
		description:
			"A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt.",
		serialize(value) {
			if (typeof value === "string") {
				value = value.trim();
			}
			if (value === null || value === "") {
				return null;
			}
			if (typeof value !== "string" && !(value instanceof URL)) {
				throw new TypeError(`Value is not string or URL: ${value}`);
			}
			return new URL(value.toString()).toString();
		},
		parseValue(value) {
			if (value === null) {
				return null;
			}
			if (typeof value !== "string") {
				throw new TypeError(`Value is not string: ${value}`);
			}
			return new URL(value);
		},
		parseLiteral(ast) {
			if (ast.value === null) {
				return null;
			}
			if (ast.kind !== Kind.STRING) {
				throw new GraphQLError(
					`Can only validate strings as URLs but got a: ${ast.kind}`
				);
			}
			return new URL(ast.value);
		}
	}),
	PhoneNumber: new GraphQLScalarType({
		name: "PhoneNumber",
		description: "Chinese Phone Number type",
		parseValue(value) {
			if (!/^1\d{10}$/.test(value)) {
				throw new ValidationError("手机号码错误");
			}
			return value;
		},
		serialize(value) {
			return value; // value sent to the client
		},
		parseLiteral(ast) {
			if (!/^1\d{10}$/.test(ast.value)) {
				throw new ValidationError("手机号码错误");
			}
			return ast.value;
		}
	}),
	URI: new GraphQLScalarType({
		name: "URI",
		description: "URI type",
		parseValue(value) {
			value = decodeURIComponent(value);
			const result = Joi.validate(
				value,
				Joi.string()
					.uri()
					.required()
			);
			if (result.error) {
				throw new ValidationError("");
			}
			return value;
		},
		serialize(value) {
			return value; // value sent to the client
		},
		parseLiteral(ast) {
			const value = decodeURIComponent(ast.value);
			const result = Joi.validate(
				value,
				Joi.string()
					.uri()
					.required()
			);
			if (result.error) {
				throw new ValidationError("");
			}
			return ast.value;
		}
	}),
	GENDER: new GraphQLScalarType({
		name: "GENDER",
		description: "GENDER type allow 0 1 2",
		parseValue(value) {
			value = decodeURIComponent(value);
			if (!/^[12]$/.test(value)) {
				throw new ValidationError("only 1, 2 is allowed");
			}
			return Number(value);
		},
		serialize(value) {
			return Number(value); // value sent to the client
		},
		parseLiteral(ast) {
			const value = decodeURIComponent(ast.value);
			if (!/^[12]$/.test(value)) {
				throw new ValidationError("only 1, 2 is allowed");
			}
			return Number(value);
		}
	}),
	Password: new GraphQLScalarType({
		name: "Password",
		description: "Password type 6-18位 支持字母数字和特殊字符 ~!@#$%^&-_",
		parseValue(value) {
			if (!passwordReg.test(value)) {
				throw new ValidationError(
					"密码格式应为6-18位字母或数字或特殊字符 ~!@#$%^&-_"
				);
			}
			return value;
		},
		serialize(value) {
			return value; // value sent to the client
		},
		parseLiteral(ast) {
			const value = decodeURIComponent(ast.value);
			if (!passwordReg.test(value)) {
				throw new ValidationError(
					"密码格式应为6-18位长度的字母、数字或特殊字符 ~!@#$%^&-_"
				);
			}
			return value;
		}
	}),
	Period: new GraphQLScalarType({
		name: "Period",
		description: "发刊周期，1. 季刊 2. 月刊 3. 周刊 4. 日刊 5 双月刊",
		parseValue(value) {
			if (![1, 2, 3, 4, 5].includes(Number(value))) {
				throw new ValidationError(
					"发刊周期错误, 参考: 1. 季刊 2. 月刊 3. 周刊 4. 日刊  5 双月刊"
				);
			}
			return value;
		},
		serialize(value) {
			return value; // value sent to the client
		},
		parseLiteral(ast) {
			const value = decodeURIComponent(ast.value);
			if (![1, 2, 3, 4, 5].includes(Number(value))) {
				throw new ValidationError(
					"发刊周期错误, 参考: 1. 季刊 2. 月刊 3. 周刊 4. 日刊  5 双月刊"
				);
			}
			return value;
		}
	}),
	PositiveInt: new GraphQLScalarType({
		name: "PositiveInt",
		description: "正整数",
		parseValue(value) {
			const num = Number(value);
			if (isNaN(num) || num <= 0) {
				throw new ValidationError("number should be positive");
			}
			return value;
		},
		serialize(value) {
			return value; // value sent to the client
		},
		parseLiteral(ast) {
			const value = decodeURIComponent(ast.value);
			const num = Number(value);
			if (isNaN(num) || num <= 0) {
				throw new ValidationError("number should be positive");
			}
			return value;
		}
	})
};

module.exports = {
    resolvers
};
