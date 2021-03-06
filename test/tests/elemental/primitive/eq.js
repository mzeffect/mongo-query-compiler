let {expect} = require('chai');
let data = require('../../../data/data');
let compiler = require('../../../../dist/compiler');

describe('$eq', () => {
  it('performs colon equality', () => {
    let query = compiler({_id: 1});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
  
  it('allows colon equality with compound property access', () => {
    let query = compiler({'favorites.food': 'pizza'});
    let results = data.filter(query);
    expect(results.length).to.be.above(0);
  });
  
  it('augments nested access paths', () => {
    let query = compiler({favorites: {food: 'pizza'}});
    let results = data.filter(query);
    expect(results.length).to.be.above(0);
  });
  
  it('allows nested $eq operator', () => {
    let query = compiler({_id: {$eq: 1}});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
  
  it('allows nested property access key', () => {
    let query = compiler({$eq: {'favorites.food': 'pizza'}});
    let results = data.filter(query);
    expect(results.length).to.be.above(0);
  });
  
  it('performs deep equality if object follows $eq', () => {
    let query = compiler({favorites: {$eq: {artist: 'Picasso', food: 'pizza'}}});
    let results = data.filter(query);
    expect(results.length).to.be.above(0);
    
    query = compiler({favorites: {$eq: {artist: 'Picasso'}}});
    results = data.filter(query);
    expect(results.length).to.equal(0);
  });
  
  it('perfroms equality when one operand is an array', () => {
    let query = compiler({badges: 'blue'});
    let results = data.filter(query);
    expect(results.length).to.be.above(0);
    
    query = compiler({favorites: {color: {$eq: ['black', 'blue']}}});
    results = data.filter(query);
    expect(results.length).to.equal(1);
  });
  
  it('performs regular expression equality', () => {
    let query = compiler({name: /^s/});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
  
  it('conducts deep array equality', () => {
    let query = compiler({finished: [17, 3]});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
});
