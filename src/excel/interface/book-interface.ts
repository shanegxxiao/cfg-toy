import { SheetDictionary } from './sheet-interface';

export interface BookInterface {
    open(fileName: string): void;
    getSheets(): SheetDictionary;
    close(): void;

    create(fileName?: string): void;
    addSheet(objects: Object[], name: string): void;
    save(fileName?: string): void;
}
