export class Category {
  id: string = '';
  name: string = '';

  constructor(json: Category) {
    if (json) {
      this.id = json.id ?? '';
      this.name = json.name ?? '';
    }
  }
}
