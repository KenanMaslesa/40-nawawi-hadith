import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HadithService } from 'src/app/services/hadith.service';
import { LanguageService } from 'src/app/services/language.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router, public languageService: LanguageService, public hadithService: HadithService) { }

  ngOnInit() {
   };

   search(searchValue){
    this.hadithService.search(searchValue);
   }
  }
