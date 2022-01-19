import fs from "fs";

export type I18nRecord = {
    key: string;
    value: string;
};

export type I18nObject = {
    [key: string]: string;
};

export function grabFromFiles(filePaths: string[], reg: RegExp, result: Set<string>) {
    filePaths.forEach(filePath => {
        const content = fs.readFileSync(filePath).toString();
        grabFromString(content, reg, result);
    });
}

export function grabFromString(content: string, reg: RegExp, result: Set<string>) {
    const matchArrayList = content.matchAll(reg);
    for (const matchArray of matchArrayList) {
        if (matchArray.length !== 1) {
            throw new Error(`unexpected match result, only one expected.`);
        }
        result.add(matchArray[0].toString());
    }
}
