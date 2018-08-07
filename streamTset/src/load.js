$(function() {
    $('.startload').on('click', function() {
        alert(1);
       $.ajax({
           url: '/load',
           method: 'get',
           success: function(res) {
               console.log(res);
           }
       })
    });
    $('.parseload').on('click', function() {
       $.ajax({
           url: '/stop',
           method: 'get',
           success: function(res) {
               console.log(res);
           }
       })
    });
});