//ejecutar archivo 

const axios = require('axios')

async function tax(){
    try {
        let {data} = await axios.get('https://api.seatgeek.com/2/taxonomies?client_id=MzU1OTk1NjN8MTY5MTc1ODMxOC42Nzc4ODI3')
        data = data?.taxonomies.map(tax => tax.name)
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}
tax()
