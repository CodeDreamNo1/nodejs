$(function() {
    $('.startload').on('click', function() {
       $.ajax({
           url: '/downloadtxt',
           method: 'get',
           success: function(res) {
               var blob = new Blob([res], {type: "text/plain"});// 传入一个合适的MIME类型
               var url = URL.createObjectURL(blob);
               window.open(url);
           }
       })
    });
    $('.parseload').on('click', function() {
       $.ajax({
           url: '/stop',
           method: 'get',
           success: function(res) {
               
           }
       })
    });
    $('video').on('pause',  function(e) { //进度条发生改变 导致数据没有加载完
        $.ajax({
            url: '/src/ss.mp4',
            method: 'get',
            headers: {
                'Range': 'bytes=' + 2049 + '-'
            },
            success: function(res) {
               var blob = new Blob([res], {type: "text/plain"});// 传入一个合适的MIME类型
               var url = URL.createObjectURL(blob);
               $(this)[0].src = url;
               e.currentTime = 10
               console.log($(this)[0].src,e.currentTime )
            }
        })
        // console.log(this.played.start(0),this.played.end(0),e)
    })
});