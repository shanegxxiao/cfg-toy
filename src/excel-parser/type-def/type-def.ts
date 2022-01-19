import { SheetInterface } from "../../excel/interface/sheet-interface";
import { assembleEnumField, EnumDef, EnumDefs } from "./enum-def";
import { assembleRecordField, RecordDef, RecordDefs } from "./record-def";
import { parseTypeHeader, typeCatagory } from "./type-header";

/**
 * 类型表定义，提供解析方法
 */
export class TypeDef {
    /**
     * 解析所有类型定义表格
     * @param sheets 所有类型表格
     */
    public parseFromSheets(sheets: SheetInterface[]) {
        this.recordDefs = {};
        this.enumDefs = {};
        sheets.forEach(sheet => {
            parseTypeHeader(sheet);
            for (let r = 2; r <= sheet.getRowCnt(); ++r) {
                const catagory = sheet.getCellValue(r, typeCatagory.conlumn)
                switch (catagory) {
                    case TypeCatagoryRecord:
                        assembleRecordField(sheet, r, this.recordDefs)
                        break;
                    case TypeCatagoryEnum:
                        assembleEnumField(sheet, r, this.enumDefs)
                        break;
                    default:
                        throw new Error(`unexpected type catagory ${catagory}.`);
                }
            }
        });
    }

    public getRecordDefs(): RecordDefs {
        return this.recordDefs;
    }
    
    public getEnumDefs(): EnumDefs {
        return this.enumDefs;
    }

    public getAllRecordDef(): RecordDef[] {
        const recordDefs: RecordDef[] = [];
        for (let name in this.recordDefs) {
            recordDefs.push(this.recordDefs[name]);
        }
        return recordDefs;
    }

    public getAllEnumDef(): EnumDef[] {
        const enumDefs: EnumDef[] = [];
        for (let name in this.enumDefs) {
            enumDefs.push(this.enumDefs[name]);
        }
        return enumDefs;
    }

    /**
     * 将表名转换成类型名
     * @param sheetName 表名
     */
     public getTypeNameBySheetName(sheetName: string): string {
        for (const typeName in this.recordDefs) {
            if (this.recordDefs[typeName].aliasName == sheetName) {
                return typeName;
            }
        }
        return undefined;
    }

    private recordDefs: RecordDefs;
    private enumDefs: EnumDefs;
}

// 类型的分类名
const TypeCatagoryRecord = "记录";
const TypeCatagoryEnum = "枚举";
