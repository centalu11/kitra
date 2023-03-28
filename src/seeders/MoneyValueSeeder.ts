import { Workbook, Row, Cell } from "exceljs";
import { SeederInterface } from "./SeederInterface";
import { BaseSeeder } from "./BaseSeeder";
import { MoneyValue } from "../entities/MoneyValue";
import dataSource from "../data-source";

interface MoneyValueHeadersIndeces {
  treasure_id: number;
  amt: number;
}

export class MoneyValueSeeder extends BaseSeeder implements SeederInterface {
  workBook: Workbook;
  source: string;
  headersIndeces: MoneyValueHeadersIndeces;

  public constructor() {
    super();
    this.name = "money_values";
    this.headers = ["treasure_id", "amt"];
    this.headersIndeces = {
      treasure_id: null,
      amt: null,
    };

    this.workBook = new Workbook();
    this.source = "./src/seeders/sources/Serino-Mini-Project-Data.xlsx";
  }

  public async run() {
    try {
      const xlsx = await this.workBook.xlsx.readFile(this.source);
      const moneyValuesWorksheet = xlsx.getWorksheet(this.name);
      const totalRows = moneyValuesWorksheet?.rowCount;

      let moneyValueID = 1;
      for (let rowIndex = 1; rowIndex <= totalRows; rowIndex++) {
        const row: Row = moneyValuesWorksheet.getRow(rowIndex);
        if (row.hasValues) {
          if (!this.hasHeaders()) {
            row.eachCell((cell: Cell, col: number) => {
              if (this.headers.includes(cell.text)) {
                this.headersIndeces[cell.text] = col;
              }
            });
          } else {
            const moneyValueRepository = dataSource.getRepository(MoneyValue);
            const moneyValue = new MoneyValue();
            moneyValue.id = moneyValueID;
            moneyValue.treasure = row.getCell(this.headersIndeces.treasure_id)
              ?.text
              ? parseInt(row.getCell(this.headersIndeces.treasure_id).text)
              : null;
            moneyValue.amt = row.getCell(this.headersIndeces.amt)?.text
              ? parseInt(row.getCell(this.headersIndeces.amt).text)
              : null;

            await moneyValueRepository.save(moneyValue);

            console.log("Money Value Created ID: " + moneyValue.id);

            moneyValueID++;
          }
        }
      }
    } catch (error: any) {
      console.log("Error while reading source file:", error);
    }
  }
}
