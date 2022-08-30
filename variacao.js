
let dados = [];
let btn = document.querySelector(".send")
let campo2 = document.querySelector(".valor2")
let campo1 = document.querySelector(".valor1")


//codigo para salvar com enter
campo2.addEventListener('keypress', function (e) {
    if (e.key == 'Enter') {
        btn.click()
        campo1.focus(limpaCampo())
    }
})

function limpaCampo() {
    document.querySelector(".valor1").value = ""
    document.querySelector(".valor2").value = ""
}
// Codigo de funcionamento principal
btn.addEventListener("click", (e) => {
    e.preventDefault();
    getCampo1();
    getCampo2();
    attValores()
    attGrafico()
    adicionaCampoResultado()
    personalizaResult()
    campo1.focus()
})

function adicionaCampoResultado() {
    let result = (diferenca(getCampo1(), getCampo2()).toFixed(2));
    let textResult = document.querySelector(".result")
    if (result < 0) {
        textResult.classList.remove("aumentou")
        textResult.classList.add("diminuiu")
        textResult.innerHTML = "Redução de " + result + "%"
    } else if (isNaN(result)) {
        textResult.innerHTML = "Preencha os campos acima"
    } else {
        textResult.classList.remove("diminuiu")
        textResult.classList.add("aumentou")
        textResult.innerHTML = "Aumento de " + result + "%"
        console.log(result);
    }
}

function personalizaResult() {
    let result = (diferenca(getCampo1(), getCampo2()).toFixed(2))
    if (result > 0) {
        document.querySelector(".result").setAttribute("style", "color:red")
    } else {
        document.querySelector(".result").setAttribute("style", "color:black")
    }
}

function attValores() {
    dados[0] = getCampo1()
    dados[1] = getCampo2()
}

function getCampo1() {
    return document.querySelector(".valor1").value

}

function getCampo2() {
    return document.querySelector(".valor2").value

}

function diferenca(valor1, valor2) {
    if (valor1 < valor2) {
        return ((valor2 - valor1) / valor1) * 100
    } else {
        return ((valor2 - valor1) / valor1) * 100
    }
}

//-----ChartJS-----------//////////

Chart.register(ChartDataLabels);

const labels = [
    'Mes Anterior',
    'Mes Atual',
];

const data = {
    labels: labels,
    datasets: [{
        label: ['Mês Anterior'],
        backgroundColor: ['orange', 'blue'],
        borderColor: 'rgb(255, 99, 132)',
        data: dados,
    }, {
        label: ['Mês Atual'],
        backgroundColor: ['blue']
    }]
};

const config = {
    type: 'bar',
    data: data,
    options: {
        plugins: {
            datalabels: {
                anchor: 'center',
                align: 'center',
                color: 'white',
                formatter: Math.round,
                font: {
                    weight: 'bold',
                    size: 16
                }
            }
        }
    }
};

const myChart = new Chart(
    document.getElementById('myChart'),
    config
);

const attGrafico = () => {
    myChart.data.datasets[0].data = dados
    myChart.update()
}

