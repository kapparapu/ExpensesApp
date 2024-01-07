import { LightningElement, wire } from 'lwc';

export default class ExpensesStatus extends LightningElement {

    currentCC;

    hdfc = 'HDFC';
    icici = 'ICICI';
    kotak = 'kotak';
    
    hdfcCardClass   = 'slds-card ccHdfc';
    iciciCardClass    = 'slds-card ccIcici';
    kotakCardClass  = 'slds-card ccKotak';

    connectedCallback () {
        this.getCurrentCC();
    }

    renderedCallback() {
        console.log('!@--- Rendered Callback is called');
        let colourCard  = this.template.querySelector('.cc-wrapper');
        console.log('!@--- colour class wrapper; ', colourCard);

        if (this.currentCC != null && colourCard != null) {
            if (this.currentCC == this.hdfc) {
                colourCard.className = this.hdfcCardClass;
            }
            else if (this.currentCC == this.icici) {
                colourCard.className = this.iciciCardClass;
            }
            else if (this.currentCC == this.kotak) {
                console.log('!@--- Kotak');
                colourCard.className = this.kotakCardClass;
            }
        }
    }

    getCurrentCC() {
        let rightNow    = new Date().toISOString().slice(8,10);
        let date            = Number(rightNow);
        console.log('!@--- We are in getter Method');
        if (date > 6 && date < 20) {
            this.currentCC = this.hdfc;
        }
        else if (date > 19 && date < 26) {
            this.currentCC = this.icici;
        }
        else {
            console.log('!@--- kotak is: ', this.kotak);
            this.currentCC = this.kotak;
        }
    }
}