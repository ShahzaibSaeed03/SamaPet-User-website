import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { PetinfoService, Pet } from '../../../services/petinfo.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { allBreeds, AllBreeds, Breed, PetType, petType } from '../../../shared/Pet';

@Component({
  selector: 'app-adoption-center',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule],
  templateUrl: './adoption-center.component.html',
  styleUrls: ['./adoption-center.component.scss',
    './style.css', './resposiveness.css', './custom-style.css'
  ]
})
export class AdoptionCenterComponent {
  pets: Pet[] = [];
  lostPets: any[] = [];
  filteredPets: Pet[] = [];
  petTypes: any[] = petType.map(pet => pet.value);
  allBreeds: AllBreeds = allBreeds;
  filteredBreeds: string[] = [];
  selectedPetType: string = '';
  selectedGender: string = '';
  selectedAge: number = 0;
  currentDate = new Date();
  direction: number = 1;
  searchTerm: string = '';
  selectedBreed: string = 'all';
  currentPage: number = 1;
  itemsPerPage: number = 12; // Number of items per page
  paginatedPets: any[] = []; // Array to hold the pets for the current page
  pages: number[] = [1];
  
  constructor(private petInfo:PetinfoService, private router: Router){
    this.loadPets();
  }

  loadPets() {
    this.petInfo.fetchAllPets().then((pets: any) => {
      this.pets = pets;
      this.loadLostPets();
    });
  }

  loadLostPets(){
    this.petInfo.getAllLostPets().then((pets: any) =>{
      this.lostPets = pets.data.lostPets;
      console.log('lost', this.lostPets);
      this.applyFilters();
    });
    
  }

  filterPets() {
    this.filteredPets = this.pets.filter(pet => {
      // Apply all filters here  
           
      return (
        (this.selectedBreed == 'all' || pet.breed.toLowerCase() == this.selectedBreed.toLowerCase()) &&
        ((this.direction == 1 && Number(pet.allow_adoption) === 1) ||
          (this.direction == 2 && Number(pet.is_lost) === 1)) &&
        (this.selectedPetType === '' || pet.pet_type.toLowerCase() === this.selectedPetType.toLowerCase()) &&
        (this.selectedGender === '' || pet.gender === this.selectedGender) &&
        (this.selectedAge === 0 || this.calculateAge(pet.age) <= this.selectedAge) &&
        (this.searchTerm === '' ||
          pet.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          pet.pet_type.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    }); 
    this.setPage(1);   
    this.pages = this.getpages();
  }

  applyFilters() {
    this.filterPets();
  }

  loadDirection(i: number) {
    this.direction = i;
    this.applyFilters();
  }

  resetFilters() {
    this.selectedPetType = '';
    this.selectedGender = '';
    this.searchTerm = '';
    this.selectedAge = 0;
    this.loadDirection(this.direction);
  }

  calculateAge(birthDate: number): number {
    const age = this.currentDate.getFullYear() - new Date(birthDate).getFullYear();
    return age;
  }

  onPetTypeChange(type: string): void {
    const selectedBreeds = this.allBreeds[type as keyof AllBreeds];
    this.filteredBreeds = selectedBreeds.map(breed => breed.value);
    this.applyFilters();
  }
  breedChange(event: Event): void {
    const selectedType = (event.target as HTMLSelectElement).value;
    this.selectedBreed = selectedType;
    this.applyFilters();
  }

  hasFilteredPets(): boolean {
    return this.filteredPets && this.filteredPets.length > 0;
  }

  getpages(): number[] {
    var totalItems = this.filteredPets.length;
    if(this.direction == 2){totalItems += this.lostPets.length}
    return Array(Math.ceil(totalItems / this.itemsPerPage)).fill(0).map((x, i) => i + 1);
  }

  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    if(this.direction == 1){
      this.paginatedPets = [...this.filteredPets].slice(startIndex, endIndex);
    }else if(this.direction == 2){
      this.paginatedPets = [...this.filteredPets, ...this.lostPets].slice(startIndex, endIndex);
    }
    
  }

  navigateToDetailsPage(petId: number) {
    const type= this.direction === 1 ? 'Adoption' : this.direction === 2 ? 'Lost Pet' : '';
    // Navigate to the details page for the selected pet
    this.router.navigate(['/user-main-component/adopt-profile', petId], { queryParams: { direction: type } });
  }

  goToLostForm(){
    this.router.navigate(['/user-main-component/lost-pet-form']);
  }
}
