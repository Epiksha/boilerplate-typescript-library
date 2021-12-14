import helloWorld from '../src/utils/helloworld';

describe('helloWorld utility.', () => {
    it('return a string equal to "Hello World!"', () => {
        expect(helloWorld()).toBe('Hello World!');
    });
});