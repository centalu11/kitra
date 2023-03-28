import { Workbook, Row, Cell } from "exceljs";
import { SeederInterface } from "./SeederInterface";
import { BaseSeeder } from "./BaseSeeder";
import { Treasure } from "../entities/Treasure";
import dataSource from "../data-source";

interface TreasureHeadersIndeces {
  id: number;
  latitude: string;
  longtitude: string;
  Name: string;
}

export class TreasureSeeder extends BaseSeeder implements SeederInterface {
  workBook: Workbook;
  source: string;
  headersIndeces: TreasureHeadersIndeces;

  public constructor() {
    super();
    this.name = "treasures";
    this.headers = ["id", "latitude", "longtitude", "Name"];
    this.headersIndeces = {
      id: null,
      latitude: null,
      longtitude: null,
      Name: null,
    };

    this.workBook = new Workbook();
    this.source = "./src/seeders/sources/Serino-Mini-Project-Data.xlsx";
  }

  public async run() {
    try {
      const xlsx = await this.workBook.xlsx.readFile(this.source);
      const treasuresWorksheet = xlsx.getWorksheet(this.name);
      const totalRows = treasuresWorksheet?.rowCount;

      for (let rowIndex = 1; rowIndex <= totalRows; rowIndex++) {
        const row: Row = treasuresWorksheet.getRow(rowIndex);
        if (row.hasValues) {
          if (!this.hasHeaders()) {
            row.eachCell((cell: Cell, col: number) => {
              if (this.headers.includes(cell.text)) {
                this.headersIndeces[cell.text] = col;
              }
            });
          } else {
            const treasureRepository = dataSource.getRepository(Treasure);
            const treasure = new Treasure();
            treasure.id = row.getCell(this.headersIndeces.id)?.text
              ? parseInt(row.getCell(this.headersIndeces.id).text)
              : null;
            treasure.latitude =
              row.getCell(this.headersIndeces.latitude)?.text ?? "";
            treasure.longitude =
              row.getCell(this.headersIndeces.longtitude)?.text ?? "";
            treasure.name = row.getCell(this.headersIndeces.Name)?.text ?? "";

            await treasureRepository.save(treasure);

            console.log("Treasure Created ID: " + treasure.id);
          }
        }
      }
    } catch (error: any) {
      console.log("Error while reading source file:", error);
    }
  }
}
