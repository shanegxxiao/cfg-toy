import { SheetInterface } from "../../excel/interface/sheet-interface";
import { sheetAnnotation, sheetName, sheetType } from "./index-header";

/**
 * 读取索引表里的指定行数据生成表格定义
 * @param sheet 索引表
 * @param row 指定行索引
 * @param sheetDefs 表格定义，用于保存结果
 * @returns 
 */
export function assembleSheetDef(sheet: SheetInterface, row: number, sheetDefs: SheetDefs) {
    const name = sheet.getCellValue(row, sheetName.conlumn).trim();
    const typeName = sheet.getCellValue(row, sheetType.conlumn).trim();
    const annotation = sheet.getCellValue(row, sheetAnnotation.conlumn).trim();
    const typeEnum = parseTypeName(typeName, sheet);
    let sheetDef = sheetDefs[sheet.getName()];
    if (!sheetDef) {
        sheetDef = {
            name: name,
            type: typeEnum,
            annotation: annotation
        };
        sheetDefs[name] = sheetDef;
        return;
    }
    if (sheetDef.type != typeEnum) {
        throw new Error(`found 2 types ${sheetDef.type} and ${typeEnum} of sheet ${name}.`);
    }
    sheetDef.annotation = sheetDef.annotation || annotation;
}

function parseTypeName(typeName: string, sheet: SheetInterface): SheetType {
    switch (typeName) {
        case typeDefSheetTypeName:
            return SheetType.TypeDef;
        case recordSheetTypeName:
            return SheetType.Records;
        case keyValueSheetTypeName:
            return SheetType.KeyValue;
        default:
            throw new Error(`unexpected sheet type name ${typeName} in sheet ${sheet.getName()}.`);
    }
}

export type SheetDef = {
    name: string;
    type: SheetType;
    annotation: string;
};

export type SheetDefs = { [key: string]: SheetDef };

/**
 * 表格类型
 */
export enum SheetType {
    /**
     * 索引表
     */
    Index,
    /**
     * 类型定义表
     */
    TypeDef,
    /**
     * 记录表
     */
    Records,
    /**
     * 键值表
     */
    KeyValue,
};

/**
 * 表格类型定义，类型定义表
 */
const typeDefSheetTypeName = "类型定义表";
/**
 * 表格类型定义，类型定义表
 */
const recordSheetTypeName = "多行数据表";
/**
 * 表格类型定义，类型定义表
 */
const keyValueSheetTypeName = "键值数据表";
