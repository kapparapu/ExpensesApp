public class ExpensesController {
    @AuraEnabled (cacheable=true)
    public static List<Payment__c> getPaymentRecords() {

        String unPaid = 'Status__c != \'' + ExpensesConstants.PAYMENT_STATUS_PAID + '\' ';

        String selectString = 'SELECT Id, Name, Amount_Due__c, Due_Date__c, Frequency__c, Status__c ';
        String fromString = 'FROM Payment__c ';
        // String whereString = 'WHERE ' + unPaid;
        String orderByString = 'ORDER BY Due_Date__c';

        // return Database.query(selectString + fromString + whereString + orderByString);
        return Database.query(selectString + fromString + orderByString);
    }

    @AuraEnabled
    public static void updatePaymentStatus(){
        try {
            List<String> nonPendingStatus = new List<String>();
            nonPendingStatus.add(ExpensesConstants.PAYMENT_STATUS_PAID);
            nonPendingStatus.add(ExpensesConstants.PAYMENT_STATUS_PARTIALLY_PAID);
            nonPendingStatus.add(ExpensesConstants.PAYMENT_STATUS_POSTPONED);
            nonPendingStatus.add(ExpensesConstants.PAYMENT_STATUS_CANCELLED);
            nonPendingStatus.add(ExpensesConstants.PAYMENT_STATUS_ON_HOLD);

            List<Payment__c> pendingPayments = [SELECT Id, Status__c, Due_Date__c FROM Payment__c WHERE Status__c NOT IN :nonPendingStatus];

            Date today = System.today();
            Date soon = today + 3;

            for (Payment__c eachPayment : pendingPayments) {
                if (eachPayment.Due_Date__c <= soon && eachPayment.Due_Date__c > today) {
                    eachPayment.Status__c = ExpensesConstants.PAYMENT_STATUS_PENDING_SOON;
                }
                else if (eachPayment.Due_Date__c == today) {
                    eachPayment.Status__c = ExpensesConstants.PAYMENT_STATUS_DUE_TODAY;
                }
                else if (eachPayment.Due_Date__c < today) {
                    eachPayment.Status__c = ExpensesConstants.PAYMENT_STATUS_OVERDUE;
                }
            }

            update pendingPayments;

        } catch (Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }
}