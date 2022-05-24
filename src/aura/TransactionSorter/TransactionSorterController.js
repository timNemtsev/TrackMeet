({
    doInit : function(cmp, evt, helper) {
        
        helper.getGuys(cmp);
        helper.getTransactions(cmp);

    },
    setGuy : function(cmp,evt,helper){
        var guyId = evt.getSource().get('v.value');
        var selectedTransaction = cmp.get('v.selectedTransaction');

        if(guyId === 'skip'){
            var transactions = cmp.get('v.transactions');
            cmp.set('v.selectedTransaction',transactions.pop());
            cmp.set('v.transaction',transactions);  
            return;
        }

        var action = cmp.get('c.updateTransaction');

        action.setParams({
            'guyId': guyId,
            'transactionId':selectedTransaction.Id
        });

        action.setCallback(this,function(response){
            if(response.getState() === 'SUCCESS'){
                var transactions = cmp.get('v.transactions');
                cmp.set('v.selectedTransaction',transactions.pop());
                cmp.set('v.showSpinner',false);
            }else{
                var test ='';
                cmp.set('v.showSpinner',false);
            }
        });

        cmp.set('v.showSpinner',true);
        $A.enqueueAction(action);
    }
})
