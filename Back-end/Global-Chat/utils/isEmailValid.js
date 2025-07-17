async function fetchDataOfEmail(email){
    let url = `https://api.emailvalidation.io/v1/info?apikey=${process.env.EMAIL_VALIDATOR_API_KEY}&email=${email}`;
    let data = await fetch(url);
    let result =  await data.json();
    return result;
}

module.exports.isEmailValid = async (email)=>{
    let result = await fetchDataOfEmail(email);
    let format_valid = result.format_valid;
    // let state = result.state;
    // let domain = result.domain;
    // console.log(format_valid);
    
    
    return format_valid;
}
