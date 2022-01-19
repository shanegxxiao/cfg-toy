import { SheetInterface } from "../../excel/interface/sheet-interface";

// 类型表的表头定义，定义每一个表头名字和默认的列索引
export const typeCatagory = {
    content: "类型分类",
    conlumn: 1
};
export const typeName = {
    content: "类型名",
    conlumn: 2
};
export const typeAliasName = {
    content: "表格名字/类型别名",
    conlumn: 3
};
export const fieldName = {
    content: "字段名",
    conlumn: 4
};
export const fieldAliasName = {
    content: "字段别名",
    conlumn: 5
};
export const fieldType = {
    content: "字段类型",
    conlumn: 6
};
export const elementSep = {
    content: "数组切割符",
    conlumn: 7
};
export const flags = {
    content: "导出标签",
    conlumn: 8
};
export const defaultValue = {
    content: "默认值",
    conlumn: 9
};
export const i18nField = {
    content: "是否多语言",
    conlumn: 10
};
export const fieldAnnotation = {
    content: "字段说明",
    conlumn: 11
};
export const typeAnnotation = {
    content: "类型说明",
    conlumn: 12
};
export const indexField = {
    content: "是否索引",
    conlumn: 13
};
/**
 * 解析字符串表头所在列的索引
 * @param sheet 类型表
 */
export function parseTypeHeader(sheet: SheetInterface) {
    typeCatagory.conlumn = sheet.getColumnIndexOfRowContent(1, typeCatagory.content);
    typeName.conlumn = sheet.getColumnIndexOfRowContent(1, typeName.content);
    typeAliasName.conlumn = sheet.getColumnIndexOfRowContent(1, typeAliasName.content);
    fieldName.conlumn = sheet.getColumnIndexOfRowContent(1, fieldName.content);
    fieldAliasName.conlumn = sheet.getColumnIndexOfRowContent(1, fieldAliasName.content);
    fieldType.conlumn = sheet.getColumnIndexOfRowContent(1, fieldType.content);
    elementSep.conlumn = sheet.getColumnIndexOfRowContent(1, elementSep.content);
    flags.conlumn = sheet.getColumnIndexOfRowContent(1, flags.content);
    defaultValue.conlumn = sheet.getColumnIndexOfRowContent(1, defaultValue.content);
    i18nField.conlumn = sheet.getColumnIndexOfRowContent(1, i18nField.content);
    fieldAnnotation.conlumn = sheet.getColumnIndexOfRowContent(1, fieldAnnotation.content);
    typeAnnotation.conlumn = sheet.getColumnIndexOfRowContent(1, typeAnnotation.content);
    indexField.conlumn = sheet.getColumnIndexOfRowContent(1, indexField.content);
}
