import { grabFromFiles } from "./i18n-common-def";
import glob from "glob";

export function grabI18nStringsFromCCAsset(i18nCCAssetPaths: string[], i18nStrings: Set<string>) {
    if (!i18nCCAssetPaths || i18nCCAssetPaths.length <= 0) {
        return;
    }
    grabFromFiles(glob.sync(`${i18nCCAssetPaths}**/*.{scene,prefab}`), regexForCCAsset, i18nStrings);
}

const regexForCCAsset = /(?<=i18n:).+(?=\",?)/g;
