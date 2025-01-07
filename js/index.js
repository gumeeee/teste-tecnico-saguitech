function getInputValue(id) {
  const value = parseFloat(document.getElementById(id).value);
  if (isNaN(value) || value < 0) {
    alert(`Valor inválido para ${id}.`);
    throw new Error(`Valor inválido para ${id}.`);
  }
  return value;
}

function calcularImposto(valor, porcentagem) {
  return valor * (porcentagem / 100);
}

function gerarNotaFiscal() {
  try {
    const valorVenda = getInputValue("valorVenda");
    const itens = document.getElementById("itens").value.trim();
    if (!itens) {
      throw new Error("Itens não podem estar vazios.");
    }

    const impostos = ["irpf", "pis", "cofins", "inss", "issqn"].reduce(
      (acc, imposto) => {
        acc[imposto] = getInputValue(imposto);
        return acc;
      },
      {}
    );

    const calculoImpostos = Object.keys(impostos).reduce((acc, imposto) => {
      acc[imposto] = calcularImposto(valorVenda, impostos[imposto]);
      return acc;
    }, {});

    const totalImpostos = Object.values(calculoImpostos).reduce(
      (sum, tax) => sum + tax,
      0
    );
    const valorLiquido = valorVenda - totalImpostos;

    const notaFiscalHTML = `
        <h2>Nota Fiscal de Serviço</h2>
        <p><strong>Itens:</strong> ${itens}</p>
        <p><strong>Valor da Venda:</strong> R$ ${valorVenda.toFixed(2)}</p>
        <p><strong>Impostos:</strong></p>
        <ul>
            ${Object.keys(calculoImpostos)
              .map(
                (imposto) =>
                  `<li>${imposto.toUpperCase()}: R$ ${calculoImpostos[
                    imposto
                  ].toFixed(2)}</li>`
              )
              .join("")}
        </ul>
        <p><strong>Total de Impostos:</strong> R$ ${totalImpostos.toFixed(
          2
        )}</p>
        <p><strong>Valor Líquido:</strong> R$ ${valorLiquido.toFixed(2)}</p>
        `;

    document.getElementById("notaFiscalResult").innerHTML = notaFiscalHTML;
  } catch (error) {
    alert(error.message);
  }
}
