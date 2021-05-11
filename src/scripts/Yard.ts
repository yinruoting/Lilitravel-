
class Yard extends eui.Component
{
    public bg:eui.Image;
    public houseBtn:eui.Image;
    public shopBtn:eui.Image;
    public goldNum:eui.Label;
    public messageTxt:eui.Label;
    private crab:eui.Image;
    private crabTxt:eui.Label;

    private crabWordsTimer;
    
    private crabVisitingTimer;

    private mailBtn:eui.Image;

    private grassGroup:eui.Group;


    public constructor()
    {
        super();
        this.skinName = "resource/prefabs/yard.exml"
    }

    protected childrenCreated()
    {
        //console.log("庭院被创建");
        super.childrenCreated();

        this.shopBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onShopBtn,this);
        this.houseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onHouseBtn,this);
        this.goldNum.addEventListener(egret.Event.ENTER_FRAME,this.setGoldNum,this);
        this.mailBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onMailBtn,this);

        var children = this.grassGroup.$children;
        
        GameManager.instance.grassObject = children;

        for(let i:number = 0; i < children.length; ++i)
        {
            let j = i;
          
            children[j].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onGrassClick,children[j]);
            
            if(GameManager.instance.existingGrass[i] == false)
            {
                children[j].visible = false;
            setTimeout(()=>
            {
                children[j].visible = true;
            },
            20000*Math.random());

            }
        }
        

        GameManager.instance.messageLabel = this.messageTxt;
        var rnd = Math.floor(Math.random()*100);
        if(rnd < 20||GameManager.instance.partnerVisiting)
        {
            this.crab.visible = true;
            this.crabTxt.visible = true;
            this.crab.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCrabBtn,this);
            GameManager.instance.showEditedMessage("安迪到家里来访了");
            GameManager.instance.partnerVisiting = true;
            //设置螃蟹来访的Timer 
            this.crabVisitingTimer = setInterval(
            ()=>
            {
                rnd = Math.floor(Math.random()*100);
                //如果螃蟹小伙伴在拜访并且概率低于20的话，就让螃蟹离开
                if(rnd < 20&&GameManager.instance.partnerVisiting)
                {
                    GameManager.instance.showEditedMessage("安迪离开了，这是它给你留下的礼物哦！");
                    GameManager.instance.partnerVisiting = false;
                    this.hideCrab();
                    setTimeout(
                     ()=>{ 
                         this.grantGift();
                    }, 3000);
                }
            }
            ,5000);
        }
        else
        {
            this.crab.visible = false; 
            this.crabTxt.visible = false; 
        }


    }
    
    //按下商店图标就调节shopUI的位置
    private onShopBtn(event:egret.Event):void
    {
        MusicPlayer.instance.playerMusic("se04.wav");
        var shopList:ShopList = new ShopList();
        shopList.width = this.width - 30;
        shopList.height = this.height/2 + 100;
        shopList.x = this.x + 15;
        shopList.y = (this.height - shopList.height)/2
        this.addChild(shopList);
    }
   
    //按下回家按钮
    private onHouseBtn(event:egret.Event):void
    {
        clearInterval(this.crabVisitingTimer);
        MusicPlayer.instance.playerMusic("se04.wav");
        var house = new House();
        this.parent.addChild(house);
        this.parent.removeChild(this);

        var frogIcon:FrogIcon = new FrogIcon();
        house.addChild(frogIcon);
        frogIcon.x = 460;
        frogIcon.y = 18;

        var bagIcon:BagIcon = new BagIcon();
        house.addChild(bagIcon);
    }
    
    //设置金币数量的显示
    private setGoldNum()
    {
        if(GameManager.instance)
        {
            this.goldNum.text = String(GameManager.instance.goldNum);
        }
    }

    private onCrabBtn()
    {
        var crabWords = GameManager.instance.crabWords;
        var idx = Math.floor(Math.random()*crabWords.length);
        
        clearTimeout(this.crabWordsTimer);

        this.crabTxt.text = crabWords[idx];
        console.log(idx>=crabWords.length);
        this.crabWordsTimer = setTimeout(
            ()=>
            {
                this.crabTxt.text = "";
            },
            3000
        );
    }
    
    //隐藏螃蟹
    private hideCrab()
    {
        this.crab.visible = false;
        this.crabTxt.visible = false;
    }
    
    //小螃蟹给予礼物
    private grantGift()
    {
        var rnd = Math.ceil(Math.random()*300);
        GameManager.instance.showEditedMessage("你获得了幸运草"+rnd);
        GameManager.instance.goldNum += rnd;
    }
    
    //点击邮箱按钮的时候
    private onMailBtn()
    {
        MusicPlayer.instance.playerMusic("se04.wav");
        this.parent.addChild(MailPanel.instance);
        MailPanel.instance.setPos((MailPanel.instance.parent.width - MailPanel.instance.width)/2,(MailPanel.instance.parent.height - MailPanel.instance.height)/2);
       
    }
    
    //当点击草的时候，增加金币，播放音乐和Tween动画
    private onGrassClick(event:egret.Event)
    {
        GameManager.instance.goldNum+=10;
        
        for(var i:number = 0; i < GameManager.instance.grassObject.length; ++i)
        {
            if(GameManager.instance.grassObject[i] == event.target)
            {
                break;
            }
        }

        GameManager.instance.existingGrass[i] = false;

        MusicPlayer.instance.playerMusic("se06.wav");
        
        egret.Tween.get(event.target).to({y:event.target.y - 100,alpha:0},1000,
        egret.Ease.backOut).call((target)=>{
            
            target.visible = false;
            setTimeout(
                ()=>{
                    GameManager.instance.existingGrass[i] = true;
                    target.alpha = 1;
                    target.y += 100;
                    target.visible = true;
                },
                20000*Math.random()
            );
        },this,[event.target]);
    }


}