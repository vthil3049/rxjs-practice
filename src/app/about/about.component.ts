import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { interval, timer, fromEvent, Observable, noop} from 'rxjs';
import {map } from 'rxjs/operators';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //fetch('/api/courses');
    const http$ = createHttpObservable('/api/courses')

    const courses$ = http$
    .pipe(
      map(res => Object.values(res['payload'])),
      
    );

    courses$.subscribe(
      value => console.log("courses are ", value),
      noop,
      () => console.log('completed')
    );
  }


}





function createHttpObservable(url: string) {
 return Observable.create(observer => {
      fetch(url)
        .then(response => {
          return response.json();
        })
        .then(body => {
          observer.next(body);
          observer.complete();
        })
        .catch(err => {
          observer.error(err);
        });
    });
}