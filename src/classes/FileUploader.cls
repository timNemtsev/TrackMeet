public with sharing class FileUploader {

    @AuraEnabled
    public static void createSleepRecord(List<Sleep__c> sleepRecords){

        List<Sleep__c> sleepInsert = new List<Sleep__c>();
        Set<String> uniqueNames = new Set<String>();

        for(Sleep__c sleep : [SELECT Id,Name,Start_Date_Time__c,End_Date_Time__c FROM Sleep__c]){
            String existing_start = sleep.Start_Date_Time__c.format();
            String existing_end = sleep.End_Date_Time__c.format();

            String u = existing_start + ' - '+existing_end;
            uniqueNames.add(u);
            
        }

        for(Sleep__c new_sleep : sleepRecords){
            String new_start = new_sleep.Start_Date_Time__c.format();
            String new_end = new_sleep.End_Date_Time__c.format();

            String u = new_start + ' - '+new_end;
            
            if(!uniqueNames.contains(u)){
                sleepInsert.add(new_sleep);
            }
        }

        insert sleepInsert;
    }
    
    @AuraEnabled
    public static void createTransactions(List<Transaction__c> transactions,String acctName){
        
        Card_Account__c cardAcct = [SELECT Id FROM Card_Account__c WHERE Name=:acctName LIMIT 1];
        List<Transaction__c> transactionInsert = new List<Transaction__c>();
        Set<String> uniqueNames = new Set<String>();

        for(transaction__c t : [SELECT Id,Name,Date__c,Amount__c,Description__c FROM transaction__c]){

            String u = t.Date__c+'-'+t.Amount__c+'-'+t.Description__c;
            uniqueNames.add(u);
            
        }

        for(transaction__c new_transaction : transactions){

            String u = new_transaction.Date__c+'-'+new_transaction.Amount__c+'-'+new_transaction.Description__c;
            
            if(!uniqueNames.contains(u)){
                new_transaction.Card_Account__c = cardAcct.Id;
                transactionInsert.add(new_transaction);
            }
        }

        insert transactionInsert;
    }

}