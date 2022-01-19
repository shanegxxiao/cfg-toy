import { Book } from "../excel/xlsx/book";
import { grabI18nStringsFromExcels } from "./i18n-from-excels";
import { I18nRecord } from "./i18n-common-def";
import { grabI18nStringsFromCCAsset } from "./i18n-from-ccasset";
import { grabI18nStringsFromSrc } from "./i18n-from-src";

export function genI18nExcel(i18nCCAssetPaths: string[], i18nSrcPaths: string[], outputPath: string) {
    const i18nStrings = new Set<string>();
    grabI18nStringsFromCCAsset(i18nCCAssetPaths, i18nStrings);
    grabI18nStringsFromSrc(i18nSrcPaths, i18nStrings);
    grabI18nStringsFromExcels(i18nStrings);
    saveToExcel(i18nStrings, outputPath);
}

function saveToExcel(i18nStrings: Set<string>, savePath: string) {
    const book = new Book();
    book.create();
    book.addSheet(convertToI18nRecords(i18nStrings), "default");
    book.save(savePath);
}

function convertToI18nRecords(i18nStrings: Set<string>): I18nRecord[] {
    const results: I18nRecord[] = [];
    for (const str of i18nStrings) {
        results.push({
            key: str,
            value: ""
        });
    }
    return results;
}
