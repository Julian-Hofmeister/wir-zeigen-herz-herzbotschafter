import {Component, ViewChild} from '@angular/core';
import {IonModal} from "@ionic/angular";
import {Partner} from "./partner.interface";
import {Category} from "./categories";
import {Country} from "./countries";
import {TranslateService} from "@ngx-translate/core";
import {PartnerService} from "./partner.service";

import categories from '../../assets/json/categories.json';
import partnerData from '../../assets/json/partner.json';
import countries from '../../assets/json/countries.json';
import {Preferences} from "@capacitor/preferences";


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
  filteredPartner: Partner[] = [];
  filter: Category | undefined = undefined;

  partner: Partner[] = [];
  loadedPartner: Partner[] = [];
  categories: Category[];
  countries: Country[];

  language: string = this.translateService.currentLang;
  country: Country;
  countryName: string;

  isModalOpen = false;


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
    this.categories = categories;
    this.countries = countries;
    this.loadedPartner = partnerData;
  }

  // ----------------------------------------------------------------------------------------------

  ionViewWillEnter() {
    this.language = this.translateService.currentLang;

    this.getCountry().then(r =>
      this.fillPartner()
    )
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

    this.filteredPartner = this.partnerService.filterList(this.searchTerm, this.partner);

    this.onClearCategoryFilter();
  }

  // ----------------------------------------------------------------------------------------------

  filterCategories(evt: any) {
    this.filter = evt.detail.value;

    this.filteredPartner = this.partnerService.filterCategories(this.filter!.id, this.partner);

    this.searchTerm = '';
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

  async selectCountry(evt: any) {
    this.country = evt.detail.value;

    await Preferences.set({
      key: 'country',
      value: JSON.stringify(this.country),
    });

    this.fillPartner();

    this.closeCountryModal();
  }

  // ----------------------------------------------------------------------------------------------

  openCountryModal() {
    this.isModalOpen = true;
  }

  // ----------------------------------------------------------------------------------------------

  closeCountryModal() {
    this.isModalOpen = false;
  }

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  private async getCountry() {
    await Preferences.get({key: 'country'}).then(
      (country) => {
        if (country.value) {
          this.country = JSON.parse(country.value)
        }
      }
    );
  }

  // ----------------------------------------------------------------------------------------------

  fillPartner() {
    this.partner = [];

    for(let partner of this.loadedPartner) {
        this.partner.push(partner);

    }
  }
  //#endregion
}
