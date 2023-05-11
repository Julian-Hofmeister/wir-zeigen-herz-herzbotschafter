import { Injectable } from '@angular/core';
import {Preferences} from "@capacitor/preferences";
import {Partner} from "./partner.interface";
import {Ambassador} from "./ambassador.interface";

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  latestPartner = []

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor()
  {
  }

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  async addPartner(partner: any) {
    // @ts-ignore
    if (this.latestPartner.includes(partner)) {
      // @ts-ignore
      const index = this.latestPartner.indexOf(partner);
      this.latestPartner.splice(index, 1);
    }

    // @ts-ignore
    this.latestPartner.unshift(partner)

    if (this.latestPartner.length > 3) {
      this.latestPartner.length = 3;
    }

    await Preferences.set({
      key: 'latest-partner',
      value: JSON.stringify(this.latestPartner),
    });
  }

  // ----------------------------------------------------------------------------------------------

  async loadPartner() {
    await Preferences.get({key: 'latest-partner'}).then(
      (partner) => {
        if (partner.value) {
          this.latestPartner = JSON.parse(partner.value)
        }
      }
    );

    console.log(this.latestPartner)
  }

  // ----------------------------------------------------------------------------------------------

  getLatestPartner(){
    return this.latestPartner
  }

  filterList(searchTerm: string, partner: Ambassador[]): Ambassador[] {
    return partner.filter((currentPartner) => {
      if (currentPartner.name && searchTerm) {
        return (
          currentPartner.name
            .toLowerCase()
            .indexOf(searchTerm.toLowerCase()) > -1
        );
      }
    });
  }

  // ----------------------------------------------------------------------------------------------

  filterCategories(filter: string, partners: Partner[]): Partner[] {
    const filteredPartner: Partner[] = [];

    partners.forEach((partner) => {
      if(partner.categoryId !== filter) {return;}

      filteredPartner.push(partner);

    });

    return filteredPartner;
  }

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}

