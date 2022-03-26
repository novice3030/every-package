import {Component, Inject, LOCALE_ID, OnDestroy, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';
import {ApiService} from 'src/api/api.service';
import {DeliveryDate} from 'src/models/delivery-date.model';
import {SubSink} from 'subsink';
import {City} from './../../models/city.model';
import {OrderService} from './order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  orderForm = new FormGroup({
    senderName: new FormControl('', [Validators.required]),
    senderPhone: new FormControl('', [Validators.required]),
    pickupAddress: new FormControl('', [Validators.required]),
    pickupCity: new FormControl('', [Validators.required]),
    dropoffCity: new FormControl('', [Validators.required]),
    reciverName: new FormControl('', [Validators.required]),
    reciverPhone: new FormControl('', [Validators.required]),
    dropoffAddress: new FormControl('', [Validators.required]),
    deliveryDate: new FormControl('', [Validators.required, dateValidator]),
    deliveryTime: new FormControl('', [Validators.required]),
  });
  cities$ = this.api.getCities();
  price = 0;
  times: string[] = [];
  deliveryDates: DeliveryDate[] = [];
  isRTL = false;

  dateFilter = (d: Date | null): boolean => {
    const momentDate = moment(d) || moment();
    return momentDate.isSameOrAfter(moment()) && momentDate.day() !== 6;
  };
  constructor(
    private api: ApiService,
    private orderService: OrderService,
    @Inject(LOCALE_ID) public locale: string,
  ) {}

  ngOnInit(): void {
    this.isRTL = document.dir === 'rtl';
    this.subs.add(
      this.orderForm.controls['pickupCity'].valueChanges.subscribe((pickupCity: City) => {
        const dropOffCity = this.orderForm.controls['dropoffCity'].value as City;
        if (dropOffCity) {
          this.price = this.orderService.calcOrderPrice(dropOffCity, pickupCity);
        }
      }),
    );

    this.subs.add(
      this.orderForm.controls['dropoffCity'].valueChanges.subscribe((dropoffCity: City) => {
        const pickupCity = this.orderForm.controls['pickupCity'].value as City;
        this.price = this.orderService.calcOrderPrice(pickupCity, dropoffCity);
      }),
    );

    this.subs.add(
      this.orderForm.controls['deliveryDate'].valueChanges.subscribe(date => {
        this.times = this.orderService.getDeliveryTimes(date, this.deliveryDates);
      }),
    );

    this.api.getDeliveryDates().subscribe(dates => (this.deliveryDates = dates));
  }

  onSubmitOrderClicked() {
    this.orderService.submitOrder(this.orderForm);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

function dateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return moment(control.value).isValid()
      ? null
      : {
          invalidDate: {
            value: control.value,
          },
        };
  };
}
