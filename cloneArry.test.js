const { array } = require('@hapi/joi');
const { expect } = require('chai')
const cloneArray = require('./cloneArray')
test('properly lone array', () => {
    const array =[1,2,3];
    expect(cloneArray(array)).toEqual(array);
})