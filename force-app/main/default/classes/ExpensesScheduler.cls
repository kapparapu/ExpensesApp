public with sharing class ExpensesScheduler implements Schedulable{
    public static void execute (SchedulableContext context) {
        ExpensesController.updatePaymentStatus();
    }
}