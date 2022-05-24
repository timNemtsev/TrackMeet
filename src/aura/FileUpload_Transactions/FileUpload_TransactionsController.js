({
    uploadFiles : function(cmp, evt, helper) {

        var transactions = [];
        
        var files = cmp.find('fileUpload').get('v.files');
        
        for(var i=0;i<files.length;i++){
            var file = files[i];           
            helper.getFiles(cmp,file,transactions);
        }

    },
    createRecords : function(cmp,evt,helper){
                
        var action = cmp.get('c.createTransactions');
        var transactions = cmp.get('v.transactions')
        var fileName = cmp.get('v.fileName');
        
        action.setParams({
            'transactions' :  transactions,
            'acctName' : fileName
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