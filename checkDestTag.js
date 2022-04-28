const xrpl = require('xrpl')
async function main() {
    const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233")
    await client.connect()
    let account_info = await client.request({
        "command": "account_info",
        "account": 'rn9r2Nn7AGn7GdyPfqWqkZxKZzHdqKUG1R',
        "ledger_index": "validated"
    })
    const flags = xrpl.parseAccountRootFlags(account_info.result.account_data.Flags)
    console.log(JSON.stringify(flags, null, 2))
    if (flags.lsfRequireDestTag) {
        console.log("Require Destination Tag is enabled.")
    } else {
        console.log("Require Destination Tag is DISABLED.")
    }
    client.disconnect()
}
main()