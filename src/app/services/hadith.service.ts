import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: "root",
})
export class HadithService {
  hadiths: any;
  searchData: any;
  activeHadithId = 1;
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    this.getHadiths();
  }

  getHadiths() {
    return this.http.get("assets/hadiths.json").subscribe((response) => {
      this.hadiths = response;
      this.searchData = response;
      this.setTrustedYouTubeUrl();
    });
  }

  search(searchValue) {
    return this.http
      .get("assets/hadiths.json")
      .pipe(
        map(
          (
            responseData: [
              {
                id: string;
                bosnianTitle: string;
                englishTitle: string;
                english_hadith: string;
                bosnian_hadith: string;
              }
            ]
          ) => {
            var tempArray = [];
            for (var i = 0; i < responseData.length; i++) {
              if (
                responseData[i].bosnianTitle
                  .toLocaleLowerCase()
                  .indexOf(searchValue.toLocaleLowerCase()) != -1 ||
                responseData[i].id.toString().indexOf(searchValue) != -1
              ) {
                tempArray.push(responseData[i]);
              }
            }
            return tempArray;
          }
        )
      )
      .subscribe((response) => (this.searchData = response));
  }

  nextHadith() {
    if (this.activeHadithId < 42) this.activeHadithId = this.activeHadithId + 1;
    else this.activeHadithId = 42;
  }

  previousHadith() {
    if (this.activeHadithId <= 1) this.activeHadithId = 42;
    else this.activeHadithId = this.activeHadithId - 1;
  }

  setTrustedYouTubeUrl() {
    for(var i = 0; i<this.hadiths.length; i++){
      for(var j = 0; j< this.hadiths[i].video.bosnian.length; j++){
        this.hadiths[i].video.bosnian[j].link = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+this.hadiths[i].video.bosnian[j].link);
      }
    }
  }
}
