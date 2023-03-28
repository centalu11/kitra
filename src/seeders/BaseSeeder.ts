export class BaseSeeder {
  name: string;
  headers: string[];
  headersIndeces: any;

  protected hasHeaders() {
    for (let key in this.headersIndeces) {
      if (this.headersIndeces[key] === null) {
        return false;
      }
    }

    return true;
  }
}
