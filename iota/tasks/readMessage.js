const IOTA = require('iota.lib.js');
const iota = new IOTA({
    host: 'https://nodes.thetangle.org',
    port: 443
})
var Converter = require('@iota/converter');

// TODO - modify functions to read data without tag 

// console.log(config.seedReceiver)
module.exports = ({ seed, tag}, { success, error }) => {
    
    iota.api.getAccountData(seed, (err, account) => {
        if (!err){

            let tagTrytes = iota.utils.toTrytes(tag.slice(0,-1));    
            let messages = [];
            
            account.transfers.map(transfer => {    
                // console.log(Converter.trytesToAscii(transfer[0].tag.slice(0,-1)));
                if (transfer[0].tag.startsWith(tagTrytes)) { 
                    let s1 = Converter.trytesToAscii(transfer[0].signatureMessageFragment.slice(0,-1));
                    messages.push({timestamp: transfer[0].timestamp, text: s1.toString()});
                }
            })
            // console.log(messages[);
            success({
                transactionMessages: messages
            });
        }
        else{
            error({
                messageError: 'transaction failed'
            })
        }

    });

}
