async function fetchDataOfEmail(email){
    let url = `https://api.emailvalidation.io/v1/info?apikey=ema_live_ysRrsd12828cv75UbxB9ZrXVldUwXbnmIJAUlG3k&email=${email}`;
    let data = await fetch(url);
    let result =  await data.json();
    return result;
}

module.exports.isEmailValid = async (email)=>{
    let result = await fetchDataOfEmail(email);
    let format_valid = result.format_valid;
    let state = result.state;
    let domain = result.domain;
    if(format_valid && state!=="undeliverable" && domain!=="gmail.co"){
        return true;
    }
    return false;
}