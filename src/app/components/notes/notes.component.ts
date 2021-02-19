import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user.model';
import {Store} from '@ngrx/store';
import {IAppState} from '../../store/app.reducers';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.sass']
})
export class NotesComponent implements OnInit {
  loadingData = true;
  notifyBars: Subject<any> = new Subject();
  notifyColumns: Subject<any> = new Subject();
  user: User = new User({
    uid: '',
    email: '',
    emailVerified: false,
    apiKey: '',
    authDomain: '',
    displayName: '',
    lastLoginAt: '',
    photoURL: '',
    stsTokenManager: {},
  });
  data: any[] = [];
  users: any[] = [];
  userData: any[] = [];

  months = [
    {key: '1', value: 'Enero'},
    {key: '2', value: 'Febrero'},
    {key: '3', value: 'Marzo'},
    {key: '4', value: 'Abril'},
    {key: '5', value: 'Mayo'},
    {key: '6', value: 'Junio'},
    {key: '7', value: 'Julio'},
    {key: '8', value: 'Agosto'},
    {key: '9', value: 'Septiembre'},
    {key: '10', value: 'Octubre'},
    {key: '11', value: 'Noviembre'},
    {key: '12', value: 'Diciembre'},
  ];

  // Data for chart 1
  chart1Data = [
    ['Mes', 'Nota promedio', { role: 'style' }],
    ['Mes 1', 0.0, '#6BDFAF'],            // RGB value
    ['Mes 2', 0.0, '#0CB1D9'],            // English color name
    ['Mes 3', 0.0, '#FFCA28'],
  ];
  chart1Month1 = {id: '', data: [] as any};
  chart1Month2 = {id: '', data: [] as any};
  chart1Month3 = {id: '', data: [] as any};

  // Data for chart 2
  chart2Data = [
    ['Mes', 'Solución', { role: 'style' } ],
    ['Mes 1', 0, 'color: gray'],
    ['Mes 2', 0, 'stroke-color: #703593; stroke-width: 4; fill-color: #C5A5CF'],
    ['Mes 3', 0, 'stroke-color: #871B47; stroke-opacity: 0.6; stroke-width: 8; fill-color: #BC5679; fill-opacity: 0.2']
  ];
  chart2Month1 = {id: '', data: [] as any};
  chart2Month2 = {id: '', data: [] as any};
  chart2Month3 = {id: '', data: [] as any};

  constructor(
    private as: AuthService,
    private store: Store<IAppState>,
  ) {}

  ngOnInit(): void {
    this.store.select('auth').subscribe((authState) => {
      if(authState && authState.user && authState.user.uid) {
        this.user = authState.user;
      }
    });
    this.load();
  }

  load(){
    var _self = this;
    var url = "https://emafolder.s3.us-east-2.amazonaws.com/EMA.xlsx";
    var oReq = new XMLHttpRequest();
    oReq.open("GET", url, true);
    oReq.responseType = "arraybuffer";

    oReq.onload = function(e) {
      var arraybuffer = oReq.response;

      /* convert data to binary string */
      var data = new Uint8Array(arraybuffer);
      var arr = new Array();
      for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");

      /* Call XLSX */
      var workbook = XLSX.read(bstr, {type:"binary"});

      /* DO SOMETHING WITH workbook HERE */
      var first_sheet_name = workbook.SheetNames[0];
      /* Get worksheet */
      var worksheet = workbook.Sheets[first_sheet_name];
      _self.data = XLSX.utils.sheet_to_json(worksheet,{raw:false});
      // _self.getUsers();
      _self.getUser();
    }
    oReq.send();
  }

  getUsers() {
    this.as.getUsers().snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      data.forEach(item => {
        let dni = item.payload.toJSON();
        const user = {
          uid: item.key,
          dni: dni,
        };
        this.users.push(user as any);
      });
      this.getUserData();
    });
  }

  getUser() {
    this.as.getUser(this.user.uid).snapshotChanges().subscribe(usr => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      const dni = usr.payload.toJSON();

      this.drawCharts(dni as number);
    });
  }

  drawCharts(dni: number) {
    this.userData = this.data.filter((ele) => {
      return ele.IncreYble === dni.toString();
    });

    this.userData.sort((a, b)=> {
      return new Date(b['Fecha de monitoreo']).getTime() - new Date(a['Fecha de monitoreo']).getTime();
    });

    this.drawChart1();

    this.drawChart2();

    setTimeout(() => {
      this.loadingData = false;
    }, 500);
  }

  getUserData() {
    /*const usr = this.getUser(this.user.uid);
    this.userData = this.data.filter((ele) => {
      return ele.IncreYble === usr.dni.toString();
    });*/

    this.userData.sort((a, b)=> {
      return new Date(b['Fecha de monitoreo']).getTime() - new Date(a['Fecha de monitoreo']).getTime();
    });

    this.drawChart1();

    this.drawChart2();
  }

  drawChart1() {
    for(let i = 0; i < this.userData.length; i++) {
      const id = ((this.userData[i]['Fecha de monitoreo']).split('/'))[0];

      if(this.chart1Month1.id && this.chart1Month1.id === id) {
        this.chart1Month1.data.push(parseFloat(this.userData[i]['NOTA EVALUACION']));
      } else if(this.chart1Month2.id && this.chart1Month2.id === id){
        this.chart1Month2.data.push(parseFloat(this.userData[i]['NOTA EVALUACION']));
      }  else if(this.chart1Month3.id && this.chart1Month3.id === id) {
        this.chart1Month3.data.push(parseFloat(this.userData[i]['NOTA EVALUACION']));
      } else if(!this.chart1Month1.id) {
        this.chart1Month1.id = id;
        this.chart1Month1.data.push(parseFloat(this.userData[i]['NOTA EVALUACION']));
      } else if(!this.chart1Month2.id) {
        this.chart1Month2.id = id;
        this.chart1Month2.data.push(parseFloat(this.userData[i]['NOTA EVALUACION']));
      } else if(!this.chart1Month3.id) {
        this.chart1Month3.id = id;
        this.chart1Month3.data.push(parseFloat(this.userData[i]['NOTA EVALUACION']));
      }
    }

    if (this.chart1Month1.data.length > 0) {
      const monthData = this.months.find((item) => {
        return item.key === this.chart1Month1.id;
      });

      this.chart1Data[1][0] = monthData!.value;
      this.chart1Data[1][1] = this.chart1Month1.data.reduce((p: number, c: number) => p + c, 0 ) / this.chart1Month1.data.length;
    } else {
      this.chart1Data.splice(1, 1);
    }

    if (this.chart1Month3.data.length > 0) {
      const monthData = this.months.find((item) => {
        return item.key === this.chart1Month3.id;
      });

      this.chart1Data[3][0] = monthData!.value;
      this.chart1Data[3][1] = this.chart1Month3.data.reduce((p: number, c: number) => p + c, 0 ) / this.chart1Month3.data.length;
    } else {
      this.chart1Data.splice(3, 1);
    }

    if (this.chart1Month2.data.length > 0) {
      const monthData = this.months.find((item) => {
        return item.key === this.chart1Month2.id;
      });

      this.chart1Data[2][0] = monthData!.value;
      this.chart1Data[2][1] = this.chart1Month2.data.reduce((p: number, c: number) => p + c, 0 ) / this.chart1Month2.data.length;
    } else {
      this.chart1Data.splice(2, 1);
    }

    this.notifyBars.next(this.chart1Data);
  }

  drawChart2() {
    let c1 = 0;
    let c2 = 0;
    let c3 = 0;

    for(let i = 0; i < this.userData.length; i++) {
      const id = ((this.userData[i]['Fecha de monitoreo']).split('/'))[0];

      if(this.chart2Month1.id && this.chart2Month1.id === id) {
        c1++;
        if(this.userData[i]['COLMEDICA CEO - ¿Resolvimos la solicitud del Cliente?'] === 'Si'){
          this.chart2Month1.data.push(this.userData[i]);
        }
      } else if(this.chart2Month2.id && this.chart2Month2.id === id){
        c2++;
        if(this.userData[i]['COLMEDICA CEO - ¿Resolvimos la solicitud del Cliente?'] === 'Si'){
          this.chart2Month2.data.push(this.userData[i]);
        }
      }  else if(this.chart2Month3.id && this.chart2Month3.id === id) {
        c3++;
        if(this.userData[i]['COLMEDICA CEO - ¿Resolvimos la solicitud del Cliente?'] === 'Si'){
          this.chart2Month3.data.push(this.userData[i]);
        }
      } else if(!this.chart2Month1.id) {
        c1++;
        this.chart2Month1.id = id;
        if(this.userData[i]['COLMEDICA CEO - ¿Resolvimos la solicitud del Cliente?'] === 'Si'){
          this.chart2Month1.data.push(this.userData[i]);
        }
      } else if(!this.chart2Month2.id) {
        c2++;
        this.chart2Month2.id = id;
        if(this.userData[i]['COLMEDICA CEO - ¿Resolvimos la solicitud del Cliente?'] === 'Si'){
          this.chart2Month2.data.push(this.userData[i]);
        }
      } else if(!this.chart2Month3.id) {
        c3++;
        this.chart2Month3.id = id;
        if(this.userData[i]['COLMEDICA CEO - ¿Resolvimos la solicitud del Cliente?'] === 'Si'){
          this.chart2Month3.data.push(this.userData[i]);
        }
      }
    }

    const month1Data = this.months.find((item) => {
      return item.key === this.chart2Month1.id;
    });

    this.chart2Data[1][0] = month1Data!.value;
    if (this.chart2Month1.data.length > 0) {
      this.chart2Data[1][1] = c1 > 0 ? (this.chart2Month1.data.length / c1) * 100 : 0;
    }

    const month3Data = this.months.find((item) => {
      return item.key === this.chart2Month3.id;
    });

    this.chart2Data[3][0] = month3Data!.value;
    if (this.chart2Month3.data.length > 0) {
      this.chart2Data[3][1] = c3 > 0 ? (this.chart2Month3.data.length / c3) * 100 : 0;
    }

    const month2Data = this.months.find((item) => {
      return item.key === this.chart2Month2.id;
    });

    this.chart2Data[2][0] = month2Data!.value;
    if (this.chart2Month2.data.length > 0) {
      this.chart2Data[2][1] = c2 > 0 ? (this.chart2Month2.data.length / c2) * 100 : 0;
    }

    this.notifyColumns.next(this.chart2Data);
  }

  /*getUser(uid: string) {
    return this.users.find((ele) => {
      return ele.uid === uid;
    });
  }*/

  /*onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      this.data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
      console.log(this.data); // Data will be logged in array format containing objects
    };
  }*/
}
