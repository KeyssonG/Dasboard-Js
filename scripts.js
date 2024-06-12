document.addEventListener('DOMContentLoaded', function() {
    // Configuração inicial do tema
    const themeToggleCheckbox = document.getElementById('theme-toggle-checkbox');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-theme', currentTheme === 'dark');
    document.body.classList.toggle('light-theme', currentTheme === 'light');
    if (currentTheme === 'dark'){
        themeToggleCheckbox.checked = true;
    }
    themeToggleCheckbox.addEventListener('change', function () {
        if (this.checked) {
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light')
        }
    });

    // Função de filtro por data
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const filterButton = document.getElementById('filter-button');

    function filterData() {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);

        if (!isNaN(startDate) && !isNaN(endDate)) {
            const filteredData = evolucaoClientes.labels.map((label, index) => {
                const date = new Date(label);
                if (date >= startDate && date <= endDate) {
                    return evolucaoClientes.novosClientes[index];
                }
                return null;
            }).filter(data => data !== null);

            const filteredLabels = evolucaoClientes.labels.filter((label, index) => {
                const date = new Date(label);
                return date >= startDate && date <= endDate;
            });

            evolucaoClientesChart.data.labels = filteredLabels;
            evolucaoClientesChart.data.datasets[0].data = filteredData;
            evolucaoClientesChart.update();
        }
    }

    filterButton.addEventListener('click', filterData);

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
    const distribuicaoGeografica = {
        labels: ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'],
        data: [300, 200, 100, 600, 300]
    };
    const faixaEtaria = {
        labels: ['18-25', '26-35', '36-45', '46-55', '56+'],
        data: [200, 500, 400, 300, 100]
    };
    const genero = {
        labels: ['Masculino', 'Feminino', 'Outro'],
        data: [700, 750, 50]
    };
    const performanceVendas = {
        volumeVendas: [250, 350, 200, 400, 300],
        valorMedioCompra: [150, 200, 180, 220, 210, 250],
        taxaConversao: [0.1, 0.15, 0.2, 0.25, 0.22, 0.3]
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

    // Configuração do gráfico de distribuição geográfica
    const distribuicaoGeograficaChart = new Chart(document.getElementById('distribuicaoGeograficaChart'), {
        type: 'bar',
        data: {
            labels: distribuicaoGeografica.labels,
            datasets: [{
                label: 'Clientes por Região',
                data: distribuicaoGeografica.data,
                backgroundColor: '#ff9f40'
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

    // Configuração do gráfico de faixa etária
    const faixaEtariaChart = new Chart(document.getElementById('faixaEtariaChart'), {
        type: 'bar',
        data: {
            labels: faixaEtaria.labels,
            datasets: [{
                label: 'Clientes por Faixa Etária',
                data: faixaEtaria.data,
                backgroundColor: '#9966ff'
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

    // Configuração do gráfico de gênero
    const generoChart = new Chart(document.getElementById('generoChart'), {
        type: 'pie',
        data: {
            labels: genero.labels,
            datasets: [{
                label: 'Distribuição por Gênero',
                data: genero.data,
                backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56']
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

    // Configuração do gráfico de volume de vendas por cliente
    const volumeVendasChart = new Chart(document.getElementById('volumeVendasChart'), {
        type: 'bar',
        data: {
            labels: performanceVendas.volumeVendas,
            datasets: [{
                label: 'Volume de Vendas',
                data: performanceVendas.volumeVendas,
                backgroundColor: '#42a5f5'
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

    // Configuração do gráfico de valor médio de compra por cliente
    const valorMedioCompraChart = new Chart(document.getElementById('valorMedioCompraChart'), {
        type: 'bar',
        data: {
            labels: performanceVendas.valorMedioCompra,
            datasets: [{
                label: 'Valor Médio de Compra',
                data: performanceVendas.valorMedioCompra,
                backgroundColor: '#66bb6a'
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

    // Configuração do gráfico de taxa de conversão de leads em clientes
    const taxaConversaoChart = new Chart(document.getElementById('taxaConversaoChart'), {
        type: 'line',
        data: {
            labels: performanceVendas.taxaConversao,
            datasets: [{
                label: 'Taxa de Conversão',
                data: performanceVendas.taxaConversao,
                fill: false,
                borderColor: '#ef5350',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1
                }
            }
        }
    });

});
