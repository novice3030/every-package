import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {DeliveryDate} from 'src/models/delivery-date.model';
import {City} from './../../models/city.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor() {}

  calcOrderPrice(pickupCity: City, dropoffCity: City): number {
    return dropoffCity.enName === pickupCity.enName
      ? pickupCity.price * 1.17
      : (pickupCity.price + dropoffCity.price + 10) * 1.17;
  }

  getDeliveryTimes(date: Date, deliveryDates: DeliveryDate[]): string[] {
    if (date) {
      const momentDate = moment(date);
      if (momentDate.isValid()) {
        const day = momentDate.format('ddd');
        return deliveryDates.find(date => date.day === day)?.times || [];
      }
    }
    return [];
  }
}
