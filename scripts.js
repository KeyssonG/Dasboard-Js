document.addEventListener('DOMContentLoaded', function() {
    // Dados fictícios para simular o dashboard
    const totalClientes = 1500;
    const distribuicaoClientes = {
        pessoaFisica: 800,
        pessoaJuridica: 700
    };
    const evolucaoClientes = {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        novosClientes: [100, 120, 150, 130, 200, 180]
    };

    // Atualiza o número total de clientes cadastrados
    document.getElementById('total-clientes').textContent = totalClientes;

    // Configuração do gráfico de distribuição por tipo de cliente
    const tipoClienteChart = new Chart(document.getElementById('tipoClienteChart'), {
        type: 'doughnut',
        data: {
            labels: ['Pessoa Física', 'Pessoa Jurídica'],
            datasets: [{
                label: 'Distribuição por Tipo de Cliente',
                data: [distribuicaoClientes.pessoaFisica, distribuicaoClientes.pessoaJuridica],
                backgroundColor: ['#36a2eb', '#ff6384']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                position: 'right',
                labels: {
                    boxWidth: 12,
                    fontSize: 14,
                    padding: 20
                }
            }
        }
    });

    // Configuração do gráfico de evolução de novos clientes
    const evolucaoClientesChart = new Chart(document.getElementById('evolucaoClientesChart'), {
        type: 'line',
        data: {
            labels: evolucaoClientes.labels,
            datasets: [{
                label: 'Novos Clientes',
                data: evolucaoClientes.novosClientes,
                fill: false,
                borderColor: '#4bc0c0',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
