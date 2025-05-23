function calcular() {
    var valorHora = parseFloat(document.getElementById('valor-hora').value);
    if (valorHora === 0) {
      document.getElementById('resultado').innerText = 'Sistema encerrado.';
      return;
    }
    var qtdHora = parseFloat(document.getElementById('qtd-hora').value) || 0;
  
    var valeSim = document.getElementById('sim').checked;
  
    var outrasDeducoesInput = document.querySelectorAll('.arrarra input[type="number"]')[2];
    var outrasDeducoes = parseFloat(outrasDeducoesInput.value) || 0;
  
    var salarioBruto = valorHora * qtdHora;
  
    var descontoINSS = 0;
    if (salarioBruto <= 1320.00) {
      descontoINSS = salarioBruto * 0.075;
    } else if (salarioBruto <= 2571.29) {
      descontoINSS = salarioBruto * 0.09;
    } else if (salarioBruto <= 3856.94) {
      descontoINSS = salarioBruto * 0.12;
    } else if (salarioBruto <= 7507.49) {
      descontoINSS = salarioBruto * 0.14;
    } else {
      descontoINSS = 7507.49 * 0.14;
    }
  
    var descontoIRPF = 0;
    if (salarioBruto <= 2112.00) {
      descontoIRPF = 0;
    } else if (salarioBruto <= 2826.65) {
      descontoIRPF = salarioBruto * 0.075;
    } else if (salarioBruto <= 3751.06) {
      descontoIRPF = salarioBruto * 0.15;
    } else if (salarioBruto <= 4664.68) {
      descontoIRPF = salarioBruto * 0.225;
    } else {
      descontoIRPF = salarioBruto * 0.275;
    }
  
    var descontoValeTransporte = 0;
    if (valeSim) {
      descontoValeTransporte = salarioBruto * 0.06;
    }
  
    var salarioLiquido = salarioBruto - descontoINSS - descontoIRPF - descontoValeTransporte - outrasDeducoes;
  
    function formatar(valor) {
      return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
  
    var linhas = [
      { texto: 'Salário Bruto', valor: formatar(salarioBruto) },
      { texto: 'Desconto INSS', valor: '- ' + formatar(descontoINSS) },
      { texto: 'Desconto IRPF', valor: '- ' + formatar(descontoIRPF) },
      { texto: 'Desconto Vale Transporte', valor: '- ' + formatar(descontoValeTransporte) },
      { texto: 'Outras Deduções', valor: '- ' + formatar(outrasDeducoes) },
      { texto: 'Salário Líquido', valor: formatar(salarioLiquido) }
    ];
  
    var resultadoHTML = '';
  
    for (var i = 0; i < linhas.length; i++) {
      resultadoHTML +=
        '<div class="result-line">' +
          '<span>' + linhas[i].texto + '</span>' +
          '<span>' + linhas[i].valor + '</span>' +
        '</div>';
    }
  
    document.getElementById('resultado').innerHTML = resultadoHTML;
  }