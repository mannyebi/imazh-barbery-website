"use strict";

!function (NioApp, $) {
  "use strict";

  var totalSales = {
    labels: ["01 فروردین", "02 فروردین", "03 فروردین", "04 فروردین", "05 فروردین", "06 فروردین", "07 فروردین", "08 فروردین", "09 فروردین", "10 فروردین", "11 فروردین", "12 فروردین", "13 فروردین", "14 فروردین", "15 فروردین", "16 فروردین", "17 فروردین", "18 فروردین", "19 فروردین", "20 فروردین", "21 فروردین", "22 فروردین", "23 فروردین", "24 فروردین", "25 فروردین", "26 فروردین", "27 فروردین", "28 فروردین", "29 فروردین", "30 فروردین"],
    dataUnit: 'فروش',
    lineTension: .3,
    datasets: [{
      label: "فروش",
      color: "#9d72ff",
      background: NioApp.hexRGB('#9d72ff', .25),
      data: [130, 105, 125, 115, 110, 95, 131, 110, 115, 120, 111, 97, 113, 107, 122, 100, 85, 110, 130, 107, 90, 105, 123, 115, 100, 117, 125, 95, 137, 101]
    }]
  };
  var totalOrders = {
    labels: ["01 فروردین", "02 فروردین", "03 فروردین", "04 فروردین", "05 فروردین", "06 فروردین", "07 فروردین", "08 فروردین", "09 فروردین", "10 فروردین", "11 فروردین", "12 فروردین", "13 فروردین", "14 فروردین", "15 فروردین", "16 فروردین", "17 فروردین", "18 فروردین", "19 فروردین", "20 فروردین", "21 فروردین", "22 فروردین", "23 فروردین", "24 فروردین", "25 فروردین", "26 فروردین", "27 فروردین", "28 فروردین", "29 فروردین", "30 فروردین"],
    dataUnit: 'سفارش',
    lineTension: .3,
    datasets: [{
      label: "سفارش",
      color: "#7de1f8",
      background: NioApp.hexRGB('#7de1f8', .25),
      data: [85, 125, 105, 115, 130, 106, 141, 110, 95, 120, 111, 105, 113, 107, 122, 100, 95, 110, 120, 107, 100, 105, 123, 115, 110, 117, 125, 75, 95, 101]
    }]
  };
  var totalCustomers = {
    labels: ["01 فروردین", "02 فروردین", "03 فروردین", "04 فروردین", "05 فروردین", "06 فروردین", "07 فروردین", "08 فروردین", "09 فروردین", "10 فروردین", "11 فروردین", "12 فروردین", "13 فروردین", "14 فروردین", "15 فروردین", "16 فروردین", "17 فروردین", "18 فروردین", "19 فروردین", "20 فروردین", "21 فروردین", "22 فروردین", "23 فروردین", "24 فروردین", "25 فروردین", "26 فروردین", "27 فروردین", "28 فروردین", "29 فروردین", "30 فروردین"],
    dataUnit: 'مشتری',
    lineTension: .3,
    datasets: [{
      label: "مشتری",
      color: "#83bcff",
      background: NioApp.hexRGB('#83bcff', .25),
      data: [92, 105, 125, 85, 110, 106, 131, 105, 110, 115, 135, 105, 120, 85, 122, 100, 125, 110, 120, 125, 85, 105, 123, 115, 90, 117, 125, 100, 95, 65]
    }]
  };
  function ecommerceLineS1(selector, set_data) {
    var $selector = selector ? $(selector) : $('.ecommerce-line-chart-s1');
    $selector.each(function () {
      var $self = $(this),
        _self_id = $self.attr('id'),
        _get_data = typeof set_data === 'undefined' ? eval(_self_id) : set_data;
      var selectCanvas = document.getElementById(_self_id).getContext("2d");
      var chart_data = [];
      for (var i = 0; i < _get_data.datasets.length; i++) {
        chart_data.push({
          label: _get_data.datasets[i].label,
          tension: _get_data.lineTension,
          backgroundColor: _get_data.datasets[i].background,
          fill: true,
          borderWidth: 2,
          borderColor: _get_data.datasets[i].color,
          pointBorderColor: 'transparent',
          pointBackgroundColor: 'transparent',
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: _get_data.datasets[i].color,
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 4,
          data: _get_data.datasets[i].data
        });
      }
      var chart = new Chart(selectCanvas, {
        type: 'line',
        data: {
          labels: _get_data.labels,
          datasets: chart_data
        },
        options: {
          plugins: {
            legend: {
              display: _get_data.legend ? _get_data.legend : false,
              rtl: NioApp.State.isRTL,
              labels: {
                boxWidth: 12,
                padding: 20,
                color: '#6783b8'
              }
            },
            tooltip: {
              enabled: true,
              rtl: NioApp.State.isRTL,
              callbacks: {
                label: function label(context) {
                  return "".concat(context.parsed.y, " ").concat(_get_data.dataUnit);
                }
              },
              backgroundColor: '#1c2b46',
              titleFont: {
                size: 10
              },
              titleColor: '#fff',
              titleMarginBottom: 4,
              bodyColor: '#fff',
              bodyFont: {
                size: 10
              },
              bodySpacing: 4,
              padding: 6,
              footerMarginTop: 0,
              displayColors: false
            }
          },
          maintainAspectRatio: false,
          scales: {
            y: {
              display: false,
              ticks: {
                beginAtZero: true,
                font: {
                  size: 12
                },
                color: '#9eaecf',
                padding: 0
              },
              grid: {
                color: NioApp.hexRGB("#526484", .2),
                tickLength: 0,
                zeroLineColor: NioApp.hexRGB("#526484", .2),
                drawTicks: false
              }
            },
            x: {
              display: false,
              ticks: {
                font: {
                  size: 12
                },
                color: '#9eaecf',
                source: 'auto',
                padding: 0,
                reverse: NioApp.State.isRTL
              },
              grid: {
                color: "transparent",
                tickLength: 0,
                zeroLineColor: NioApp.hexRGB("#526484", .2),
                offset: false,
                drawTicks: false
              }
            }
          }
        }
      });
    });
  }
  // init chart
  NioApp.coms.docReady.push(function () {
    ecommerceLineS1();
  });
  var storeVisitors = {
    labels: ["01 فروردین", "02 فروردین", "03 فروردین", "04 فروردین", "05 فروردین", "06 فروردین", "07 فروردین", "08 فروردین", "09 فروردین", "10 فروردین", "11 فروردین", "12 فروردین", "13 فروردین", "14 فروردین", "15 فروردین", "16 فروردین", "17 فروردین", "18 فروردین", "19 فروردین", "20 فروردین", "21 فروردین", "22 فروردین", "23 فروردین", "24 فروردین", "25 فروردین", "26 فروردین", "27 فروردین", "28 فروردین", "29 فروردین", "30 فروردین"],
    dataUnit: 'نفر',
    lineTension: .1,
    datasets: [{
      label: "ماه جاری",
      color: "#9d72ff",
      dash: [0, 0],
      background: "transparent",
      data: [4110, 4220, 4810, 5480, 4600, 5670, 6660, 4830, 5590, 5730, 4790, 4950, 5100, 5800, 5950, 5850, 5950, 4450, 4900, 8000, 7200, 7250, 7900, 8950, 6300, 7200, 7250, 7650, 6950, 4750]
    }]
  };
  function ecommerceLineS2(selector, set_data) {
    var $selector = selector ? $(selector) : $('.ecommerce-line-chart-s2');
    $selector.each(function () {
      var $self = $(this),
        _self_id = $self.attr('id'),
        _get_data = typeof set_data === 'undefined' ? eval(_self_id) : set_data;
      var selectCanvas = document.getElementById(_self_id).getContext("2d");
      var chart_data = [];
      for (var i = 0; i < _get_data.datasets.length; i++) {
        chart_data.push({
          label: _get_data.datasets[i].label,
          tension: _get_data.lineTension,
          backgroundColor: _get_data.datasets[i].background,
          fill: true,
          borderWidth: 2,
          borderDash: _get_data.datasets[i].dash,
          borderColor: _get_data.datasets[i].color,
          pointBorderColor: 'transparent',
          pointBackgroundColor: 'transparent',
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: _get_data.datasets[i].color,
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 4,
          data: _get_data.datasets[i].data
        });
      }
      var chart = new Chart(selectCanvas, {
        type: 'line',
        data: {
          labels: _get_data.labels,
          datasets: chart_data
        },
        options: {
          plugins: {
            legend: {
              display: _get_data.legend ? _get_data.legend : false,
              rtl: NioApp.State.isRTL,
              labels: {
                boxWidth: 12,
                padding: 20,
                color: '#6783b8'
              }
            },
            tooltip: {
              enabled: true,
              rtl: NioApp.State.isRTL,
              callbacks: {
                label: function label(context) {
                  return "".concat(context.parsed.y, " ").concat(_get_data.dataUnit);
                }
              },
              backgroundColor: '#1c2b46',
              titleFont: {
                size: 13
              },
              titleColor: '#fff',
              titleMarginBottom: 6,
              bodyColor: '#fff',
              bodyFont: {
                size: 12
              },
              bodySpacing: 4,
              padding: 10,
              footerMarginTop: 0,
              displayColors: false
            }
          },
          maintainAspectRatio: false,
          scales: {
            y: {
              display: true,
              position: NioApp.State.isRTL ? "right" : "left",
              ticks: {
                font: {
                  size: 12
                },
                color: '#9eaecf',
                padding: 8,
                stepSize: 2400,
                display: false
              },
              grid: {
                color: NioApp.hexRGB("#526484", .2),
                tickLength: 0,
                zeroLineColor: NioApp.hexRGB("#526484", .2),
                drawTicks: false
              }
            },
            x: {
              display: false,
              ticks: {
                font: {
                  size: 12
                },
                color: '#9eaecf',
                source: 'auto',
                padding: 0,
                reverse: NioApp.State.isRTL
              },
              grid: {
                color: "transparent",
                tickLength: 0,
                zeroLineColor: 'transparent',
                offset: true,
                drawTicks: false
              }
            }
          }
        }
      });
    });
  }
  // init chart
  NioApp.coms.docReady.push(function () {
    ecommerceLineS2();
  });
  var todayOrders = {
    labels: ["12 شب تا 02 شب", "02 شب تا 04 شب", "04 شب تا 06 صبح", "06 صبح تا 08 صبح", "08 صبح تا 10 صبح", "10 صبح تا 12 بعد از ظهر", "12 بعد از ظهر تا 02 بعد از ظهر", "02 بعد از ظهر تا 04 بعد از ظهر", "04 بعد از ظهر تا 06 بعد از ظهر", "06 بعد از ظهر تا 08 شب", "08 شب تا 10 شب", "10 شب تا 12 شب"],
    dataUnit: 'سفارش',
    lineTension: .3,
    datasets: [{
      label: "سفارش",
      color: "#854fff",
      background: "transparent",
      data: [92, 105, 125, 85, 110, 106, 131, 105, 110, 131, 105, 110]
    }]
  };
  var todayRevenue = {
    labels: ["12 شب تا 02 شب", "02 شب تا 04 شب", "04 شب تا 06 صبح", "06 صبح تا 08 صبح", "08 صبح تا 10 صبح", "10 صبح تا 12 بعد از ظهر", "12 بعد از ظهر تا 02 بعد از ظهر", "02 بعد از ظهر تا 04 بعد از ظهر", "04 بعد از ظهر تا 06 بعد از ظهر", "06 بعد از ظهر تا 08 شب", "08 شب تا 10 شب", "10 شب تا 12 شب"],
    dataUnit: 'سفارش',
    lineTension: .3,
    datasets: [{
      label: "درآمد",
      color: "#33d895",
      background: "transparent",
      data: [92, 105, 125, 85, 110, 106, 131, 105, 110, 131, 105, 110]
    }]
  };
  var todayCustomers = {
    labels: ["12 شب تا 02 شب", "02 شب تا 04 شب", "04 شب تا 06 صبح", "06 صبح تا 08 صبح", "08 صبح تا 10 صبح", "10 صبح تا 12 بعد از ظهر", "12 بعد از ظهر تا 02 بعد از ظهر", "02 بعد از ظهر تا 04 بعد از ظهر", "04 بعد از ظهر تا 06 بعد از ظهر", "06 بعد از ظهر تا 08 شب", "08 شب تا 10 شب", "10 شب تا 12 شب"],
    dataUnit: 'سفارش',
    lineTension: .3,
    datasets: [{
      label: "مشتری",
      color: "#ff63a5",
      background: "transparent",
      data: [92, 105, 125, 85, 110, 106, 131, 105, 110, 131, 105, 110]
    }]
  };
  var todayVisitors = {
    labels: ["12 شب تا 02 شب", "02 شب تا 04 شب", "04 شب تا 06 صبح", "06 صبح تا 08 صبح", "08 صبح تا 10 صبح", "10 صبح تا 12 بعد از ظهر", "12 بعد از ظهر تا 02 بعد از ظهر", "02 بعد از ظهر تا 04 بعد از ظهر", "04 بعد از ظهر تا 06 بعد از ظهر", "06 بعد از ظهر تا 08 شب", "08 شب تا 10 شب", "10 شب تا 12 شب"],
    dataUnit: 'سفارش',
    lineTension: .3,
    datasets: [{
      label: "بازدید کننده",
      color: "#559bfb",
      background: "transparent",
      data: [92, 105, 125, 85, 110, 106, 131, 105, 110, 131, 105, 110]
    }]
  };
  function ecommerceLineS3(selector, set_data) {
    var $selector = selector ? $(selector) : $('.ecommerce-line-chart-s3');
    $selector.each(function () {
      var $self = $(this),
        _self_id = $self.attr('id'),
        _get_data = typeof set_data === 'undefined' ? eval(_self_id) : set_data;
      var selectCanvas = document.getElementById(_self_id).getContext("2d");
      var chart_data = [];
      for (var i = 0; i < _get_data.datasets.length; i++) {
        chart_data.push({
          label: _get_data.datasets[i].label,
          tension: _get_data.lineTension,
          backgroundColor: _get_data.datasets[i].background,
          fill: true,
          borderWidth: 2,
          borderColor: _get_data.datasets[i].color,
          pointBorderColor: 'transparent',
          pointBackgroundColor: 'transparent',
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: _get_data.datasets[i].color,
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 4,
          data: _get_data.datasets[i].data
        });
      }
      var chart = new Chart(selectCanvas, {
        type: 'line',
        data: {
          labels: _get_data.labels,
          datasets: chart_data
        },
        options: {
          plugins: {
            legend: {
              display: _get_data.legend ? _get_data.legend : false,
              rtl: NioApp.State.isRTL,
              labels: {
                boxWidth: 12,
                padding: 20,
                color: '#6783b8'
              }
            },
            tooltip: {
              enabled: true,
              rtl: NioApp.State.isRTL,
              callbacks: {
                title: function title() {
                  return false;
                },
                label: function label(context) {
                  return "".concat(context.parsed.y, " ").concat(_get_data.dataUnit);
                }
              },
              backgroundColor: '#1c2b46',
              titleFont: {
                size: 8
              },
              titleColor: '#fff',
              titleMarginBottom: 4,
              bodyColor: '#fff',
              bodyFont: {
                size: 8
              },
              bodySpacing: 4,
              padding: 6,
              footerMarginTop: 0,
              displayColors: false
            }
          },
          maintainAspectRatio: false,
          scales: {
            y: {
              display: false,
              ticks: {
                beginAtZero: false,
                font: {
                  size: 12
                },
                color: '#9eaecf',
                padding: 0
              },
              grid: {
                color: NioApp.hexRGB("#526484", .2),
                tickLength: 0,
                zeroLineColor: NioApp.hexRGB("#526484", .2),
                drawTicks: false
              }
            },
            x: {
              display: false,
              ticks: {
                font: {
                  size: 12
                },
                color: '#9eaecf',
                source: 'auto',
                padding: 0,
                reverse: NioApp.State.isRTL
              },
              grid: {
                color: "transparent",
                tickLength: 0,
                zeroLineColor: NioApp.hexRGB("#526484", .2),
                offset: true,
                drawTicks: false
              }
            }
          }
        }
      });
    });
  }
  // init chart
  NioApp.coms.docReady.push(function () {
    ecommerceLineS3();
  });
  var salesStatistics = {
    labels: ["01 فروردین", "02 فروردین", "03 فروردین", "04 فروردین", "05 فروردین", "06 فروردین", "07 فروردین", "08 فروردین", "09 فروردین", "10 فروردین", "11 فروردین", "12 فروردین", "13 فروردین", "14 فروردین", "15 فروردین", "16 فروردین", "17 فروردین", "18 فروردین", "19 فروردین", "20 فروردین", "21 فروردین", "22 فروردین", "23 فروردین", "24 فروردین", "25 فروردین", "26 فروردین", "27 فروردین", "28 فروردین", "29 فروردین", "30 فروردین"],
    dataUnit: 'نفر',
    lineTension: .4,
    datasets: [{
      label: "مجموع سفارشات",
      color: "#9d72ff",
      dash: [0, 0],
      background: NioApp.hexRGB('#9d72ff', .15),
      data: [3710, 4820, 4810, 5480, 5300, 5670, 6660, 4830, 5590, 5730, 4790, 4950, 5100, 5800, 5950, 5850, 5950, 4450, 4900, 8000, 7200, 7250, 7900, 8950, 6300, 7200, 7250, 7650, 6950, 4750]
    }, {
      label: "سفارشات لغو شده",
      color: "#eb6459",
      dash: [5, 5],
      background: "transparent",
      data: [110, 220, 810, 480, 600, 670, 660, 830, 590, 730, 790, 950, 100, 800, 950, 850, 950, 450, 900, 0, 200, 250, 900, 950, 300, 200, 250, 650, 950, 750]
    }]
  };
  function ecommerceLineS4(selector, set_data) {
    var $selector = selector ? $(selector) : $('.ecommerce-line-chart-s4');
    $selector.each(function () {
      var $self = $(this),
        _self_id = $self.attr('id'),
        _get_data = typeof set_data === 'undefined' ? eval(_self_id) : set_data;
      var selectCanvas = document.getElementById(_self_id).getContext("2d");
      var chart_data = [];
      for (var i = 0; i < _get_data.datasets.length; i++) {
        chart_data.push({
          label: _get_data.datasets[i].label,
          tension: _get_data.lineTension,
          backgroundColor: _get_data.datasets[i].background,
          fill: true,
          borderWidth: 2,
          borderDash: _get_data.datasets[i].dash,
          borderColor: _get_data.datasets[i].color,
          pointBorderColor: 'transparent',
          pointBackgroundColor: 'transparent',
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: _get_data.datasets[i].color,
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 4,
          data: _get_data.datasets[i].data
        });
      }
      var chart = new Chart(selectCanvas, {
        type: 'line',
        data: {
          labels: _get_data.labels,
          datasets: chart_data
        },
        options: {
          plugins: {
            legend: {
              display: _get_data.legend ? _get_data.legend : false,
              rtl: NioApp.State.isRTL,
              labels: {
                boxWidth: 12,
                padding: 20,
                color: '#6783b8'
              }
            },
            tooltip: {
              enabled: true,
              rtl: NioApp.State.isRTL,
              callbacks: {
                label: function label(context) {
                  return "".concat(context.parsed.y, " ").concat(_get_data.dataUnit);
                }
              },
              backgroundColor: '#1c2b46',
              titleFont: {
                size: 13
              },
              titleColor: '#fff',
              titleMarginBottom: 6,
              bodyColor: '#fff',
              bodyFont: {
                size: 12
              },
              bodySpacing: 4,
              padding: 10,
              footerMarginTop: 0,
              displayColors: false
            }
          },
          maintainAspectRatio: false,
          scales: {
            y: {
              display: true,
              stacked: _get_data.stacked ? _get_data.stacked : false,
              position: NioApp.State.isRTL ? "right" : "left",
              ticks: {
                beginAtZero: true,
                font: {
                  size: 11
                },
                color: '#9eaecf',
                padding: 10,
                callback: function callback(value, index, values) {
                  return value + ' تومان';
                },
                min: 0,
                stepSize: 3000
              },
              grid: {
                color: NioApp.hexRGB("#526484", .2),
                tickLength: 0,
                zeroLineColor: NioApp.hexRGB("#526484", .2),
                drawTicks: false
              }
            },
            x: {
              display: false,
              stacked: _get_data.stacked ? _get_data.stacked : false,
              ticks: {
                font: {
                  size: 9
                },
                color: '#9eaecf',
                source: 'auto',
                padding: 10,
                reverse: NioApp.State.isRTL
              },
              grid: {
                color: "transparent",
                tickLength: 0,
                zeroLineColor: 'transparent',
                drawTicks: false
              }
            }
          }
        }
      });
    });
  }
  // init chart
  NioApp.coms.docReady.push(function () {
    ecommerceLineS4();
  });
  var averargeOrder = {
    labels: ["01 فروردین", "02 فروردین", "03 فروردین", "04 فروردین", "05 فروردین", "06 فروردین", "07 فروردین", "08 فروردین", "09 فروردین", "10 فروردین", "11 فروردین", "12 فروردین", "13 فروردین", "14 فروردین", "15 فروردین", "16 فروردین", "17 فروردین", "18 فروردین", "19 فروردین", "20 فروردین", "21 فروردین", "22 فروردین", "23 فروردین", "24 فروردین", "25 فروردین", "26 فروردین", "27 فروردین", "28 فروردین", "29 فروردین", "30 فروردین"],
    dataUnit: 'نفر',
    lineTension: .1,
    datasets: [{
      label: "کاربران فعال",
      color: "#b695ff",
      background: "#b695ff",
      data: [1110, 1220, 1310, 980, 900, 770, 1060, 830, 690, 730, 790, 950, 1100, 800, 1250, 850, 950, 450, 900, 1000, 1200, 1250, 900, 950, 1300, 1200, 1250, 650, 950, 750]
    }]
  };
  function ecommerceBarS1(selector, set_data) {
    var $selector = selector ? $(selector) : $('.ecommerce-bar-chart-s1');
    $selector.each(function () {
      var $self = $(this),
        _self_id = $self.attr('id'),
        _get_data = typeof set_data === 'undefined' ? eval(_self_id) : set_data;
      var selectCanvas = document.getElementById(_self_id).getContext("2d");
      var chart_data = [];
      for (var i = 0; i < _get_data.datasets.length; i++) {
        chart_data.push({
          label: _get_data.datasets[i].label,
          tension: _get_data.lineTension,
          backgroundColor: _get_data.datasets[i].background,
          borderWidth: 2,
          borderColor: _get_data.datasets[i].color,
          data: _get_data.datasets[i].data,
          barPercentage: .7,
          categoryPercentage: .7
        });
      }
      var chart = new Chart(selectCanvas, {
        type: 'bar',
        data: {
          labels: _get_data.labels,
          datasets: chart_data
        },
        options: {
          plugins: {
            legend: {
              display: _get_data.legend ? _get_data.legend : false,
              rtl: NioApp.State.isRTL,
              labels: {
                boxWidth: 12,
                padding: 20,
                color: '#6783b8'
              }
            },
            tooltip: {
              enabled: true,
              rtl: NioApp.State.isRTL,
              callbacks: {
                title: function title() {
                  return false;
                },
                label: function label(context) {
                  return "".concat(context.parsed.y, " ").concat(_get_data.dataUnit);
                }
              },
              backgroundColor: '#1c2b46',
              titleFont: {
                size: 11
              },
              titleColor: '#fff',
              titleMarginBottom: 6,
              bodyColor: '#fff',
              bodyFont: {
                size: 9
              },
              bodySpacing: 4,
              padding: 6,
              footerMarginTop: 0,
              displayColors: false
            }
          },
          maintainAspectRatio: false,
          scales: {
            y: {
              display: true,
              position: NioApp.State.isRTL ? "right" : "left",
              ticks: {
                beginAtZero: false,
                font: {
                  size: 12
                },
                color: '#9eaecf',
                padding: 0,
                display: false,
                stepSize: 100
              },
              grid: {
                color: NioApp.hexRGB("#526484", .2),
                tickLength: 0,
                zeroLineColor: NioApp.hexRGB("#526484", .2),
                drawTicks: false
              }
            },
            x: {
              display: false,
              ticks: {
                font: {
                  size: 12
                },
                color: '#9eaecf',
                source: 'auto',
                padding: 0,
                reverse: NioApp.State.isRTL
              },
              grid: {
                color: "transparent",
                tickLength: 0,
                zeroLineColor: 'transparent',
                offset: true,
                drawTicks: false
              }
            }
          }
        }
      });
    });
  }
  // init chart
  NioApp.coms.docReady.push(function () {
    ecommerceBarS1();
  });
  var trafficSources = {
    labels: ["جستجوی ارگانیک", "شبکه های اجتماعی", "ارجاعات", "سایر"],
    dataUnit: 'نفر',
    legend: false,
    datasets: [{
      borderColor: "#fff",
      background: ["#b695ff", "#b8acff", "#ffa9ce", "#f9db7b"],
      data: [4305, 859, 482, 138]
    }]
  };
  var orderStatistics = {
    labels: ["تکمیل شده", "در حال پردازش", "لغو شده"],
    dataUnit: 'نفر',
    legend: false,
    datasets: [{
      borderColor: "#fff",
      background: ["#816bff", "#13c9f2", "#ff82b7"],
      data: [4305, 859, 482]
    }]
  };
  function ecommerceDoughnutS1(selector, set_data) {
    var $selector = selector ? $(selector) : $('.ecommerce-doughnut-s1');
    $selector.each(function () {
      var $self = $(this),
        _self_id = $self.attr('id'),
        _get_data = typeof set_data === 'undefined' ? eval(_self_id) : set_data;
      var selectCanvas = document.getElementById(_self_id).getContext("2d");
      var chart_data = [];
      for (var i = 0; i < _get_data.datasets.length; i++) {
        chart_data.push({
          backgroundColor: _get_data.datasets[i].background,
          borderWidth: 2,
          borderColor: _get_data.datasets[i].borderColor,
          hoverBorderColor: _get_data.datasets[i].borderColor,
          data: _get_data.datasets[i].data
        });
      }
      var chart = new Chart(selectCanvas, {
        type: 'doughnut',
        data: {
          labels: _get_data.labels,
          datasets: chart_data
        },
        options: {
          plugins: {
            legend: {
              display: _get_data.legend ? _get_data.legend : false,
              rtl: NioApp.State.isRTL,
              labels: {
                boxWidth: 12,
                padding: 20,
                color: '#6783b8'
              }
            },
            tooltip: {
              enabled: true,
              rtl: NioApp.State.isRTL,
              callbacks: {
                label: function label(context) {
                  return "".concat(context.parsed, " ").concat(_get_data.dataUnit);
                }
              },
              backgroundColor: '#1c2b46',
              titleFont: {
                size: 13
              },
              titleColor: '#fff',
              titleMarginBottom: 6,
              bodyColor: '#fff',
              bodyFont: {
                size: 12
              },
              bodySpacing: 4,
              padding: 10,
              footerMarginTop: 0,
              displayColors: false
            }
          },
          rotation: -1.5,
          cutoutPercentage: 70,
          maintainAspectRatio: false
        }
      });
    });
  }
  // init chart
  NioApp.coms.docReady.push(function () {
    ecommerceDoughnutS1();
  });
}(NioApp, jQuery);