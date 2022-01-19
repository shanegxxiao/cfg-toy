import { SheetInterface } from "../../excel/interface/sheet-interface";
import { defaultValue, fieldAliasName, fieldAnnotation, fieldName, typeAliasName, typeAnnotation, typeName } from "./type-header";

/**
 * 通过指定的类型表和行号，组装枚举的一个字段字义
 * @param sheet 类型表
 * @param row 指定行
 * @param enumDefs 枚举定义，用于保存结果
 * @param sheetDefs 表格定义，提供枚举的别名和注释
 */
export function assembleEnumField(sheet: SheetInterface, row: number, enumDefs: EnumDefs) {
    const field = new EnumField();
    field.name = sheet.getCellValue(row, fieldName.conlumn);
    field.aliasName = sheet.getCellValue(row, fieldAliasName.conlumn);
    field.annotation = sheet.getCellValue(row, fieldAnnotation.conlumn);
    field.defaultValue = sheet.getCellValue(row, defaultValue.conlumn);
    const enumTypeName = sheet.getCellValue(row, typeName.conlumn);
    let enumDef = enumDefs[enumTypeName];
    if (!enumDef) {
        enumDef = new EnumDef();
        enumDef.fields = [];
        enumDef.name = enumTypeName;
        enumDefs[enumDef.name] = enumDef;
    }
    enumDef.aliasName = enumDef.aliasName || sheet.getCellValue(row, typeAliasName.conlumn);
    enumDef.annotation = enumDef.annotation || sheet.getCellValue(row, typeAnnotation.conlumn);

    enumDef.fields.push(field);
}

/**
 * 枚举类型的数据定义
 */
export class EnumDef {
    public name: string;
    public aliasName: string;
    public annotation: string;
    public fields: EnumField[];
}

export class EnumField {
    /**
     * 字段名，程序用的是这个名字
     */
    public name: string;
    /**
     * 字段别名，表头写的是这个名字
     */
    public aliasName: string;
    /**
     * 默认值，如果这个字段定义在枚举里则这个值作为对应定义的枚举值，如果定义在记录里，则对应的表单元格为空时则赋以此值
     */
    public defaultValue: string;
    /**
     * 字段注释说明
     */
    public annotation: string;
}

/**
 * typeName到枚举定义的映射
 */
export type EnumDefs = { [key: string]: EnumDef };
