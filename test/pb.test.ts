import pbRoot from '../out/pb-code/config.js';
import protobuf from 'protobufjs/minimal.js';
import fs from 'fs';

const buffer = fs.readFileSync("out/pb-data/Item.byte");
var reader = protobuf.Reader.create(buffer);
while (reader.pos < reader.len) {
    var item = pbRoot.TestPbPkg.Item.decodeDelimited(reader);
    console.log(JSON.stringify(item));
}
