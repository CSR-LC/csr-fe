import { computed, Injectable, signal } from '@angular/core';

@Injectable()
export class InfiniteScrollService<T> {
  private itemsSignal = signal<T[]>([]);
  private loadingSignal = signal<boolean>(false);
  private hasMoreSignal = signal<boolean>(true);

  items$ = computed(() => this.itemsSignal());
  loading$ = computed(() => this.loadingSignal());
  hasMore$ = computed(() => this.hasMoreSignal());

  constructor() {}

  get loading(): boolean {
    return this.loadingSignal();
  }

  get hasMore(): boolean {
    return this.hasMoreSignal();
  }

  get items(): T[] {
    return this.itemsSignal();
  }

  setLoading(loading: boolean) {
    this.loadingSignal.set(loading);
  }

  setHasMore(hasMore: boolean) {
    this.hasMoreSignal.set(hasMore);
  }

  addItems(items: T[]) {
    const currentItems = this.itemsSignal();
    this.itemsSignal.set([...currentItems, ...items]);
  }

  reset() {
    this.itemsSignal.set([]);
    this.hasMoreSignal.set(true);
  }
}
