import { Injectable } from '@angular/core';
import { concat, from, interval, of } from 'rxjs';
import {
  concatMap,
  delay,
  ignoreElements,
  map,
  repeat,
  take,
} from 'rxjs/operators';

interface TypeParams {
  word: string;
  speed: number;
  backwards?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TypewriterService {
  private type({ word, speed, backwards = false }: TypeParams) {
    return interval(speed).pipe(
      map((x) =>
        backwards
          ? word.substring(0, word.length - x)
          : word.substring(0, x + 1)
      ),
      take(word.length)
    );
  }

  typeEffect(word: string) {
    return concat(
      this.type({ word, speed: 50 }),
      of('').pipe(delay(1200), ignoreElements()),
    );
  }

  getTypewriterEffect(titles: string[]) {
    return from(titles).pipe(
      delay(1500),
      concatMap((title) => this.typeEffect(title))
    );
  }
}
