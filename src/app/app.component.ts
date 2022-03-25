import {Component} from '@angular/core';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'every-package';
  tooltipText = $localize`Change to dark mode`;
  themeIcon = 'dark_mode';

  onThemeToggleChange(event: MatSlideToggleChange) {
    if (event.checked) {
      document.body.classList.add('theme-alternate');
      this.tooltipText = $localize`Change to light mode`;
      this.themeIcon = 'light_mode';
    } else {
      document.body.classList.remove('theme-alternate');
      this.tooltipText = $localize`Change to dark mode`;
      this.themeIcon = 'dark_mode';
    }
  }
}
