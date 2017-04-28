let {expect} = require('chai');
let data = require('../../data/data-big');
let compiler = require('../../../dist/compiler');

describe('$flatten', () => {
  it('flattens nested arrays', () => {
    let records = [{ 
      item: 23432123,
      reservedFor: 'John',
      store: [{
        number: '222', 
        qty: 51,
        region: 'NE',
        employees: [{
          name: {
            first: 'John',
            last: 'Doe'
          },
          age: 22
        }, {
          name: {
            first: 'Jack',
            last: 'Smith'
          },
          age: 27
        }]
      }, { 
        number: '212', 
        qty: 11,
        employees: [{
          name: {
            first: 'Kate',
            last: 'Jones'
          }
        }]
      }]
    }];
    
    let query = compiler({
      $flatten: true,
      store: {
        employees: {
          name: {
            $and: {
              $and: {
                $and: {
                  $flatten: false,
                  first: 'John'
                }
              }
            }
          }
        }
      }
    });
    let results = records.filter(query);
    
    console.log(results);
  });
});