import { BookInterface } from '../interface/book-interface';
import { SheetDictionary } from '../interface/sheet-interface';
import xlsx from 'xlsx';
import { Sheet } from './sheet';
import fsExtra from 'fs-extra';
import path from 'path';

export class Book implements BookInterface {
    public open(fileName: string): void {
        this.fileName = fileName;
        this.workBook = xlsx.readFile(fileName);
        this.sheets = {};
        this.workBook.SheetNames.forEach(sheetName => {
            this.sheets[sheetName] = new Sheet(sheetName, this.workBook.Sheets[sheetName]);
        });
    }

    public close(): void {
        this.fileName = undefined;
        this.workBook = undefined;
        this.sheets = undefined;
    }

    public create(fileName?: string): void {
        if (fileName) {
            this.fileName = fileName;
        }
        this.sheets = {};
        this.workBook = xlsx.utils.book_new();
    }

    public addSheet(objects: Object[], name: string): void {
        const workSheet = xlsx.utils.json_to_sheet(objects)
        xlsx.utils.book_append_sheet(this.workBook, workSheet, name);
        this.sheets[name] = new Sheet(name, workSheet);
    }

    public save(fileName?: string) {
        if (fileName) {
            this.fileName = fileName;
        }
        fsExtra.ensureDirSync(path.dirname(this.fileName));
        xlsx.writeFile(this.workBook, this.fileName);
    }

    public getSheets(): SheetDictionary {
        return this.sheets;
    }

    private fileName: string;
    private workBook: xlsx.WorkBook;
    private sheets: SheetDictionary;
}
