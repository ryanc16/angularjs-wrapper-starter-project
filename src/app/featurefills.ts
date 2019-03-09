export {}

declare global {
  interface PromiseConstructor {
    every<TAll>(promises: Promise<TAll>[], resolved?: Function, rejected?: Function, completed?: Function);
  }
}

if(Promise.every == null) {
  Promise.every = function(promises: Promise<any>[], resolved?: Function, rejected?: Function, completed?: Function) {
    let results = new Array(promises.length).fill(null);
    let complete = 0;
    for(let i=0; i< promises.length; i++) {
      promises[i]
        .then(result => {
          complete++;
          results[i] = result;
          if(resolved != null && typeof resolved === 'function') {
            resolved(results);
          }
          if(complete === promises.length && completed != null && typeof completed === 'function') {
            completed(results);
          }
        })
        .catch(e => {
          complete++;
          results[i] = null;
          if(rejected != null && typeof rejected === 'function') {
            rejected(e);
          }
          if(complete === promises.length && completed != null && typeof completed === 'function') {
            completed(results);
          }
        });
    }
  }
}