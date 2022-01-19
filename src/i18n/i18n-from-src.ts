import { grabFromFiles } from "./i18n-common-def";
import glob from "glob";

export function grabI18nStringsFromSrc(i18nSrcPaths: string[], i18nStrings: Set<string>) {
    if (!i18nSrcPaths || i18nSrcPaths.length <= 0) {
        return;
    }
    grabFromFiles(glob.sync(`${i18nSrcPaths}**/*.ts`), regexForScript, i18nStrings);
}

const regexForScript = /(?<=i18nString\s*\(\s*[\'\"\`]{1}).+(?=[\'\"\`]{1}\s*[\,\)]+)/g;
