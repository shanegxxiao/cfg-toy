import { Command } from "commander";
import pkgCfg from "../package.json";
import { BookInterface } from "./excel/interface/book-interface";
import { Book } from "./excel/xlsx/book";
import async from "async"
import { excelParser } from "./excel-parser/excel-parser";
import { genPbDef } from "./protobuf/pb-def-generator/pb-def-generator";
import { genPbData } from "./protobuf/pb-data-generator/pb-data-generator";
import { genI18nExcel } from "./i18n/gen-i18n-excel";
import { updateI18nExcels } from "./i18n/update-i18n-excel";
import { genCode } from "./protobuf/pb-code-generator/pb-code-generator";

const program = new Command();
program.version(pkgCfg.version);
program.requiredOption("--input-excels <string...>", "excel files to input.");
program.option("--export-tags <string...>", "select fields to export.");

program.option("--pb-package <string>", "package name for protobuf.");
program.option("--output-pb-def-path <string>", "output path of protobuf definition file.");
program.option("--pb-def-path <string>", "protobuf definition file for output protobuf definition file and data.");
program.option("--input-pb-def-path <string>", "protobuf definition file for output protobuf data.");
program.option("--output-pb-data-path <string>", "output path of protobuf data files.");

program.option("--i18n-ccasset-paths <string...>", "cc-asset paths where to grab i18n strings.");
program.option("--i18n-src-paths <string...>", "source code paths where to grab i18n strings.");
program.option("--output-i18n-excel <string>", "file path for outputing i18n fields from inputed excels.");
program.option("--update-i18n-excels <string...>", "translated i18n excel files.");
program.option("--output-pb-code-path <string>", "code output path.");

program.parse(process.argv);

const options = program.opts();
const inputExcels = options.inputExcels as string[];
const exportTags = options.exportTags as string[];

const pbPackage = options.pbPackage as string;
const outputPbDefPath = options.outputPbDefPath as string;
const pbDefPath = options.pbDefPath as string;
const inputPbDefPath = options.inputPbDefPath as string;
const outputPbDataPath = options.outputPbDataPath as string;

const i18nCCAssetPaths = options.i18nCCAssetPaths as string[];
const i18nSrcPaths = options.i18nSrcPaths as string[];
const outputI18nExcel = options.outputI18nExcel as string;
const i18nExcelsToUpdate = options.updateI18nExcels as string[];

const outputPbCodePath = options.outputPbCodePath as string;

const allBooks: BookInterface[] = [];
for (let i = 0; i < inputExcels.length; ++i) {
    const filePath = inputExcels[i];
    const book = new Book();
    book.open(filePath);
    allBooks.push(book);
}
excelParser.indexAllBooks(allBooks);

if (outputPbDefPath) {
    genPbDef(pbPackage, outputPbDefPath, exportTags, (error: Error) => {
        error && console.error(error);
    });
}

if (inputPbDefPath && outputPbDataPath) {
    genPbData(pbPackage, inputPbDefPath, outputPbDataPath, (error: Error) => {
        error && console.error(error);
    });
}

if (pbDefPath && outputPbDataPath) {
    async.waterfall([
        (callback: Function) => {
            genPbDef(pbPackage, pbDefPath, exportTags, callback);
        },
        (callback: Function) => {
            genPbData(pbPackage, pbDefPath, outputPbDataPath, callback);
        }
    ], (error: Error) => {
        error && console.error(error);
    });
}

if (outputI18nExcel) {
    genI18nExcel(i18nCCAssetPaths, i18nSrcPaths, outputI18nExcel);
}

if (i18nExcelsToUpdate) {
    updateI18nExcels(i18nCCAssetPaths, i18nSrcPaths, i18nExcelsToUpdate);
}

if (outputPbCodePath) {
    genCode(pbPackage, outputPbCodePath, (error: Error) => {
        error && console.error(error);
    });
}
