import { Component, signal } from '@angular/core';
import { PlacesContainerComponent } from "../places-container/places-container.component";
import { PlacesComponent } from "../places.component";
import { Place } from '../../models/place.model';

@Component({
  selector: 'app-available-places',
  imports: [PlacesContainerComponent, PlacesComponent],
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css'
})
export class AvailablePlacesComponent {

  places = signal<Place[] | undefined>(undefined);
}
