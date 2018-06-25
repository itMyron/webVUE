<template>
    <div>
        <div class="clear">
            <div class="photoList photoList1 clear state">
                <input  id="file1" ref="file1" @change="upload($event,1)" type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg;capture=camera" class="file state" />
                <img id="image1" ref="image1" />
                <p id="progressNumber1" class="progress" :style="{width:images.imagePro1}"></p>
                <p id="percent1">{{images.imagePro1}}</p> 
            </div>
            <div class="photoList photoList2 clear state">
                <input  id="file2" @change="upload($event,2)" type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg;capture=camera" class="file state" />
                <img id="image2" ref="image2" />
                <p id="progressNumber2" class="progress" :style="{width:images.imagePro2}"></p>
                <p id="percent2">{{images.imagePro2}}</p> 
            </div>
        </div>
        <div class="clear">
            <div class="photoList photoList3 clear state">
                <input  id="file3" @change="upload($event,3)" type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg;capture=camera" class="file state" />
                <img id="image3" ref="image3" />
                <p id="progressNumber3" class="progress" :style="{width:images.imagePro3}"></p>
                <p id="percent3">{{images.imagePro3}}</p> 
            </div>
            <div class="photoList photoList4 clear state">
                <input  id="file4" @change="upload($event,4)" type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg;capture=camera" class="file state" />
                <img id="image4" ref="image4" />
                <p id="progressNumber4" class="progress" :style="{width:images.imagePro4}"></p>
                <p id="percent4">{{images.imagePro4}}</p> 
            </div>	
        </div>				
    </div>  
</template>
<script>
    import API from "@/config/api";
    let images = {
		img1 : "" ,
        imageUrl1 : "" ,
        imagePro1 : "" ,
		img2 : "" ,
        imageUrl2 : "" ,
        imagePro2 : "" ,
        img3 : "" ,
		imageUrl3 : "" ,
        imagePro3 : "" ,
        img4 : "" ,
		imageUrl4 : "" ,
        imagePro4 : "" ,
    }
    export default {
		components:{
		
        },
		data(){
			return{
				token:"",
				images ,
				sign:"",
			}
		},
		methods: {
			//获取图片列表信息
			getData(){
				let _this = this ;
				_this.$post(_this.$API.GET_USERMSG)
				.then((result) => {
					if(result.result == "success"){
						let showUrl = result.data.showUrl
						if(result.data.cardFrontPhoto){
							_this.$refs['image1'].src =showUrl + result.data.cardFrontPhoto ;
							_this.images.img1 = result.data.cardFrontPhoto ;
						}
						if(result.data.cardBackPhoto){
							_this.$refs['image2'].src =showUrl + result.data.cardBackPhoto ;
							_this.images.img2 = result.data.cardBackPhoto ;
						}
						if(result.data.drivePhoto){
							_this.$refs['image3'].src =showUrl + result.data.drivePhoto ;
							_this.images.img3 = result.data.drivePhoto ;
						}
						if(result.data.houseCertificatePhoto){
							_this.$refs['image4'].src =showUrl + result.data.houseCertificatePhoto ; 
							_this.images.img4 = result.data.houseCertificatePhoto ;
						}
					}else{
						_this.$toast(result.msg) ;
					}
				})
				.catch((error)=>{
					_this.$toast(error.msg)
				})
			},
			// 上传图片
			upload(e,index){
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
									_this.images.img1 =  result.data.fileName ;
									_this.$refs['image1'].src = _this.images.imageUrl1 ;
									_this.$emit("postPhotoList",_this.images) ;
									break;
								case 2:
									_this.images.imageUrl2 = imgUrl ;
									_this.images.img2 =  result.data.fileName ;
									_this.$refs['image2'].src = _this.images.imageUrl2 ;
									_this.$emit("postPhotoList",_this.images) ;
									break;
								case 3:
									_this.images.imageUrl3 = imgUrl ;
									_this.images.img3 =  result.data.fileName ;
									_this.$refs['image3'].src = _this.images.imageUrl3 ;
									_this.$emit("postPhotoList",_this.images) ;
									break;
								case 4:
									_this.images.imageUrl4 = imgUrl ;
									_this.images.img4 =  result.data.fileName ;
									_this.$refs['image4'].src = _this.images.imageUrl4 ;
									_this.$emit("postPhotoList",_this.images) ;
									break;
							}
						}
					};
            	}  //end --if
			}, 
			uploadProgress(evt){
				if (evt.lengthComputable) {
					//this.images.imagePro1 = Math.round((evt.loaded) * 100 / evt.total)+"%"; //evt.loaded：文件上传的大小 evt.total：文件总的大小 
					 switch (this.sign) {
						case 1:
							this.images.imagePro1 = Math.round((evt.loaded) * 100 / evt.total)+"%"; 
							break;
						case 2:
							this.images.imagePro2 = Math.round((evt.loaded) * 100 / evt.total)+"%"; 
							break;
						case 3:
							this.images.imagePro3 = Math.round((evt.loaded) * 100 / evt.total)+"%"; 
							break;
						case 4:
							this.images.imagePro4 = Math.round((evt.loaded) * 100 / evt.total)+"%"; 
							break;
					}
				} 
			}, 	
		},
        created(){
			this.getData();
		},
    }
</script>
<style lang="scss" scoped type="text/css">
   @import "./photoList.scss";
</style>


