import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';


import{ jqxPivotGridComponent } from 'jqwidgets-ng/jqxpivotgrid';
import { jqxPivotDesignerComponent } from 'jqwidgets-ng/jqxpivotdesigner';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ProductReportService } from '@app/core/services/report/product-report.service';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { SellsInvoice } from '@app/shared/models/stock/invoice.model';
import { StockGeneral } from '@app/shared/models/stock/stock-general.model';


@Component({
  selector: 'app-stock-general-report',
  templateUrl: './stock-general-report.component.html',
  styleUrls: ['./stock-general-report.component.scss']
})
export class StockGeneralReportComponent implements OnInit{

  todayDate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  data: any;

  loading: boolean;
  savingSles: boolean;
  deletingSales: boolean;
  page = 1;
  size = 10;

  form: FormGroup;

  fromDate:any;
  toDate:any;


  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(
    private _fb: FormBuilder,
    private datePipe : DatePipe,
    private reportService:ProductReportService)	{

  	}

    ngOnInit(){
      this.loadData();

      this.iniForm();
    }

    dateFilter(page?: number): void {
      this.page = page ? page : 1;
      this.loading = true;
      let formDt = this.datePipe.transform(this.form.get('fromDate').value, 'yyyy-MM-dd');
      let toDt = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');

      this.fromDate=formDt;
      this.toDate=toDt;

      this.reportService.stockGeneralReport({
        page: this.page,
        size: this.size,
        from:  formDt,
        to:   toDt
      }).subscribe((res:any) => {
        this.data = res;
      console.log( this.data);
        this.loading = false;
      });
    }


    loadData(page?: number): void {
      this.page = page ? page : 1;
      this.loading = true;

      let formDt =this.todayDate;
      let toDt = this.todayDate;

      this.reportService.stockGeneralReport({
        page: this.page,
        size: this.size,
        from:  formDt,
        to:   toDt
      }).subscribe((res: PartialList<StockGeneral>) => {
        this.data = res;
       console.log( this.data);
        this.loading = false;
      });
    }


    // [disabled]="form.invalid || loading" and :  new Date() will solve the blank date issue
    iniForm(){
      this.loading=true;
      this.form = this._fb.group({
        fromDate: [  new Date(),  [Validators.required],],
        toDate: [  new Date(),  [Validators.required],]
      });
    }

    _CIN(val){
      return parseInt(val);
    }

    _CIP(val){
      return parseInt(val)*-1;
    }





private getElementTag(tag: keyof HTMLElementTagNameMap): string {
  const html: string[] = [];
  const elements = document.getElementsByTagName(tag);
  for (let index = 0; index < elements.length; index++) {
    html.push(elements[index].outerHTML);
  }
  return html.join('\r\n');
}


  print(printSectionId): void {
    event.preventDefault()
  let printContents, popupWin, styles = "", links = '';



    styles = this.getElementTag('style');
    links = this.getElementTag('link');


  printContents = document.getElementById(printSectionId).innerHTML;
  popupWin = window.open("", "_blank", "top=0,left=0,height=auto,width=auto");
  popupWin.document.open();
  popupWin.document.write(`
    <html>
      <head>
        <title>Report</title>
        ${styles}
        ${links}
        <style>
        @page {
          size: A4 landscape;
        }
      </style>
      </head>
      <body onload="window.print(); setTimeout(()=>{ window.close(); }, 0)">
        ${printContents}
      </body>
    </html>`);
  popupWin.document.close();
}




 private getTotal(){
  var total = 0;
  for(var i = 0; i < this.data.product.length; i++){
      var product = this.data.product[i];
      total += product.TRAN_QUANTITY;
  }
  return total;
}



//as user
  users:Array<Object> = [
  { id: 27, description: "user 1"},
  { id: 28, description: "user 2"},
  { id: 29, description: "user 3"}
];


  //as product
  products:Array<Object> = [
    { id: 3, name: "Product 1" },
    { id: 4, name: "Product 2" },
    { id: 5, name: "Product 3" }
  ];

    crossData:Array<Object> = [
      { userId: 27, productId: 3, quantity: 1,value:100 },
      { userId: 27, productId: 4, quantity: 2,value:100  },
      { userId: 27, productId: 5, quantity: 1,value:100  },
      { userId: 27, productId: 6, quantity: 3,value:100  },
      { userId: 28, productId: 3, quantity: 1,value:100  },
      { userId: 28, productId: 4, quantity: 1,value:100  },
      { userId: 28, productId: 5, quantity: 4,value:100  },
      { userId: 28, productId: 6, quantity: 5,value:100  },
      { userId: 29, productId: 3, quantity: 6,value:100  },
      { userId: 29, productId: 4, quantity: 5,value:100  },
      { userId: 29, productId: 5, quantity: 6,value:100  },
      { userId: 29, productId: 6, quantity: 1,value:100  }
    ];


}




