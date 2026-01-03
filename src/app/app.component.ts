import { Component } from '@angular/core';
import { AvailablePlacesComponent } from "./places/available-places/available-places.component";
import { UserPlacesComponent } from "./places/user-places/user-places.component";

@Component({
  selector: 'app-root',
  imports: [AvailablePlacesComponent, UserPlacesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
