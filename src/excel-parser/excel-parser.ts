import { BookInterface } from "../excel/interface/book-interface";
import { SheetInterface } from "../excel/interface/sheet-interface";
import { IndexDef } from "./index-def/index-def";
import { TypeDef } from "./type-def/type-def";

class ExcelParser {
    /**
     * 分类和索引表格
     * @param books excel工作薄数组
     */
    public indexAllBooks(books: BookInterface[]): void {
        if (books === this.books) {
            return;
        }
        this.books = books;
        const allSheets: SheetInterface[] = [];
        books.forEach(book => {
            const sheets = book.getSheets();
            for (let name in sheets) {
                const sheet = sheets[name];
                allSheets.push(sheet);
            }
        });
        this.indexDefs = new IndexDef();
        this.indexDef.parseFromSheets(allSheets);
        this.typeDefs = new TypeDef();
        this.typeDef.parseFromSheets(this.indexDef.getTypeDefSheets());
    }

    /**
     * 获取已解析的索引表数据
     */
    public get indexDef(): IndexDef {
        return this.indexDefs;
    }

    /**
     * 获取已解析的类型表数据
     */
    public get typeDef(): TypeDef {
        return this.typeDefs;
    }
    
    private books: BookInterface[];
    private indexDefs: IndexDef;
    private typeDefs: TypeDef;
}

export const excelParser = new ExcelParser();
