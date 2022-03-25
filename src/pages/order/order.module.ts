import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderComponent} from './order.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgxMatIntlTelInputModule} from 'ngx-mat-intl-tel-input';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatMomentDateModule,
    MatToolbarModule,
    MatSnackBarModule,
    NgxMatIntlTelInputModule,
  ],
})
export class OrderModule {}
