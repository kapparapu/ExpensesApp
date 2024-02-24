import { LightningElement } from 'lwc';
import FORM_FACTOR from '@salesforce/client/formFactor';

export default class ExpensesMain extends LightningElement {
    connectedCallback() {
        if (FORM_FACTOR !== 'Small') {
            this.template.querySelector('.formFactor')?.classList.add('slds-size_1-of-2');
            //this.template.querySelector(`.exclusivity-error[data-recid="${recid}"]`)?.classList.remove('hide-error');
            
            // alert('!@--- it is NOT mobile');
        }
        else {
            // alert('!@--- it is Mobile');
        }
    }
}