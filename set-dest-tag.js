const xrpl = require('xrpl')
async function main() {
    const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233")
    await client.connect()
    const wallet = await xrpl.Wallet.fromSeed('spvu1gbcn5tbmPszsFvH28mvNeMVQ');
    const prepared = await client.autofill({
        "TransactionType": "AccountSet",
        "Account": wallet.address,
        "SetFlag": xrpl.AccountSetAsfFlags.asfRequireDest
    })
    console.log("Prepared transaction:", prepared)
    const signed = wallet.sign(prepared)
    console.log("Transaction hash:", signed.hash)
    const submit_result = await client.submitAndWait(signed.tx_blob)
    console.log("Submit result:", submit_result)
    client.disconnect()
}
main()