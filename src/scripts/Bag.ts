
class Bag extends eui.Component
{
    public constructor(parentObject:any)
    {
        super();
        this.parentObject = parentObject;
        this.onInit();
    }
    public bagBg:eui.Image;
    public bagTitle:eui.Label;
    public closeBtn:eui.Button;
    public bagItemList:eui.List;
    
    private parentObject:any;

    private onInit()
    {
        this.skinName = "bag";
        this.parentObject.addChild(this);
    }
    
    protected childrenCreated()
    {
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseBtn,this);
        this.x = (this.parent.width - this.width)/2;
        this.y = (this.parent.height - this.height)/2;
        this.setItem();
    }

    //显示背包中的物品
    public showBag():void
    {
        this.setItem();
    }
    
    //设置物品信息
    private setItem():void
    {
         this.bagItemList.itemRenderer = BagItem;
         var data = [];
         for(var i:number = 0; i < GameManager.instance.items.length; ++i)
         {
             if(GameManager.instance.items[i].num!="0")
             {
                 data.push(GameManager.instance.items[i]);
             }
         }

        /* 测试了data中的数据,正确
        for(var i:number = 0; i < data.length; ++i)
         {
             console.log(data[i]);
         }*/

         this.bagItemList.dataProvider = new eui.ArrayCollection(data);
         
         //this.bagItemList.dataProvider = new eui.ArrayCollection(GameManager.instance.items);
    }

    //按关闭按钮
    private onCloseBtn(event:egret.Event)
    {
        MusicPlayer.instance.playerMusic("se04.wav");
        this.parentObject.removeChild(this);
    }


}