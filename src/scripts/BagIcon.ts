
class BagIcon extends eui.Component
{
    public constructor()
    {
        super();
        this.onInit();
    }
    public bagBtn:eui.Button;

    protected childrenCreated()
    {
        this.bagBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBagBtn,this);
    }

    private onInit():void
    {
        this.skinName = "bagIcon";
        this.x = 450;
        this.y = 830;
        this.width = 60;
        this.height = 60;
    }

    private onBagBtn(event:egret.Event)
    {
        MusicPlayer.instance.playerMusic("se04.wav");
        var bag:Bag = new Bag(this.parent);

    }

}