import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class DataBaseService {

  private baseUrl: string = 'http://localhost:8090/struct/';

  constructor(private http: Http) {
  }

  //获取 数据库 列表
  getDataBases(): Observable<any> {
    return this.http.get(this.baseUrl, new RequestOptions({
      withCredentials: true
    }))
    .map(resp => resp.json())
    .catch((error: any) => this.handleError(error));
  }

  //获取 表 列表
  getTables(dataBasename:string): Observable<any> {
    return this.http.get(this.baseUrl+dataBasename, new RequestOptions({
      withCredentials: true
    }))
      .map(resp => resp.json())
      .catch((error: any) => this.handleError(error));
  }


  //获取 字段 列表
  getFileds(dataBasename:string,tableName:string): Observable<any> {
    return this.http.get(this.baseUrl+dataBasename+'/'+tableName, new RequestOptions({
      withCredentials: true
    }))
      .map(resp => resp.json())
      .catch((error: any) => this.handleError(error));
  }


  //生成页面
  createPage(dataBasename:string,tableName:string,fields:any): Observable<any> {
    let options = new RequestOptions({
      withCredentials: true,
      // headers: headers
    });
    return this.http.post(this.baseUrl+dataBasename+'/'+tableName, fields,
      {
        withCredentials: true,
        responseType : ResponseContentType.Blob
      })
      .map(res => {
        console.log(res.arrayBuffer());
        return new Blob([res.blob()],{ type: 'application/force-download'});
      })
      .catch((error: any) => this.handleError(error));
  }



  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }


}
