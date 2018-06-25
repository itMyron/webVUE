<template>
    <div>
    	<article class="news news3 clear">
	        <div class="list">
	        	<p class="title">上传营业执照照片</p>
	        	<div class="photoList photoList1 clear state">
	                <input  id="file1" ref="file1" @change="uploadPhoto($event,1)" type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg;capture=camera" class="file state" />
	                <img id="image1" ref="image1" />
	                <p id="progressNumber1" class="progress" :style="{width:images.imagePro1}"></p>
	                <p id="percent1">{{images.imagePro1}}</p> 
	            </div>
	        </div>
	        <div class="list">
	        	<p class="title">上传法人身份证正面照片</p>
	        	<div class="photoList photoList2 clear state">
	                <input  id="file2" @change="uploadPhoto($event,2)" type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg;capture=camera" class="file state" />
	                <img id="image2" ref="image2" />
	                <p id="progressNumber2" class="progress" :style="{width:images.imagePro2}"></p>
	                <p id="percent2">{{images.imagePro2}}</p> 
	            </div>
	        </div>
	    </article>
    </div>
</template>

<script>
    import API from "@/config/api";
    let images = {
        imageUrl1 : "" ,
        imagePro1 : "" ,
        imageUrl2 : "" ,
        imagePro2 : "" ,
    }
    export default {
		
		data(){
			return{
				token:"",
				images ,
				sign:"",
			}
        },
        props: {
            "postShopInfoData":{
                type:Object,		//Array,Boolean,Number
                default:false
            },
        },
		methods: {
			init(){
                let _this = this ;
                _this.token = sessionStorage.getItem("myron");	//获取token值
                let formData = new FormData(); 
                let params = _this.postShopInfoData.data
                for (var key in params) {
				    formData.append(key, params[key])
			    }
                let request = new Request(API.GET_SHOPINFO,{
                    headers: {},
                    method : "post",
                    mode: "cors",
                    redirect : "follow",
                    body: formData
                });
                fetch(request)
                    .then((response) => {
                        //返回 object 类型
                        return response.json();
                    })
                    .then((result) => {
                        if(result.result == "success"){
                            _this.showUrl = result.data.store.showUrl	//图片地址
                            _this.$refs['image1'].src =_this.showUrl+result.data.store.storeLicensePhoto ;	//营业执照
                            _this.$refs['image2'].src =_this.showUrl+result.data.store.idcardFrontoPhoto ;	//身份证正面
                        }else{
                            //this.info = result.msg ;
                        }
                    })
                    .catch((error)=>{
                        this.info = error.msg ;
                    });  
			},
			// 上传图片
			uploadPhoto(e,index){
                let file = e.target.files[0];
				let _this = this ;
				this.sign = index ;
            	if(file){
            		let formData = new FormData();
            		//限制上传图片大小
					if(file.size>5*1024*1024) {
		                
		            }else{   
		                //formData.append("fileImg", file); 
		            }
					formData.append("fileImg", file); 
					let xhr = new XMLHttpRequest();
					//监听图片上传进度 
					xhr.upload.addEventListener("progress", this.uploadProgress, false); 
					xhr.open("post",API.POST_IMG+"?token="+this.token, true);
					xhr.send(formData);
					xhr.onload = function() {
						var str = xhr.responseText;
						var result = JSON.parse(str);
						if(result.result == "success") {
							let imgUrl = result.data.showUrl + result.data.fileName ;
							switch (index) {
								case 1:
									_this.images.imageUrl1 = imgUrl ;
                                    _this.$refs['image1'].src = _this.images.imageUrl1 ;
                                    _this.$emit('getImagesList', {img:result.data.fileName,index:1}) ;
									break;
								case 2:
									_this.images.imageUrl2 = imgUrl ;
                                    _this.$refs['image2'].src = _this.images.imageUrl2 ;
                                    _this.$emit('getImagesList', {img:result.data.fileName,index:2}) ;
									break;
							}
						}
					};
            	}  //end --if
			}, 
			
        },
        created(){
           this.init();
        }
    }
</script>
<style lang="scss" scoped type="text/css">
    @import "./shopInfo_photoList.scss";
</style>

