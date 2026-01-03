import { Component, inject, OnInit, signal } from '@angular/core';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../../models/place.model';
import { Subscription } from 'rxjs';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-available-places',
  imports: [PlacesContainerComponent, PlacesComponent],
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
})
export class AvailablePlacesComponent implements OnInit {
  subscription!: Subscription;
  places = signal<Place[] | undefined>(undefined);
  placesService = inject(PlacesService);
  isFetching = signal(false);
  error = signal('');

  ngOnInit(): void {
    this.isFetching.set(true);
    this.subscription = this.placesService.loadAvailablePlaces().subscribe({
        next: (places) => {
          this.places.set(places);
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

  onSelectPlace(selectedPlace: Place) {
   this.subscription = this.placesService.addPlaceToUserPlaces(selectedPlace)
      .subscribe({
        next: (resData) => {
          
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
