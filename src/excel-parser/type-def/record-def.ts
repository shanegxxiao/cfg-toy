import { SheetInterface } from "../../excel/interface/sheet-interface";
import { defaultValue, elementSep, fieldAliasName, fieldAnnotation, fieldName, fieldType, flags, i18nField, indexField, typeAliasName, typeAnnotation, typeName } from "./type-header";

/**
 * 通过指定的类型表和行号，组装记录的一个字段字义
 * @param sheet 类型表
 * @param row 指定行
 * @param recordDefs 记录定义，用于保存结果
 * @param sheetDefs 表格定义，提供枚举的别名和注释
 */
export function assembleRecordField(sheet: SheetInterface, row: number, recordDefs: RecordDefs) {
    const field = new RecordField();
    field.name = sheet.getCellValue(row, fieldName.conlumn);
    field.aliasName = sheet.getCellValue(row, fieldAliasName.conlumn);
    field.annotation = sheet.getCellValue(row, fieldAnnotation.conlumn);
    field.type = sheet.getCellValue(row, fieldType.conlumn);
    field.elementSep = sheet.getCellValue(row, elementSep.conlumn);
    field.tags = splitTags(sheet.getCellValue(row, flags.conlumn));
    field.defaultValue = sheet.getCellValue(row, defaultValue.conlumn);
    field.isI18nField = convertToBoolean(sheet.getCellValue(row, i18nField.conlumn));
    field.isIndexField = convertToBoolean(sheet.getCellValue(row, indexField.conlumn));
    const recordTypeName = sheet.getCellValue(row, typeName.conlumn);
    let recordDef = recordDefs[recordTypeName];
    if (!recordDef) {
        recordDef = new RecordDef();
        recordDef.fields = [];
        recordDef.name = recordTypeName;
        recordDefs[recordDef.name] = recordDef;
    }
    recordDef.aliasName = recordDef.aliasName || sheet.getCellValue(row, typeAliasName.conlumn);
    recordDef.annotation = recordDef.annotation || sheet.getCellValue(row, typeAnnotation.conlumn);

    recordDef.fields.push(field);
}

/**
 * 判断一个字段是否要导出
 * @param exportTags 导出标签
 * @param fieldTags 字段标签
 */
export function exportRequired(exportTags: string[], recordField: RecordField) {
    if (!exportTags || exportTags.length == 0 || !recordField.tags || recordField.tags.length == 0) {
        return true;
    }
    for (let i = 0; i < exportTags.length; ++i) {
        if (recordField.tags.findIndex(tag => tag.toLocaleLowerCase() == exportTags[i].toLocaleLowerCase()) >= 0) {
            return true;
        }
    }
    return false;
}

/**
 * 记录类型的数据定义
 */
export class RecordDef {
    /**
     * 类型名
     */
    public name: string;
    /**
     * 表格名字/类型别名
     */
    public aliasName: string;
    /**
     * 类型说明
     */
    public annotation: string;
    /**
     * 字段列表
     */
    public fields: RecordField[];
}

/**
 * 记录类型数据的字段字义
 */
 export class RecordField {
    /**
     * 字段名，程序用的是这个名字
     */
    public name: string;
    /**
     * 字段别名，表头写的是这个名字
     */
    public aliasName: string;
    /**
     * 字段注释说明
     */
    public annotation: string;
    /**
     * 标签，用于选择导出的字段
     */
    public tags: string[];
    /**
     * 默认值，如果这个字段定义在枚举里则这个值作为对应定义的枚举值，如果定义在记录里，则对应的表单元格为空时则赋以此值
     */
    public defaultValue: string;
    /**
     * 获取该字段的类型，数组以“[]”结尾
     */
    public get type(): string {
        return this.originalCfgType;
    };
    /**
     * 设置该字段的类型，如果以“[]”结尾则会标记该字段为数组并计算出数组元素类型
     */
    public set type(value: string) {
        this.originalCfgType = value;
        const arrayFlag = "[]";
        if (this.originalCfgType.endsWith(arrayFlag)) {
            this.calculatedIsArray = true;
            this.arrayElementType = this.originalCfgType.substring(0, this.originalCfgType.length - arrayFlag.length);
            return;
        }
        this.calculatedIsArray = false;
        this.arrayElementType = undefined;
    }
    /**
     * 是否是数组类型
     */
    public get isArray(): boolean {
        return this.calculatedIsArray;
    }
    /**
     * 数组元素类型
     */
    public arrayElementType: string;
    /**
     * 数组切割符
     */
    public elementSep: string;
    /**
     * 是否多语言字段
     */
    public isI18nField: boolean;
    /**
     * 是否索引字段
     */
    public isIndexField: boolean;

    private originalCfgType: string;
    private calculatedIsArray: boolean;
}

/**
 * typeName到记录定义的映射
 */
export type RecordDefs = { [key: string]: RecordDef };

/**
 * 拆分标签配置
 * @param cfgString 原始配置
 */
function splitTags(cfgString: string): string[] {
    if (!cfgString || cfgString.length == 0) {
        return [];
    }
    return cfgString.split("|");
}

function convertToBoolean(content: string): boolean {
    if (!content || content.length == 0) {
        return false;
    }
    if (content == "是") {
        return true;
    }
    if (+content > 0) {
        return true;
    }
    return false;
}