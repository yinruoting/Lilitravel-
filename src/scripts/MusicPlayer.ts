
class MusicPlayer
{
    public constructor()
    {

    }

    private static _instance:MusicPlayer;

    public static get instance()
    {
        if(this._instance == null)
        {
            this._instance = new MusicPlayer();
        }
        
        return this._instance;
    }

    public playerMusic(src:string)
    {
        var sound:egret.Sound = new egret.Sound();

        sound.addEventListener(egret.Event.COMPLETE,this.onSoundComplete,this);

        sound.load("resource/AudioClip/"+src);
    }

    private onSoundComplete(event:egret.Event)
    {
         var curSound:egret.Sound = event.target;
         curSound.play(0,1);
    }

}