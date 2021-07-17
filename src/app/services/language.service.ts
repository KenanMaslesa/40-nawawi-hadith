import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  languages = ["bosanski", "english"];
  currentLanguage = "bosanski";

  constructor() { }

  get isBosnian():boolean{
    return this.currentLanguage == "bosanski";
  }

  get isEnglish():boolean{
    return this.currentLanguage == "english";
  }

}
