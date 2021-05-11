
class FrogIcon extends eui.Component
{
    private icon:eui.Image;

    public constructor()
    {
        super();
        this.onInit();
    }

    protected childrenCreated()
    {
        this.icon.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onIconClick,this);
    }

    private onIconClick(event:egret.Event)
    {
        MusicPlayer.instance.playerMusic("se04.wav");
        var playerInfo:PlayerInfo = new PlayerInfo();
        this.parent.addChild(playerInfo);
    }

    private onInit():void
    {
        this.skinName = "resource/prefabs/frogIcon.exml";
        this.width = 60;
        this.height = 45;
        this.x = 30;
        this.y = 30;
    }
}