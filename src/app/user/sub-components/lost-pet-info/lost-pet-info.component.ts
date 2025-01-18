import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollarService } from '../../../services/collar.service';
import { UserAuthService } from '../../../services/user-auth.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-lost-pet-info',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './lost-pet-info.component.html',
  styleUrls: ['./lost-pet-info.component.css']
})
export class LostPetInfoComponent implements OnInit {
  pet: any; // Initialize pet as null
  code: any;
  profile: any;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private collarService: CollarService,
    private auth: UserAuthService
  ) {}

  async ngOnInit(): Promise<void> {
    this.isLoading = true; // Start loading

    try {
      await this.loadPetInfo(); // Wait for pet info to load
      await this.loadProfile();  // Wait for profile info to load
    } catch (error) {
      console.error('Error during initialization:', error);
    } finally {
      this.isLoading = false; // End loading
    }
  }

  async loadProfile(): Promise<void> {
    if (this.pet) { // Ensure pet is loaded before accessing its properties
      try {
        this.profile = await this.auth.fetchPetOwnerData(this.pet.pet_owner_id);
        console.log('Profile Data:', this.profile);
      } catch (error: any) {
        console.error('Error fetching profile data:', error);
      }
    } else {
      console.error('Pet data is not loaded yet.');
    }
  }

  async loadPetInfo(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Subscribe to the route parameters
      this.route.params.subscribe(async params => {
        this.code = params['code']; // Assuming the parameter is named 'code'

        if (this.code) {
          try {
            this.pet = await this.collarService.getPetByCode(this.code); // Call the service method
            console.log('Pet Info:', this.pet);
            resolve(); // Resolve the promise
          } catch (error) {
            console.error('Error fetching pet information:', error);
            reject(error); // Reject the promise on error
          }
        } else {
          reject(new Error('No code provided.'));
        }
      });
    });
  }
}