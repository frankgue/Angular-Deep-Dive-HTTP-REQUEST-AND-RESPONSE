import { inject, Injectable, signal } from '@angular/core';
import { Place } from '../models/place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private httpClient = inject(HttpClient);
  private errorService = inject(ErrorService);

  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchData(
      'http://localhost:3000/places',
      'Something went wront when fetching the avialable places. please try later...'
    );
  }

  loadUserPlaces() {
    return this.fetchData(
      'http://localhost:3000/user-places',
      'Something went wront when fetching your favorite places. please try later...'
    ).pipe(
      tap({
        next: (userPlaces) => this.userPlaces.set(userPlaces),
      })
    );
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces = this.userPlaces();

    if (!prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set([...prevPlaces, place]);
    }

    return this.httpClient
      .put('http://localhost:3000/user-places', {
        placeId: place.id,
      })
      .pipe(
        catchError((error) => {
          console.log(error);
          this.userPlaces.set(prevPlaces);
          this.errorService.showError('Failed to store selected place.');
          return throwError(() => new Error('Failed to store selected place.'));
        })
      );
  }

  removeUserPlace(place: Place) {
    const prevPlaces = this.userPlaces();

    if (prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set(prevPlaces.filter((p) => p.id !== place.id));
    }
    return this.httpClient
      .delete('http://localhost:3000/user-places/' + place.id)
      .pipe(
        catchError((error) => {
          console.log(error);
          this.userPlaces.set(prevPlaces);
          this.errorService.showError('Failed to delete selected place.');
          return throwError(
            () => new Error('Failed to delete selected place.')
          );
        })
      );
  }

  private fetchData(url: string, errorMessage: string) {
    return this.httpClient
      .get<{ places: Place[] }>(url, {
        // observe: 'response'
        // observe: 'events'
      })
      .pipe(
        map((resData) => resData.places),
        catchError((error) => {
          console.log(error);
          this.errorService.showError(errorMessage);
          return throwError(() => new Error(errorMessage));
        })
      );
  }
}
