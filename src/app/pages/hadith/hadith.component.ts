import { Component, OnInit } from '@angular/core';
import { HadithService } from 'src/app/services/hadith.service';
import { LanguageService } from 'src/app/services/language.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hadith',
  templateUrl: './hadith.component.html',
  styleUrls: ['./hadith.component.scss']
})
export class HadithComponent implements OnInit {
  currentTime: any;
  startSecond: any;
  endSecond: any;
  english = true;
  bosnian = true;
  activeHadith: any;
  trustedUrl: any;
  audioHost = 'https://nawawihadiths.herokuapp.com';

  constructor(public hadithService: HadithService, public languageService: LanguageService) { }

  ngOnInit() {

  }

  setAudio(audio, startSecond, endSecond){
    this.startSecond = startSecond;
    this.endSecond = endSecond;
    audio.currentTime = startSecond;
    audio.play();
  }

  updateCurrentTime(audio){
    this.currentTime = audio.currentTime;
    if(this.currentTime >= this.endSecond)
    this.setAudio(audio, this.startSecond, this.endSecond);
  }

  stopAudio(audio){
    audio.pause();
    audio.currentTime = 0;
  }

  setActiveHadith(hadith){
    this.activeHadith = hadith;
  }

}
