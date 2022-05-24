({
    uploadFiles : function(cmp, evt, helper) {

        var sleepRecords = [];
        
        var files = cmp.find('fileUpload').get('v.files');
        cmp.set('v.numberOfFiles',files.length);
        var counter=0;
        
        for(var i=0;i<files.length;i++){
            var file = files[i];           
            helper.getFiles(cmp,file,sleepRecords);
        }

    },
    readyCheck : function(cmp,evt,helper){
        var number = cmp.get('v.numberUploaded');
        var placeholder='';
    },
    createRecords : function(cmp,evt,helper){
                
        var action = cmp.get('c.createSleepRecord');
        var sleepRecords = cmp.get('v.sleepRecords')
        
        action.setParams({
            'sleepRecords' :  sleepRecords
        });

        action.setCallback(this,function(response){
            if(response.getState() === "SUCCESS"){
                var placeholder='';
            }else{
                var responseMessage = "Internal Server Error";
                
                if(response.getError() && response.getError().length && response.getError()[0]){
                    responseMessage = response.getError()[0].message;
                }
                cmp.find('notifLib').showToast({
                    "variant": "error",
                    "title":"Error processing order",
                    "message": responseMessage
                });
            }
        });
        $A.enqueueAction(action);
    }
})