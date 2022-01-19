import fs from "fs";
import ejs from "ejs";
import { excelParser } from "../../excel-parser/excel-parser";
import { exportRequired, RecordDef, RecordField } from "../../excel-parser/type-def/record-def";
import fsExtra from "fs-extra";
import path from "path";
import { EnumDef, EnumField } from "../../excel-parser/type-def/enum-def";

/**
 * 使用excel数据生成proto定义文件
 * @param pbPackage protobuf包名
 * @param outputPath proto文件输出目录
 * @param exportTags 导出标签，用于选择哪些字段要导出
 * @param callback 完成回调
 */
export function genPbDef(pbPackage: string, outputPath: string, exportTags: string[], callback?: Function) {
    fsExtra.ensureDirSync(path.dirname(outputPath));
    ejs.renderFile(
        "src/protobuf/pb-def-generator/proto-file.ejs",
        {
            pbPackage: pbPackage,
            exportRequired: exportRequired,
            exportTags: exportTags,
            recordDefs: excelParser.typeDef.getAllRecordDef(),
            enumDefs: excelParser.typeDef.getAllEnumDef(),
            recordDefComma: recordDefComma,
            recordFieldComma: recordFieldComma,
            enumDefComma: enumDefComma,
            enumFieldComma: enumFieldComma,
        },
        (error, str) => {
            if (error) {
                callback && callback(error);
                return;
            }
            fs.writeFile(outputPath, str, error => {
                callback && callback(error);
            });
        }
    );
}

function recordDefComma(recordDef: RecordDef): string {
    return recordDef.aliasName && recordDef.annotation ? ", " : "";
}

function recordFieldComma(field: RecordField): string {
    return field.aliasName && field.annotation ? ", " : "";
}

function enumDefComma(enumDef: EnumDef): string {
    return enumDef.aliasName && enumDef.annotation ? ", " : "";
}

function enumFieldComma(field: EnumField): string {
    return field.aliasName && field.annotation ? ", " : "";
}

