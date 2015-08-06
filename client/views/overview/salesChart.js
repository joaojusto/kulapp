function getSalesTotalByDay(sales) {
  return _(sales)
    .chain()
    .groupBy(orderSaleByDay)
    .map(reduceSalesDay)
    .value();
}

function orderSaleByDay(sale) {
  return moment(sale.createdAt).startOf('day').day();
}

function reduceSalesDay(item) {
  return _.chain(item).map(function(sale) {
    return sale.total;
  })
  .reduce(function(memo, total) {
    return (parseFloat(memo) + parseFloat(total)).toFixed(2);
  })
  .value();
}

Template.salesChart.onRendered(function() {
  var chart = {};
  var ctx = $('#chart').get(0).getContext('2d');

  var data = {
    labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    datasets: [
      {
        label: 'Sales dataset',
        fillColor: 'rgba(151,187,205,0.2)',
        strokeColor: 'rgba(151,187,205,1)',
        pointColor: 'rgba(151,187,205,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(151,187,205,1)',
        data: []
      }
    ]
  };

  Tracker.autorun(function () {
    var sales = Sales.find().fetch();

    if (sales)
      Tracker.afterFlush(function() {
        var salesData = getSalesTotalByDay(sales);

        data.datasets[0].data = salesData;

        if (!chart.datasets || !chart.datasets[0].bars.length) {
          chart = new Chart(ctx).Bar(data);
          chart.update();
          console.log(data);
        } else {
          chart.datasets[0].bars.forEach(function(bar, index) {
            console.log(bar.value);
            bar.value = [salesData[index]];
          });
          chart.update();
        }

        console.log(chart);
      });
  });
});
