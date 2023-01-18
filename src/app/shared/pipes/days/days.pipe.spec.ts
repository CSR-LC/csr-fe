import { DaysPipe } from './days.pipe';

xdescribe('DaysPipe', () => {
  it('create an instance', () => {
    const pipe = new DaysPipe();
    expect(pipe).toBeTruthy();
  });
});
