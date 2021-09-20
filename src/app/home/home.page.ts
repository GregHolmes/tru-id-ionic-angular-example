import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { TruPluginIonicCapacitor } from '@tru_id/tru-plugin-ionic-capacitor';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userName: string;
  phoneNumber: string;
  checked: string;
  match: string;
  details: string;
  loading: boolean;
  baseUrl: string;

  constructor(
    public alertController: AlertController
  ) {
    this.phoneNumber = '';
    this.checked = '';
    this.match = '';
    this.details = '';
    this.loading = false;
    this.baseUrl = '<YOUR_NGROK_OR_LOCAL_TUNNEL_URL>';
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {}

  async showAlert(alertDetails) {
    const alert = await this.alertController.create(alertDetails);
    await alert.present();
  };

  async submitHandler() {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const body = JSON.stringify({ phone_number: this.phoneNumber });

    console.log(body);

    try {
      this.loading = true;

      const reachabilityDetails = await TruPluginIonicCapacitor.isReachable();

      console.log('Reachability details are', reachabilityDetails.result);

      const info: {
        networkId: string;
        networkName: string;
        countryCode: string;
        products?: { productId: string; productType: string }[];
        error?: {
          type: string;
          title: string;
          status: number;
          detail: string;
        };
      } = JSON.parse(reachabilityDetails.result);

      console.log(info);

      if (info.error?.status === 400) {
        this.showAlert({
          cssClass: 'alert-style',
          header: 'Something went wrong',
          message: 'Mobile Operator not supported.',
          buttons: ['Cancel', { text: 'Got It!' }]
        });

        this.details = 'MNO not supported';
        this.loading = false;

        return;
      }

      let isPhoneCheckSupported = false;

      if (info.error?.status !== 412) {
        isPhoneCheckSupported = false;

        for (const { productId } of info.products) {
          console.log('supported products are', productId);

          if (productId === 'PCK') {
            isPhoneCheckSupported = true;
          }
        }
      } else {
        isPhoneCheckSupported = true;
      }

      if (!isPhoneCheckSupported) {
        this.showAlert({
          cssClass: 'alert-style',
          header: 'Something went wrong',
          message: 'PhoneCheck is not supported on MNO.',
          buttons: ['Cancel', { text: 'Got It!' }]
        });

        this.details = 'PhoneCheck is not supported on MNO';
        this.loading = false;

        return;
      }

      this.details = JSON.stringify(isPhoneCheckSupported);

      const response = await fetch(`${this.baseUrl}/phone-check`, {
        headers: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body,
      });

      // eslint-disable-next-line @typescript-eslint/naming-convention
      const resp: { check_id: string; check_url: string } =
        await response.json();

      console.log('Server response is: ', JSON.stringify(resp));

      const checkUrl = resp.check_url;
      const checkId = resp.check_id;

      console.log('check url is', checkUrl);
      console.log('check_id is', checkId);

      const isChecked = await TruPluginIonicCapacitor.check({ url: checkUrl });

      console.log(isChecked);

      console.log('isChecked (check) Result', isChecked.result);

      this.checked = JSON.stringify(isChecked);

      const phoneCheckResponse = await fetch(
        `${this.baseUrl}/phone-check?check_id=${checkId}`,
        {
          headers: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'application/json',
          },
        }
      );

      const phoneCheckResult: { match: boolean } =
        await phoneCheckResponse.json();

      console.log('PhoneCheck match', phoneCheckResult.match);
      this.match = JSON.stringify(phoneCheckResult.match);

      this.loading = false;

      if (phoneCheckResult.match) {
        this.showAlert({
          cssClass: 'alert-style',
          header: 'Success!',
          message: 'PhoneCheck Verification successful.',
          buttons: ['Cancel', { text: 'Got It!' }]
        });
      } else if (!phoneCheckResult.match) {
        this.showAlert({
          cssClass: 'alert-style',
          header: 'Something went wrong',
          message: 'PhoneCheck verification unsuccessful.',
          buttons: ['Cancel', { text: 'Got It!' }]
        });
      }
    } catch (e: any) {
      this.loading = false;
      console.log(JSON.stringify(e));

      this.showAlert({
        cssClass: 'alert-style',
        header: 'Something went wrong',
        message: `${e.message}`,
        buttons: ['Cancel', { text: 'Got It!' }]
      });
    }
  }
}
