"use strict";

!function (NioApp, $) {
  "use strict";

  //////// for developer - User Balance ////////
  // Avilable options to pass from outside
  // labels: array,
  // legend: false - boolean,
  // dataUnit: string, (Used in tooltip or other section for display)
  // datasets: [{label : string, color: string (color code with # or other format), data: array}]

  // // Student enrolement chart
  var enrolement = {
    labels: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"],
    dataUnit: 'تومان',
    stacked: true,
    datasets: [{
      label: "درآمد فروش",
      color: [NioApp.hexRGB("#6576ff", .2), NioApp.hexRGB("#6576ff", .2), NioApp.hexRGB("#6576ff", .2), NioApp.hexRGB("#6576ff", .2), NioApp.hexRGB("#6576ff", .2), NioApp.hexRGB("#6576ff", .2), NioApp.hexRGB("#6576ff", .2), NioApp.hexRGB("#6576ff", .2), NioApp.hexRGB("#6576ff", .2), NioApp.hexRGB("#6576ff", .2), NioApp.hexRGB("#6576ff", .2), "#6576ff"],
      //@v2.0
      data: [11000, 8000, 12500, 5500, 9500, 14299, 11000, 8000, 12500, 5500, 9500, 14299]
    }]
  };
  function enrolementChart(selector, set_data) {
    var $selector = selector ? $(selector) : $('.student-enrole');
    $selector.each(function () {
      var $self = $(this),
        _self_id = $self.attr('id'),
        _get_data = typeof set_data === 'undefined' ? eval(_self_id) : set_data,
        _d_legend = typeof _get_data.legend === 'undefined' ? false : _get_data.legend;
      var selectCanvas = document.getElementById(_self_id).getContext("2d");
      var chart_data = [];
      for (var i = 0; i < _get_data.datasets.length; i++) {
        chart_data.push({
          label: _get_data.datasets[i].label,
          data: _get_data.datasets[i].data,
          // Styles
          backgroundColor: _get_data.datasets[i].color,
          borderWidth: 2,
          borderColor: 'transparent',
          hoverBorderColor: 'transparent',
          borderSkipped: 'bottom',
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
              labels: {
                boxWidth: 30,
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
              backgroundColor: '#eff6ff',
              titleFont: {
                size: 11
              },
              titleColor: '#6783b8',
              titleMarginBottom: 4,
              bodyColor: '#9eaecf',
              bodyFont: {
                size: 10
              },
              bodySpacing: 3,
              padding: 8,
              footerMarginTop: 0,
              displayColors: false
            }
          },
          maintainAspectRatio: false,
          scales: {
            y: {
              display: false,
              stacked: _get_data.stacked ? _get_data.stacked : false,
              ticks: {
                beginAtZero: true
              }
            },
            x: {
              display: false,
              stacked: _get_data.stacked ? _get_data.stacked : false,
              ticks: {
                reverse: NioApp.State.isRTL
              }
            }
          }
        }
      });
    });
  }
  // init chart
  NioApp.coms.docReady.push(function () {
    enrolementChart();
  });

  // // Course Progress Chart
  var courseProgress = {
    labels: ["توسعه وب", "اپلیکیشن تلفن همراه", "طراحی گرافیک", "پایگاه داده", "بازاریابی", "یادگیری ماشین", "علم داده"],
    stacked: true,
    datasets: [{
      label: "نام نویسی هفتگی",
      color: ["#f98c45", "#6baafe", "#8feac5", "#6b79c8", "#79f1dc", "#FF65B6", "#6A29FF"],
      data: [1740, 2500, 1820, 1200, 1600, 2500, 2250, 3410]
      // data: [2500, 2500, 2500, 2500, 2500, 2800]
    }, {
      label: "نام نویسی ماهانه",
      color: [NioApp.hexRGB('#f98c45', .2), NioApp.hexRGB('#6baafe', .4), NioApp.hexRGB('#8feac5', .4), NioApp.hexRGB('#6b79c8', .4), NioApp.hexRGB('#79f1dc', .4), NioApp.hexRGB('#FF65B6', .4), NioApp.hexRGB('#6A29FF', .4)],
      data: [2420, 1820, 3000, 5000, 2450, 1820, 2000, 1890]
      // data: [1820, 1820, 1820, 1820, 1820, 1120]
    }]
  };

  function courseProgressChart(selector, set_data) {
    var $selector = selector ? $(selector) : $('.course-progress-chart');
    $selector.each(function () {
      var $self = $(this),
        _self_id = $self.attr('id'),
        _get_data = typeof set_data === 'undefined' ? eval(_self_id) : set_data,
        _d_legend = typeof _get_data.legend === 'undefined' ? false : _get_data.legend;
      var selectCanvas = document.getElementById(_self_id).getContext("2d");
      var chart_data = [];
      for (var i = 0; i < _get_data.datasets.length; i++) {
        chart_data.push({
          label: _get_data.datasets[i].label,
          data: _get_data.datasets[i].data,
          // Styles
          backgroundColor: _get_data.datasets[i].color,
          borderWidth: 2,
          borderColor: 'transparent',
          hoverBorderColor: 'transparent',
          borderSkipped: 'bottom',
          barThickness: '8',
          categoryPercentage: 0.5,
          barPercentage: 1.0
        });
      }
      var chart = new Chart(selectCanvas, {
        type: 'bar',
        data: {
          labels: _get_data.labels,
          datasets: chart_data
        },
        options: {
          indexAxis: 'y',
          plugins: {
            legend: {
              display: _get_data.legend ? _get_data.legend : false,
              rtl: NioApp.State.isRTL,
              labels: {
                boxWidth: 30,
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
              backgroundColor: '#eff6ff',
              titleFont: {
                size: 13
              },
              titleColor: '#6783b8',
              titleMarginBottom: 6,
              bodyColor: '#9eaecf',
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
              display: false,
              stacked: _get_data.stacked ? _get_data.stacked : false,
              ticks: {
                beginAtZero: true,
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
              stacked: _get_data.stacked ? _get_data.stacked : false,
              ticks: {
                font: {
                  size: 9
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
    courseProgressChart();
  });

  //
  var analyticAuData = {
    labels: ["01 فروردین", "02 فروردین", "03 فروردین", "04 فروردین", "05 فروردین", "06 فروردین", "07 فروردین", "08 فروردین", "09 فروردین", "10 فروردین", "11 فروردین", "12 فروردین", "13 فروردین", "14 فروردین", "15 فروردین", "16 فروردین", "17 فروردین", "18 فروردین", "19 فروردین", "20 فروردین", "21 فروردین", "22 فروردین", "23 فروردین", "24 فروردین", "25 فروردین", "26 فروردین", "27 فروردین", "28 فروردین", "29 فروردین", "30 فروردین"],
    dataUnit: 'نفر',
    lineTension: .1,
    datasets: [{
      label: "کاربران فعال",
      color: "#9cabff",
      background: "#9cabff",
      data: [1110, 1220, 1310, 980, 900, 770, 1060, 830, 690, 730, 790, 950, 1100, 800, 1250, 850, 950, 450, 900, 1000, 1200, 1250, 900, 950, 1300, 1200, 1250, 650, 950, 750]
    }]
  };
  function analyticsAu(selector, set_data) {
    var $selector = selector ? $(selector) : $('.analytics-au-chart');
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
              backgroundColor: '#eff6ff',
              titleFont: {
                size: 11
              },
              titleColor: '#6783b8',
              titleMarginBottom: 6,
              bodyColor: '#9eaecf',
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
                stepSize: 300
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
    analyticsAu();
  });
  var totalSells = {
    labels: ["01 فروردین", "02 فروردین", "03 فروردین", "04 فروردین", "05 فروردین", "06 فروردین", "07 فروردین", "08 فروردین", "09 فروردین", "10 فروردین", "11 فروردین", "12 فروردین", "13 فروردین", "14 فروردین", "15 فروردین", "16 فروردین", "17 فروردین", "18 فروردین", "19 فروردین", "20 فروردین", "21 فروردین", "22 فروردین", "23 فروردین", "24 فروردین", "25 فروردین", "26 فروردین", "27 فروردین", "28 فروردین", "29 فروردین", "30 فروردین"],
    dataUnit: 'سفارش',
    lineTension: .3,
    datasets: [{
      label: "دوره های آموزشی",
      color: "#6A29FF",
      background: NioApp.hexRGB('#6A29FF', .25),
      data: [85, 125, 105, 115, 130, 106, 141, 110, 95, 120, 111, 105, 113, 107, 122, 100, 95, 110, 120, 107, 100, 105, 123, 115, 110, 117, 125, 75, 95, 101]
    }]
  };
  var weeklySells = {
    labels: ["01 فروردین", "02 فروردین", "03 فروردین", "04 فروردین", "05 فروردین", "06 فروردین", "07 فروردین", "08 فروردین", "09 فروردین", "10 فروردین", "11 فروردین", "12 فروردین", "13 فروردین", "14 فروردین", "15 فروردین", "16 فروردین", "17 فروردین", "18 فروردین", "19 فروردین", "20 فروردین", "21 فروردین", "22 فروردین", "23 فروردین", "24 فروردین", "25 فروردین", "26 فروردین", "27 فروردین", "28 فروردین", "29 فروردین", "30 فروردین"],
    dataUnit: 'دانشجو',
    lineTension: .3,
    datasets: [{
      label: "دانشجو",
      color: "#4258FF",
      background: NioApp.hexRGB('#4258FF', .25),
      data: [92, 105, 125, 85, 110, 106, 131, 105, 110, 115, 135, 105, 120, 85, 122, 100, 125, 110, 120, 125, 85, 105, 123, 115, 90, 117, 125, 100, 95, 65]
    }]
  };
  function courseSellsChart(selector, set_data) {
    var $selector = selector ? $(selector) : $('.courseSells');
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
    courseSellsChart();
  });

  // Traffic

  var TrafficChannelDoughnutData = {
    labels: ["جستجوی ارگانیک", "شبکه های اجتماعی", "ارجاعات", "سایر"],
    dataUnit: 'نفر',
    legend: false,
    datasets: [{
      borderColor: "#fff",
      background: ["#9d72ff", "#b8acff", "#ffa9ce", "#f9db7b"],
      data: [4305, 859, 482, 138]
    }]
  };
  function analyticsDoughnut(selector, set_data) {
    var $selector = selector ? $(selector) : $('.analytics-doughnut');
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
    analyticsDoughnut();
  });
}(NioApp, jQuery);

// Dashboard 2 Charts
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
var activeStudents = {
  labels: ["01 فروردین", "02 فروردین", "03 فروردین", "04 فروردین", "05 فروردین", "06 فروردین", "07 فروردین", "08 فروردین", "09 فروردین", "10 فروردین", "11 فروردین", "12 فروردین", "13 فروردین", "14 فروردین", "15 فروردین", "16 فروردین", "17 فروردین", "18 فروردین", "19 فروردین", "20 فروردین", "21 فروردین", "22 فروردین", "23 فروردین", "24 فروردین", "25 فروردین", "26 فروردین", "27 فروردین", "28 فروردین", "29 فروردین", "30 فروردین"],
  dataUnit: 'دانشجو',
  lineTension: .3,
  datasets: [{
    label: "دانشجو",
    color: "#7de1f8",
    background: NioApp.hexRGB('#7de1f8', .25),
    data: [85, 125, 105, 115, 130, 106, 141, 110, 95, 120, 111, 105, 113, 107, 122, 100, 95, 110, 120, 107, 100, 105, 123, 115, 110, 117, 125, 75, 95, 101]
  }]
};
var newStudents = {
  labels: ["01 فروردین", "02 فروردین", "03 فروردین", "04 فروردین", "05 فروردین", "06 فروردین", "07 فروردین", "08 فروردین", "09 فروردین", "10 فروردین", "11 فروردین", "12 فروردین", "13 فروردین", "14 فروردین", "15 فروردین", "16 فروردین", "17 فروردین", "18 فروردین", "19 فروردین", "20 فروردین", "21 فروردین", "22 فروردین", "23 فروردین", "24 فروردین", "25 فروردین", "26 فروردین", "27 فروردین", "28 فروردین", "29 فروردین", "30 فروردین"],
  dataUnit: 'دانشجو',
  lineTension: .3,
  datasets: [{
    label: "دانشجو",
    color: "#83bcff",
    background: NioApp.hexRGB('#83bcff', .25),
    data: [92, 105, 125, 85, 110, 106, 131, 105, 110, 115, 135, 105, 120, 85, 122, 100, 125, 110, 120, 125, 85, 105, 123, 115, 90, 117, 125, 100, 95, 65]
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
function lmsLineS1(selector, set_data) {
  var $selector = selector ? $(selector) : $('.lms-line-chart-s1');
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
  lmsLineS1();
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
function lmsLineS4(selector, set_data) {
  var $selector = selector ? $(selector) : $('.lms-line-chart-s4');
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
  lmsLineS4();
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
function lmsDoughnutS1(selector, set_data) {
  var $selector = selector ? $(selector) : $('.lms-doughnut-s1');
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
  lmsDoughnutS1();
});