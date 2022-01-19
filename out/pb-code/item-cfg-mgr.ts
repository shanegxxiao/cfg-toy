import config from './config.js';
import protobuf from 'protobufjs/minimal.js';
import { loadCfgFile } from './config-loader';

export type ItemCfg = config.TestPbPkg.IItem;

class ItemCfgMgr{
    public async load (): Promise<void> {
        const uint8Array = await loadCfgFile("Item");
        var reader = protobuf.Reader.create(uint8Array);
        while (reader.pos < reader.len) {
            var cfg = config.TestPbPkg.Item.decodeDelimited(reader);
                        this.id2Item[cfg.id] = cfg;
                        this.name2Item[cfg.name] = cfg;
                    }
    }

        public getById(id: number): ItemCfg {
        return this.id2Item[id];
    }
        public getByName(name: string): ItemCfg {
        return this.name2Item[name];
    }
    
        private id2Item: {[key: number]: ItemCfg } = {};
        private name2Item: {[key: string]: ItemCfg } = {};
    }

export const itemCfgMgr = new ItemCfgMgr();