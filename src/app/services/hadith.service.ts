import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class HadithService {
  hadiths: any;
  searchData: any;
  activeHadithId = 1;
  constructor(private http: HttpClient) {
    this.getHadiths();
  }

  getHadiths() {
    return this.http.get(`${environment.herokuAPI}/hadith`).subscribe((response) => {
      this.hadiths = response;
      this.searchData = response;
    });
  }

  search(searchValue) {
    return this.http
      .get(`${environment.herokuAPI}/search/${searchValue}`)
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
}
