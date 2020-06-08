var config = require('../config.json');
const IOTA = require('iota.lib.js');
const iota = new IOTA({
    host: 'https://nodes.thetangle.org',
    port: 443,
})
const liteflow = new (require('@liteflow/service'))();


module.exports = ({addressSender, address, message, tag }, { success, error }) => {

    let transfers = [
        {
            // where are we sending the transaction to?
            'address': address,
            
            // how many tokens are we transferring?
            'value': 0,
            
            // do we want to comment on this transaction?
            'message': iota.utils.toTrytes(message),
            "tag": iota.utils.toTrytes(tag)
        }
    ];

    iota.api.sendTransfer(addressSender, config.Depth, config.MinWeightMagnitude, transfers, (err, transactions) => {
        if (!err) {
            // console.log('transactions sent!', transactions)
            success({
                message: 'transaction sended',
                transactionObject: transactions[0]
            });

            for (let i=0; i<transactions.length; i++){
                liteflow.emitEvent("transactionSended", {
                    hash : transactions[i].hash,
                    time : transactions[i].timestamp
                  }).catch((err) => {
                    console.error(err)
                  })    
            };

        } else {
            // console.log(transactions);
            error({
                messageError: 'transaction failed'
            })
        }
    })
}
