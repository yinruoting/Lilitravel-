class Album extends eui.Component
{
    public constructor()
    {
        super();
        this.onInit();
    }
    public bg:eui.Image;
    public pictureList:eui.List;
    private closeBtn:eui.Image;

    protected childrenCreated()
    {
        this.x = (this.parent.width - this.width)/2;
        this.y = (this.parent.height - this.height)/2;
        this.pictureList.itemRenderer = Photo;
        var items = [];
        for(var i:number = 0; i < GameManager.instance.picture.length; ++i)
        {
            if(GameManager.instance.picture[i].num!="0")
            {
                items.push(GameManager.instance.picture[i]);
            }
        }
        
        this.pictureList.dataProvider = new eui.ArrayCollection(items);

        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseBtn,this);
    }
    private onInit()
    {
        this.skinName = "resource/prefabs/album.exml";
        
    }

    private onCloseBtn(event:egret.Event)
    {
        MusicPlayer.instance.playerMusic("se04.wav");
        this.parent.removeChild(this);
    }
}