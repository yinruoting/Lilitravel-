
class BagItem extends eui.ItemRenderer
{
    public constructor()
    {
        super();
        this.onInit();
    }

    public itemBg:eui.Image;
    public itemBtn:eui.Image;
    public itemNum:eui.Label;

    private type:string;

    protected childrenCreated()
    {
        //此处打了断点 引擎的坑: ItemRenderer绑定皮肤的时候，路径必须填写完整(注意)
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onItemClick,this);

    }
    
    //不知道为什么背包中物品的数值设置错误(因为绑定皮肤的路径没写完整)
    private onInit():void
    {
        this.skinName = "resource/prefabs/bagItem.exml";
        this.width = 80;
        this.height = 80;
    }

    private onItemClick()
    {
        MusicPlayer.instance.playerMusic("se04.wav");
        if(GameManager.instance.isTravel||GameManager.instance._traveling)
            return;
        if(!GameManager.instance.isReady)
            return;
        var index;
        for(var i = 0; i < GameManager.instance.items.length; ++i)
        {
            if(GameManager.instance.items[i].name == this.data.name)
            {
                index = i;
                break;
            }
            
        }

        if(index <=6 )
        {
            this.type = "food";
        }
        else
        {
            this.type = "protect";
        }
        
        if(GameManager.instance.items[index].num == "0")
            return;
        //是食物类型并且在准备列表中已经有其它食物了就替换这个食物，并将原来的食物数量还原，否则，直接将本食物放入食物列表
        if(this.type == "food" && ReadyPanel.instance.foodReadyname!="")
        {
            GameManager.instance.addItem(ReadyPanel.instance.foodReadyname);
            ReadyPanel.instance.foodReadyname = this.data.name;
            ReadyPanel.instance.setFoodImage(this.data.res);
        }
        else if(this.type == "food" && ReadyPanel.instance.foodReadyname=="")
        {
            ReadyPanel.instance.foodReadyname = this.data.name;
            ReadyPanel.instance.setFoodImage(this.data.res);
        }
       
        //是吉祥物类型并且在准备列表中已经有了其它吉祥物了就替换这个吉祥物，并将原来的吉祥物数量还原，否则，直接将本吉祥物放入吉祥物列表
        if(this.type == "protect" && ReadyPanel.instance.protectReadyName!="")
        {
            GameManager.instance.addItem(ReadyPanel.instance.protectReadyName);
            ReadyPanel.instance.protectReadyName = this.data.name;
            ReadyPanel.instance.setProtectImage(this.data.res);

        }
        else if(this.type == "protect" && ReadyPanel.instance.protectReadyName=="")
        {
            ReadyPanel.instance.protectReadyName = this.data.name;
            ReadyPanel.instance.setProtectImage(this.data.res);
        }

        var num = Number(this.itemNum.text);
        num--;
        GameManager.instance.useItem(this.data.name);
        this.itemNum.text = String(num);
    }
    
}