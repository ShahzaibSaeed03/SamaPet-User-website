import { Component, OnInit } from '@angular/core';
import { ProvidersService } from '../../../services/providers.service';
import { from } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { AllProviderService } from '../../../services/all-provider.service';
import { provider } from '../../../admin/sub-components/hospital-services/hospital-services.component';

interface Provider {
  id: number;
  provider_name_en: string;
  profile_image: string;
  type: string; // Type of provider (e.g., 'Hospital', 'Clinic', etc.)
}

@Component({
  selector: 'app-vet-clinics',
  standalone:true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './vet-clinics.component.html',
  styleUrls: ['./vet-clinics.component.scss',
    '../../../shared/css/style.css', 
    '../../../shared/css/custom-style.css', 
    '../../../shared/css/resposiveness.css']
})

export class VetClinicsComponent implements OnInit {
  
  providers: Provider[] = [];
  filteredProviders: Provider[] = [];
  pages: number[] = [];
  selectedType: string = 'All'; // Default to show all providers
  searchTerm: string = ''; // Default search term is empty
  itemsPerPage: number = 12;
  currentPage: number = 1;
  selectedFilters: string[] = [];
  providerId:any

  constructor(private providersService: ProvidersService,private provoderServicess:AllProviderService, private router: Router) {}

  ngOnInit() {
    this.loadProviders();
    const id = 1; // Replace 1 with the actual id you want to set
    this.providerId = this.provoderServicess.setProviderId(id);

  }

  loadProviders() {
    this.provoderServicess.getAllProvider().subscribe(
      (response: any) => {
        // Ensure the response contains the 'providers' key and it's not empty
        if (response && response.providers && Array.isArray(response.providers)) {
          this.providers = response.providers;  // Extract and assign the providers array
          console.log(this.providers)
        } else {
          console.error('No providers found in the response');
        }
      },
      (error) => {
        console.error('Error occurred:', error);
      }
    );
  }
  
  
  

  updatePages() {
    // Implement pagination logic here based on the number of providers
    const totalProviders = this.filteredProviders.length;
    const totalPages = Math.ceil(totalProviders / this.itemsPerPage);
    this.pages = Array.from({ length: totalPages }, (v, k) => k + 1);
  }

  applyFilter(type: string) {
    console.log('clicked ', type);
    if (this.selectedFilters.includes(type)) {
      this.selectedFilters = this.selectedFilters.filter(filter => filter !== type);
    } else {
      this.selectedFilters.push(type);
    }
    this.applyFilters();
  }

  toggleFilter(type: string) {
    if (this.selectedFilters.includes(type)) {
      this.selectedFilters = this.selectedFilters.filter(filter => filter !== type);
    } else {
      this.selectedFilters.push(type);
    }
  }
  
  isFilterSelected(type: string): boolean {
    return this.selectedFilters.includes(type);
  }
  
  clearFilters() {
    this.selectedFilters = [];
    this.applyFilters();
  }
  
  applyFilters() {
    console.log('filters');
    this.filteredProviders = this.providers.filter(provider => {
      const typeMatch = this.selectedFilters.length === 0 || this.selectedFilters.includes(provider.type);
      const nameMatch = provider.provider_name_en
      .toLowerCase().includes(this.searchTerm.toLowerCase());
      return typeMatch && nameMatch;
    });
    this.updatePages();
  }

  onSearch(searchTerm: string) {
    this.filteredProviders = this.providers.filter(provider =>
      provider.provider_name_en
      .toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.updatePages();
  }

  getDisplayedProviders(): Provider[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredProviders.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  viewProvider(id: number) {
    this.providerId = this.provoderServicess.setProviderId(id);
  

    this.router.navigate([`/user-main-component/providers/${id}`]);
  }
}