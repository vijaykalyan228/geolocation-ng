import {AppComponent} from './app.component';

describe('App Component:', () =>{
  it('should be truthy', () =>{
    expect(1).toEqual(1);
  });
  it('should be falsy', ()=>{
    expect(1).toEqual(2);
  })
});
