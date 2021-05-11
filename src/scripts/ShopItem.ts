
class ShopItem extends eui.ItemRenderer
{
    public constructor()
    {
        super();
        this.onInit();
    }

    public bg:eui.Image;
    public item:eui.Image;
    public foodName:eui.Label;
    public price:eui.Label;
    public buyBtn:eui.Button;

    //public priceNumber:number;

    private onInit():void
    {
        this.skinName = "resource/prefabs/shopItem.exml";
        //所以改用lambda表达式，解决了闭包的问题,没有必要设置，由于egret的缓存机制，超过一定数量的对象时，实际上是前边在viewport外对象的引用换了一个位置和样子而已，直接计算价格即可
       /* setTimeout(
            ()=>
            {
                this.priceNumber = Number((this.data.price).substring(1,this.data.price.length));
                //console.log(this.priceNumber);
            }
            ,50);*/
    }

    protected childrenCreated():void
    {
        this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.buyFood,this);
    }

    public setFoodIcon(path:string):void
    {
        this.item.texture = RES.getRes(path);
    }
    
    //由于闭包无法直接对类中的值设置
    public setPriceNumber():void
    {
       
    }

    public setFoodName(foodName:string):void
    {
        this.foodName.text = foodName;
    }
    //购买食物
    private buyFood(event:egret.Event)
    {
         MusicPlayer.instance.playerMusic("se04.wav");
         var price =  Number((this.data.price).substring(1,this.data.price.length));
         var buyRemind:BuyRemind = new BuyRemind();
         buyRemind.x = (this.parent.parent.width - buyRemind.width)/2;
         buyRemind.y = (this.parent.parent.height - this.height)/2;
         if(GameManager.instance.goldNum >= price)
         {
             buyRemind.Text = "购买成功";
             this.parent.parent.addChild(buyRemind);
             GameManager.instance.goldNum -= price;
             //todo将物品加入背包
             GameManager.instance.addItem(this.data.name);
             
         }
         else
         {
             buyRemind.Text = "金币不足,购买失败";
             this.parent.parent.addChild(buyRemind);
         }
       
    }


   
}