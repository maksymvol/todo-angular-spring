export class List {
  id: number;
  name: string;
  pinned: boolean;

  constructor(id, name, pinned) {
    this.id = id;
    this.name = name;
    this.pinned = pinned;
  }
}
