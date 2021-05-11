
class InputName extends eui.Component
{
    public constructor()
    {
        super();
        this.onInit();
    }

    public inputNameBg:eui.Image;
    public inputLabel:eui.Label;
    public inputText:eui.TextInput;
    public confirmBtn:eui.Button;
    public remindTxt:eui.Label;
    public inputBg:eui.Image;

    protected childrenCreated()
    {
        
        this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onConfirmBtn,this);
    }

    private onConfirmBtn(event:egret.Event)
    {
        MusicPlayer.instance.playerMusic("se04.wav");
        if(this.inputText.text == "")
        {
            this.remindTxt.textColor = 0xFF0000;
            this.remindTxt.text = "蛙名不能为空哦";
            setTimeout(()=>{
                this.remindTxt.text = "";
            }, 3000);
            return;
        }
        else if(this.inputText.text.length > 12)
        {
            this.remindTxt.textColor = 0xFF0000;
            this.remindTxt.text = "蛙名长度必须在12个汉字之内哦";
            setTimeout(()=>{
                this.remindTxt.text = "";
            }, 3000);
            return;
        }
        this.remindTxt.textColor = 0x92F90C;
        this.remindTxt.text = "ok了呢...";
        event.target.enabled = false;
        GameManager.instance.playerName = this.inputText.text;
        setTimeout(()=>{

                this.parent.removeChild(this);
            }, 3000);
    }

    private onInit()
    {
        this.skinName = "resource/prefabs/inputName.exml";
    }

}