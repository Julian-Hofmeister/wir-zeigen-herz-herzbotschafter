import {Component, ViewChild} from '@angular/core';
import {IonModal} from "@ionic/angular";
import {Partner} from "./partner.interface";
import {Category} from "./categories";
import {Country} from "./countries";
import {TranslateService} from "@ngx-translate/core";
import {PartnerService} from "./partner.service";

import ambassadorData from '../../assets/json/ambassadors.json';
import {Ambassador} from "./ambassador.interface";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
//#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  @ViewChild('selectCategory') categoryFilter: HTMLIonSelectElement;

  @ViewChild(IonModal) modal: IonModal;

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  searchTerm = '';
  filteredAmbassadors: Ambassador[] = [];
  filter: Category | undefined = undefined;

  ambassador: Ambassador[] = [];
  ambassadors: Ambassador[] = [];

  language: string = this.translateService.currentLang;


  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private translateService: TranslateService,
    public partnerService: PartnerService) {
  }

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.ambassadors = ambassadorData;
  }

  // ----------------------------------------------------------------------------------------------

  ionViewWillEnter() {
    this.language = this.translateService.currentLang;
  }

  // ----------------------------------------------------------------------------------------------


  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  filterList(evt: any) {
    this.searchTerm = evt.srcElement.value;

    if (!this.searchTerm) {return;}

    this.filteredAmbassadors = this.partnerService.filterList(this.searchTerm, this.ambassadors);

    this.onClearCategoryFilter();
  }

  // ----------------------------------------------------------------------------------------------

  onClearCategoryFilter(){
    this.filter = undefined;
    this.categoryFilter.value = null;
  }

  // ----------------------------------------------------------------------------------------------

  switchLanguage() {
    const lang = this.translateService.currentLang === "en" ? "de" : "en";
    this.translateService.use(lang);

    this.language = this.translateService.currentLang;
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  fillPartner() {
    this.ambassador = [];

    for(let partner of this.ambassadors) {
        this.ambassador.push(partner);

    }
  }
  //#endregion
}
