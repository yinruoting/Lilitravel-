
class House extends eui.Component
{
    public constructor()
    {
        super();
        this.onInit();
    }

    public bg:eui.Image;
    public frogIdle:eui.Image;
    public frogBed:eui.Image;
    public frogIdleTxt:eui.Label;
    public frogBedTxt:eui.Label;
   
    //青蛙动画的播放帧率
    private frameRate:number = 200;
    
    //青蛙在床上状态图片资源 resource/images/  3
    private frogBedSprites = [{res:"frogBed1_png"},{res:"frogBed2_png"},{res:"frogBed3_png"},{res:"frogBed1_png"},{res:"frogBed1_png"},{res:"frogBed1_png"},{res:"frogBed1_png"},{res:"frogBed1_png"}];
    
    //青蛙闲置状态图片资源 2
    private frogIdleSprites = [{res:"frogIdle1_png"},{res:"frogIdle2_png"},{res:"frogIdle1_png"},{res:"frogIdle1_png"},{res:"frogIdle1_png"},{res:"frogIdle1_png"},{res:"frogIdle1_png"}];

    //青蛙床上状态切换下标
    private frogBedIndex = 0;

    //青蛙闲置状态切换下标
    private frogIdleIndex = 0;

    //青蛙在床上计时器
    private timerBed;

    //青蛙闲置计时器
    private timerIdle;

    private frogIdleString = ["我想下班","有人告诉我海岛的外面是自由","其实我更喜欢竹笋","别爱我，没结果","其实我喜欢散步"];

    private frogBedString = ["我要去散步","我的自拍好看吗","什么都不想干...","手机还是好玩","F means freedom"];
    
    //返回庭院按钮
    private backBtn:eui.Image;

    //准备按钮
    private readyBtn:eui.Image;

    //准备按钮文字
    private readyBtnTxt:eui.Label;
    
    //显示提示信息
    private messageTxt:eui.Label;

    //相册按钮
    private albumBtn:eui.Image;
    
    protected childrenCreated()
    {   

        this.showFrog();
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBackBtn,this);
        this.readyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onReadyBtn,this);
        GameManager.instance.messageLabel = this.messageTxt;
        this.addEventListener(egret.Event.ENTER_FRAME,this.onTravel,this);
        this.albumBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onAlbumBtn,this);
    }

    private onInit()
    {
        this.skinName = "resource/prefabs/house.exml";
    }

    private showFrog()
    {
       if(!GameManager.instance.isTravel)
        {
            var rnd = Math.random();
            if(rnd<0.5)
            {
                this.frogIdle.visible = true;
                this.frogIdleTxt.visible = true;
                this.frogBed.visible = false;
                this.frogBedTxt.visible = false;
                this.frogIdleTxt.text = "";
                this.frogIdleEvent();
                this.frogIdle.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onIdleFrogClick,this);
            }
            else
            {
                this.frogIdle.visible = false;
                this.frogIdleTxt.visible = false;
                this.frogBed.visible = true;
                this.frogBedTxt.visible = true;
                this.frogBedTxt.text = "";
                this.frogBedEvent();
                this.frogBed.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBedFrogClick,this);
            }
        }
        else
        {
                this.frogIdle.visible = false;
                this.frogIdleTxt.visible = false;
                this.frogBed.visible = false;
                this.frogBedTxt.visible = false;
        }

    }
    
    //青蛙闲置状态
    private frogIdleEvent()
    {
        //setInterval(this.doFrogIdle,this.frameRate);
        this.timerIdle = setInterval(()=>
            { 
                
                this.frogIdle.source = RES.getRes(this.frogIdleSprites[this.frogIdleIndex].res);

                this.frogIdleIndex = (this.frogIdleIndex + 1) % this.frogIdleSprites.length;
            },
            this.frameRate);
    }
    //青蛙闲置状态切换图片
    private doFrogIdle()
    { 
        this.frogIdle.source = RES.getRes(this.frogIdleSprites[this.frogIdleIndex].res);

        this.frogIdleIndex = (this.frogIdleIndex + 1) % this.frogIdleSprites.length;  
    }
    
    //青蛙在床上状态事件
    private frogBedEvent()
    {
        this.timerBed = setInterval(()=>
        {
                
            this.frogBed.source = RES.getRes(this.frogBedSprites[this.frogBedIndex].res);

            this.frogBedIndex = (this.frogBedIndex + 1) % this.frogBedSprites.length;

        },
        this.frameRate);
    }

    //青蛙在床上状态却换图片
    private doFrogBed()
    {
            
        this.frogBed.source = RES.getRes(this.frogIdleSprites[this.frogIdleIndex].res);

        this.frogBedIndex = (this.frogBedIndex + 1) % this.frogBedSprites.length;
    }
        
    private onIdleFrogClick(event:egret.Event)
    {
        this.showFrogIdleTxt();
    }

    private onBedFrogClick(event:egret.Event)
    {
        this.showFrogBedTxt();
    }
    
    private showFrogIdleTxt()
    {
        var rnd = Math.floor(Math.random()*this.frogIdleString.length);
        //console.log("showFrogIdletxt"+rnd);
        this.frogIdleTxt.text = this.frogIdleString[rnd];
        setTimeout(()=>
        {
            this.frogIdleTxt.text = "";
        }, 
        3000);
    }

    private showFrogBedTxt()
    {
        var rnd = Math.floor(Math.random()*this.frogBedString.length);
        //console.log("showFrogBedTxt"+rnd);
        this.frogBedTxt.text = this.frogBedString[rnd];
         setTimeout(()=>
        {
            this.frogBedTxt.text = "";
        }, 
        3000);
    }
    
    //按下返回按钮
    private onBackBtn(event:egret.Event)
    {
        MusicPlayer.instance.playerMusic("se04.wav");
        GameManager.instance.isReady = false;
        if(ReadyPanel.instance.foodReadyname != "")
        {
            GameManager.instance.addItem(ReadyPanel.instance.foodReadyname);
        }
        if(ReadyPanel.instance.protectReadyName != "")
        {
            GameManager.instance.addItem(ReadyPanel.instance.protectReadyName);
        }
        ReadyPanel.instance.resetFoodImage();
        ReadyPanel.instance.resetProtectImage();
        ReadyPanel.instance.foodReadyname = "";
        ReadyPanel.instance.protectReadyName = "";
         //创建庭院
        var yard:Yard = new Yard();
        this.parent.addChild(yard);
        //创建背包图标,放到庭院场景中
        var bagIcon:BagIcon = new BagIcon();
        yard.addChild(bagIcon);
        //创建青蛙图标，放到庭院场景中
        var frogIcon:FrogIcon = new FrogIcon();
        yard.addChild(frogIcon);

        this.parent.removeChild(this);
    }

    //按下准备按钮
    private onReadyBtn(event:egret.Event)
    {
        MusicPlayer.instance.playerMusic("se04.wav");
        //console.log("准备按钮被点击");
        GameManager.instance.isReady = true;

        this.addChild(ReadyPanel.instance);

    }
    
    //当青蛙出去旅行的时候
    private onTravel()
    {
        if(GameManager.instance._traveling)
        {
            this.frogBed.visible = false;
            this.frogIdle.visible = false;
            this.frogBedTxt.visible = false;
            this.frogIdleTxt.visible = false;
        }
    }

    private onAlbumBtn(event:egret.Event)
    {
        MusicPlayer.instance.playerMusic("se04.wav");
        var album:Album = new Album();
        this.parent.addChild(album);
    }
    


}