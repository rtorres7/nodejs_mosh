const lib = require('../section12/lib');

describe('absolute', () => {
    it('should return a positive number if input is positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });
    
    it('should return a positive number if input is negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });
    
    it('should return a zero number if input is zero', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe('greet', () => {
    it('should return the greeting message', () => {
        const result = lib.greet('Scarlett');
        expect(result).toMatch(/Scarlett/);
        expect(result).toContain('Scarlett');
    });
});

describe('getCurrencies', () {
    it('should return supported currencies', () => {
        const result = lib.getCurrencies(); 
    }
})