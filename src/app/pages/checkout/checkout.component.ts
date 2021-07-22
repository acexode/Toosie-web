import { locationList } from './locations';
import { OrdersService } from 'src/app/core/service/orders/orders.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Flutterwave, InlinePaymentOptions, PaymentSuccessResponse } from 'flutterwave-angular-v3';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { InventoryService } from 'src/app/core/service/inventory/inventory.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { isEmpty } from 'lodash';
const SAVED_CARD = 'saved_card';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutDetails: any = {}
  cardSaved = false;
  cardObj: any;
  cityList = locationList
  states= [
    {
      label:'Abuja',
      value:'Abuja'
    },
    {
      label:'Lagos',
      value:'Lagos'
    },
  ]
  publicKey = 'FLWPUBK-e2f49a592820916c1f1c939c171b645a-X';
  customizations = {
    title: 'Toosie Pharmacy',
    description: '',
    logo: '/assets/icon/logo-big.png'
  };
  success = { cssClass: 'alert-success' }
  error = { cssClass: 'alert-danger' }
  meta = {counsumer_id: '7898', consumer_mac: 'kjs9s8ss7dd'};
  billingInfo: FormGroup;
  paymentMethods = [
    {
      id: '1',
      name: 'payment',
      text: 'Card Payment',
      value: 'card',
      icon: 'credit-card',
      disabled: false,
      checked: false,
      color: 'primary'
    }, {
      id: '2',
      name: 'payment',
      text: 'Cash Payment',
      value: 'cash',
      icon: 'cash',
      disabled: false,
      checked: true,
      color: 'secondary'
    }
  ];
  grandTotal = 0;
  lists: any;
  total: any;
  discount: any;
  delivery= 0;
  selectedCity: any;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private invS: InventoryService,
    private orderS: OrdersService,
    private alertService: FlashMessagesService,
    private router: Router,
    private flutterwave: Flutterwave,) {
      this.billingInfo = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone_number: ['', [Validators.required, Validators.minLength(8)]],
        address: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        paymentType: ['card', [Validators.required]],
      });

    }


  ngOnInit(): void {
    this.billingInfo.get('city')?.valueChanges.subscribe(e =>{
      console.log(e)
      this.delivery = e.value
      this.grandTotal = this.lists.reduce((a:any, b:any) => a + (b['actualPrice'] * b['quantity']),0)+ parseInt(e.value)
    })
    this.orderS.cartStore.subscribe(store =>{
      this.checkoutDetails = store
      this.lists = isEmpty(store) ? [] : store;
      this.grandTotal = this.lists.reduce((a:any, b:any) => a + (b['actualPrice'] * b['quantity']),0)
      this.discount = this.lists.reduce((a:any, b:any) => {
        console.log(a + ((b['actualPrice'] - b['currentPrice'])))
        return a + ((b['actualPrice'] - b['currentPrice']))
      },0)
    })
    const card = JSON.parse(localStorage.getItem( SAVED_CARD) || '{}');
    this.cardObj = card;
    console.log(isEmpty(this.cardObj))
    if(!isEmpty(this.cardObj)){
      console.log(this.cardObj);
      this.cardSaved = true;
      this.billingInfo.patchValue({
        paymentType: 'savedCard'
      });
    }
    const user = this.authService.currentUser() 
    this.billingInfo.patchValue({
      email: user.email,
      phone_number: user.phone,
      name: user.fullName,
      address: user.address,
    });
  }
  async savePODCashOrder() {
    const records = this.checkoutDetails.items.map((e: { _id: any; title: any; quantity: any; currentPrice: any; }) => ({
        inventoryId: e._id,
        itemName: e.title,
        quantity: e.quantity,
        cost: e.currentPrice
      }));
    const body = {
      records,
      paymentType:'POD',
      address: this.state?.value + ', ' + this.city?.value + ', ' +  this.address?.value
    };
    console.log(body);
    this.invS.savePODCashOrder(body).subscribe(
      async (res: any) => {
        this.alertService.show('Order Placed Successfully');
        this.orderS.removeCart();
        this.router.navigate(['/']);
      },
      async (res: { error: { message: any; error: any; }; }) => {
        console.log(res);
        alert('')
      }
    );
  }
  payWithRave() {
    //flw-t1nf-df84793838bb8a62267a8ce63b204e5e-k3n
    console.log(this.email)
    const customerDetails = {
      name: this.name?.value,
      email: this.email?.value,
      phone_number_number: this.phone_number?.value
    };
    const metas = this.lists.map((it: { title: any; _id: any; }) =>({
      metaname: it.title,
      metavalue: it._id
    }));
    const paymentData: InlinePaymentOptions = {
      public_key: this.publicKey,
      tx_ref: this.generateReference(),
      amount: 10,
      currency: 'NGN',
      payment_options: 'card,ussd',
      redirect_url: '',
      meta: this.meta,
      customer: customerDetails,
      customizations: this.customizations,
      callback: this.makePaymentCallback,
      onclose: this.closedPaymentModal,
      callbackContext: this
    };
    this.flutterwave.inlinePay(paymentData);

  }
  async savedCardPayment(): Promise<void> {
    const records = this.lists.map((e:any) => ({
      inventoryId: e._id,
      itemName: e.title,
      quantity: e.quantity,
      cost: e.currentPrice
    }));
    const body = {
      address: this.state?.value + ', ' + this.city?.value + ', ' +  this.address?.value,
      paymentType:'Card',
      records,
      txref: this.generateReference(),
      token: this.cardObj.life_time_token,
      grandTotal: 10
    };
    console.log(body);
    

    this.invS.saveTokenOrder(body).subscribe(
      async (res: any) => {
      //Storage.set({key: SAVED_CARD,value: JSON.stringify(res.card)});
      this.alertService.show('Order Placed Successfully', this.success);
      this.orderS.removeCart();
    },
    async (res) => {
      this.alertService.show('error placing order', this.error);
    }
  );
  }
  closedPaymentModal(): void {
    console.log('payment is closed');
  }
  generateReference(): string {
    const date = new Date();
    return 'TPHREC' + date.getTime().toString();
  }
  async makePaymentCallback(response: PaymentSuccessResponse): Promise<void> {
    const records = this.checkoutDetails.items.map((e: { _id: any; title: any; quantity: any; currentPrice: any; }) => ({
      inventoryId: e._id,
      itemName: e.title,
      quantity: e.quantity,
      cost: e.currentPrice
    }));
    const body = {
      address: this.state?.value + ', ' + this.city?.value + ', ' +  this.address?.value,
      paymentType:'Card',
      records,
      txref: response.tx_ref
    };
    console.log(body);
   

    this.invS.saveCardOrder(body).subscribe(
      async (res: any) => {
      localStorage.setItem(SAVED_CARD, JSON.stringify(res.card));      
      this.alertService.show('Order Placed Successfully', this.success);
      this.orderS.removeCart();
    },
    async (res) => {
      console.log(res);
      this.alertService.show('Error placing order', this.error);

     
    }
  );
  }
  setPayment(value: any){
    this.billingInfo.patchValue({
      paymentType: value
    });
  }
  locationChange(e: any){
    console.log(e)
    console.log(this.selectedCity);
    // this.grandTotal += e.detail.value;
    // console.log(this.grandTotal);
  }
  // Easy access for form fields
  get name() {
    return this.billingInfo.get('name');
  }
  get email() {
    return this.billingInfo.get('email');
  }

  get phone_number() {
    return this.billingInfo.get('phone_number');
  }
  get city() {
    return this.billingInfo.get('city');
  }
  get state() {
    return this.billingInfo.get('state');
  }
  get address() {
    return this.billingInfo.get('address');
  }
  get paymentType() {
    return this.billingInfo.get('paymentType');
  }

}
