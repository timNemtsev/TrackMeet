({
    getGuys : function(cmp) {
        var action = cmp.get('c.queryGuys');

        action.setCallback(this,function(response){
            if(response.getState() === 'SUCCESS'){
                var guys = response.getReturnValue();
                cmp.set('v.guys',guys);
                var test = '';
            }else{
                var test ='';
            }
        });

        $A.enqueueAction(action);
    },
    getTransactions : function(cmp){
        var action = cmp.get('c.queryTransactions');

        action.setCallback(this,function(response){
            if(response.getState() === 'SUCCESS'){
                var transactions = response.getReturnValue();
                cmp.set('v.transactions',transactions);
                cmp.set('v.selectedTransaction',transactions.pop());
                var test = '';
            }else{
                var test ='';
            }
        });

        $A.enqueueAction(action);
    },
})
