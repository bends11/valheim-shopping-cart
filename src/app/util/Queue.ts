class Element<T> {
  next: Element<T> | null;
  value: T;

  constructor(value: T, next?: Element<T>) {
    this.value = value;
    this.next = next ?? null;
  }
}

export class Queue<T> {

  private first: Element<T> | null;
  private last: Element<T> | null;

  constructor(initialElement?: T) {
    this.first = initialElement ? new Element<T>(initialElement) : null;
    this.last = this.first;
  }

  public push(value: T): void {
    const newElement = new Element<T>(value);
    if (this.last) {
      this.last.next = newElement;
    } else {
      this.first = newElement;
    }
    this.last = newElement;
  }

  public pop(): T | null {
    if (this.first === null) return null;

    const reternValue = this.first.value;

    if (this.first.next === null) {
      this.first = null;
      this.last = null;
    } else {
      this.first = this.first.next;
    }

    return reternValue;
  }
}
