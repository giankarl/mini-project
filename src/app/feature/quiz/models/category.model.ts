export class Category {
  id: string = '';
  name: string = '';

  constructor(json: any) {
    if (json) {
      this.id = json.id ?? '';
      this.name = json.name ?? '';
    }
  }
}
