import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '@services/common/crud.service';
import { Client } from '@models/stock/Client.model';
import { PartialList } from '@models/common/patial-list.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService extends CrudService<Client> {

  constructor(private __http: HttpClient ) {
    super(__http);
    this.setUrl('supplier');
  }

  public save(model: any, update?: boolean): any {
    this.options.params = undefined;
    if (update) {
      return this.__http.put<Client>(this.url + '/' + model.id, model, this.options);
    } else {
      return this.__http.post<Client>(this.url, model, this.options);
    }
  }


  public findDetailsById(id: number): any {
    this.options.params = undefined;

    return this.__http.get <PartialList<Client>>(this.url + '/' + id +'/'+'details', this.options);
  }


}
