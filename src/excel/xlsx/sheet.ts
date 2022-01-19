import { SheetInterface } from "../interface/sheet-interface";
import xlsx from 'xlsx';

export class Sheet extends SheetInterface {
    public constructor(xlsxName: string, xlsxSheet: xlsx.WorkSheet) {
        super();
        this.name = xlsxName;
        this.sheet = xlsxSheet;
        this.countRowCol();
    }

    public getName(): string {
        return this.name;
    }

    public getRowCnt(): number {
        return this.rowCount;
    }

    public getColCnt(): number {
        return this.colCount;
    }

    public getCellValue(row: number, col: number): string {
        return this.sheet[`${this.numToColumnName(col)}${row}`]?.v;
    }

    private countRowCol() {
        let raw = 1;
        while (this.sheet[`A${raw}`]) {
            raw += 1;
        }
        let col = 1;
        while (this.sheet[`${this.numToColumnName(col)}1`]) {
            col += 1;
        }
        this.rowCount = raw - 1;
        this.colCount = col - 1;
    }

    private numToColumnName(num: number): string {
        let ret = "";
        for (let a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
          ret = String.fromCharCode((num % b) / a + 65) + ret;
        }
        return ret;
    }

    private name: string;
    private sheet: xlsx.WorkSheet;
    private rowCount: number;
    private colCount: number;
}
