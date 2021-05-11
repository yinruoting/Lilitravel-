
class GameManager extends eui.Component
{
    public constructor()
    {
        
        super();

        var sound:egret.Sound = new egret.Sound();
        
        var url:string = "resource/AudioClip/bgm01.wav";

        sound.addEventListener(egret.Event.COMPLETE,this.onSoundComplete,this);
        
        sound.load(url);
        
        this.addEventListener(egret.Event.ENTER_FRAME,this.detectSendingPictures,this);
        
        
    }
    //单例模式
    private static _instance:GameManager;
    
    //金币数量
    private _goldNum:number;

    //背包中的物品
    private _items = [{name:"luckin coffee",num:"0",res:"resource/images/apple.png"},{name:"纯甄",num:"0",res:"resource/images/banana.png"},{name:"chocolate",num:"0",res:"resource/images/orange.png"},{name:"紫皮糖",num:"0",res:"resource/images/strawberry.png"},{name:"bread",num:"0",res:"resource/images/bread.png"},{name:"steamedBread",num:"0",res:"resource/images/steamedBread.png"},{name:"sanWitch",num:"0",res:"resource/images/sanWitch.png"},{name:"笋",num:"0",res:"resource/images/cat.png"},{name:"耳挖勺",num:"0",res:"resource/images/cat2.png"},{name:"发胶",num:"0",res:"resource/images/cat3.png"},{name:"小黄衣玩偶",num:"0",res:"resource/images/cow.png"},{name:"‘F’班服",num:"0",res:"resource/images/dove.png"},{name:"猫耳发带",num:"0",res:"resource/images/jewel.png"},{name:"toy",num:"0",res:"resource/images/toy.png"}];
    
    //旅途中可能寄回的照片
    private _picture = [{name:"月色里",num:"0",res:"resource/images/picture1.png"},{name:"莉莉2",num:"0",res:"resource/images/picture2.png"},{name:"莉莉3",num:"0",res:"resource/images/picture3.png"},{name:"莉莉4",num:"0",res:"resource/images/picture4.png"},{name:"mystery莉莉",num:"0",res:"resource/images/picture5.png"},{name:"mystery莉莉2",num:"0",res:"resource/images/picture6.png"},{name:"mystery莉莉3",num:"0",res:"resource/images/picture7.png"},{name:"scenery莉莉1",num:"0",res:"resource/images/picture8.png"},{name:"scenery莉莉2",num:"0",res:"resource/images/picture9.png"},{name:"scenery莉莉3",num:"0",res:"resource/images/picture10.png"},{name:"scenery莉莉4",num:"0",res:"resource/images/picture11.png"},{name:"scenery莉莉5",num:"0",res:"resource/images/picture12.png"},{name:"scenery6",num:"0",res:"resource/images/picture13.png"},{name:"scenery7",num:"0",res:"resource/images/picture14.png"},{name:"scenery8",num:"0",res:"resource/images/picture15.png"},{name:"scenery9",num:"0",res:"resource/images/picture16.png"},{name:"scenery10",num:"0",res:"resource/images/picture17.png"}];

    //青蛙是否出去旅行
    private _isTravel:boolean = false;

    //青蛙在外旅行
    public _traveling:boolean = false;

    //玩家的名字
    private _playerName:string = "";
 
    //是否在准备中
    private _isReady = false;

    //提示信息Label
    private _messageLabel:eui.Label;
    
    //旅行的Timer
    private travelInterval;
    //回家的Timer
    private backInterval;

    //留言以及旅行到的地方Timer
    private wordInterval;

    private words = ["我...听说有的笋丝是笨蛋","大家一起来玩啊，三缺一","其实...我是俄罗斯人啦...","所有的人...emmm...都是笋丝","这一点儿都不好玩","1+1=??????对,是=3,我太聪明了...","其实...我最喜欢唱歌跳舞了","春天种下一颗笋..."];
    
    private travelPlaces = ["我到了俄罗斯哦...可凉快了...","猜猜莉莉到了哪里?嘻嘻，不告诉你我去爬山了","寒冷的西伯利亚把我冻成了冰棍...","我在睡觉呢...","海花岛是一个好地方...","我不告诉你我去三里屯了..."];

    public detailsTxt:string = "";
    
    //小螃蟹的话语集
    private _crabWords = ["其实...每次来都用这么丰盛的物品招待我，我特别不好意思","这些礼物是我回报您的，请您务必收下","请务必照顾好利路修","又是这么丰盛的晚餐啊","利路修呢？他怎么不来见我..."];
    
    private _partnerVisiting:boolean = false;
    
    //是否正在寄照片
    private _isSendingPictures:boolean = false;

    private _picturesNum;

    //是否有寄回的照片
    private _existSendingPictures:boolean = false;

    //费否有幸运草
    private _existingGrass:[boolean] = [true,true,true,true,true,true,true,true,true,true,true,true,true];
    
    public grassObject;

    public setTimer()
    {
         this.travelInterval = setInterval(
            ()=>
            {
                 if(this.isTravel&&this.messageLabel!=null)
                {
                     var rnd = Math.random();
                     if(rnd < 0.2&&!this._traveling)
                    {
                        //console.log("小青蛙出门去浪了");
                        this._traveling = true;
                        this._isReady = false;
                        this.showMessage();
                    }
                }
            },
            3000
        );

        this.backInterval = setInterval(
            ()=>
            {
                 if(this._traveling)
                {
                     var rnd = Math.random();
                     if(rnd < 0.2)
                    {
                        //console.log("小青蛙回家了");
                        this._traveling = false;
                        this.isTravel = false;
                        this.showBackMessage();
                        clearInterval(this.travelInterval);
                        clearInterval(this.backInterval);
                   }
                   else if(rnd >= 0.2 && rnd <0.6)
                   {
                       //概率在这样的范围内就将照片寄回来
                       this._isSendingPictures = true;

                   }
                }
            },
            6000
        );

        this.wordInterval = setInterval(
        ()=>{
            var rnd = Math.random();
            if(rnd < 0.3)
            {
                if(!this._traveling)
                {
                    this.addText(true);
                }
                else
                {
                    this.addText(false);
                }
            }
        },6000);
    }

    public get existingGrass()
    {
        return this._existingGrass;
    }
    

    public set existingGrass(_existingGrass)
    {
        this._existingGrass = _existingGrass;
    }

    public get existSendingPictures():boolean
    {
        return this._existSendingPictures;
    }

    public set existSendingPictures(_existSendingPictures:boolean)
    {
        this._existSendingPictures = _existSendingPictures;
    }
    
    public set picturesNum(_picturesNum:number)
    {
        this._picturesNum = _picturesNum;
    }

    public get picturesNum():number
    {
        return this._picturesNum;
    }

    //是否寄回照片
    public set isSendingPictures(_isSendingPictures:boolean)
    {
        this._isSendingPictures = _isSendingPictures;
    }

    public get isSendingPictures():boolean
    {
        return this._isSendingPictures;
    }

    //旅途中可能寄回的照片
    public get picture()
    {
        return this._picture;
    }
    
    //是否有伙伴来访
    public get partnerVisiting()
    {
        return this._partnerVisiting;
    }

    public set partnerVisiting(_partnerVisiting:boolean)
    {
        this._partnerVisiting = _partnerVisiting;
    }
    
    //螃蟹的话语数组
    public get crabWords()
    { 
        return this._crabWords;
    }
    
    //消息UI(小青蛙是否出去玩)
    public set messageLabel(_messageLabel:eui.Label)
    {
        this._messageLabel = _messageLabel;
    }

    public get messageLabel():eui.Label
    {
        return this._messageLabel;
    }
    
    //物品数组
    public get items()
    {
        return this._items;
    }

    public static get instance():GameManager
    {
        if(!this._instance)
        {
            this._instance = new GameManager();
        }
        return this._instance;
    }
    
    //金币数量
    public get goldNum():number
    {
        return this._goldNum;
    }

    public set goldNum(_goldNum:number)
    {
        this._goldNum = _goldNum;
    }
    
    //将物品加入背包
    public addItem(itemIndex:string)
    {
        var item = {name:"",num:"",res:""};
        for(var i:number = 0; i < this._items.length; ++i)
        {
            item = this._items[i];
            if(item.name == itemIndex)
            {
                var itemNumber = Number(this._items[i].num);
                this._items[i].num = String(itemNumber+1);
                //console.log(itemIndex+"被加入背包"+" 总数:"+this._items[i].num+" 资源地址:"+item.res);
                break;
            }
        }
    }
    
    //是否点了旅游图标
    public set isTravel(_isTravel)
    {
        this._isTravel = _isTravel;
    }

    public get isTravel():boolean
    {
        return this._isTravel;
    }
    
    //青蛙的名字
    public get playerName():string
    {
        return this._playerName;
    }

    public set playerName(_playerName:string)
    {
        this._playerName = _playerName;
    }
    
    //是否点了准备按钮
    public set isReady(_isReady:boolean)
    {
        this._isReady = _isReady;
    }

    public get isReady():boolean
    { 
        return this._isReady;
    }
    
    //消耗物品
    public useItem(name:string)
    {
        for(var i = 0; i < this.items.length; ++i)
        {
            if(this.items[i].name == name)
            {
                this.items[i].num = String(Number(this.items[i].num) - 1);
                break;
            }
        }
    }


    
    //检测是否会去旅行
    private detectTravel():void
    {
        if(this.isTravel&&this.messageLabel!=null)
        {
            var rnd = Math.random();
            if(rnd > 0.8&&!this._traveling)
            {
                this._traveling = true;
                
                this.showMessage();
            }
        }
    }
    //检测是否会回家
    private detectBack()
    {
        if(this._traveling)
        {
             var rnd = Math.random();
             if(rnd > 0.8)
             {
                 this._traveling = false;
                 this.isTravel = false;
                 
                 this.showBackMessage();
      
             }
        }
    }
    //显示出门浪的信息
    private showMessage()
    {
        this.messageLabel.text = "小"+this.playerName+"出门去浪了";
        setTimeout(()=>
        {
            this.messageLabel.text = "";
        }
        , 3000);
    }
    //显示回家的信息
    private showBackMessage()
    {
        this.messageLabel.text = "小"+this.playerName+"回家了";
        setTimeout(()=>
        {
            this.messageLabel.text = "";
        }
        , 3000);
    }
    //显示自定义的信息
    public showEditedMessage(message:string):void
    {
        this.messageLabel.text = message;
        setTimeout(()=>
        {
            this.messageLabel.text = "";
        }
        , 3000);
    }

    //往玩家列表信息细节上添加文字
    public addText(isWords:boolean):void
    { 
        if(isWords)
        {
            var rnd = Math.floor(Math.random()*this.words.length);
            this.detailsTxt += this.words[rnd] + "\n" + "\n";
        }
        else
        {
            rnd = Math.floor(Math.random()*this.travelPlaces.length);
            this.detailsTxt += this.travelPlaces[rnd] + "\n" + "\n";
        }
    }
    //当背景音乐加载完毕的时候就播放
    private onSoundComplete(event:egret.Event)
    {
        var curSound:egret.Sound = event.target;
        curSound.play(0,-1);
    }
    //检测青蛙是否寄回来照片
    private detectSendingPictures(event:egret.Event)
    {
        if(this._isSendingPictures)
        {
            this._isSendingPictures = false;
            var rnd = Math.floor(Math.random()*this.picture.length);
            this.picture[rnd]["num"] = String(Number(this.picture[rnd]["num"])+1);
            console.log("小青蛙寄回了"+this.picture[rnd]["name"]+" "+this.picture[rnd]["num"]);
            this.showEditedMessage("小青蛙给你寄回了照片哦！");
            this.picturesNum = rnd;
            this._existSendingPictures = true;
        }
    }


}