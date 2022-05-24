({
    getFiles : function(cmp,file,transactions) {
        var reader = new FileReader();

        reader.onload = function(){
            var parseConfigs = {
                header:true
            }
            var transactions = Papa.parse(reader.result,parseConfigs);
            var records = [];
                     
            if(transactions.data){
                transactions.data.forEach(function(item){

                    var r = {
                        Description__c : item.Description,
                        Amount__c : item.Amount,
                        Category__c : item.Category,
                        Type__c : item.Type
                        
                    };

                    if(item['Transaction Date']){
                        r.Date__c = item['Transaction Date'];
                    }else if(item['Posting Date']){
                        r.Date__c = item['Posting Date'];
                    }

                    records.push(r);
                });
            }

            cmp.set('v.numberOfFiles',records.length);
            cmp.set('v.transactions',records);
            
        }

        cmp.set('v.fileName',file.name.split('_')[0]);
        reader.readAsText(file);
    }
})