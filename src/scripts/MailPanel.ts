class MailPanel extends eui.Component
{
    public bg:eui.Image;
    public mailItemBg:eui.Image;
    public mailItemImage:eui.Image;
    public closeBtn:eui.Image;
    public mailItemTxt:eui.Label;
    private static _instance:MailPanel;

    public constructor()
    {
        super();
        this.onInit();
    }

    public static get instance():MailPanel
    {
        if(this._instance == null)
        {
            this._instance = new MailPanel();
        }

        return this._instance;    
    }

    protected childrenCreated()
    {
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseBtn,this);
        this.addEventListener(egret.Event.ENTER_FRAME,this.detectSendingPictures,this);
        this.mailItemImage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onMailClick,this);
        this.mailItemTxt.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onMailClick,this);
    } 

    private onInit():void
    {
        this.skinName = "resource/prefabs/mailPanel.exml";
    }

    private onCloseBtn(event:egret.Event):void
    {
        MusicPlayer.instance.playerMusic("se04.wav");
        this.parent.removeChild(this);
    }

    public setPos(x?:number,y?:number):void
    { 
        this.x = x;
        this.y = y;
    }

    private detectSendingPictures()
    {
         if(!GameManager.instance.existSendingPictures)
        {
            this.mailItemBg.visible = false;
            this.mailItemImage.visible = false;
            this.mailItemTxt.visible = false;
        }
        else
        {
             this.mailItemBg.visible = true;
             this.mailItemImage.visible = true;
             this.mailItemTxt.visible = true;
             this.mailItemImage.width = 82;
             this.mailItemImage.height = 80;
             this.mailItemImage.source = GameManager.instance.picture[GameManager.instance.picturesNum]["res"];
        }
    }

    private onMailClick()
    {
        MusicPlayer.instance.playerMusic("se04.wav");
        GameManager.instance.existSendingPictures = false;
        var pictures:Pictures = new Pictures(GameManager.instance.picture[GameManager.instance.picturesNum]["res"]);
        console.log(this.parent);
        this.parent.addChild(pictures);
    }
}