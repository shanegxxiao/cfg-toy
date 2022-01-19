import { SheetInterface } from "../../excel/interface/sheet-interface";
import { parseIndexHeader } from "./index-header";
import { assembleSheetDef, SheetDef, SheetDefs, SheetType } from "./sheet-def";

/**
 * 索引表解析
 */
export class IndexDef {
    /**
     * 从所有表格中找到索引表格并解析
     * @param sheets 所有未经过分类的sheet
     */
    public parseFromSheets(sheets: SheetInterface[]) {
        this.allSheets = sheets;
        this.getAllIndexDefSheets();
        this.parseIndexDefSheets();
        this.typeDefSheets = [];
        this.recordSheets = [];
        this.keyValueSheets = [];
        sheets.forEach(sheet => {
            if (this.isIndexDefSheet(sheet)) {
                return;
            }
            const sheetDef = this.sheetDefs[sheet.getName()];
            switch(sheetDef.type) {
                case SheetType.TypeDef:
                    this.typeDefSheets.push(sheet);
                    break;
                case SheetType.Records:
                    this.recordSheets.push(sheet);
                    break;
                case SheetType.KeyValue:
                    this.keyValueSheets.push(sheet);
                    break;
                default:
                    throw new Error(`unexpected sheet type ${sheetDef.type}.`);
            }
        });
    }

    public getSheetDefs(): SheetDefs {
        return this.sheetDefs;
    }

    public getTypeDefSheets(): SheetInterface[] {
        return this.typeDefSheets;
    }

    public getRecordSheets(sheetDef?: SheetDef): SheetInterface[] {
        if (!sheetDef) {
            return this.recordSheets;
        }
        return this.recordSheets.filter(sheet => sheet.getName() === sheetDef.name);
    }

    public getKeyValueSheets(sheetDef?: SheetDef): SheetInterface[] {
        if (!sheetDef) {
            return this.keyValueSheets;
        }
        return this.keyValueSheets.filter(sheet => sheet.getName() === sheetDef.name);
    }

    public isKeyValueRecord(sheetName: string) {
        return this.keyValueSheets.filter(sheet => sheet.getName() === sheetName).length > 0;
    }

    private getAllIndexDefSheets() {
        this.indexDefSheets = [];
        this.allSheets.forEach(sheet => {
            if (!this.isIndexDefSheet(sheet)) {
                return;
            }
            this.indexDefSheets.push(sheet);
        });
    }

    private parseIndexDefSheets() {
        this.sheetDefs = {};
        this.indexDefSheets.forEach(sheet => {
            parseIndexHeader(sheet);
            for(let r = 2; r <= sheet.getRowCnt(); ++r) {
                assembleSheetDef(sheet, r, this.sheetDefs);
            }
        });
    }

    private isIndexDefSheet(sheet: SheetInterface): boolean {
        return sheet?.getName() === this.indexDefSheetName;
    }

    /**
     * 索引表的名字是设定的，其它类型的表由索引表配置
     */
    private readonly indexDefSheetName = "@index";
    private allSheets: SheetInterface[];
    private sheetDefs: SheetDefs;
    private indexDefSheets: SheetInterface[];
    private typeDefSheets: SheetInterface[];
    private recordSheets: SheetInterface[];
    private keyValueSheets: SheetInterface[];
}
