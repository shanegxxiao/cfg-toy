import protobuf from "protobufjs";
import { excelParser } from "../../excel-parser/excel-parser";
import { SheetType } from "../../excel-parser/index-def/sheet-def";
import { genKeyValuePbData } from "./key-value-data-generator";
import { genRecordPbData } from "./record-data-generator";
import fsExtra from "fs-extra";

/**
 * 使用指定的proto文件，将excel数据保存成protobuf格式的数据文件，一个sheet一个文件
 * @param pbPackage protobuf包名
 * @param protoPath proto文件目录
 * @param outputPath 数据文件输出目录
 * @param callback 完成回调
 */
export function genPbData(pbPackage: string, protoPath: string, outputPath: string, callback?: Function) {
    fsExtra.ensureDirSync(outputPath);
    const pbRoot = protobuf.loadSync(protoPath);
    const sheetDefs = excelParser.indexDef.getSheetDefs();
    for (let name in sheetDefs) {
        const sheetDef = sheetDefs[name];
        if (sheetDef.type === SheetType.Records) {
            genRecordPbData(sheetDef, pbPackage, pbRoot, outputPath);
        }
        else if (sheetDef.type === SheetType.KeyValue) {
            genKeyValuePbData(sheetDef, pbPackage, pbRoot, outputPath);
        }
    }
    callback();
}