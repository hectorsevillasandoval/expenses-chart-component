import data from '../../data.json' assert {type: 'json'};

const totalAmount = data.reduce(  (acc, currentValue) => {
    return acc += currentValue.amount;
},0);

// get context
const ctx = document.getElementById('myChart').getContext('2d');
const labels = data.map( singledata => singledata.day );
const dataAmount = data.map( singledata => singledata.amount );
const barDefaultColor = 'hsl(10, 79%, 65%)';
const barCurrentDayColor = 'hsl(186, 34%, 60%)';
const currentDate = new Date();

const barColors = Array(data.length).fill(barDefaultColor);

barColors[currentDate.getDay() - 1] = barCurrentDayColor;



const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: '',
            data: dataAmount,
            backgroundColor: barColors,
            borderWidth: 0,
            borderSkipped: false,
        }],
    },
    options: {
        maintainAspectRatio: false,
        borderRadius: 5,
        layout: {
            padding: 0,
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                }
            },
            y: {
                beginAtZero: true,
                display: false,
                grid: {
                    display: false,
                },
            },
        },
        plugins: {
            tooltip: {
                caretSize: 0,
                callbacks: {
                    title: () => null,
                    label: function(context) {
                        let label = context.dataset.label || '';

                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                        }
                        return label;
                    },

                    
                },
            },
            legend: {
                display: false,
            },
        },
    }
});


Chart.defaults.plugins.tooltip.padding = 10;
Chart.defaults.plugins.tooltip.displayColors = false;
Chart.defaults.plugins.tooltip.xAlign = "center";
Chart.defaults.plugins.tooltip.yAlign = "bottom";
Chart.defaults.plugins.tooltip.bodyFont = {
    size: 16,
    family: 'DM Sans',
    weight: 700
};
