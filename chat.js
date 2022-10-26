// You can get url_string from window.location.href if you want to work with
// the URL of the current page
var url_string = window.location.href;
var url = new URL(url_string);
var c = url.searchParams.get("address");
console.log(c);

const main = Vue.createApp({
    data(){
        return{
            Address: c
        }
    }
})

main.mount("#content");