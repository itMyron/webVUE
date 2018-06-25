<template>
    <div class="modelWrap" v-if="show">
        <div class="wrap"></div>
        <div class="box">
            <header class="modelHeader">
                <h3 class="title"></h3>
                <button class="close" @click="close">x</button>
            </header>
            <section class="modelBody">
                    
            </section>
            <footer class="modelFooter">
                <button class="No" @click="close">取消</button>
                <button class="Yes">确定</button>
            </footer>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            show : true ,                         
        }
	},
    methods:{
        close(){
            //this.$emit('takeOff', false) ;
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
        $width:40%;         //定义内容框的宽度
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
            .modelBody{
                min-height: 120px ;
                border-bottom: 1px solid #cccccc ;
            }
            .modelFooter{
                height: 60px ;
                border-bottom: 1px solid #cccccc ;
                text-align: right ;
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

