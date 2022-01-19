import { excelParser } from "../../excel-parser/excel-parser";
import { RecordField } from "../../excel-parser/type-def/record-def";
import { SheetInterface } from "../../excel/interface/sheet-interface";

export function parseFieldValue(sheet: SheetInterface, row: number, col: number, field: RecordField): string | string[] {
    const value = sheet.getCellValue(row, col);
    if (field.isArray) {
        return value.split(field.elementSep);
    }
    if (isEnumType(field)) {
        const lowerCaseValue = value.toLocaleLowerCase();
        const enumDefs = excelParser.typeDef.getEnumDefs();
        const enumDef = enumDefs[field.type]
        const enumField = enumDef.fields.find(fieldDef => 
            fieldDef.name.toLocaleLowerCase() == lowerCaseValue || 
            fieldDef.aliasName.toLocaleLowerCase() == lowerCaseValue);
        if (!enumField) {
            throw new Error(`cannot find enum value ${value} in enum type ${JSON.stringify(enumDef)}`);
        }
        return enumField.defaultValue;
    }
    return value;
}

function isEnumType(field: RecordField): boolean {
    const enumDefs = excelParser.typeDef.getEnumDefs();
    return !!enumDefs[field.type];
}
