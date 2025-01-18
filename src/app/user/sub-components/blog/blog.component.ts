import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  currentDate: Date;
  currentMonth: number;
  currentYear: number;
  daysInMonth!: number;
  firstDayOfMonth!: number;
  weeks: (number | null)[][]; // Correctly handle null for empty days

  constructor() {
    this.currentDate = new Date();
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
    this.weeks = [];
  }

  ngOnInit(): void {
    this.generateCalendar();
  }

  // Generate the calendar days
  generateCalendar(): void {
    // Get number of days in the current month
    this.daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    // Get the day of the week the month starts on (0 - Sunday, 6 - Saturday)
    this.firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();

    // Create weeks array to store days
    this.weeks = [];
    let week: (number | null)[] = new Array(this.firstDayOfMonth).fill(null); // Initialize first week with nulls for empty days
    let day = 1;

    // Fill the weeks array with day numbers
    while (day <= this.daysInMonth) {
      week.push(day);
      day++;
      if (week.length === 7) {
        this.weeks.push(week);
        week = [];
      }
    }

    // Push remaining days of the last week if it's not full
    if (week.length > 0) {
      this.weeks.push(week.concat(new Array(7 - week.length).fill(null))); // Fill remaining cells with null
    }
  }

  // Navigate to the previous month
  goToPrevMonth(): void {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.generateCalendar();
  }

  // Navigate to the next month
  goToNextMonth(): void {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.generateCalendar();
  }

  // Get the display name for the month and year
  getMonthYear(): string {
    const monthName = new Date(this.currentYear, this.currentMonth).toLocaleString('default', { month: 'long' });
    return `${monthName} ${this.currentYear}`;
  }
}