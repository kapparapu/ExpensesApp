import { LightningElement, wire } from 'lwc';

import getPaymentRecords from '@salesforce/apex/ExpensesController.getPaymentRecords';

const paymentCols = [
    {label: 'Pay', fieldName: 'Pay', type:'Button', hideDefaultActions: true},
    {label: 'Name', fieldName: 'Name', hideDefaultActions: true},
    {label: 'Due Date', fieldName: 'Due_Date__c', type: 'date', typeAttributes: { month: 'short', day: '2-digit' }, hideDefaultActions: true},
    {label: 'Amount', fieldName: 'Amount_Due__c', type: 'currency', typeAttributes: { currencyCode: 'INR' }, cellAttributes: {alignment: 'left'} ,hideDefaultActions: true},
    {label: 'Status', fieldName: 'Status__c', type: 'Text', hideDefaultActions: true}
];

export default class ExpensesStatus extends LightningElement {

    isPaymentDataLoaded;

    paymentRecords = [];
    paymentColumns = paymentCols;

    connectedCallback () {
        this.getPaymentRecords();
    }

    renderedCallback() {

    }

    getPaymentRecords(event) {
        getPaymentRecords()
        .then (result => {
            if (result) {
                this.isPaymentDataLoaded = true;
                this.preparePaymentRecords(result);
                this.preparePaymentColumns(this.paymentRecords, this.paymentColumns);
            }
        })
    }

    preparePaymentRecords(payments) {
        if (payments) {
            payments.forEach(eachPayment =>{
                let eachPay = {... eachPayment};
                eachPay.paymentLink = '/' + eachPay.Id;
                eachPay.buttonName  = 'Pay';
                if (eachPay.Status__c == 'Pending Soon') {
                    eachPay.Class = 'slds-theme_warning';
                }
                if (eachPay.Status__c == 'Due Today') {
                    eachPay.Class = 'slds-theme_warning slds-text-title_caps';
                }
                if (eachPay.Status__c == 'Paid') {
                    eachPay.Class = 'slds-theme_success';
                }
                if (eachPay.Status__c == 'Partially Paid') {
                    eachPay.Class = 'slds-theme_alt-inverse';
                }
                if (eachPay.Status__c == 'On Hold') {
                    eachPay.Class = 'slds-theme_info';
                }
                if (eachPay.Status__c == 'Postponed') {
                    eachPay.Class = 'slds-theme_offline';
                }
                if (eachPay.Status__c == 'Overdue') {
                    eachPay.Class = 'slds-theme_error';
                }
                if (eachPay.Status__c == 'Cancelled') {
                    eachPay.Class = 'slds-theme_alert-texture slds-text-color_destructive slds-text-font_monospace';
                }
                this.paymentRecords.push(eachPay);
            });
        }
    }

    preparePaymentColumns(records, cols) {
        if (records && records.length != 0 && cols && cols.length != 0) {
            let newAtts = {class: {fieldName: 'Class'}};
            cols.forEach(eachCol => {
                if (eachCol.fieldName == 'Status__c') {
                    eachCol.cellAttributes = newAtts;
                }
                if (eachCol.fieldName == 'Pay') {
                    eachCol.fieldName = 'buttonName'
                    eachCol.type = 'button';
                    eachCol.fixedWidth = 75;
                    eachCol.typeAttributes = { label : { fieldName : 'buttonName' }, variant : 'brand' };
                }
            });
        }
    }

    handleRowAction(event) {
        console.log('!@--- It is working ' + JSON.stringify(event.detail.row));
    }
}