import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class FragmentService {

  constructor(private router: Router) { }

  goToFragment(fragment: string): void {
    const isMain = this.router.url.split('#')[0] === '/';
    if (isMain) {
      this.scrollToFragment(fragment);
    } else {
      this.router.navigate(['/'], { fragment }).then(() => {
        // Даем время DOM прогрузиться
        setTimeout(() => this.scrollToFragment(fragment), 50);
      });
    }
  }

  private scrollToFragment(fragment: string): void {
    const element = document.getElementById(fragment);
    if (element) {
      element.scrollIntoView(); // SCSS управляет плавностью
    }
  }

}
