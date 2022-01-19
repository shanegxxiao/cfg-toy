import path from 'path';
import fs from 'fs';
import { excelParser } from "../../excel-parser/excel-parser";
import { RecordField } from "../../excel-parser/type-def/record-def";
import { SheetDef } from "../../excel-parser/index-def/sheet-def";
import { SheetInterface } from "../../excel/interface/sheet-interface";
import { parseFieldValue } from './generator-common';

export function genKeyValuePbData(sheetDef: SheetDef, pbPackage: string, pbRoot: protobuf.Root, outputPath: string) {
    const namedKeyValueSheets = excelParser.indexDef.getKeyValueSheets(sheetDef);
    if (namedKeyValueSheets.length != 1) {
        throw new Error(`found ${namedKeyValueSheets.length} of key-value sheet ${sheetDef.name} found, expected one.`);
    }
    const sheet = namedKeyValueSheets[0];
    const typeName = excelParser.typeDef.getTypeNameBySheetName(sheetDef.name);
    if (!typeName) {
        throw new Error(`cannot found type name of sheet ${sheetDef.name}.`);
    }
    const msgName = pbPackage ? `${pbPackage}.${typeName}` : typeName;
    const MessageType = pbRoot.lookupType(msgName);
    if (!MessageType) {
        throw new Error(`cannot found message definition ${msgName}`);
    }
    const row2FieldMap = parseRow2Name(sheet);
    const msgObj: { [key: string]: string | string[] } = {};
    for (let r in row2FieldMap) {
        const fieldDef = row2FieldMap[r];
        msgObj[fieldDef.name] = parseFieldValue(sheet, +r, 2, fieldDef);
    }
    const message = MessageType.fromObject(msgObj);
    const buffer = MessageType.encodeDelimited(message).finish();
    const fileName = excelParser.typeDef.getTypeNameBySheetName(sheetDef.name);
    if (!fileName) {
        throw new Error(`cannot get type name by sheet name ${sheetDef.name}`);
    }
    const fd = fs.openSync(`${path.join(outputPath, fileName)}.byte`, "w")
    fs.writeSync(fd, buffer);
    fs.closeSync(fd);
}

function parseRow2Name(sheet: SheetInterface): Row2RecordFieldMap {
    let map: Row2RecordFieldMap = {};
    let recordDef = excelParser.typeDef.getAllRecordDef().find(def => def.aliasName === sheet.getName());
    recordDef.fields.forEach(field => {
        for (let r = 1; r <= sheet.getRowCnt(); ++r) {
            if (sheet.getCellValue(r, 1) !== field.aliasName && sheet.getCellValue(r, 1) !== field.name) {
                continue;
            }
            if (map[r]) {
                throw new Error(`found 2 rows of field ${JSON.stringify(field)}.`);
            }
            map[r] = field;
            break;
        }
    });
    const foundFieldCnt = Object.keys(map).length;
    const expectedFieldCnt = recordDef.fields.length;
    if (foundFieldCnt < expectedFieldCnt) {
        throw new Error(`found ${foundFieldCnt} fields in ${sheet.getName()}, ${expectedFieldCnt} expected.`);
    }
    return map;
}

type Row2RecordFieldMap = { [key: number]: RecordField };
