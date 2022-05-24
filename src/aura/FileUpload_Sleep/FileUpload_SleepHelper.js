({
    getFiles : function(cmp,file,sleepRecords) {
        var reader = new FileReader();

        reader.onload = function(){
            var record = {};
            var sleepSummary = JSON.parse(reader.result).sleepSummary;

            record.Date__c = moment(sleepSummary.sleepSummaryDay);
            record.Start_Date_Time__c = moment(sleepSummary.startTimeUtcSecs*1000); 
            record.End_Date_Time__c = moment(sleepSummary.endTimeUtcSecs*1000);
                        
            sleepRecords.push(record);  

            cmp.set('v.sleepRecords',sleepRecords);
            
        }
        reader.readAsText(file);
    }
})