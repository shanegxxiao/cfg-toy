export abstract class SheetInterface {
    public abstract getName(): string;
    public abstract getRowCnt(): number;
    public abstract getColCnt(): number;
    public abstract getCellValue(row: number, col: number): string;
    /**
     * 给定一个内容在指定行查找列号，如果不存在则返回-1
     * @param row 指定行号
     * @param content 给定的内容
     * @returns 列号
     */
    public getColumnIndexOfRowContent(row: number, content: string): number {
        for (let c = 1; c <= this.getColCnt(); ++c) {
            if (this.getCellValue(row, c).trim() == content) {
                return c;
            }
        }
        return -1;
    }
    /**
     * 给定一个内容在指定列查找行号，如果不存在则返回-1
     * @param column 指定列号
     * @param content 给定的内容
     * @returns 行号
     */
    public getRowIndexOfColumnContent(column: number, content: string): number {
        for (let r = 1; r <= this.getRowCnt(); ++r) {
            if (this.getCellValue(r, column).trim() == content) {
                return r;
            }
        }
        return -1;
    }
}

export type SheetDictionary = { [sheetName: string]: SheetInterface };
