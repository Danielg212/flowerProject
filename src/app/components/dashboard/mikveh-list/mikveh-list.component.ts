import {Component, OnInit} from '@angular/core';
import mikvehListData from '../../../../assets/static/mikveList.json';
import {MikvehModel} from '../../../services/Mikveh.model';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-mikveh-list',
  templateUrl: './mikveh-list.component.html',
  styleUrls: ['./mikveh-list.component.scss']
})
export class MikvehListComponent implements OnInit {
  model: MikvehModel | string;

  public mikvheList: Array<MikvehModel> = new Array<MikvehModel>();

  keywordInputChange$ = new Subject<any>();

  constructor() {
    this.mikvheList = mikvehListData.results;
  }

  ngOnInit(): void {
  }

  get modelObjData(){
    if (typeof this.model === 'string' || this.model === undefined) { return ; }
    return Object.keys(this.model);
  }


  // keyword$ = this.keywordInputChange$.switchMap();

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.mikvheList.filter(v => v.Religious_Council.includes(term) ||
          (v.City !== undefined && v.City.includes(term)) ||
          (v.neighborhood !== undefined && v.neighborhood.includes(term)))
          .slice(0, 10)))

  formatter = (x: { City: string, neighborhood: string | undefined, Mikve_Address: string }) => {
    return `${x.City} ${x.neighborhood ? ' - ' + x.neighborhood : ''}  ${x.Mikve_Address ? '- ' + x.Mikve_Address : ''}`;
  }


}
