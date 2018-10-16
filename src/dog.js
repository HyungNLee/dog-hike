export class Dog{
  constructor(){
    this.energy=100; 
    this.hunger=0;
    this.thirst=0;
    this.hikingInterval; 
    this.starvingInterval; 
    this.thirstInterval;
    this.dead = false;
    this.message =""; 
  }
  startTheGame(){
    this.goHiking(); 
    this.gettingHungry();
    this.gettingThirsty();
  }

  feed(){
    this.hunger-=10;
  }
  giveWater(){
    this.thirst-=10; 
  }
  rest(){
    this.energy+=10;
  }
  goHiking(){
    this.hikingInterval=setInterval(()=>{
    this.energy-=10;
    }, 100);
  }
  gettingHungry(){
    this.starvingInterval=setInterval(()=>{
      this.hunger+=10;}, 100);
  }
  gettingThirsty(){
    this.thirstInterval=setInterval(()=>{
      this.thirst+=10;}, 100); 
    }
  deathChecker(){
    let isDeath=setInterval(()=>{
      if(this.energy < 1 || this.hunger > 99 || this.thirst > 99){
        this.dead = true;
        console.log("Dead");
        clearInterval(this.hikingInterval); 
        clearInterval(this.thirstInterval);
        clearInterval(this.starvingInterval);
        clearInterval(isDeath);

      }
    }, 1000)
  }

}