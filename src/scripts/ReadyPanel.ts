
class ReadyPanel extends eui.Component
{
    public constructor()
    {
        super();
        this.onInit();

    }

    public bg:eui.Image;
    public des:eui.Label;
    public closeBtn:eui.Image;
    public foodFrame:eui.Image;
    public protectFrame:eui.Image;
    public foodImage:eui.Image;
    public protectImage:eui.Image;
    public readyBtn:eui.Image;
    public readyTxt:eui.Label;
    public itemBg:eui.Image;
    public itemList:eui.List;
    public itemScroller:eui.Scroller;

    private static _instance:ReadyPanel;

    private _foodReadyname:string = "";
    private _protectReadyName:string = "";



    public static get instance()
    {
        if(!this._instance)
        {
            this._instance = new ReadyPanel();
        }
        return this._instance;
    }

    protected childrenCreated()
    {
        this.x = (this.parent.width - this.width)/2;
        this.y = (this.parent.height - this.height)/2;
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseBtn,this);
        this.itemScroller.viewport = this.itemList;
        this.showItem();
        this.readyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onReadyBtn,this);
        
    }

    private onInit():void
    {
        this.skinName = "resource/prefabs/readyPanel.exml";
        /*this.x = (this.parent.width - this.width)/2;
        this.y = (this.parent.height - this.height)/2;*/
    }

    private onCloseBtn(event:egret.Event)
    {
        MusicPlayer.instance.playerMusic("se04.wav");
        GameManager.instance.isReady = false;
        if(GameManager.instance.isTravel||GameManager.instance._traveling)
        {
            this.resetFoodImage();
            this.resetProtectImage();
            this._foodReadyname = "";
            this._protectReadyName = "";
            this.parent.removeChild(this);
            return;
        }
        if(this._foodReadyname!="")
        {
            GameManager.instance.addItem(this._foodReadyname);
        }
        if(this._protectReadyName!="")
        {
            GameManager.instance.addItem(this._protectReadyName);
        }
        this.resetFoodImage();
        this.resetProtectImage();
        this._foodReadyname = "";
        this._protectReadyName = "";
        this.parent.removeChild(this);
        //delete this.itemList;
    }

    private showItem()
    {
         this.itemList.itemRenderer = BagItem;
         /*var data = [];
         for(var i:number = 0; i < GameManager.instance.items.length; ++i)
         {
             if(GameManager.instance.items[i].num!="0")
             {
                 data.push(GameManager.instance.items[i]);
             }
         }*/

         this.itemList.dataProvider = new eui.ArrayCollection(GameManager.instance.items);
    }
    
    public set foodReadyname(_foodReadyname:string)
    {
        this._foodReadyname = _foodReadyname;
    }

    public get foodReadyname():string
    {
        return this._foodReadyname;
    }

    public set protectReadyName(_protectReadyName:string)
    {
        this._protectReadyName = _protectReadyName;
    }

    public get protectReadyName():string
    {
        return this._protectReadyName;
    }
    //设置准备框中的食物图片
    public setFoodImage(src:string)
    {
        this.foodImage.visible = true;
        this.foodImage.source = src;
    }
    //设置准备框中的保护物图片
    public setProtectImage(src:string)
    {
        this.protectImage.visible = true;
        this.protectImage.source = src;
    }

    public resetFoodImage()
    {
        this.foodImage.visible = false;
    }

    public resetProtectImage()
    {
        this.protectImage.visible = false;
    }

    private onReadyBtn()
    {
        MusicPlayer.instance.playerMusic("se04.wav");
        if(this._foodReadyname==""||this._protectReadyName=="")
        {
            GameManager.instance.showEditedMessage("食物和保护物都必须带上哦!!!");
            return;
        }
        if(GameManager.instance.isTravel||GameManager.instance._traveling)
        {
            GameManager.instance.showEditedMessage("小"+GameManager.instance.playerName+"已经在准备出门旅行了哦!!!");
            return;
        }
        GameManager.instance.showEditedMessage("小"+GameManager.instance.playerName+"准备出发了!!");
        GameManager.instance.isTravel = true;
        GameManager.instance.setTimer();

        this.foodReadyname = "";
        this.protectReadyName = "";
        
        //delete this.itemList;
        /*for(var i = 0; i < GameManager.instance.items.length; ++i)
        {
            if(GameManager.instance.items[i].name == this.foodReadyname)
            {
                GameManager.instance.items[i].num = String(Number(GameManager.instance.items[i].num) - 1);
                this.foodReadyname = "";
                
            }

            if(GameManager.instance.items[i].name == this.protectReadyName)
            {
                GameManager.instance.items[i].num = String(Number(GameManager.instance.items[i].num) - 1);
                this.protectReadyName = "";
            }
        }*/
        this.parent.removeChild(this);
    }



}