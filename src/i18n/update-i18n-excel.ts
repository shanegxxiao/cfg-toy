import { SheetInterface } from "../excel/interface/sheet-interface";
import { Book } from "../excel/xlsx/book";
import { grabI18nStringsFromExcels } from "./i18n-from-excels";
import { I18nObject, I18nRecord } from "./i18n-common-def";
import { grabI18nStringsFromCCAsset } from "./i18n-from-ccasset";
import { grabI18nStringsFromSrc } from "./i18n-from-src";

export function updateI18nExcels(i18nCCAssetPaths: string[], i18nSrcPaths: string[], excelsToUpdate: string[]) {
    const i18nSet = new Set<string>();
    grabI18nStringsFromCCAsset(i18nCCAssetPaths, i18nSet);
    grabI18nStringsFromSrc(i18nSrcPaths, i18nSet);
    grabI18nStringsFromExcels(i18nSet);
    excelsToUpdate.forEach(filePath => {
        const book = new Book();
        book.open(filePath);
        const newBook = new Book();
        newBook.create();
        const sheets = book.getSheets();
        for (const sheetName in sheets) {
            const sheet = sheets[sheetName];
            const i18nObject = parseI18nObjectFromSheet(sheet);
            const i18nRecords = mixObjAndSet(i18nObject, i18nSet);
            newBook.addSheet(i18nRecords, sheetName);
        }
        newBook.save(filePath);
    });
}

function parseI18nObjectFromSheet(sheet: SheetInterface): I18nObject {
    const result: I18nObject = {};
    for (let r = 2; r <= sheet.getRowCnt(); ++r) {
        const key = sheet.getCellValue(r, 1);
        if (!key || key.length <= 0) {
            continue;
        }
        result[key] = sheet.getCellValue(r, 2);
    }
    return result;
}

function mixObjAndSet(i18nObject: I18nObject, i18nSet: Set<string>) {
    const results: I18nRecord[] = [];
    for (const key in i18nObject) {
        if (!i18nSet.has(key)) {
            continue;
        }
        results.push({
            key: key,
            value: i18nObject[key]
        });
    }
    for (const str of i18nSet) {
        if (Object.getOwnPropertyDescriptor(i18nObject, str)) {
            continue;
        }
        results.push({
            key: str,
            value: ""
        });
    }
    return results;
}
