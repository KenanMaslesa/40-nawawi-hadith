import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HadithService {
  hadiths: any;
  activeHadithId = 1;
  constructor(private http: HttpClient) { 
    this.getHadiths();
  }

  getHadiths(){
    return this.http.get('assets/hadiths.json').subscribe(response => this.hadiths = response);
  }

  search(searchValue){
    return this.http.get('assets/hadiths.json').pipe(
      map((responseData:[{
        id: string;
        bosnianTitle: string;
        englishTitle: string;
        english_hadith: string;
        bosnian_hadith: string;
      }]) => {
        var tempArray = [];
        for(var i = 0; i<responseData.length; i++){
          if(responseData[i].bosnianTitle.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase())!=-1 || responseData[i].id.toString().indexOf(searchValue)!=-1 )
          {
            tempArray.push(responseData[i]);
          }
        }
        return tempArray;
        
      })).subscribe(response => this.hadiths = response);
  }
}
