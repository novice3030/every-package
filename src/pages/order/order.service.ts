import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as moment from 'moment';
import {catchError} from 'rxjs';
import {ApiService} from './../../api/api.service';
import {DeliveryDate} from './../../models/delivery-date.model';
import {Order} from './../../models/order.model';
import {City} from './../../models/city.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private api: ApiService, private snackbar: MatSnackBar) {}

  calcOrderPrice(pickupCity: City, dropoffCity: City): number {
    return dropoffCity.enName === pickupCity.enName
      ? pickupCity.price * 1.17
      : (pickupCity.price + dropoffCity.price + 10) * 1.17;
  }

  getDeliveryTimes(date: Date, deliveryDates: DeliveryDate[]): string[] {
    if (date) {
      const momentDate = moment(date).locale('en');
      if (momentDate.isValid()) {
        const day = momentDate.format('ddd');
        return deliveryDates.find(date => date.day === day)?.times || [];
      }
    }
    return [];
  }

  submitOrder(orderForm: FormGroup) {
    this.api
      .submitOrder({
        deliveryDate: moment(orderForm.controls['deliveryDate'].value).toISOString(),
        deliveryTime: orderForm.controls['deliveryTime'].value,
        dropoffAddress: orderForm.controls['dropoffAddress'].value,
        dropoffCity: orderForm.controls['dropoffCity'].value,
        pickupAddress: orderForm.controls['pickupAddress'].value,
        pickupCity: orderForm.controls['pickupCity'].value,
        reciverName: orderForm.controls['reciverName'].value,
        reciverPhone: orderForm.controls['reciverPhone'].value,
        senderName: orderForm.controls['senderName'].value,
        senderPhone: orderForm.controls['senderPhone'].value,
      } as Order)
      .pipe(
        catchError(error => {
          this.snackbar.open($localize`Faild to create order!`, undefined, {
            duration: 3000,
            panelClass: 'warn-snackbar',
          });
          throw error;
        }),
      )
      .subscribe(() => {
        this.snackbar.open($localize`Order created!`, undefined, {
          duration: 3000,
          panelClass: 'primary-color-snackbar',
        });
        orderForm.reset();
      });
  }
}
