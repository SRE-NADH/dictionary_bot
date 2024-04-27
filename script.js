let sentButton = document.getElementById('sent-button');
let messageContainer = document.getElementsByClassName('message-container')[0];
let input = document.getElementById('input');
let val = ""; // keep track of input value


input.addEventListener('change',(e)=>{
   val=e.target.value.trim();
})

const url = 'https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6336c42bf3msh6f53bf585782411p1068f1jsna274f3500452',
		'X-RapidAPI-Host': 'dictionary-by-api-ninjas.p.rapidapi.com'
	}
};

sentButton.addEventListener('click',()=>{
if(val){
    addMessageToUi(val,'sent');
    input.value = "";
    
    setTimeout(()=>{
        async function fetchData(){
            try {
                addMessageToUi('wait for response...','recieve');
                const response = await fetch(`${url}?word=${val}`, options);
                const result = await response.json();
                if(!result.definition){
                    changeExistingMessage('try another word..');
                    return;
                }
                changeExistingMessage(result.definition);
                val="";
            } catch (error) {
                console.error(error);
                changeExistingMessage('try to sent again')
            }
        }
        fetchData();
       
    },500)
}

})

// function for creating and add element to ui
function addMessageToUi(value,type){
    let message = document.createElement('div');
    message.className = `${type}`;
    message.innerHTML = `<p class="message ">${value}</p>`;
    messageContainer.appendChild(message);
    message.scrollIntoView({ behavior: 'smooth', block: 'end' });
}


function changeExistingMessage(value){
    let message =messageContainer.lastChild;
    message.innerHTML = `<p class="message ">${value}</p>`;
    message.scrollIntoView({ behavior: 'smooth', block: 'end' });
}






// <div class="sent">
// <p class="message ">message</p>
// </div>