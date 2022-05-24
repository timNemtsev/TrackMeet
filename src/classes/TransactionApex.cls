public with sharing class TransactionApex {

    @AuraEnabled
    public static List<Guy__c> queryGuys(){
        return [SELECT Id,Name FROM Guy__c];    
    }

    @AuraEnabled
    public static List<Transaction__c> queryTransactions(){
        List<Transaction__c> transactions = new List<Transaction__c>();
        transactions = [SELECT Id,Name,Amount__c,Description__c,Date__c FROM Transaction__c WHERE Guy__c = null];
        return transactions;
    }

    @AuraEnabled
    public static void updateTransaction(String guyId,String transactionId){
        
        Transaction__c t = new Transaction__c();
        t.Id = transactionId;
        t.Guy__c = guyId;

        update t;
    }
}
