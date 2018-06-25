<template>
    <div class="modelWrap" v-if="show">
        <div class="wrap"></div>
        <div class="box">
            <article class="boxImg" v-if="!modelData.flag">
                <header class="modelHeader">
                    <!-- <h3 class="title">{{modelData.title}}</h3> -->
                    <h3 class="title">请用<font style="color: red;">微信</font>扫一扫</h3>
                    <button class="close" @click="close">x</button>
                </header>
                <section class="modelBody">
                    <img src="../../assets/loan/weixin.png"  >
                </section>
                <footer class="modelFooter">
                    扫二维码登录手机端<span style="color: #FF5001;">申请贷款</span>
                </footer>
            </article>
            <article class="boxMsg"  v-if="modelData.flag">
                <header class="modelHeader">
                   <!--  <h3 class="title">{{modelData.title}}</h3> -->
                    <button class="close" @click="close">x</button>
                </header>
                <section class="modelBody">
                    您暂不可再次申请贷款
                </section>
                <footer class="modelFooter">
                    <!-- <button class="No" @click="close">取消</button> -->
                    <button class="Yes" @click="close">确定</button>
                </footer>
            </article>
           
        </div>
    </div>
</template>
<<script>
export default {
    data(){
        return{
            show : true ,                         
        }
	},
    props: {
        "modelData":{
            type:Object,		//Array,Boolean,Number
            default:false
        }
    },
    methods:{
        close(){
            this.$emit('takeOff', false) ;
        },
        init(){
            //ESC关闭模态框
            let _this = this ;
            document.onkeydown=function(event){
                var e = event || window.event || arguments.callee.caller.arguments[0];      
                if(e && e.keyCode==27){ 
                    _this.close() ;
                }
            }; 
        }
    },
    created(){
        this.init() ;
        this.modelData.url = "http://pan.baidu.com/share/qrcode?w=280&h=280&url="+this.modelData.url ;
    }
}
</script>
<style lang="scss" scoped type="text/css">
   
    .modelWrap{
        .wrap{
            position: fixed ;
            left: 0;
            right: 0;
            top:0;
            bottom: 0;
            background: #000000;
            z-index:11111;
            opacity: 0.5;
        }
        $width:320px;         //定义内容框的宽度
        .box{
            position: fixed ;
            width:$width;
            left:50% ;
            margin-left: -$width/2 ;
            opacity: 1;
            z-index: 99999 ;
            background: #ffffff ;
            
            .modelHeader{
                min-height: 60px ;
                border-bottom: 1px solid #cccccc ;
                position: relative ;
                .title{
                    height: 60px ;
                    line-height: 60px ;
                    display:block ;
                    width: 100%;
                    text-align: center ;
                    font-size: 18px ;
                    font-weight: 600;
                }
                .close{
                    background: #ffffff ;
                    position: absolute ;
                    right:10px;
                    top:20px;
                    width: 24px ;
                    text-align: center ;
                    height: 24px;
                    border: 1px solid #eeeeee ;
                    cursor: pointer;
                    //border-radius: 50% ;
                }
            }
            .boxImg{
                .modelBody{
                    min-height: 120px ;
                    border-bottom: 1px solid #cccccc ;
                    width: 100%; 
                    height: 320px; 
                    line-height: 320px; 
                    background: linear-gradient(to left, #ff8f00, #ff5001);  
                    text-align: center;
                    img{
                        width:280px ;
                        height: 280px ;
                        margin-top: 20px ;
                    }
                }
            }
            .boxMsg{
                .modelBody{
                    min-height: 120px ;
                    border-bottom: 1px solid #cccccc ;
                    width: 300px; 
                    height: 120px; 
                    line-height: 120px; 
                    text-align: center;
                    font-size: 20px ;
                    font-weight: 600 ;
                }
            }
            .modelFooter{
                height: 60px ;
                line-height: 60px ;
                border-bottom: 1px solid #cccccc ;
                text-align: center ;
                .No{
                    width: 60px ;
                    height: 30px ;
                    line-height: 28px;
                    margin:15px ;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .Yes{
                    width: 60px ;
                    height: 30px ;
                    line-height: 28px;
                    margin-right: 15px ;
                    background: #337ab7 ;
                    border-color: #2e6da4;
                    color: #ffffff ;
                    border-radius: 5px;
                    cursor: pointer;
                }
            }
        }
    }
</style>

