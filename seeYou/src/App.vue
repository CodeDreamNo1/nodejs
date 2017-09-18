<template>
  <div id="app">
    <router-view></router-view>
    <ul class="foot">
      <li>首页</li>
      <li>消息</li>
      <li>位置</li>
      <li>纪念日</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'app'
}

</script>
<script>
  (function (doc, win) {
    var docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        if(clientWidth>=640){
          docEl.style.fontSize = '100px';
        }else{
          docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
        }
      };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
  })(document, window);
</script>
<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}
div,body,html,ul,p,li,span,input{
  padding: 0;
  margin: 0;
}
body{
  overflow: hidden;
}
ul,li{
  list-style: none;
}
a{
  text-decoration: none;
}
  .foot{
    position: relative;
    width:100VW;
    bottom: 0;
    display: flex;
    display: -webkit-flex;
    justify-content:center;
    position:relative;
    bottom: 0;
    background: -webkit-linear-gradient(white,pink); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(white,pink); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(white,pink); /* Firefox 3.6 - 15 */
    background: linear-gradient(white,pink); /* 标准的语法 */
  }
  
  .foot:after{
    display: block;
    content: "";
    clear: both;
  }
  .foot li{
    padding:0.4rem 0.7rem;
    font-size:0.4rem;
  }
</style>
