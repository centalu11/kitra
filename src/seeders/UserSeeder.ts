import { Workbook, Row, Cell } from "exceljs";
import { SeederInterface } from "./SeederInterface";
import { BaseSeeder } from "./BaseSeeder";
import { User } from "../entities/User";
import dataSource from "../data-source";

interface UserHeadersIndeces {
  id: number;
  name: string;
  age: number;
  password: string;
  email: string;
}

export class UserSeeder extends BaseSeeder implements SeederInterface {
  workBook: Workbook;
  source: string;
  headersIndeces: UserHeadersIndeces;

  public constructor() {
    super();
    this.name = "users";
    this.headers = ["id", "name", "age", "password", "email"];
    this.headersIndeces = {
      id: null,
      name: null,
      age: null,
      password: null,
      email: null,
    };

    this.workBook = new Workbook();
    this.source = "./src/seeders/sources/Serino-Mini-Project-Data.xlsx";
  }

  public async run() {
    try {
      const xlsx = await this.workBook.xlsx.readFile(this.source);
      const usersWorksheet = xlsx.getWorksheet(this.name);
      const totalRows = usersWorksheet?.rowCount;

      for (let rowIndex = 1; rowIndex <= totalRows; rowIndex++) {
        const row: Row = usersWorksheet.getRow(rowIndex);
        if (row.hasValues) {
          if (!this.hasHeaders()) {
            row.eachCell((cell: Cell, col: number) => {
              if (this.headers.includes(cell.text)) {
                this.headersIndeces[cell.text] = col;
              }
            });
          } else {
            const userRepository = dataSource.getRepository(User);
            const user = new User();
            user.id = row.getCell(this.headersIndeces.id)?.text
              ? parseInt(row.getCell(this.headersIndeces.id).text)
              : null;
            user.name = row.getCell(this.headersIndeces.name)?.text ?? "";
            user.age = row.getCell(this.headersIndeces.age)?.text
              ? parseInt(row.getCell(this.headersIndeces.age).text)
              : null;
            user.password =
              row.getCell(this.headersIndeces.password)?.text ?? "";
            user.email = row.getCell(this.headersIndeces.email)?.text ?? "";

            await userRepository.save(user);

            console.log("User Created ID: " + user.id);
          }
        }
      }
    } catch (error: any) {
      console.log("Error while reading source file:", error);
    }
  }
}
