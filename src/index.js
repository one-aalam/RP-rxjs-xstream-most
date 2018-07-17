import { range, interval, fromEvent } from "rxjs";
import { map, filter, mergeMap, mergeAll, take } from "rxjs/operators";

import { fibbonaci } from "./fibb";
import { observable } from "./observable";

// An Observable is a lazily evaluated compuatation that can
// synchronously or asynchronously return zero to possibly
// infinte values from the time it's invoked onwards....
// An operator is method that allows you to immutably manipulate/
// alter data in a stream or stream itself (in flight)
// An observer is an object having specefic contract
// onNext, onError, onComplete

// [x]--[y]----------[z]-----|->
// map - x => x + 1
// [x + 1]--[y + 1]-----------[z+1]-----|->
const URL = "https://jsonplaceholder.typicode.com/users";
const AppDOMRoot = document.getElementById("app");
const genFibSeqBtn = document.getElementById("gen-fib-next");
const fibGenCnt = document.getElementById("fib-seq");
const iter = fibbonaci();
// Range
fromEvent(genFibSeqBtn, "click").subscribe(function(evt) {
  console.log(iter.next());
});
// Reactivities
observable([1, 2, 3]).subscribe({
  next: o => console.log(o),
  complete: () => console.log("Done!")
});

range(1, 3).subscribe(
  x => {
    AppDOMRoot.innerHTML += x + "\n";
  },
  err => console.log(err),
  () => console.log("complete!")
);
// Data
range(1, 200)
  .pipe(filter(x => x % 2 === 1), map(x => x + x))
  .subscribe(value => (AppDOMRoot.innerHTML += value + "\n"));

// AJAX requests
const intervalObs = interval(1000).pipe(
  take(2),
  mergeMap(_ => fetch(URL)),
  mergeMap(data => data.json()),
  mergeAll()
);

intervalObs.subscribe(user => {
  AppDOMRoot.innerHTML += `
    <div class="user-profile">
      <h3>${user.name}</h3>
      <h4>${user.email} - ${user.website}</h4>
    </div>
  `;
});
