const IOTA = require('iota.lib.js');
const iota = new IOTA({
    host: 'https://nodes.thetangle.org',
    port: 443
})
var config = require('./config.json');
var Converter = require('@iota/converter');

const tag = 'TEST';

iota.api.getAccountData(config.seedReceiver, (err, account) => {
    if (!err){

        let tagTrytes = iota.utils.toTrytes(tag);
        console.log("tagTrytes",tagTrytes);

        let messages = []
        account.transfers.map(transfer => {
            console.log(transfer[0]);

            if (transfer[0].tag.startsWith(tagTrytes)) { 
                console.log('tag starts with TEST')
                // console.log(transfer[0].signatureMessageFragment);
                // let s1 = iota.utils.fromTrytes(transfer[0].signatureMessageFragment.slice(0,-1));
                let s1 = Converter.trytesToAscii(transfer[0].signatureMessageFragment.slice(0,-1));
                // ();
                // console.log(s1);
                messages.push({timestamp: transfer[0].timestamp, text: s1});
            }

        })

        // console.log(messages[0].text);

    }

});


// iota.getAccountData(config.seedReceiver)
//     .then(info => {
//         console.log(info.transfers);
//     })
//     .catch(error => {
//         console.log(`Request error: ${error.message}`)
//     })





// var config = require('./config.json');
// const IOTA = require('iota.lib.js');
// const iota = new IOTA({
//     host: 'https://nodes.thetangle.org',
//     port: 443,
// })

// console.log(config.addressReceiver);
// iota.api.getAccountData(config.addressReceiver,  (err, res) => {
//     if (!err){
//         console.log(res);
//         console.log(res.transfers);

//         // success({
//         //     message: 'transaction sended',
//         //     transactionObject: transactions[0]
//         // });
//     }
//     else{
//         console.log(err)
//     }
//     // error({
//     //     messageError: 'transaction failed'
//     // })

// });

