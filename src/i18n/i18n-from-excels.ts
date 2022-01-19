import { excelParser } from "../excel-parser/excel-parser";
import { SheetInterface } from "../excel/interface/sheet-interface";
import { RecordDef } from "../excel-parser/type-def/record-def";

export function grabI18nStringsFromExcels(result: Set<string>) {
    const recordSheets = excelParser.indexDef.getRecordSheets();
    grabStringsFromRecordSheets(recordSheets, result);
    const keyValueSheets = excelParser.indexDef.getKeyValueSheets();
    grabStringsFromKeyValueSheets(keyValueSheets, result);
}

function grabStringsFromRecordSheets(sheets: SheetInterface[], result: Set<string>) {
    sheets.forEach(sheet => {
        const recordDef = getRecordDefBySheet(sheet);
        recordDef.fields.forEach(field => {
            if (field.isI18nField) {
                const i18nColumn = sheet.getColumnIndexOfRowContent(1, field.aliasName);
                for (let r = 2; r <= sheet.getRowCnt(); ++r) {
                    const i18nString = sheet.getCellValue(r, i18nColumn);
                    if (i18nString && i18nString.length > 0) {
                        result.add(i18nString);
                    }
                }
            }
        });
    });
}

function grabStringsFromKeyValueSheets(sheets: SheetInterface[], result: Set<string>) {
    sheets.forEach(sheet => {
        const recordDef = getRecordDefBySheet(sheet);
        recordDef.fields.forEach(field => {
            if (field.isI18nField) {
                const i18nRow = sheet.getRowIndexOfColumnContent(1, field.aliasName);
                const i18nString = sheet.getCellValue(i18nRow, 2);
                if (i18nString && i18nString.length > 0) {
                    result.add(i18nString);
                }
            }
        });
    });
}

function getRecordDefBySheet(sheet: SheetInterface): RecordDef {
    const typeName = excelParser.typeDef.getTypeNameBySheetName(sheet.getName());
    if (!typeName) {
        throw new Error(`cannot find type name of sheet ${sheet.getName()}.`);
    }
    const recordDef = excelParser.typeDef.getRecordDefs()[typeName];
    if (!recordDef) {
        throw new Error(`cannot find record definition of type ${typeName}.`);
    }
    return recordDef;
}