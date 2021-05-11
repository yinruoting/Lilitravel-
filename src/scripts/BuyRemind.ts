
class BuyRemind extends eui.Component
{
    public constructor()
    {
        super();
        this.skinName = "buyRemind"
    }

    public remindTxt:eui.Label;
    public confirmBtn:eui.Button;

    private _text:string;
    
    protected childrenCreated()
    {
        this.remindTxt.text = this.Text;
        this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onConfirmBtnClick,this);
    }

    public set Text(_text:string)
    {
        this._text = _text;
    }

    public get Text():string
    {
        return this._text;
    }

    private onConfirmBtnClick(event:egret.TouchEvent)
    {
        MusicPlayer.instance.playerMusic("se04.wav");
        this.parent.removeChild(this);
    }


}