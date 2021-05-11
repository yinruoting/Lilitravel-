class Photo extends eui.ItemRenderer
{
    public constructor()
    {
        super();
        this.onInit();
    }

    private onInit()
    {
        this.skinName = "resource/prefabs/photo.exml";
    }
    protected childrenCreated()
    {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
    }

    private onClick(event:egret.Event)
    {
        MusicPlayer.instance.playerMusic("se04.wav");
        var pictures:Pictures = new Pictures(this.data.res);
        this.parent.parent.parent.parent.addChild(pictures)
    }
}