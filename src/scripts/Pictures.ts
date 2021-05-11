class Pictures extends eui.Component
{
    public constructor(src:string)
    {
        super();
        this.onInit();
        this.imgPath = src;
    }
    public img:eui.Image;
    private imgPath:string;

    protected childrenCreated()
    {
        this.x = (this.parent.width - this.width)/2;
        this.y = (this.parent.height - this.height)/2;
        this.img.source = this.imgPath;
        

        this.scaleX = 0;
        this.scaleY = 0;
        egret.Tween.get(this).to({scaleX:1,scaleY:1},1000,egret.Ease.bounceOut).call(()=>{
            this.img.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onImgClick,this);
        },this);
        MusicPlayer.instance.playerMusic("se07.wav");
    }

    private onInit()
    {

        this.skinName = "resource/prefabs/pictures.exml";
    }

    private onImgClick()
    {
        MusicPlayer.instance.playerMusic("se04.wav");
        GameManager.instance.existSendingPictures = false;
        this.parent.removeChild(this);
    }


}