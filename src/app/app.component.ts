import { Component, NgZone } from '@angular/core';

const electron = (<any>window).require('electron');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private zone: NgZone) {
    electron.ipcRenderer.on('e-msg-system', (event, arg) => {
      this.zone.run(() => {

        this.env_var_val = arg.value;
        console.log(arg.value);
      });
      // Update the UI
      
    });
  }

  request_env_var = () => {
    electron.ipcRenderer.send('request-env-variable', this.env_var);
  }

  title = 'EliteHelper';

  env_var: string = 'HOSTNAME';
  env_var_val: string = '';
}
