import { SheetInterface } from "../../excel/interface/sheet-interface";

// 索引表的表头定义，定义每一个表头名字和默认的列索引
export const sheetName = {
    content: "表格名字",
    conlumn: 1
};
export const sheetType = {
    content: "表格类型",
    conlumn: 2
};
export const sheetAnnotation = {
    content: "说明",
    conlumn: 3
};

/**
 * 解析字符串表头所在列的索引
 * @param sheet 索引表
 */
export function parseIndexHeader(sheet: SheetInterface) {
    sheetName.conlumn = sheet.getColumnIndexOfRowContent(1, sheetName.content);
    sheetType.conlumn = sheet.getColumnIndexOfRowContent(1, sheetType.content);
    sheetAnnotation.conlumn = sheet.getColumnIndexOfRowContent(1, sheetAnnotation.content);
}
