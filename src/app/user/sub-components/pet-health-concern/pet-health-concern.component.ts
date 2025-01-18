import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';

interface Pet {
  name: string;
  image: string;
  isVip: boolean;
  type: string;
  breed: string;
  age: string;
  gender: string;
  vaccinated: boolean;
  microchipped: boolean;
  neutered: boolean;
  weight: number;
  height: number;
}
interface HealthConcern {
  type: string;
  description: string;
}

@Component({
  selector: 'app-pet-health-concern',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './pet-health-concern.component.html',
  styleUrls: ['./pet-health-concern.component.css']
})
export class PetHealthConcernComponent implements OnInit {
  pets: Pet[] = [//this should take in the pets from the database, same as pet info page
    {
      name: 'Jiffy',
      image: 'assets/mochi.jpg',
      isVip: true,
      type: 'Dog',
      breed: 'Tabby',
      age: '2 years',
      gender: 'Female',
      vaccinated: true,
      microchipped: true,
      neutered: true,
      weight: 12,
      height: 30
    },
    {
      name: 'Mochi',
      image: 'assets/mochi.jpg',
      isVip: true,
      type: 'Dog',
      breed: 'Tabby',
      age: '2 years',
      gender: 'Female',
      vaccinated: true,
      microchipped: true,
      neutered: true,
      weight: 12,
      height: 30
    }, {
      name: 'captain',
      image: 'assets/mochi.jpg',
      isVip: true,
      type: 'Dog',
      breed: 'Tabby',
      age: '2 years',
      gender: 'Female',
      vaccinated: true,
      microchipped: true,
      neutered: true,
      weight: 12,
      height: 30
    }, {
      name: 'lucy',
      image: 'assets/mochi.jpg',
      isVip: true,
      type: 'Dog',
      breed: 'Tabby',
      age: '2 years',
      gender: 'Female',
      vaccinated: true,
      microchipped: true,
      neutered: true,
      weight: 12,
      height: 30
    }, {
      name: 'Jiffy',
      image: 'assets/mochi.jpg',
      isVip: true,
      type: 'Dog',
      breed: 'Tabby',
      age: '2 years',
      gender: 'Female',
      vaccinated: true,
      microchipped: true,
      neutered: true,
      weight: 12,
      height: 30
    }, 
  ];

  selectedPet: Pet;

  constructor(private router: Router) {
    this.selectedPet = this.pets[0]; // Default to first pet
  }

  healthConcerns: HealthConcern[] = [
    { type: 'Veterinarian', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.' },
    { type: 'Allergies', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.' },
    { type: 'Existing Condition', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.' },
  ];

  ngOnInit(): void {}

  info(){this.router.navigate(['/user-main-component/pet-info']);}
  health(){this.router.navigate(['/user-main-component/pet-health-concern']);}
  document(){this.router.navigate(['/user-main-component/pet-document']);}
  addPet(){this.router.navigate(['/user-main-component/create-pet-profile']);}
}