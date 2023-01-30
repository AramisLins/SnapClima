
// interação com o usuario
const pesqCidade = document.getElementById('pesq-cidade')
const botaoCidade = document.getElementById('botao-cidade')
// exibição
const dataAtual = document.getElementById('dataAtual')
const nomeCidade = document.getElementById('nomecidade')
const mudarIcon = document.getElementById('mudar-ico')
const mudarDescricao = document.getElementById('mudar-descri')
const mudarTemperatura = document.getElementById('mudar-temp')
const mudarVento = document.getElementById('mudar-vento')
const mudarSensacao = document.getElementById('mudar-sensacao')
const mudarUmidade = document.getElementById('mudar-umidade')
const mudarNascer = document.getElementById('mudar-nascer')
const mudarPor = document.getElementById('mudar-por')
const apikey = "126291de313b785c562fe967d1595a65";

botaoCidade.addEventListener("click",() =>{
    let nomeCidade = pesqCidade.value
    pegarCidade(nomeCidade)

})

navigator.geolocation.getCurrentPosition(
    (position) =>{
        let lat = position.coords.latitude
        let lon = position.coords.longitude
        buscarTempLoc(lat,lon)
    },
    (err) => {
        if(err.code === 1){alert('Localização negada pelo usuario')} 
        else{
            console.log(err)
        }
        
    }

)
function buscarTempLoc(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${apikey}`)
    .then((response) => response.json())
    .then((data) => exibirClima(data))

}

function pegarCidade(nomeCidade){
    
    mudarIcon.src = `/assets/assets/assets/loading-icon.svg`


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${nomeCidade}&units=metric&lang=pt_br&appid=${apikey}`)
    .then((response) => response.json())
    .then((data) => exibirClima(data))
}
function exibirClima(data){
    let {dt,
        name,
        weather: [{icon, description}],
        main: {temp, feels_like, humidity},
        wind: { speed },
        sys: {sunrise, sunset},
        
    } = data

    
    dataAtual.textContent = formartarData(dt);
    nomeCidade.textContent = name;
    mudarIcon.src = `/assets/assets/assets/${icon}.svg`
    mudarDescricao.textContent = description;
    mudarTemperatura.textContent =`${Math.round(temp)} ºC`;
    mudarVento.textContent =`${Math.round(speed * 3.6)} Km`;
    mudarSensacao.textContent =`${Math.round(feels_like)}ºC`;
    mudarUmidade.textContent =`${humidity}%`;
    mudarNascer.textContent =formatarTempo(sunrise);
    mudarPor.textContent =formatarTempo(sunset);
}

function formartarData(epochTime){
    let data = new Date(epochTime * 1000)
    let dataFormatada = data.toLocaleDateString('pt-BR', {month: "long", day: 'numeric'})
    return `Hoje, ${dataFormatada}`
}

function formatarTempo(epochTime){
    let data = new Date(epochTime * 1000)
    let hora = data.getHours()
    let minuto = data.getMinutes()
    return `${hora}:${minuto}`
}



