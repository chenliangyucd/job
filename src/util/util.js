const util = {
  setCookie (name,value) {
    let Days = 30;
    let exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
  },

  getCookie (name) {
    let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
      return unescape(arr[2]);
    else
      return null;
  },
 
  delCookie (name) {
    this.setCookie(name, "", -1);  
  }

}



export default util

