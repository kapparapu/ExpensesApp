public class ExpensesController {
    @AuraEnabled (cacheable=true)
    public static List<Payment__c> getPaymentRecords(String entity) {
        List<Payment__c> paymentRecList = [SELECT Id, Name, Amount_Due__c, Due_Date__c, Frequency__c, Status__c FROM Payment__c ORDER BY Due_Date__c];
        return paymentRecList;
    }
}