// Função para validar CPF
function validaCPF(cpf) {
    // Remove caracteres não numéricos do CPF
    cpf = cpf.replace(/\D+/g, '');
    
    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    
    // Calcula o primeiro dígito verificador
    let soma = 0;
    let resto;
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    
    // Calcula o segundo dígito verificador
    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    
    // Retorna true se o CPF é válido
    return true;
}

// Executa após o carregamento da página
document.addEventListener('DOMContentLoaded', function () {
    // Seleciona elementos do formulário
    const form = document.getElementById('cpfForm');
    const mensagem = document.getElementById('mensagem');
    const cpfInput = document.getElementById('cpf');

    // Adiciona evento de submit ao formulário
    form.addEventListener('submit', function (e) {
        // Obtém valor do CPF
        const cpf = cpfInput.value;
        
        // Valida CPF
        if (!validaCPF(cpf)) {
            // Impede envio do formulário
            e.preventDefault();
            
            // Exibe mensagem de erro
            mensagem.innerHTML = 'CPF INVÁLIDO!';
            mensagem.style.color = '#FF0000';
            mensagem.style.backgroundColor = '#FFFFFF';
            mensagem.style.borderColor = '#FF0000';
            mensagem.style.padding = '10px';
            mensagem.style.borderRadius = '5px';
            mensagem.style.marginTop = '10px';
            mensagem.style.fontSize = '18px';
            mensagem.style.fontWeight = 'bold';
            mensagem.style.borderStyle = 'solid';
            mensagem.style.borderWidth = '1px';
            cpfInput.focus();
        } else {
            // Impede envio do formulário
            e.preventDefault();
            
            // Exibe mensagem de sucesso
            mensagem.innerHTML = 'CPF VÁLIDO!';
            mensagem.style.color = '#008000';
            mensagem.style.backgroundColor = '#FFFFFF';
            mensagem.style.borderColor = '#008000';
            mensagem.style.padding = '10px';
            mensagem.style.borderRadius = '5px';
            mensagem.style.marginTop = '10px';
            mensagem.style.fontSize = '18px';
            mensagem.style.fontWeight = 'bold';
            mensagem.style.borderStyle = 'solid';
            mensagem.style.borderWidth = '1px';
            cpfInput.focus();
        }
    });

    // Adiciona evento de input ao campo de CPF
    cpfInput.addEventListener('input', function (e) {
        // Formata CPF enquanto usuário digita
        let value = e.target.value;
        const cpfPattern = value.replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
        e.target.value = cpfPattern;
    });
});