
class PlayerInfo extends eui.Component
{
    public constructor()
    {
        super();
        this.onInit();
    }

  public headFrame:eui.Image;
  public headIcon:eui.Image;
  public playerInfoFrame:eui.Image;
  public details:eui.Image;
  public detailsScroller:eui.Scroller;
  public detailsGroup:eui.Group;
  public detailsTxt:eui.Label;
  public playerInfoScroller:eui.Scroller;
  public playerInfoGroup:eui.Group;
  public playerInfoTxt:eui.Label;
  public closeBtn:eui.Image;


    protected childrenCreated()
    {
        //初始化设置组件的一系列的值
        this.detailsScroller.viewport = this.detailsGroup;
        this.playerInfoScroller.viewport = this.playerInfoGroup;
        this.detailsGroup.addChild(this.detailsTxt);
        this.playerInfoGroup.addChild(this.playerInfoTxt);
        this.playerInfoTxt.text = GameManager.instance.playerName;
        //this.detailsTxt.text = GameManager.instance.playerName;
        this.x = (this.parent.width - this.width)/2;
        this.y = (this.parent.height - this.height)/2;

        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseBtn,this);

        this.addEventListener(egret.Event.ENTER_FRAME,this.onTalk,this);
        
    }

    private onInit():void
    {

        this.skinName = "resource/prefabs/playerInfo.exml";

    }
    
    private onCloseBtn(event:egret.Event)
    {
        MusicPlayer.instance.playerMusic("se04.wav");
        this.parent.removeChild(this);
    }

    private onTalk(event:egret.Event)
    {
        this.detailsTxt.text = GameManager.instance.detailsTxt;
    }
}