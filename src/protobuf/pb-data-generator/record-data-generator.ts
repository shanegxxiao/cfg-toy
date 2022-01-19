import path from 'path';
import fs from 'fs';
import { excelParser } from "../../excel-parser/excel-parser";
import { SheetDef } from "../../excel-parser/index-def/sheet-def";
import { SheetInterface } from '../../excel/interface/sheet-interface';
import { RecordField } from '../../excel-parser/type-def/record-def';
import { parseFieldValue } from './generator-common';
import protobuf from 'protobufjs';

export function genRecordPbData(sheetDef: SheetDef, pbPackage: string, pbRoot: protobuf.Root, outputPath: string) {
    const namedRecordSheets = excelParser.indexDef.getRecordSheets(sheetDef);
    var writer = protobuf.Writer.create();
    namedRecordSheets.forEach(sheet => {
        const typeName = excelParser.typeDef.getTypeNameBySheetName(sheetDef.name);
        if (!typeName) {
            throw new Error(`cannot found type name of sheet ${sheetDef.name}.`);
        }
        const msgName = pbPackage ? `${pbPackage}.${typeName}`: typeName;
        const MessageType = pbRoot.lookupType(msgName);
        if (!MessageType) {
            throw new Error(`cannot found message definition ${msgName}`);
        }
        const column2FieldMap = parseColumn2Name(sheet);
        for (let r = 2; r <= sheet.getRowCnt(); ++r) {
            const msgObj: { [key: string]: string | string[] } = {};
            for (let c in column2FieldMap) {
                const fieldDef = column2FieldMap[c];
                msgObj[fieldDef.name] = parseFieldValue(sheet, r, +c, fieldDef);
            }
            const message = MessageType.fromObject(msgObj);
            MessageType.encodeDelimited(message, writer);
        }
    });
    const fileName = excelParser.typeDef.getTypeNameBySheetName(sheetDef.name);
    if (!fileName) {
        throw new Error(`cannot get type name by sheet name ${sheetDef.name}`);
    }
    const fd = fs.openSync(`${path.join(outputPath, fileName)}.byte`, "w");
    fs.writeSync(fd, writer.finish());
    fs.closeSync(fd);
}

function parseColumn2Name(sheet: SheetInterface): Column2RecordFieldMap {
    let map: Column2RecordFieldMap = {};
    let recordDef = excelParser.typeDef.getAllRecordDef().find(def => def.aliasName === sheet.getName());
    recordDef.fields.forEach(field => {
        for (let c = 1; c <= sheet.getColCnt(); ++c) {
            if (sheet.getCellValue(1, c) !== field.aliasName && sheet.getCellValue(1, c) !== field.name) {
                continue;
            }
            if (map[c]) {
                throw new Error(`found 2 columns of field ${JSON.stringify(field)}.`);
            }
            map[c] = field;
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

type Column2RecordFieldMap = { [key: number]: RecordField };
