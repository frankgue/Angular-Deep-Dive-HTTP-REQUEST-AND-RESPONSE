import { Component, inject, OnInit, signal } from '@angular/core';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../../models/place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, Subscription, throwError } from 'rxjs';

@Component({
  selector: 'app-available-places',
  imports: [PlacesContainerComponent, PlacesComponent],
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
})
export class AvailablePlacesComponent implements OnInit {
  subscription!: Subscription;
  places = signal<Place[] | undefined>(undefined);
  httpClient = inject(HttpClient);
  isFetching = signal(false);
  error = signal('');

  ngOnInit(): void {
    this.isFetching.set(true);
    this.subscription = this.httpClient
      .get<{ places: Place[] }>('http://localhost:3000/places', {
        // observe: 'response'
        // observe: 'events'
      })
      .pipe(
        map((resData) => resData.places),
        catchError((error) => {
          console.log(error);
          return throwError(
            () => new Error('Something went wront. please try later...')
          )
        })
      )
      .subscribe({
        next: (places) => {
          console.log(places);
          this.places.set(places);
          // this.places.set(response.body?.places)
        },
        error: (err: Error) => {
          console.log(err);
          this.error.set(err.message);
        },
        complete: () => {
          this.isFetching.set(false);
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
