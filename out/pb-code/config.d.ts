// DO NOT EDIT! This is a generated file. Edit the JSDoc in src/*.js instead and run 'npm run types'.

/** Namespace TestPbPkg. */
export namespace TestPbPkg {

    /** Properties of an Item. */
    interface IItem {

        /** Item id */
        id?: (number|null);

        /** Item name */
        name?: (string|null);

        /** Item icon */
        icon?: (string|null);

        /** Item type */
        type?: (TestPbPkg.ItemType|null);

        /** Item count */
        count?: (number|null);

        /** Item probability */
        probability?: (number|null);
    }

    /** Represents an Item. */
    class Item implements IItem {

        /**
         * Constructs a new Item.
         * @param [properties] Properties to set
         */
        constructor(properties?: TestPbPkg.IItem);

        /** Item id. */
        public id: number;

        /** Item name. */
        public name: string;

        /** Item icon. */
        public icon: string;

        /** Item type. */
        public type: TestPbPkg.ItemType;

        /** Item count. */
        public count: number;

        /** Item probability. */
        public probability: number;

        /**
         * Creates a new Item instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Item instance
         */
        public static create(properties?: TestPbPkg.IItem): TestPbPkg.Item;

        /**
         * Encodes the specified Item message. Does not implicitly {@link TestPbPkg.Item.verify|verify} messages.
         * @param message Item message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: TestPbPkg.IItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Item message, length delimited. Does not implicitly {@link TestPbPkg.Item.verify|verify} messages.
         * @param message Item message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: TestPbPkg.IItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Item message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Item
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): TestPbPkg.Item;

        /**
         * Decodes an Item message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Item
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): TestPbPkg.Item;

        /**
         * Verifies an Item message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Item message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Item
         */
        public static fromObject(object: { [k: string]: any }): TestPbPkg.Item;

        /**
         * Creates a plain object from an Item message. Also converts values to other types if specified.
         * @param message Item
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: TestPbPkg.Item, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Item to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an Args. */
    interface IArgs {

        /** Args defaultPlayerName */
        defaultPlayerName?: (string|null);

        /** Args defaultPlayerLvl */
        defaultPlayerLvl?: (number|null);

        /** Args usrDefaultCfg */
        usrDefaultCfg?: (boolean|null);

        /** Args playerType */
        playerType?: (TestPbPkg.PlayerType|null);

        /** Args growthFactor */
        growthFactor?: (number|null);

        /** Args defaultItems */
        defaultItems?: (number[]|null);
    }

    /** Represents an Args. */
    class Args implements IArgs {

        /**
         * Constructs a new Args.
         * @param [properties] Properties to set
         */
        constructor(properties?: TestPbPkg.IArgs);

        /** Args defaultPlayerName. */
        public defaultPlayerName: string;

        /** Args defaultPlayerLvl. */
        public defaultPlayerLvl: number;

        /** Args usrDefaultCfg. */
        public usrDefaultCfg: boolean;

        /** Args playerType. */
        public playerType: TestPbPkg.PlayerType;

        /** Args growthFactor. */
        public growthFactor: number;

        /** Args defaultItems. */
        public defaultItems: number[];

        /**
         * Creates a new Args instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Args instance
         */
        public static create(properties?: TestPbPkg.IArgs): TestPbPkg.Args;

        /**
         * Encodes the specified Args message. Does not implicitly {@link TestPbPkg.Args.verify|verify} messages.
         * @param message Args message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: TestPbPkg.IArgs, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Args message, length delimited. Does not implicitly {@link TestPbPkg.Args.verify|verify} messages.
         * @param message Args message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: TestPbPkg.IArgs, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Args message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Args
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): TestPbPkg.Args;

        /**
         * Decodes an Args message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Args
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): TestPbPkg.Args;

        /**
         * Verifies an Args message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Args message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Args
         */
        public static fromObject(object: { [k: string]: any }): TestPbPkg.Args;

        /**
         * Creates a plain object from an Args message. Also converts values to other types if specified.
         * @param message Args
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: TestPbPkg.Args, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Args to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** ItemType enum. */
    enum ItemType {
        Type1 = 1,
        Type2 = 2,
        Type3 = 3
    }

    /** PlayerType enum. */
    enum PlayerType {
        Warrior = 1,
        Master = 2
    }
}
