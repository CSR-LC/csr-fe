import { MonoTypeOperatorFunction, Subject, takeUntil } from "rxjs";

const destroy$Prop = Symbol('destroy$');

export function UntilDestroy<T extends { new (...args: any[]): {} }>(constructor: T) {
  const originalOnDestroy = constructor.prototype.ngOnDestroy;

  Object.defineProperty(
    constructor.prototype,
    destroy$Prop,
    {
      value: new Subject<void>(),
      enumerable: false,
      configurable: false,
      writable: false
    }
  );

  constructor.prototype.ngOnDestroy = function() {
    if (originalOnDestroy) {
      originalOnDestroy.call(this);
    }
   (this[destroy$Prop] as Subject<void>).next();
  }

}

export function untilDestroyed(
  obj: any
): MonoTypeOperatorFunction<unknown> {
  const stream = obj[destroy$Prop];
  if (!stream) {
    throw new Error('The entity is not decorated with UntilDestroy decorator');
  }
  return takeUntil(stream);
}
