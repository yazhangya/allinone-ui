import { Component, OnInit } from '@angular/core';
import { DataBaseService } from './database.service';

@Component({
  selector: 'home-componnet',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private model: any = {
    dataBase: '',
    table: ''
  };
  private dataBases: any ;
  private tables: any ;
  private fields: any ;
  private loading: boolean = true;

  private show: boolean = false;
  private filter: boolean = false;
  private add: boolean = false;

  private table: any = {};

  constructor( private dataBaseService: DataBaseService ){

  }

  public ngOnInit(): void {
    this.getDataBases();
  }

  async getDataBases(){
    this.dataBaseService.getDataBases().subscribe( result => {
        this.dataBases = result;
      }
    );
  }

  getTables(){
    if(this.model.dataBase){
      this.dataBaseService.getTables(this.model.dataBase).subscribe( result => {
          this.tables = result;
        }
      );
    }
  }

  getFields(){
    if(this.model.dataBase && this.model.table){
      this.dataBaseService.getFileds(this.model.dataBase,this.model.table).subscribe( result => {
        this.loading = false;
        this.fields = result.columns;
        }
      );
    }
  }

  allShow(){
    if(this.show){
      this.fields.forEach(field => field.show = true );
    }else {
      this.fields.forEach(field => field.show = false);
    }
  }

  allAdd(){
    if(this.add){
      this.fields.forEach(field => field.add = true);
    }else {
      this.fields.forEach(field => field.add = false);
    }
  }

  allFilter(){
    if(this.filter){
      this.fields.forEach(field => field.filter = true);
    }else {
      this.fields.forEach(field => field.filter = false);
    }
  }

  createPage(){
    if(this.model.dataBase && this.model.table){
      this.table.fieldItems = this.fields;
      this.table.tableName = this.model.table;
      this.table.schema = this.model.dataBase;
      this.table.projectName = this.model.projectName;
      this.table.domain = this.model.domain;
      this.dataBaseService.createPage(this.model.dataBase,this.model.table,this.table).subscribe( blob => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'autoCode.zip';
        document.body.appendChild(a);
        a.click();
        }
      );
    }
  }


}
