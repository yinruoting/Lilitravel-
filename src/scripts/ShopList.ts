
class ShopList extends eui.Component
{
    public constructor()
    {
        super();
        this.onInit();
    }

    public shopFoodScroller:eui.Scroller;
    public shopProtectScroller:eui.Scroller;
    public shopBg:eui.Image;
    public shopTop:eui.Image;2
    public scrollR:eui.Image;
    public scrollL:eui.Image;
    public goodsDisplay:eui.Label;
    public shopFoodList:eui.List;
    public closeBtn:eui.Button;
    public shopProtectList:eui.List;
    
    //是否是食物列表
    private isFoodList:boolean = true;
    
    //食物信息
    public foodInfo = [{name:"luckin coffee",price:"$30",res:"resource/images/apple.png"},{name:"纯甄",price:"$50",res:"resource/images/banana.png"},{name:"chocolate",price:"$70",res:"resource/images/orange.png"},{name:"紫皮糖",price:"$120",res:"resource/images/strawberry.png"},{name:"bread",price:"$150",res:"resource/images/bread.png"},{name:"steamedBread",price:"$200",res:"resource/images/steamedBread.png"},{name:"sanWitch",price:"$250",res:"resource/images/sanWitch.png"}];
    
    //护身符信息
    public protectInfo = [{name:"笋",price:"$60",res:"resource/images/cat.png"},{name:"耳挖勺",price:"$100",res:"resource/images/cat2.png"},{name:"发胶",price:"$140",res:"resource/images/cat3.png"},{name:"小黄衣玩偶",price:"$240",res:"resource/images/cow.png"},{name:"‘F’班服",price:"$300",res:"resource/images/dove.png"},{name:"猫耳发带",price:"$400",res:"resource/images/jewel.png"},{name:"toy",price:"$600",res:"resource/images/toy.png"}];
    
    protected childrenCreated()
    {
        super.childrenCreated();
        //设置食物项的图片以及名称 价格
        this.setFoodList();

        //设置关闭按钮
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseBtn,this);
        //设置吉祥物项的图片以及名称 价格 todo
        this.setProtectList();
        //隐藏吉祥物列表
        this.shopProtectList.visible = false;

        //设置左右切换按钮
        this.scrollR.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onRightBtn,this);
        this.scrollL.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onLeftBtn,this);
    }

    private setFoodList()
    {
        this.shopFoodList.itemRenderer = ShopItem;
        this.shopFoodList.dataProvider = new eui.ArrayCollection(this.foodInfo);
       
    }

    private setProtectList()
    {
        this.shopProtectList.itemRenderer = ShopItem;
        this.shopProtectList.dataProvider = new eui.ArrayCollection(this.protectInfo);
    }
    
    private onCloseBtn(event:egret.TouchEvent)
    {
        MusicPlayer.instance.playerMusic("se04.wav");
        this.parent.removeChild(this);
    }

    private onInit():void
    {
        this.skinName = "resource/prefabs/shopList.exml";
    }
    
    //按下向右切换列表按钮
    private onRightBtn(event:egret.Event)
    {
         MusicPlayer.instance.playerMusic("se04.wav");
         this.isFoodList = !this.isFoodList;
         this.shopFoodList.visible = this.isFoodList;
         this.shopProtectList.visible = !this.isFoodList;

         this.goodsDisplay.text = this.isFoodList? "食物":"吉祥物";

    }
    
    //按下向左切换列表按钮
    private onLeftBtn(event:egret.Event)
    {
         MusicPlayer.instance.playerMusic("se04.wav");
         this.isFoodList = !this.isFoodList;
         this.shopFoodList.visible = this.isFoodList;
         this.shopProtectList.visible = !this.isFoodList;

         this.goodsDisplay.text = this.isFoodList? "食物":"吉祥物";
    }
}