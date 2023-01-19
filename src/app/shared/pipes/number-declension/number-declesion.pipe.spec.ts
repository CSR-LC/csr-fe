import { NumberDeclensionPipe } from './number-declesion.pipe';

xdescribe('DaysPipe', () => {
  it('create an instance', () => {
    const pipe = new NumberDeclensionPipe();
    expect(pipe).toBeTruthy();
  });
});
