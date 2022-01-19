/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal.js");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.TestPbPkg = (function() {

    /**
     * Namespace TestPbPkg.
     * @exports TestPbPkg
     * @namespace
     */
    var TestPbPkg = {};

    TestPbPkg.Item = (function() {

        /**
         * Properties of an Item.
         * @memberof TestPbPkg
         * @interface IItem
         * @property {number|null} [id] Item id
         * @property {string|null} [name] Item name
         * @property {string|null} [icon] Item icon
         * @property {TestPbPkg.ItemType|null} [type] Item type
         * @property {number|null} [count] Item count
         * @property {number|null} [probability] Item probability
         */

        /**
         * Constructs a new Item.
         * @memberof TestPbPkg
         * @classdesc Represents an Item.
         * @implements IItem
         * @constructor
         * @param {TestPbPkg.IItem=} [properties] Properties to set
         */
        function Item(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Item id.
         * @member {number} id
         * @memberof TestPbPkg.Item
         * @instance
         */
        Item.prototype.id = 0;

        /**
         * Item name.
         * @member {string} name
         * @memberof TestPbPkg.Item
         * @instance
         */
        Item.prototype.name = "";

        /**
         * Item icon.
         * @member {string} icon
         * @memberof TestPbPkg.Item
         * @instance
         */
        Item.prototype.icon = "";

        /**
         * Item type.
         * @member {TestPbPkg.ItemType} type
         * @memberof TestPbPkg.Item
         * @instance
         */
        Item.prototype.type = 1;

        /**
         * Item count.
         * @member {number} count
         * @memberof TestPbPkg.Item
         * @instance
         */
        Item.prototype.count = 0;

        /**
         * Item probability.
         * @member {number} probability
         * @memberof TestPbPkg.Item
         * @instance
         */
        Item.prototype.probability = 0;

        /**
         * Creates a new Item instance using the specified properties.
         * @function create
         * @memberof TestPbPkg.Item
         * @static
         * @param {TestPbPkg.IItem=} [properties] Properties to set
         * @returns {TestPbPkg.Item} Item instance
         */
        Item.create = function create(properties) {
            return new Item(properties);
        };

        /**
         * Encodes the specified Item message. Does not implicitly {@link TestPbPkg.Item.verify|verify} messages.
         * @function encode
         * @memberof TestPbPkg.Item
         * @static
         * @param {TestPbPkg.IItem} message Item message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Item.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            if (message.icon != null && Object.hasOwnProperty.call(message, "icon"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.icon);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.type);
            if (message.count != null && Object.hasOwnProperty.call(message, "count"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.count);
            if (message.probability != null && Object.hasOwnProperty.call(message, "probability"))
                writer.uint32(/* id 6, wireType 5 =*/53).float(message.probability);
            return writer;
        };

        /**
         * Encodes the specified Item message, length delimited. Does not implicitly {@link TestPbPkg.Item.verify|verify} messages.
         * @function encodeDelimited
         * @memberof TestPbPkg.Item
         * @static
         * @param {TestPbPkg.IItem} message Item message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Item.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Item message from the specified reader or buffer.
         * @function decode
         * @memberof TestPbPkg.Item
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {TestPbPkg.Item} Item
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Item.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.TestPbPkg.Item();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.int32();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.icon = reader.string();
                    break;
                case 4:
                    message.type = reader.int32();
                    break;
                case 5:
                    message.count = reader.int32();
                    break;
                case 6:
                    message.probability = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Item message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof TestPbPkg.Item
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {TestPbPkg.Item} Item
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Item.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Item message.
         * @function verify
         * @memberof TestPbPkg.Item
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Item.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.icon != null && message.hasOwnProperty("icon"))
                if (!$util.isString(message.icon))
                    return "icon: string expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 1:
                case 2:
                case 3:
                    break;
                }
            if (message.count != null && message.hasOwnProperty("count"))
                if (!$util.isInteger(message.count))
                    return "count: integer expected";
            if (message.probability != null && message.hasOwnProperty("probability"))
                if (typeof message.probability !== "number")
                    return "probability: number expected";
            return null;
        };

        /**
         * Creates an Item message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof TestPbPkg.Item
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {TestPbPkg.Item} Item
         */
        Item.fromObject = function fromObject(object) {
            if (object instanceof $root.TestPbPkg.Item)
                return object;
            var message = new $root.TestPbPkg.Item();
            if (object.id != null)
                message.id = object.id | 0;
            if (object.name != null)
                message.name = String(object.name);
            if (object.icon != null)
                message.icon = String(object.icon);
            switch (object.type) {
            case "Type1":
            case 1:
                message.type = 1;
                break;
            case "Type2":
            case 2:
                message.type = 2;
                break;
            case "Type3":
            case 3:
                message.type = 3;
                break;
            }
            if (object.count != null)
                message.count = object.count | 0;
            if (object.probability != null)
                message.probability = Number(object.probability);
            return message;
        };

        /**
         * Creates a plain object from an Item message. Also converts values to other types if specified.
         * @function toObject
         * @memberof TestPbPkg.Item
         * @static
         * @param {TestPbPkg.Item} message Item
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Item.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = 0;
                object.name = "";
                object.icon = "";
                object.type = options.enums === String ? "Type1" : 1;
                object.count = 0;
                object.probability = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.icon != null && message.hasOwnProperty("icon"))
                object.icon = message.icon;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.TestPbPkg.ItemType[message.type] : message.type;
            if (message.count != null && message.hasOwnProperty("count"))
                object.count = message.count;
            if (message.probability != null && message.hasOwnProperty("probability"))
                object.probability = options.json && !isFinite(message.probability) ? String(message.probability) : message.probability;
            return object;
        };

        /**
         * Converts this Item to JSON.
         * @function toJSON
         * @memberof TestPbPkg.Item
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Item.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Item;
    })();

    TestPbPkg.Args = (function() {

        /**
         * Properties of an Args.
         * @memberof TestPbPkg
         * @interface IArgs
         * @property {string|null} [defaultPlayerName] Args defaultPlayerName
         * @property {number|null} [defaultPlayerLvl] Args defaultPlayerLvl
         * @property {boolean|null} [usrDefaultCfg] Args usrDefaultCfg
         * @property {TestPbPkg.PlayerType|null} [playerType] Args playerType
         * @property {number|null} [growthFactor] Args growthFactor
         * @property {Array.<number>|null} [defaultItems] Args defaultItems
         */

        /**
         * Constructs a new Args.
         * @memberof TestPbPkg
         * @classdesc Represents an Args.
         * @implements IArgs
         * @constructor
         * @param {TestPbPkg.IArgs=} [properties] Properties to set
         */
        function Args(properties) {
            this.defaultItems = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Args defaultPlayerName.
         * @member {string} defaultPlayerName
         * @memberof TestPbPkg.Args
         * @instance
         */
        Args.prototype.defaultPlayerName = "";

        /**
         * Args defaultPlayerLvl.
         * @member {number} defaultPlayerLvl
         * @memberof TestPbPkg.Args
         * @instance
         */
        Args.prototype.defaultPlayerLvl = 0;

        /**
         * Args usrDefaultCfg.
         * @member {boolean} usrDefaultCfg
         * @memberof TestPbPkg.Args
         * @instance
         */
        Args.prototype.usrDefaultCfg = false;

        /**
         * Args playerType.
         * @member {TestPbPkg.PlayerType} playerType
         * @memberof TestPbPkg.Args
         * @instance
         */
        Args.prototype.playerType = 1;

        /**
         * Args growthFactor.
         * @member {number} growthFactor
         * @memberof TestPbPkg.Args
         * @instance
         */
        Args.prototype.growthFactor = 0;

        /**
         * Args defaultItems.
         * @member {Array.<number>} defaultItems
         * @memberof TestPbPkg.Args
         * @instance
         */
        Args.prototype.defaultItems = $util.emptyArray;

        /**
         * Creates a new Args instance using the specified properties.
         * @function create
         * @memberof TestPbPkg.Args
         * @static
         * @param {TestPbPkg.IArgs=} [properties] Properties to set
         * @returns {TestPbPkg.Args} Args instance
         */
        Args.create = function create(properties) {
            return new Args(properties);
        };

        /**
         * Encodes the specified Args message. Does not implicitly {@link TestPbPkg.Args.verify|verify} messages.
         * @function encode
         * @memberof TestPbPkg.Args
         * @static
         * @param {TestPbPkg.IArgs} message Args message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Args.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.defaultPlayerName != null && Object.hasOwnProperty.call(message, "defaultPlayerName"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.defaultPlayerName);
            if (message.defaultPlayerLvl != null && Object.hasOwnProperty.call(message, "defaultPlayerLvl"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.defaultPlayerLvl);
            if (message.usrDefaultCfg != null && Object.hasOwnProperty.call(message, "usrDefaultCfg"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.usrDefaultCfg);
            if (message.playerType != null && Object.hasOwnProperty.call(message, "playerType"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.playerType);
            if (message.growthFactor != null && Object.hasOwnProperty.call(message, "growthFactor"))
                writer.uint32(/* id 5, wireType 5 =*/45).float(message.growthFactor);
            if (message.defaultItems != null && message.defaultItems.length) {
                writer.uint32(/* id 6, wireType 2 =*/50).fork();
                for (var i = 0; i < message.defaultItems.length; ++i)
                    writer.int32(message.defaultItems[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified Args message, length delimited. Does not implicitly {@link TestPbPkg.Args.verify|verify} messages.
         * @function encodeDelimited
         * @memberof TestPbPkg.Args
         * @static
         * @param {TestPbPkg.IArgs} message Args message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Args.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Args message from the specified reader or buffer.
         * @function decode
         * @memberof TestPbPkg.Args
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {TestPbPkg.Args} Args
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Args.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.TestPbPkg.Args();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.defaultPlayerName = reader.string();
                    break;
                case 2:
                    message.defaultPlayerLvl = reader.int32();
                    break;
                case 3:
                    message.usrDefaultCfg = reader.bool();
                    break;
                case 4:
                    message.playerType = reader.int32();
                    break;
                case 5:
                    message.growthFactor = reader.float();
                    break;
                case 6:
                    if (!(message.defaultItems && message.defaultItems.length))
                        message.defaultItems = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.defaultItems.push(reader.int32());
                    } else
                        message.defaultItems.push(reader.int32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Args message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof TestPbPkg.Args
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {TestPbPkg.Args} Args
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Args.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Args message.
         * @function verify
         * @memberof TestPbPkg.Args
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Args.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.defaultPlayerName != null && message.hasOwnProperty("defaultPlayerName"))
                if (!$util.isString(message.defaultPlayerName))
                    return "defaultPlayerName: string expected";
            if (message.defaultPlayerLvl != null && message.hasOwnProperty("defaultPlayerLvl"))
                if (!$util.isInteger(message.defaultPlayerLvl))
                    return "defaultPlayerLvl: integer expected";
            if (message.usrDefaultCfg != null && message.hasOwnProperty("usrDefaultCfg"))
                if (typeof message.usrDefaultCfg !== "boolean")
                    return "usrDefaultCfg: boolean expected";
            if (message.playerType != null && message.hasOwnProperty("playerType"))
                switch (message.playerType) {
                default:
                    return "playerType: enum value expected";
                case 1:
                case 2:
                    break;
                }
            if (message.growthFactor != null && message.hasOwnProperty("growthFactor"))
                if (typeof message.growthFactor !== "number")
                    return "growthFactor: number expected";
            if (message.defaultItems != null && message.hasOwnProperty("defaultItems")) {
                if (!Array.isArray(message.defaultItems))
                    return "defaultItems: array expected";
                for (var i = 0; i < message.defaultItems.length; ++i)
                    if (!$util.isInteger(message.defaultItems[i]))
                        return "defaultItems: integer[] expected";
            }
            return null;
        };

        /**
         * Creates an Args message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof TestPbPkg.Args
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {TestPbPkg.Args} Args
         */
        Args.fromObject = function fromObject(object) {
            if (object instanceof $root.TestPbPkg.Args)
                return object;
            var message = new $root.TestPbPkg.Args();
            if (object.defaultPlayerName != null)
                message.defaultPlayerName = String(object.defaultPlayerName);
            if (object.defaultPlayerLvl != null)
                message.defaultPlayerLvl = object.defaultPlayerLvl | 0;
            if (object.usrDefaultCfg != null)
                message.usrDefaultCfg = Boolean(object.usrDefaultCfg);
            switch (object.playerType) {
            case "Warrior":
            case 1:
                message.playerType = 1;
                break;
            case "Master":
            case 2:
                message.playerType = 2;
                break;
            }
            if (object.growthFactor != null)
                message.growthFactor = Number(object.growthFactor);
            if (object.defaultItems) {
                if (!Array.isArray(object.defaultItems))
                    throw TypeError(".TestPbPkg.Args.defaultItems: array expected");
                message.defaultItems = [];
                for (var i = 0; i < object.defaultItems.length; ++i)
                    message.defaultItems[i] = object.defaultItems[i] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from an Args message. Also converts values to other types if specified.
         * @function toObject
         * @memberof TestPbPkg.Args
         * @static
         * @param {TestPbPkg.Args} message Args
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Args.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.defaultItems = [];
            if (options.defaults) {
                object.defaultPlayerName = "";
                object.defaultPlayerLvl = 0;
                object.usrDefaultCfg = false;
                object.playerType = options.enums === String ? "Warrior" : 1;
                object.growthFactor = 0;
            }
            if (message.defaultPlayerName != null && message.hasOwnProperty("defaultPlayerName"))
                object.defaultPlayerName = message.defaultPlayerName;
            if (message.defaultPlayerLvl != null && message.hasOwnProperty("defaultPlayerLvl"))
                object.defaultPlayerLvl = message.defaultPlayerLvl;
            if (message.usrDefaultCfg != null && message.hasOwnProperty("usrDefaultCfg"))
                object.usrDefaultCfg = message.usrDefaultCfg;
            if (message.playerType != null && message.hasOwnProperty("playerType"))
                object.playerType = options.enums === String ? $root.TestPbPkg.PlayerType[message.playerType] : message.playerType;
            if (message.growthFactor != null && message.hasOwnProperty("growthFactor"))
                object.growthFactor = options.json && !isFinite(message.growthFactor) ? String(message.growthFactor) : message.growthFactor;
            if (message.defaultItems && message.defaultItems.length) {
                object.defaultItems = [];
                for (var j = 0; j < message.defaultItems.length; ++j)
                    object.defaultItems[j] = message.defaultItems[j];
            }
            return object;
        };

        /**
         * Converts this Args to JSON.
         * @function toJSON
         * @memberof TestPbPkg.Args
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Args.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Args;
    })();

    /**
     * ItemType enum.
     * @name TestPbPkg.ItemType
     * @enum {number}
     * @property {number} Type1=1 Type1 value
     * @property {number} Type2=2 Type2 value
     * @property {number} Type3=3 Type3 value
     */
    TestPbPkg.ItemType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[1] = "Type1"] = 1;
        values[valuesById[2] = "Type2"] = 2;
        values[valuesById[3] = "Type3"] = 3;
        return values;
    })();

    /**
     * PlayerType enum.
     * @name TestPbPkg.PlayerType
     * @enum {number}
     * @property {number} Warrior=1 Warrior value
     * @property {number} Master=2 Master value
     */
    TestPbPkg.PlayerType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[1] = "Warrior"] = 1;
        values[valuesById[2] = "Master"] = 2;
        return values;
    })();

    return TestPbPkg;
})();

module.exports = $root;
