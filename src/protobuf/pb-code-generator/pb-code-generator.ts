import fs from "fs";
import ejs from "ejs";
import { excelParser } from "../../excel-parser/excel-parser";
import fsExtra from "fs-extra";
import path from "path";
import { RecordDef, RecordField } from "../../excel-parser/type-def/record-def";

export function genCode(pbPackage: string, outputDirPath: string, callback?: Function) {
    fsExtra.ensureDirSync(outputDirPath);
    const recordDefs = excelParser.typeDef.getAllRecordDef();
    recordDefs.forEach(recordDef => {
        if (excelParser.indexDef.isKeyValueRecord(recordDef.aliasName)) {
            return;
        }
        const outputFilePath = path.join(outputDirPath, `${decapitalize(recordDef.name)}-cfg-mgr.ts`);
        ejs.renderFile(
            "src/protobuf/pb-code-generator/cfg-mgr.ejs",
            {
                pbPackage,
                recordDef,
                indexFields: getIndexFields(recordDef),
                getIndexType,
                capitalize,
                decapitalize
            },
            (error, str) => {
                if (error) {
                    callback && callback(error);
                    return;
                }
                fs.writeFile(outputFilePath, str, error => {
                    callback && callback(error);
                });
            }
        );
    });
}

function getIndexFields(recordDef: RecordDef): RecordField[] {
    const indexFields: RecordField[] = [];
    recordDef.fields.forEach(field => {
        if (!field.isIndexField) {
            return;
        }
        indexFields.push(field);
    });
    return indexFields;
}

function getIndexType(type: string): string {
    if (type === "string") {
        return "string";
    }
    return "number";
}

function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function decapitalize(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
}