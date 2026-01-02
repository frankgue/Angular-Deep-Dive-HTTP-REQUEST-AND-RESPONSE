import { Component } from '@angular/core';
import { PlacesContainerComponent } from "../places-container/places-container.component";

@Component({
  selector: 'app-user-places',
  imports: [PlacesContainerComponent],
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css'
})
export class UserPlacesComponent {

}
