import { Component, inject, signal } from '@angular/core';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { catchError, map, Subscription, throwError } from 'rxjs';
import { Place } from '../../models/place.model';
import { HttpClient } from '@angular/common/http';
import { PlacesComponent } from '../places.component';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-user-places',
  imports: [PlacesContainerComponent, PlacesComponent],
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
})
export class UserPlacesComponent {
  subscription!: Subscription;
  placesService = inject(PlacesService);
  isFetching = signal(false);
  error = signal('');
  places = this.placesService.loadedUserPlaces;

  ngOnInit(): void {
    this.isFetching.set(true);
    this.subscription = this.placesService.loadUserPlaces().subscribe({
      error: (err: Error) => {
        console.log(err);
        this.error.set(err.message);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });
  }

  
onRemovePlace(selectedPlace: Place) {
 this.subscription = this.placesService.removeUserPlace(selectedPlace).subscribe({
    complete: () => {
      
    }
 })
}

ngOnDestroy(): void {
  this.subscription.unsubscribe();
}
}
