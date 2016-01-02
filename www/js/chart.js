    function sleep(ms) {
      var dt = new Date();
      dt.setTime(dt.getTime() + ms);
      while (new Date().getTime() < dt.getTime());
    }
    sleep(2000);
    console.log('chart is loading');
    window.onload = function() {
      console.log('chart is readyState');
      var chart = c3.generate({
        data: {
          json: [{
            name: 'www.site1.com',
            upload: 200,
            download: 200,
            total: 400
          }, {
            name: 'www.site2.com',
            upload: 100,
            download: 300,
            total: 400
          }, {
            name: 'www.site3.com',
            upload: 300,
            download: 200,
            total: 500
          }, {
            name: 'www.site4.com',
            upload: 400,
            download: 100,
            total: 500
          }, ],
          keys: {
            // x: 'name', // it's possible to specify 'x' when category axis
            value: ['upload', 'download'],
          }
        },
        axis: {
          x: {
            // type: 'category'
          }
        }
      });
    }
